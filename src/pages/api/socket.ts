import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io?: ServerIO;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

// Global in-memory state persistence across Socket.IO connections
let globalStateCache = {
  patientData: null as any,
  status: 'inactive',
  activeField: null as string | null,
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('*Initializing Socket.io server with state persistence...');
    const io = new ServerIO(res.socket.server as any, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Immediately send current server state to newly connected client
      if (globalStateCache.patientData) {
        socket.emit('staff_patient_update', globalStateCache.patientData);
      }
      if (globalStateCache.status) {
        socket.emit('staff_patient_status', globalStateCache.status);
      }
      if (globalStateCache.activeField !== undefined) {
        socket.emit('staff_patient_focus', globalStateCache.activeField);
      }

      // Explicit sync request from client
      socket.on('request_sync', () => {
        if (globalStateCache.patientData) {
          socket.emit('staff_patient_update', globalStateCache.patientData);
        }
        socket.emit('staff_patient_status', globalStateCache.status);
        socket.emit('staff_patient_focus', globalStateCache.activeField);
      });

      socket.on('patient_update', (data) => {
        globalStateCache.patientData = data;
        socket.broadcast.emit('staff_patient_update', data);
      });

      socket.on('patient_status', (status) => {
        globalStateCache.status = status;
        socket.broadcast.emit('staff_patient_status', status);
      });

      socket.on('patient_submit', (data) => {
        globalStateCache.patientData = data;
        globalStateCache.status = 'submitted';
        globalStateCache.activeField = null;
        socket.broadcast.emit('staff_patient_submit', data);
        socket.broadcast.emit('staff_patient_status', 'submitted');
      });

      socket.on('patient_focus', (fieldId) => {
        globalStateCache.activeField = fieldId;
        socket.broadcast.emit('staff_patient_focus', fieldId);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
