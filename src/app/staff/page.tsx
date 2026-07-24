import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { StaffViewContainer } from '@/components/staff/StaffViewContainer';

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-main text-text-main flex flex-col transition-colors duration-200">
      <Header
        title="Staff Monitoring Terminal"
        subtitle="Live Patient Input Feed"
        activeNav="staff"
      />
      <main className="flex-1">
        <StaffViewContainer />
      </main>
      <Footer />
    </div>
  );
}
