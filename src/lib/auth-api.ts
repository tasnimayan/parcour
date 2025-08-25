import { ApiResponse, AuthUser, UserRole } from "@/types";
import Cookies from "js-cookie";
// Mock authentication system for the courier management platform
type AdminAuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    lastLogin?: string;
    profile: {
      fullName: string;
      department: string;
      permissions: string[];
    };
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Login API fetch
export const loginRequest = async (email: string, password: string): Promise<ApiResponse<AdminAuthResponse>> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
};

export const adminSignupRequest = async (
  email: string,
  password: string,
  fullName: string,
  department: string
): Promise<ApiResponse<AdminAuthResponse>> => {
  const res = await fetch(`${API_URL}/auth/signup/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName, department }),
  });

  return await res.json();
};

type SessionResponse = Pick<AuthUser, "id" | "email" | "role"> & { fullName: string };
export const sessionRequest = async (): Promise<ApiResponse<SessionResponse>> => {
  const res = await fetch(`${API_URL}/auth/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`, //update it to dynamic session name
    },
  });

  return await res.json();
};

export const logoutRequest = async (): Promise<void> => {
  Cookies.remove("parcour_auth");
};

// Modification: Delete Mock user data
export const mockUsers = [
  {
    id: "1",
    email: "admin@gmail.com",
    name: "Admin User",
    role: "admin",
    phone: "01645800408",
  },
  {
    id: "2",
    email: "agent@gmail.com",
    name: "John Delivery",
    role: "agent",
    phone: "01752100936",
  },
  {
    id: "3",
    email: "customer@gmail.com",
    name: "Jane Customer",
    role: "customer",
    phone: "01955907174",
    address: "Mirpur 1, Dhaka-1210, Bangladesh",
  },
];
