import { SystemOverview } from "@/components/admin/dashboard/system-overview";
import { PageHeader } from "@/components/shared/page-header";

export default function Home() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back, Tasnim Chow! Manage your logistics operations from here." />
      <SystemOverview />
    </>
  );
}
