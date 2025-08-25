"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSystemMetrics, getDailyStats, type SystemMetrics, type DailyStats } from "@/lib/admin-data";
import { Users, Package, TrendingUp, Clock, AlertTriangle, CheckCircle, Truck, User } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { MetricCard } from "../../shared/metric-card";
import { LoadingState } from "../../shared/loading-state";
import { getStatsCounts } from "@/lib/admin-api";
import { useQuery } from "@tanstack/react-query";
import SummaryCard from "./summary-card";

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

export function SystemOverview() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [metricsData, statsData] = await Promise.all([getSystemMetrics(), getDailyStats()]);
      setMetrics(metricsData);
      setDailyStats(statsData);
    } catch (error) {
      console.error("Failed to load system data:", error);
    }
  };

  const formatChartDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["statsCounts"],
    queryFn: getStatsCounts,
    select: (data) => data.data,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <div>Error loading stats counts</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Key Metrics - Using reusable MetricCard component */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Bookings Trend</CardTitle>
            <CardDescription>Parcel bookings over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatChartDate} />
                <YAxis />
                <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
            <CardDescription>Revenue generated over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatChartDate} />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <SummaryCard />
    </div>
  );
}
