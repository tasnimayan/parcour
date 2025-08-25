import { ApiResponse, UserRole, UserStatus } from "@/types";
import Cookies from "js-cookie";
import { ParcelPriority, ParcelService, ParcelStatus } from "@/types/parcel";

export type UserData = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  profile: {
    fullName: string;
    phone: string;
  };
};

export type ParcelData = {
  id: string;
  trackingCode: string;
  customerId: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  deliveryAddress: string;
  deliveryLat: number;
  deliveryLng: number;
  parcelType: string;
  parcelSize: string;
  parcelWeight: number;
  paymentType: string;
  codAmount: number;
  status: ParcelStatus;
  createdAt: string;
  updatedAt: string;
  customer: {
    fullName: string;
    phone: string;
  };
  assignment: {
    agentId: string;
    assignedAt: string;
    agent: {
      fullName: string;
      phone: string;
    };
  } | null;
  payment: {
    amount: number;
    status: string;
    paymentType: string;
  } | null;
};

export type AgentData = {
  userId: string;
  fullName: string;
  phone: string;
  user: {
    email: string;
  };
};

export type MetaData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Get all users - admin - Ok
export const getAllUsers = async ({
  role,
  search,
  page,
  limit,
}: {
  role?: UserRole;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<UserData[]>> => {
  const params = new URLSearchParams();
  if (role) params.append("role", role);
  if (search) params.append("search", search);
  if (page && page > 0) params.append("page", page.toString());
  if (limit && limit > 0) params.append("limit", limit.toString());

  const res = await fetch(`${API_URL}/admin/users?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};

type ParcelFilters = {
  search?: string;
  status?: ParcelStatus;
  priority?: ParcelPriority;
  service?: ParcelService;
  page?: number;
  limit?: number;
};

export const getAllParcels = async ({
  search,
  status,
  priority,
  service,
  page,
  limit,
}: ParcelFilters): Promise<ApiResponse<ParcelData[]>> => {
  const params = new URLSearchParams();

  if (status) params.append("status", status);
  if (priority) params.append("priority", priority);
  if (service) params.append("service", service);
  if (search) params.append("search", search);
  if (page && page > 0) params.append("page", page.toString());
  if (limit && limit > 0) params.append("limit", limit.toString());

  const res = await fetch(`${API_URL}/parcel?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};

// Get all agents - admin - Ok
export const getAllAgents = async ({ search, page, limit }: ParcelFilters): Promise<ApiResponse<AgentData[]>> => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (page && page > 0) params.append("page", page.toString());
  if (limit && limit > 0) params.append("limit", limit.toString());

  const res = await fetch(`${API_URL}/admin/agents?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};

type AdminStatsData = {
  totalParcels: number;
  totalUsers: number;
  todayBookings: number;
  pendingParcels: number;
  assignedParcels: number;
  inTransitParcels: number;
  deliveredParcels: number;
  failedParcels: number;
};
export const getStatsCounts = async (): Promise<ApiResponse<AdminStatsData>> => {
  const res = await fetch(`${API_URL}/admin/stats/counts`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};
