export type ParcelStatus = "pending" | "picked_up" | "in_transit" | "delivered" | "failed";
export type ParcelPriority = "low" | "medium" | "high" | "urgent";
export type ParcelService = "standard" | "express" | "urgent";

export interface Parcel {
  id: string;
  trackingNumber: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: ParcelStatus;
  service: ParcelService;
  priority: ParcelPriority;
  weight: number;
  dimensions: string;
  notes?: string;
  pickupDate?: Date;
  deliveryDate?: Date;
  estimatedDelivery: Date;
  createdAt: Date;
}

export interface DeliveryStats {
  total: number;
  pending: number;
  pickedUp: number;
  inTransit: number;
  delivered: number;
  failed: number;
}
