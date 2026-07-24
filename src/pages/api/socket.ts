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

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('*Initializing Socket.io server...');
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

      socket.on('patient_update', (data) => {
        socket.broadcast.emit('staff_patient_update', data);
      });

      socket.on('patient_status', (status) => {
        socket.broadcast.emit('staff_patient_status', status);
      });

      socket.on('patient_submit', (data) => {
        socket.broadcast.emit('staff_patient_submit', data);
      });

      socket.on('patient_focus', (fieldId) => {
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
