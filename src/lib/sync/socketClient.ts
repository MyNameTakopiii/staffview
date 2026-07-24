import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = async (): Promise<Socket> => {
  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!socketUrl) {
      await fetch('/api/socket');
    }
    socket = io(socketUrl || undefined, {
      path: '/api/socket',
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;



