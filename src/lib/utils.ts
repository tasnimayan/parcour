import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ParcelCostParams {
  size: string;
  weight: number;
  serviceType: string;
}

export const calculateParcelCost = ({ size, weight, serviceType }: ParcelCostParams): number => {
  // Base cost based on size
  const sizeCosts: Record<string, number> = {
    small: 70,
    medium: 100,
    large: 150,
    xlarge: 200,
  };

  // Service type surcharges
  const serviceSurcharges: Record<string, number> = {
    standard: 0,
    express: 50,
    urgent: 100,
  };

  const baseCost = sizeCosts[size.toLowerCase()] || 70;
  const weightCost = Number(weight) * 0.5; // 0.5 per unit weight
  const serviceSurcharge = serviceSurcharges[serviceType.toLowerCase()] || 0;

  return Math.round(baseCost + weightCost + serviceSurcharge);
};
