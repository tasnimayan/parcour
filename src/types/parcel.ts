export type ParcelStatus = "pending" | "picked_up" | "in_transit" | "delivered" | "failed";
export type ParcelPriority = "low" | "medium" | "high" | "urgent";
export type ParcelService = "standard" | "express" | "urgent";

export interface Parcel {
  id: string;
  customerId?: string;
  trackingCode: string;
  recipientName: string;
  recipientPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  status: ParcelStatus;
  service: ParcelService;
  priority: ParcelPriority;
  parcelType: string;
  parcelWeight: number;
  parcelSize: string;
  notes?: string;
  pickedAt?: Date | string;
  paymentType?: string;
  codAmount?: number;
  deliveryDate?: Date | string;
  deliveredAt?: Date | string;
  estimatedDelivery?: Date | string;
  createdAt: Date | string;
}

export interface DeliveryStats {
  total: number;
  pending: number;
  pickedUp: number;
  inTransit: number;
  delivered: number;
  failed: number;
}
