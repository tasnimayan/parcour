// Admin-specific data management and analytics
import { mockUsers } from "./auth-api";
import { mockParcels } from "./parcel-data";

export interface SystemMetrics {
  totalUsers: number;
  totalCustomers: number;
  totalAgents: number;
  totalParcels: number;
  dailyBookings: number;
  pendingParcels: number;
  inTransitParcels: number;
  deliveredParcels: number;
  failedParcels: number;
  totalRevenue: number;
  codAmount: number;
  avgDeliveryTime: number;
}

export interface DailyStats {
  date: string;
  bookings: number;
  deliveries: number;
  revenue: number;
  failedDeliveries: number;
}

// Mock daily statistics for the last 7 days
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

// Admin functions
export const getSystemMetrics = async (): Promise<SystemMetrics> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const totalUsers = mockUsers.length;
  const totalCustomers = mockUsers.filter((u) => u.role === "customer").length;
  const totalAgents = mockUsers.filter((u) => u.role === "agent").length;
  const totalParcels = mockParcels.length;

  // Calculate today's bookings (mock)
  const today = new Date().toISOString().split("T")[0];
  const dailyBookings = mockParcels.filter((p) => p.createdAt.startsWith(today)).length || 8;

  const pendingParcels = mockParcels.filter((p) => p.status === "pending").length;
  const inTransitParcels = mockParcels.filter((p) =>
    ["picked-up", "in-transit", "out-for-delivery"].includes(p.status)
  ).length;
  const deliveredParcels = mockParcels.filter((p) => p.status === "delivered").length;
  const failedParcels = mockParcels.filter((p) => p.status === "failed").length;

  // Calculate revenue (mock calculation)
  const totalRevenue = mockParcels.reduce((sum, p) => {
    const basePrice =
      p.parcelSize === "small" ? 10 : p.parcelSize === "medium" ? 20 : p.parcelSize === "large" ? 35 : 50;
    return sum + basePrice;
  }, 0);

  const codAmount = mockParcels
    .filter((p) => p.paymentType === "cod" && p.codAmount)
    .reduce((sum, p) => sum + (p.codAmount || 0), 0);

  // Mock average delivery time (in hours)
  const avgDeliveryTime = 24;

  return {
    totalUsers,
    totalCustomers,
    totalAgents,
    totalParcels,
    dailyBookings,
    pendingParcels,
    inTransitParcels,
    deliveredParcels,
    failedParcels,
    totalRevenue,
    codAmount,
    avgDeliveryTime,
  };
};

export const getDailyStats = async (): Promise<DailyStats[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockDailyStats;
};
