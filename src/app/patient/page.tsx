import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { PatientFormContainer } from '@/components/patient/PatientFormContainer';

export default function PatientPage() {
  return (
    <div className="min-h-screen bg-main text-text-main flex flex-col transition-colors duration-200">
      <Header
        title="Patient Intake Portal"
        subtitle="Step 1: Patient Information Entry"
        activeNav="patient"
      />
      <main className="flex-1">
        <PatientFormContainer />
      </main>
      <Footer />
    </div>
  );
}
