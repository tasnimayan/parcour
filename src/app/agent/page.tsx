import AgentDashboard from "@/components/agent/dashboard/agent-dashboard";
import { PageHeader } from "@/components/shared/page-header";

export default function AgentHome() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Manage your deliveries and optimize your routes" />

      <AgentDashboard />
    </>
  );
}
