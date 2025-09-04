import { ApiResponse } from "@/types";
import Cookies from "js-cookie";
import { ParcelData } from "./admin-api";
import { ParcelFormValues } from "./validations/parcel";
import { calculateParcelCost } from "./utils";
import { AgentStats } from "./agent-api";
import { ParcelStatus } from "@/types/parcel";

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

interface TrackingDetails {
  id: string;
  trackingCode: string;
  status: ParcelStatus;
  pickupAddress: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  parcelType: string;
  parcelSize: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  estimatedDeliveryDate?: string | Date;
  customer: {
    fullName: string;
    phone: string;
  };
  agent: {
    fullName: string;
    phone: string;
    vehicleType: string;
    vehicleNumber: string;
  } | null;
}
export const fetchParcelByTrackingCode = async (trackingCode: string): Promise<ApiResponse<TrackingDetails>> => {
  const res = await fetch(`${API_URL}/tracking/code/${trackingCode}`, {
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
