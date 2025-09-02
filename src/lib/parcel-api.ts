import { ApiResponse } from "@/types";
import Cookies from "js-cookie";
import { ParcelData } from "./admin-api";
import { ParcelStatus } from "@/types/parcel";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUpdateParcelStatus = async (
  parcelId: string,
  status: ParcelStatus,
  note?: string
): Promise<ApiResponse<ParcelData[]>> => {
  const res = await fetch(`${API_URL}/parcel/${parcelId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("parcour_auth")}`,
    },
    body: JSON.stringify({ status, note }),
  }).then((res) => res.json());

  if (!res.success) {
    throw new Error(res.message);
  }
  return res;
};
