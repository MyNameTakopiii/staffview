import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

// In-memory cache for serverless fallback when Pusher keys are not set
let globalStateCache = {
  patientData: null,
  status: 'inactive',
  activeField: null,
  lastUpdated: Date.now(),
};

// Initialize Pusher Server if environment variables are provided
const pusher =
  process.env.PUSHER_APP_ID &&
  process.env.NEXT_PUBLIC_PUSHER_KEY &&
  process.env.PUSHER_SECRET &&
  process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    ? new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.NEXT_PUBLIC_PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        useTLS: true,
      })
    : null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { event, data } = req.body || {};

    // Update internal cache
    if (event === 'patient_update') {
      globalStateCache.patientData = data;
    } else if (event === 'patient_status') {
      globalStateCache.status = data;
    } else if (event === 'patient_submit') {
      globalStateCache.patientData = data;
      globalStateCache.status = 'submitted';
      globalStateCache.activeField = null;
    } else if (event === 'patient_focus') {
      globalStateCache.activeField = data;
    }
    globalStateCache.lastUpdated = Date.now();

    // Trigger Pusher Channel event if Pusher is configured
    if (pusher) {
      try {
        await pusher.trigger('staff-channel', event, data);
        return res.status(200).json({ success: true, mode: 'pusher' });
      } catch (err: any) {
        console.error('Pusher trigger error:', err);
        return res.status(500).json({ error: err.message });
      }
    }

    // Fallback response for zero-config polling mode on Vercel
    return res.status(200).json({ success: true, mode: 'memory-cache', cache: globalStateCache });
  }

  if (req.method === 'GET') {
    return res.status(200).json(globalStateCache);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
