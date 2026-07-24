import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { initSocket } from '@/lib/sync/socketClient';
import { PatientFormData, PatientStatus } from '@/types/patient';

export function usePatientSync() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;
    initSocket().then((sock) => {
      if (isMounted) {
        socketRef.current = sock;
        setIsConnected(sock.connected);

        sock.on('connect', () => setIsConnected(true));
        sock.on('disconnect', () => setIsConnected(false));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const emitInputChange = (formData: PatientFormData) => {
    if (socketRef.current) {
      socketRef.current.emit('patient_update', formData);
    }
  };

  const emitStatusChange = (status: PatientStatus) => {
    if (socketRef.current) {
      socketRef.current.emit('patient_status', status);
    }
  };

  const emitSubmit = (formData: PatientFormData) => {
    if (socketRef.current) {
      socketRef.current.emit('patient_submit', formData);
      socketRef.current.emit('patient_status', 'submitted');
    }
  };

  const emitFieldFocus = (fieldId: string | null) => {
    if (socketRef.current) {
      socketRef.current.emit('patient_focus', fieldId);
    }
  };

  return {
    isConnected,
    emitInputChange,
    emitStatusChange,
    emitSubmit,
    emitFieldFocus,
  };
}
