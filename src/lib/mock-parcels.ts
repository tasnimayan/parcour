export interface Parcel {
  id: string;
  trackingNumber: string;
  sender: {
    name: string;
    address: string;
    phone: string;
  };
  recipient: {
    name: string;
    address: string;
    phone: string;
  };
  status: "pending" | "in_transit" | "delivered" | "failed" | "returned";
  priority: "low" | "medium" | "high" | "urgent";
  weight: number;
  dimensions: string;
  service: "standard" | "express" | "overnight" | "same_day";
  assignedAgent?: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  estimatedDelivery: string;
  value: number;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  status: "available" | "busy" | "offline";
  activeDeliveries: number;
  completedDeliveries: number;
  rating: number;
}

export const mockParcels: Parcel[] = [
  {
    id: "1",
    trackingNumber: "CL001234567",
    sender: {
      name: "John Smith",
      address: "123 Main St, New York, NY 10001",
      phone: "+1-555-0123",
    },
    recipient: {
      name: "Sarah Johnson",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      phone: "+1-555-0456",
    },
    status: "pending",
    priority: "high",
    weight: 2.5,
    dimensions: "30x20x15 cm",
    service: "express",
    createdAt: "2024-01-15T08:30:00Z",
    estimatedDelivery: "2024-01-16T16:00:00Z",
    value: 150.0,
  },
  {
    id: "2",
    trackingNumber: "CL001234568",
    sender: {
      name: "Michael Brown",
      address: "789 Pine St, Chicago, IL 60601",
      phone: "+1-555-0789",
    },
    recipient: {
      name: "Emily Davis",
      address: "321 Elm St, Houston, TX 77001",
      phone: "+1-555-0321",
    },
    status: "in_transit",
    priority: "medium",
    weight: 1.2,
    dimensions: "25x15x10 cm",
    service: "standard",
    assignedAgent: {
      id: "1",
      name: "Alex Rivera",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-14T10:15:00Z",
    estimatedDelivery: "2024-01-17T14:00:00Z",
    value: 75.5,
  },
  {
    id: "3",
    trackingNumber: "CL001234569",
    sender: {
      name: "Lisa Wilson",
      address: "654 Maple Ave, Phoenix, AZ 85001",
      phone: "+1-555-0654",
    },
    recipient: {
      name: "David Miller",
      address: "987 Cedar St, Philadelphia, PA 19101",
      phone: "+1-555-0987",
    },
    status: "delivered",
    priority: "low",
    weight: 0.8,
    dimensions: "20x15x8 cm",
    service: "standard",
    assignedAgent: {
      id: "2",
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-12T14:20:00Z",
    estimatedDelivery: "2024-01-15T12:00:00Z",
    value: 45.0,
  },
  {
    id: "4",
    trackingNumber: "CL001234570",
    sender: {
      name: "Robert Taylor",
      address: "147 Birch St, Denver, CO 80201",
      phone: "+1-555-0147",
    },
    recipient: {
      name: "Jennifer Clark",
      address: "258 Spruce St, Seattle, WA 98101",
      phone: "+1-555-0258",
    },
    status: "pending",
    priority: "urgent",
    weight: 5.0,
    dimensions: "40x30x25 cm",
    service: "same_day",
    createdAt: "2024-01-15T12:45:00Z",
    estimatedDelivery: "2024-01-15T18:00:00Z",
    value: 300.0,
  },
  {
    id: "5",
    trackingNumber: "CL001234571",
    sender: {
      name: "Amanda Rodriguez",
      address: "369 Walnut St, Miami, FL 33101",
      phone: "+1-555-0369",
    },
    recipient: {
      name: "Kevin Lee",
      address: "741 Ash St, Boston, MA 02101",
      phone: "+1-555-0741",
    },
    status: "failed",
    priority: "medium",
    weight: 1.8,
    dimensions: "28x18x12 cm",
    service: "express",
    assignedAgent: {
      id: "3",
      name: "James Thompson",
      avatar: "/placeholder.svg",
    },
    createdAt: "2024-01-13T16:30:00Z",
    estimatedDelivery: "2024-01-14T10:00:00Z",
    value: 120.0,
  },
];

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.rivera@courierlogistics.com",
    phone: "+1-555-1001",
    avatar: "/placeholder.svg",
    status: "available",
    activeDeliveries: 3,
    completedDeliveries: 156,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@courierlogistics.com",
    phone: "+1-555-1002",
    avatar: "/placeholder.svg",
    status: "busy",
    activeDeliveries: 5,
    completedDeliveries: 203,
    rating: 4.9,
  },
  {
    id: "3",
    name: "James Thompson",
    email: "james.thompson@courierlogistics.com",
    phone: "+1-555-1003",
    avatar: "/placeholder.svg",
    status: "available",
    activeDeliveries: 2,
    completedDeliveries: 89,
    rating: 4.6,
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.chen@courierlogistics.com",
    phone: "+1-555-1004",
    avatar: "/placeholder.svg",
    status: "offline",
    activeDeliveries: 0,
    completedDeliveries: 178,
    rating: 4.7,
  },
  {
    id: "5",
    name: "David Johnson",
    email: "david.johnson@courierlogistics.com",
    phone: "+1-555-1005",
    avatar: "/placeholder.svg",
    status: "available",
    activeDeliveries: 1,
    completedDeliveries: 134,
    rating: 4.5,
  },
];
