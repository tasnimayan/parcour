"use client";

import { LoadingState } from "../../shared/data-states";
import { Package, XCircle, CheckCircle, TrendingUp } from "lucide-react";
import { EmptyState, ErrorState } from "@/components/shared/data-states";
import { useAgentStats } from "@/hooks/use-parcels";
import { StatsCard } from "../dashboard/stats-card";
import { AgentStats } from "@/lib/agent-api";

const METRIC_CONFIGS = [
  {
    key: "totalParcels",
    icon: Package,
    label: "Total Deliveries",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "totalDelivered",
    icon: CheckCircle,
    label: "Successful",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    key: "totalFailed",
    icon: XCircle,
    label: "Failed",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    key: "onTimeRate",
    icon: TrendingUp,
    label: "On Time Rate",
    color: "text-blue-600",
    bg: "bg-blue-100",
    prefix: "%",
  },
] as const;

export const DeliveryStats = () => {
  const { data: stats, isLoading, isError } = useAgentStats();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!stats) return <EmptyState title="No stats found" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {METRIC_CONFIGS.map(({ key, icon: Icon, label, color }) => (
          <StatsCard key={key} label={label} icon={Icon} value={stats[key as keyof AgentStats]} color={color} />
        ))}
      </div>
    </div>
  );
};
