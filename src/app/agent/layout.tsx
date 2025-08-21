import { AgentSidebarNav } from "@/components/dashboard/sidebar-navigation";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-background flex">
      <AgentSidebarNav />
      <main className="flex-1 flex flex-col p-6 overflow-y-auto">
        <div className="space-y-6">{children}</div>
      </main>
    </div>
  );
}
