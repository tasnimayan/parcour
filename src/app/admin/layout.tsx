import { AdminSidebarNav } from "@/components/dashboard/sidebar-navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebarNav />
      <main className="flex-1 px-6 pt-6 pb-2 overflow-y-auto">{children}</main>
    </div>
  );
}
