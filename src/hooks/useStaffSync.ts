import { useEffect, useState } from 'react';
import { initSocket } from '@/lib/sync/socketClient';
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
    initSocket().then((sock) => {
      if (!isMounted) return;
      setIsConnected(sock.connected);

      sock.on('connect', () => {
        setIsConnected(true);
        addAuditEntry({
          field: 'System',
          value: 'Socket connected to monitoring hub',
          type: 'status',
        });
      });

      sock.on('disconnect', () => {
        setIsConnected(false);
        addAuditEntry({
          field: 'System',
          value: 'Socket disconnected',
          type: 'status',
        });
      });

      sock.on('staff_patient_update', (data: PatientFormData) => {
        if (isMounted) {
          setPatientData(data);
          addAuditEntry({
            field: 'Form Data',
            value: 'Patient modified input fields',
            type: 'update',
          });
        }
      });

      sock.on('staff_patient_status', (newStatus: PatientStatus) => {
        if (isMounted) {
          setStatus((prevStatus) => {
            // Once submitted, preserve 'submitted' status unless explicit reset
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
      });

      sock.on('staff_patient_submit', (submittedData: PatientFormData) => {
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
      });

      sock.on('staff_patient_focus', (fieldId: string | null) => {
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
      });
    });

    return () => {
      isMounted = false;
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
