import { ServiceType } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ParcelCostParams {
  length: number;
  width: number;
  height: number;
  weight: number;
  serviceType: ServiceType;
}

const serviceRates: Record<ServiceType, number> = {
  standard: 50,
  express: 80,
  urgent: 120,
};
export const calculateParcelCost = ({ length, width, height, weight, serviceType }: ParcelCostParams): number => {
  const safeLength = Math.max(1, length);
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);

  const volumetricWeight = (safeLength * safeWidth * safeHeight) / 5000;
  const chargeableWeight = Math.max(weight, volumetricWeight);

  const serviceRate = serviceRates[serviceType];

  let charge = 0;

  if (chargeableWeight <= 1) {
    charge = serviceRate;
  } else if (chargeableWeight <= 5) {
    charge = serviceRate + 30;
  } else if (chargeableWeight <= 10) {
    charge = serviceRate + 60;
  } else {
    charge = serviceRate;

    // add extra charge for char above 10kg
    const extraWeight = chargeableWeight * 6;
    charge += extraWeight * serviceRate;
  }

  return Math.ceil(charge);
};
