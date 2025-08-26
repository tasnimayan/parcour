import { MetricCard } from "../../shared/metric-card";
import { LoadingState } from "../../shared/data-states";
import { getStatsCounts } from "@/lib/admin-api";
import { useQuery } from "@tanstack/react-query";
import { Users, Package, TrendingUp, Clock, AlertTriangle, CheckCircle, Truck, User } from "lucide-react";
import { EmptyState, ErrorState } from "@/components/shared/data-states";

const METRIC_CONFIGS = [
  {
    key: "totalUsers",
    icon: Users,
    label: "Total Users",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    key: "totalParcels",
    icon: Package,
    label: "Total Parcels",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    key: "todayBookings",
    icon: TrendingUp,
    label: "Today's Bookings",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "deliveredParcels",
    icon: CheckCircle,
    label: "Delivered Parcels",
    color: "text-green-600",
    bg: "bg-green-100",
    prefix: "$",
  },
] as const;

const STATUS_CONFIGS = [
  {
    key: "pendingParcels",
    icon: Clock,
    label: "Pending",
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  {
    key: "assignedParcels",
    icon: User,
    label: "Assigned",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    key: "inTransitParcels",
    icon: Truck,
    label: "In Transit",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "failedParcels",
    icon: AlertTriangle,
    label: "Failed",
    color: "text-red-600",
    bg: "bg-red-100",
  },
] as const;

export const AnalyticsMetrics = () => {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ADMIN", "STATS_COUNTS"],
    queryFn: getStatsCounts,
    select: (data) => data.data,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!stats) return <EmptyState title="No stats found" />;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CONFIGS.map(({ key, icon, label, color, bg }) => (
          <MetricCard key={key} icon={icon} value={stats[key]} label={label} iconColor={color} bgColor={bg} />
        ))}
      </div>

      {/* Status Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_CONFIGS.map(({ key, icon, label, color, bg }) => (
          <MetricCard key={key} icon={icon} value={stats[key]} label={label} iconColor={color} bgColor={bg} />
        ))}
      </div>
    </div>
  );
};
