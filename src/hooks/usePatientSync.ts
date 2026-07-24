import { useSyncContext } from '@/context/SyncContext';

export function usePatientSync() {
  const {
    isConnected,
    emitInputChange,
    emitStatusChange,
    emitSubmit,
    emitFieldFocus,
  } = useSyncContext();

  return {
    isConnected,
    emitInputChange,
    emitStatusChange,
    emitSubmit,
    emitFieldFocus,
  };
}
