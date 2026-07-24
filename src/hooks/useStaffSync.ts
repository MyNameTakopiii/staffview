import { useEffect, useState } from 'react';
import { realtimeHub } from '@/lib/sync/realtimeHub';
import { initialPatientFormData } from '@/lib/validation/patientSchema';
import { PatientFormData, PatientStatus, AuditLogEntry } from '@/types/patient';

export function useStaffSync() {
  const [patientData, setPatientData] = useState<PatientFormData>(initialPatientFormData);
  const [status, setStatus] = useState<PatientStatus>('inactive');
  const [isConnected, setIsConnected] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);

  const addAuditEntry = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString(),
    };
    setAuditLog((prev) => [newEntry, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  useEffect(() => {
    let isMounted = true;

    realtimeHub.initialize().then((mode) => {
      if (!isMounted) return;
      setIsConnected(true);

      const modeLabel =
        mode === 'pusher'
          ? 'Pusher Channels'
          : mode === 'serverless-poll'
            ? 'Serverless Event Relay'
            : 'Socket.IO Hub';

      addAuditEntry({
        field: 'System',
        value: `Connected via ${modeLabel}`,
        type: 'status',
      });
    });

    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      addAuditEntry({
        field: 'System',
        value: 'Real-time connection disconnected',
        type: 'status',
      });
    };

    const handleUpdate = (data: PatientFormData) => {
      if (isMounted) {
        setPatientData(data);
        addAuditEntry({
          field: 'Form Data',
          value: 'Patient modified input fields',
          type: 'update',
        });
      }
    };

    const handleStatus = (newStatus: PatientStatus) => {
      if (isMounted) {
        setStatus((prevStatus) => {
          if (prevStatus === 'submitted' && newStatus !== 'submitted') {
            return 'submitted';
          }
          return newStatus;
        });
        addAuditEntry({
          field: 'Status',
          value: `Patient status changed to: ${newStatus}`,
          type: 'status',
        });
      }
    };

    const handleSubmit = (submittedData: PatientFormData) => {
      if (isMounted) {
        setPatientData(submittedData);
        setStatus('submitted');
        setActiveField(null);
        addAuditEntry({
          field: 'Submission',
          value: 'Patient successfully submitted form',
          type: 'submit',
        });
      }
    };

    const handleFocus = (fieldId: string | null) => {
      if (isMounted) {
        setActiveField(fieldId);
        if (fieldId) {
          addAuditEntry({
            field: 'Input Focus',
            value: `Patient focused field: ${fieldId}`,
            type: 'focus',
          });
        }
      }
    };

    realtimeHub.on('connect', handleConnect);
    realtimeHub.on('disconnect', handleDisconnect);
    realtimeHub.on('staff_patient_update', handleUpdate);
    realtimeHub.on('staff_patient_status', handleStatus);
    realtimeHub.on('staff_patient_submit', handleSubmit);
    realtimeHub.on('staff_patient_focus', handleFocus);

    return () => {
      isMounted = false;
      realtimeHub.off('connect', handleConnect);
      realtimeHub.off('disconnect', handleDisconnect);
      realtimeHub.off('staff_patient_update', handleUpdate);
      realtimeHub.off('staff_patient_status', handleStatus);
      realtimeHub.off('staff_patient_submit', handleSubmit);
      realtimeHub.off('staff_patient_focus', handleFocus);
    };
  }, []);

  return {
    patientData,
    status,
    isConnected,
    activeField,
    auditLog,
    clearAuditLog: () => setAuditLog([]),
  };
}
