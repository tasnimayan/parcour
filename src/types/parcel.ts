export type ParcelStatus = "pending" | "picked_up" | "assigned" | "in_transit" | "delivered" | "failed";
// pending           // Created, waiting for assignment
// pickup_assigned   // Pickup agent assigned
// picked_up         // Pickup completed
// at_hub            // Arrived at hub/warehouse
// routing           // Being sorted/routed to next hub/agent
// delivery_assigned // Delivery agent assigned
// in_transit        // Out for delivery
// delivered         // Successfully delivered
// failed            // Delivery failed (could have failure reason)
// returned          // Returned to sender/customer
// canceled          // Canceled before fulfillment
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
