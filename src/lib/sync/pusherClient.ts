import PusherClient from 'pusher-js';

let pusherClientInstance: PusherClient | null = null;
let channelInstance: any = null;

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || '';
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1';

export const isPusherConfigured = (): boolean => {
  return Boolean(PUSHER_KEY);
};

export const getPusherClient = (): PusherClient | null => {
  if (!isPusherConfigured()) return null;

  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(PUSHER_KEY, {
      cluster: PUSHER_CLUSTER,
    });
  }
  return pusherClientInstance;
};

export const getStaffChannel = () => {
  const client = getPusherClient();
  if (!client) return null;

  if (!channelInstance) {
    channelInstance = client.subscribe('staff-channel');
  }
  return channelInstance;
};

export const triggerPusherEvent = async (event: string, data: any) => {
  try {
    await fetch('/api/pusher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, data }),
    });
  } catch (err) {
    console.error('Failed to trigger pusher event via API:', err);
  }
};
