import { PageHeader } from "@/components/shared/page-header";
import DeliveryHistory from "@/components/agent/history/delivery-history";

export default function Page() {
  return (
    <>
      <PageHeader title="Delivery History" subtitle="Your completed deliveries and performance history" />
      <DeliveryHistory />
    </>
  );
}
