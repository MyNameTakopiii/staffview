import { useEffect, useState } from 'react';
import { realtimeHub } from '@/lib/sync/realtimeHub';
import { PatientFormData, PatientStatus } from '@/types/patient';

export function usePatientSync() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;

    realtimeHub.initialize().then(() => {
      if (isMounted) {
        setIsConnected(true);
      }
    });

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    realtimeHub.on('connect', handleConnect);
    realtimeHub.on('disconnect', handleDisconnect);

    return () => {
      isMounted = false;
      realtimeHub.off('connect', handleConnect);
      realtimeHub.off('disconnect', handleDisconnect);
    };
  }, []);

  const emitInputChange = (formData: PatientFormData) => {
    realtimeHub.emit('patient_update', formData);
  };

  const emitStatusChange = (status: PatientStatus) => {
    realtimeHub.emit('patient_status', status);
  };

  const emitSubmit = (formData: PatientFormData) => {
    realtimeHub.emit('patient_submit', formData);
    realtimeHub.emit('patient_status', 'submitted');
  };

  const emitFieldFocus = (fieldId: string | null) => {
    realtimeHub.emit('patient_focus', fieldId);
  };

  return {
    isConnected,
    emitInputChange,
    emitStatusChange,
    emitSubmit,
    emitFieldFocus,
  };
}
