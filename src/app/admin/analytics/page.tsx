import { SystemOverview } from "@/components/admin/dashboard/system-overview";
import { PageHeader } from "@/components/shared/page-header";

export default function Page() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="View and analyze your logistics operations" />
      <SystemOverview />
    </>
  );
}
