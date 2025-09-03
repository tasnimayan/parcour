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
  customerId: string;
  trackingCode: string;
  pickupAddress: string;
  pickupLat: number | null;
  pickupLng: number | null;
  deliveryAddress: string;
  deliveryLat: number | null;
  deliveryLng: number | null;
  recipientName: string;
  recipientPhone: string;
  parcelSize: string;
  parcelWeight: number;
  parcelType: string;
  priorityType: ParcelPriority;
  serviceType: ParcelService;
  paymentType: string;
  codAmount: number;
  status: ParcelStatus;
  note?: string | null;
  estimatedDeliveryDate?: string | null;
  deliveredAt?: string | null;
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
  status,
  search,
  page,
  limit,
}: {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiResponse<UserData[]>> => {
  const params = new URLSearchParams();
  if (role) params.append("role", role);
  if (status) params.append("status", status);
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

export const fetchAllParcels = async ({
  search,
  status,
  priority,
  service,
  page,
  limit,
}: ParcelFilters): Promise<ApiResponse<ParcelData[]>> => {
  const params = new URLSearchParams();

  if (status) params.append("status", status);
  if (priority) params.append("priorityType", priority);
  if (service) params.append("serviceType", service);
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

export type AssignmentData = {
  id: number;
  parcelId: string;
  agentId: string;
  assignedBy: string;
  assignedAt: Date;
  agent: {
    userId: string;
    fullName: string;
  };
};

export const setAgentToParcel = async (parcelId: string, agentId: string): Promise<ApiResponse<AssignmentData>> => {
  if (!parcelId || !agentId) {
    throw new Error("Parcel ID and Agent ID are required");
  }

  const res = await fetch(`${API_URL}/admin/assign/agent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
    body: JSON.stringify({ parcelId, agentId }),
  }).then((res) => res.json());

  if (!res.success) {
    throw new Error(res.message);
  }
  return res;
};

export const updateUserStatus = async (userId: string, status: UserStatus): Promise<ApiResponse<UserData>> => {
  if (!userId || !status) {
    throw new Error("User ID and Status are required");
  }

  const res = await fetch(`${API_URL}/admin/users/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
    body: JSON.stringify({ userId, status }),
  }).then((res) => res.json());

  if (!res.success) {
    throw new Error(res.message);
  }

  return res;
};
