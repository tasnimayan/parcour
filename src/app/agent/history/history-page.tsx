import DeliveryHistory from "@/components/agent/history/delivery-history";
import { DeliveryStats } from "@/components/agent/history/delivery-stats";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <DeliveryStats />

      <DeliveryHistory />
    </div>
  );
}
