import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <MobileNav />
      <main className="lg:pl-60">
        <div className="max-w-4xl mx-auto px-6 py-8 pb-24 lg:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
