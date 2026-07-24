import { useSyncContext } from '@/context/SyncContext';

export function useStaffSync() {
  const {
    patientData,
    status,
    isConnected,
    activeField,
    auditLog,
    clearAuditLog,
  } = useSyncContext();

  return {
    patientData,
    status,
    isConnected,
    activeField,
    auditLog,
    clearAuditLog,
  };
}
