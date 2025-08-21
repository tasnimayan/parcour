import { AdminSidebarNav } from "@/components/dashboard/sidebar-navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebarNav />
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}
