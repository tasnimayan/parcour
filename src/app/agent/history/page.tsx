import { PageHeader } from "@/components/shared/page-header";
import HistoryPage from "./history-page";

export default function Page() {
  return (
    <>
      <PageHeader title="Delivery History" subtitle="Your completed deliveries and performance history" />
      <HistoryPage />
    </>
  );
}
