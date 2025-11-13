import { Navbar } from '@/components/feed/Navbar';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary-light/20">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
