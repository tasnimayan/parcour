"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, AlertCircle, TrendingUp, Truck, Clock } from "lucide-react";
import { useAgentStats } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { AgentStats } from "@/lib/agent-api";
import { StatsCard } from "./stats-card";
import { Progress } from "@/components/ui/progress";
import { AgentSchedule } from "./agent-schedule";
import { QuickActions } from "./quick-actions";

const statsMetrics = [
  {
    label: "Total Parcels",
    key: "totalParcels",
    icon: Package,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "In Transit",
    key: "totalInTransit",
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Delivered",
    key: "totalDelivered",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Failed",
    key: "totalFailed",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
];

export default function AgentDashboard() {
  const { data: stats, isLoading, isError } = useAgentStats();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!stats) return <EmptyState title="No stats found" />;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsMetrics.map(({ label, color, key, icon: Icon }) => (
          <StatsCard key={key} label={label} icon={Icon} value={stats[key as keyof AgentStats]} color={color} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Performance Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">98.5%</p>
              <p className="text-sm text-muted-foreground">On-time Delivery</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">15 min</p>
              <p className="text-sm text-muted-foreground">Avg. Delivery Time</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4.8/5</p>
              <p className="text-sm text-muted-foreground">Customer Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">156</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
              <div className="flex items-center justify-between mb-2 gap-3">
                <Progress value={stats.completionRate} />
                <span className="text-sm font-bold text-status-delivered">{stats.completionRate}%</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground">On-time Delivery</span>
              <div className="flex items-center justify-between mb-2 gap-3">
                <Progress value={stats.onTimeRate} />
                <span className="text-sm font-bold text-primary">{stats.onTimeRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <AgentSchedule />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}
