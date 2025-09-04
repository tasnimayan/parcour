export type AgentProfile = {
  id: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  profile: {
    userId: string;
    fullName: string;
    phone: string;
    altPhone: string | null;
    emailVerified: boolean;
    governmentId: string | null;
    dob: string | null;
    profilePhoto: string | null;
    vehicleType: string;
    vehicleNumber: string | null;
    licenseNo: string | null;
    employmentType: string;
    availability: boolean;
    rating: string;
    totalDeliveries: number;
    lastActive: string;
    createdAt: string;
    updatedAt: string;
    location: {
      agentId: string;
      latitude: string;
      longitude: string;
      updatedAt: string;
      status: string;
    };
    locationStatus: string;
  };
};
