import { Navbar } from '@/components/feed/Navbar';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-primary-light/20">
      <Navbar />
      <main className="pb-24 md:pb-0">{children}</main>
    </div>
  );
}
