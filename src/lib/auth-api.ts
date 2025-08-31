import { ApiResponse, AuthUser, UserRole } from "@/types";
import Cookies from "js-cookie";
import { CustomerSignupFormData } from "./validations/customer";
import { AdminSignupFormData } from "./validations/admin";
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

export const adminSignupRequest = async (data: AdminSignupFormData): Promise<ApiResponse<AdminAuthResponse>> => {
  const res = await fetch(`${API_URL}/auth/signup/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

// modification:
export const customerSignupRequest = async (data: CustomerSignupFormData): Promise<ApiResponse<AdminAuthResponse>> => {
  const res = await fetch(`${API_URL}/auth/signup/customer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
