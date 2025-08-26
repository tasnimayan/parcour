export type ParcelSize = "small" | "medium" | "large" | "extra_large";
export type ParcelStatus = "pending" | "assigned" | "picked_up" | "in_transit" | "delivered" | "failed";
export type PaymentType = "cod" | "prepaid";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Parcel {
  id: string;
  trackingCode: string;
  customerId: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  parcelSize: ParcelSize;
  parcelWeight: number;
  description: string;
  paymentType: PaymentType;
  codAmount?: number;
  status: ParcelStatus;
  createdAt: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  agentId?: string;
  agentName?: string;
}

// Mock parcel data
export const mockParcels: Parcel[] = [
  {
    id: "1",
    trackingCode: "CP2024001",
    customerId: "3",
    pickupAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    deliveryAddress: {
      street: "456 Oak Ave",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA",
    },
    parcelSize: "medium",
    parcelWeight: 2.5,
    description: "Electronics - Laptop",
    paymentType: "prepaid",
    status: "in_transit",
    createdAt: "2024-01-15T10:30:00Z",
    estimatedDelivery: "2024-01-17T16:00:00Z",
    agentId: "2",
    agentName: "John Delivery",
  },
  {
    id: "2",
    trackingCode: "CP2024002",
    customerId: "3",
    pickupAddress: {
      street: "789 Pine St",
      city: "Manhattan",
      state: "NY",
      zipCode: "10002",
      country: "USA",
    },
    deliveryAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    parcelSize: "small",
    parcelWeight: 0.8,
    description: "Documents",
    paymentType: "cod",
    codAmount: 50,
    status: "delivered",
    createdAt: "2024-01-10T14:20:00Z",
    estimatedDelivery: "2024-01-12T12:00:00Z",
    actualDelivery: "2024-01-12T11:45:00Z",
    agentId: "2",
    agentName: "John Delivery",
  },
  {
    id: "3",
    trackingCode: "CP2024003",
    customerId: "3",
    pickupAddress: {
      street: "321 Elm St",
      city: "Queens",
      state: "NY",
      zipCode: "11101",
      country: "USA",
    },
    deliveryAddress: {
      street: "654 Maple Dr",
      city: "Bronx",
      state: "NY",
      zipCode: "10451",
      country: "USA",
    },
    parcelSize: "large",
    parcelWeight: 5.2,
    description: "Home Appliance - Microwave",
    paymentType: "prepaid",
    status: "pending",
    createdAt: "2024-01-16T09:15:00Z",
    estimatedDelivery: "2024-01-19T15:00:00Z",
  },
];

// Mock functions for parcel operations
export const createParcel = async (
  parcelData: Omit<Parcel, "id" | "trackingNumber" | "createdAt" | "status">
): Promise<Parcel> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newParcel: Parcel = {
    ...parcelData,
    id: Date.now().toString(),
    trackingCode: `CP${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  mockParcels.push(newParcel);
  return newParcel;
};

export const getCustomerParcels = async (customerId: string): Promise<Parcel[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockParcels.filter((parcel) => parcel.customerId === customerId);
};

export const getParcelByTrackingNumber = async (trackingNumber: string): Promise<Parcel | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockParcels.find((parcel) => parcel.trackingCode === trackingNumber) || null;
};

export const getParcelSizePrice = (size: ParcelSize): number => {
  const prices = {
    small: 10,
    medium: 20,
    large: 35,
    extra_large: 50,
  };
  return prices[size];
};

export const getStatusColor = (status: ParcelStatus): string => {
  const colors = {
    pending: "text-orange-600 bg-orange-50",
    assigned: "text-yellow-600 bg-yellow-50",
    picked_up: "text-blue-600 bg-blue-50",
    in_transit: "text-purple-600 bg-purple-50",
    delivered: "text-green-600 bg-green-50",
    failed: "text-red-600 bg-red-50",
  };
  return colors[status];
};

export const formatStatus = (status: ParcelStatus): string => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Agent-specific functions and route optimization
export const getAgentParcels = async (agentId: string): Promise<Parcel[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return mockParcels.filter((parcel) => parcel.agentId === agentId);
};

export const updateParcelStatus = async (parcelId: string, status: ParcelStatus, agentId: string): Promise<Parcel> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const parcelIndex = mockParcels.findIndex((p) => p.id === parcelId);
  if (parcelIndex === -1) {
    throw new Error("Parcel not found");
  }

  const parcel = mockParcels[parcelIndex];
  if (parcel.agentId !== agentId) {
    throw new Error("Unauthorized to update this parcel");
  }

  // Update status and set delivery time if delivered
  mockParcels[parcelIndex] = {
    ...parcel,
    status,
    actualDelivery: status === "delivered" ? new Date().toISOString() : parcel.actualDelivery,
  };

  return mockParcels[parcelIndex];
};

export const assignParcelToAgent = async (parcelId: string, agentId: string, agentName: string): Promise<Parcel> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const parcelIndex = mockParcels.findIndex((p) => p.id === parcelId);
  if (parcelIndex === -1) {
    throw new Error("Parcel not found");
  }

  mockParcels[parcelIndex] = {
    ...mockParcels[parcelIndex],
    agentId,
    agentName,
  };

  return mockParcels[parcelIndex];
};

// Mock route optimization data
export interface RouteStop {
  id: string;
  address: Address;
  type: "pickup" | "delivery";
  parcelId: string;
  estimatedTime: string;
  completed: boolean;
}

export const getOptimizedRoute = async (agentId: string): Promise<RouteStop[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const agentParcels = mockParcels.filter(
    (p) => p.agentId === agentId && p.status !== "delivered" && p.status !== "failed"
  );

  const stops: RouteStop[] = [];

  // Add pickup stops for pending parcels
  agentParcels
    .filter((p) => p.status === "pending")
    .forEach((parcel) => {
      stops.push({
        id: `pickup-${parcel.id}`,
        address: parcel.pickupAddress,
        type: "pickup",
        parcelId: parcel.id,
        estimatedTime: "09:00 AM",
        completed: false,
      });
    });

  // Add delivery stops for picked up parcels
  agentParcels
    .filter((p) => p.status === "picked_up" || p.status === "in_transit" || p.status === "pending")
    .forEach((parcel) => {
      stops.push({
        id: `delivery-${parcel.id}`,
        address: parcel.deliveryAddress,
        type: "delivery",
        parcelId: parcel.id,
        estimatedTime: "02:00 PM",
        completed: false,
      });
    });

  return stops;
};

export const getAgentStats = async (agentId: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const agentParcels = mockParcels.filter((p) => p.agentId === agentId);

  return {
    totalAssigned: agentParcels.length,
    pending: agentParcels.filter((p) => p.status === "pending").length,
    inProgress: agentParcels.filter((p) => ["picked-up", "in-transit", "out-for-delivery"].includes(p.status)).length,
    delivered: agentParcels.filter((p) => p.status === "delivered").length,
    failed: agentParcels.filter((p) => p.status === "failed").length,
  };
};
