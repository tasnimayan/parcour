import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { useState, useEffect } from "react";

export const Charts = () => {
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const statsData = await getDailyStats();
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

  return (
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
  );
};

export interface DailyStats {
  date: string;
  bookings: number;
  deliveries: number;
  revenue: number;
  failedDeliveries: number;
}

export const mockDailyStats: DailyStats[] = [
  {
    date: "2024-01-10",
    bookings: 15,
    deliveries: 12,
    revenue: 340,
    failedDeliveries: 1,
  },
  {
    date: "2024-01-11",
    bookings: 18,
    deliveries: 16,
    revenue: 420,
    failedDeliveries: 0,
  },
  {
    date: "2024-01-12",
    bookings: 22,
    deliveries: 19,
    revenue: 510,
    failedDeliveries: 2,
  },
  {
    date: "2024-01-13",
    bookings: 20,
    deliveries: 18,
    revenue: 480,
    failedDeliveries: 1,
  },
  {
    date: "2024-01-14",
    bookings: 25,
    deliveries: 22,
    revenue: 590,
    failedDeliveries: 1,
  },
  {
    date: "2024-01-15",
    bookings: 28,
    deliveries: 24,
    revenue: 650,
    failedDeliveries: 3,
  },
  {
    date: "2024-01-16",
    bookings: 30,
    deliveries: 26,
    revenue: 720,
    failedDeliveries: 2,
  },
];

export const getDailyStats = async (): Promise<DailyStats[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockDailyStats;
};
