"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getSystemMetrics,
  getDailyStats,
  type SystemMetrics,
  type DailyStats,
} from "@/lib/admin-data";
import {
  Users,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Truck,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { MetricCard } from "../shared/metric-card";
import { LoadingState } from "../shared/loading-state";

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
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    key: "totalRevenue",
    icon: DollarSign,
    label: "Total Revenue",
    color: "text-green-600",
    bg: "bg-green-100",
    prefix: "$",
  },
  {
    key: "dailyBookings",
    icon: TrendingUp,
    label: "Today's Bookings",
    color: "text-blue-600",
    bg: "bg-blue-100",
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
    key: "inTransitParcels",
    icon: Truck,
    label: "In Transit",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    key: "deliveredParcels",
    icon: CheckCircle,
    label: "Delivered",
    color: "text-green-600",
    bg: "bg-green-100",
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [metricsData, statsData] = await Promise.all([
        getSystemMetrics(),
        getDailyStats(),
      ]);
      setMetrics(metricsData);
      setDailyStats(statsData);
    } catch (error) {
      console.error("Failed to load system data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatChartDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  const calculateSuccessRate = () =>
    metrics
      ? Math.round((metrics.deliveredParcels / metrics.totalParcels) * 100)
      : 0;

  const calculateFailureRate = () =>
    metrics
      ? Math.round((metrics.failedParcels / metrics.totalParcels) * 100)
      : 0;

  const calculateAvgOrderValue = () =>
    metrics ? Math.round(metrics.totalRevenue / metrics.totalParcels) : 0;

  if (loading || !metrics) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics - Using reusable MetricCard component */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRIC_CONFIGS.map(({ key, icon, label, color, bg, prefix = "" }) => (
          <MetricCard
            key={key}
            icon={icon}
            value={`${prefix}${metrics[key as keyof SystemMetrics]}`}
            label={label}
            iconColor={color}
            bgColor={bg}
          />
        ))}
      </div>

      {/* Status Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_CONFIGS.map(({ key, icon, label, color, bg }) => (
          <MetricCard
            key={key}
            icon={icon}
            value={metrics[key as keyof SystemMetrics]}
            label={label}
            iconColor={color}
            bgColor={bg}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Bookings Trend</CardTitle>
            <CardDescription>
              Parcel bookings over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatChartDate} />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Revenue</CardTitle>
            <CardDescription>
              Revenue generated over the last 7 days
            </CardDescription>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Customers</span>
                <span className="font-medium">{metrics.totalCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Delivery Agents</span>
                <span className="font-medium">{metrics.totalAgents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Admins</span>
                <span className="font-medium">
                  {metrics.totalUsers -
                    metrics.totalCustomers -
                    metrics.totalAgents}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Revenue</span>
                <span className="font-medium">${metrics.totalRevenue}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">COD Amount</span>
                <span className="font-medium">${metrics.codAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Order Value</span>
                <span className="font-medium">${calculateAvgOrderValue()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <span className="font-medium">{calculateSuccessRate()}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg. Delivery Time</span>
                <span className="font-medium">{metrics.avgDeliveryTime}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failure Rate</span>
                <span className="font-medium text-red-600">
                  {calculateFailureRate()}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
