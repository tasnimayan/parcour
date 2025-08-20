import { AgentSidebarNav } from "@/components/dashboard/sidebar-navigation";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <AgentSidebarNav />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
