import { ApiResponse } from "@/types";
import Cookies from "js-cookie";
import { ParcelData } from "./admin-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export type AgentStats = {
  totalParcels: number;
  totalInTransit: number;
  totalDelivered: number;
  totalFailed: number;
  onTimeRate: number;
  completionRate: number;
};

export const fetchAgentStats = async (): Promise<ApiResponse<AgentStats>> => {
  const res = await fetch(`${API_URL}/agent/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};

export const fetchParcelDetails = async (id: string): Promise<ApiResponse<ParcelData>> => {
  const res = await fetch(`${API_URL}/parcel/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};
