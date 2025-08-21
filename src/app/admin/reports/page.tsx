import { QuickExports } from "@/components/reports/quick-exports";
import { ReportGenerator } from "@/components/reports/report-generator";
import { PageHeader } from "@/components/admin/shared/page-header";

export default function Page() {
  return (
    <>
      <PageHeader title="Reports" subtitle="Generate and export comprehensive reports for your logistics operations" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportGenerator />
        <QuickExports />
      </div>
    </>
  );
}
