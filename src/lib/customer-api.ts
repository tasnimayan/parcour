import { ApiResponse } from "@/types";
import Cookies from "js-cookie";
import { ParcelData } from "./admin-api";
import { ParcelFormValues } from "./validations/parcel";
import { calculateParcelCost } from "./utils";
import { AgentStats } from "./agent-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchCreateParcel = async (data: ParcelFormValues): Promise<ApiResponse<ParcelData[]>> => {
  const { length, width, height } = data.parcelSize;

  // calculate delivery charge amount
  const codAmount = calculateParcelCost({
    length,
    width,
    height,
    weight: Number(data.parcelWeight),
    serviceType: data.serviceType,
  });

  const res = await fetch(`${API_URL}/parcel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
    body: JSON.stringify({ ...data, parcelSize: `${length}x${width}x${height}`, codAmount }),
  });
  return res.json();
};

interface TrackingDetails extends Omit<ParcelData, "customer" | "assignment" | "payment"> {
  assignment: {
    id: 1;
    parcelId: string;
    agentId: string;
    assignedBy: string;
    assignedAt: string;
    agent: {
      fullName: string;
      phone: string;
      vehicleType: string;
      vehicleNumber: string;
      location: {
        latitude: number;
        longitude: number;
        status: string;
      } | null;
    };
  };
}
export const fetchParcelByTrackingCode = async (trackingCode: string): Promise<ApiResponse<TrackingDetails>> => {
  const res = await fetch(`${API_URL}/parcel/track/${trackingCode}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};

type CustomerStats = Pick<AgentStats, "totalParcels" | "totalInTransit" | "totalDelivered">;
export const fetchCustomerStats = async (): Promise<ApiResponse<CustomerStats>> => {
  const res = await fetch(`${API_URL}/parcel/customer/stats`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
  });
  return res.json();
};
