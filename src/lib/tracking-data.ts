// Real-time tracking and location data management
export interface LocationCoordinates {
  lat: number
  lng: number
}

export interface TrackingUpdate {
  id: string
  parcelId: string
  timestamp: string
  location: LocationCoordinates
  status: string
  message: string
  agentId?: string
}

export interface ParcelLocation {
  parcelId: string
  currentLocation: LocationCoordinates
  pickupLocation: LocationCoordinates
  deliveryLocation: LocationCoordinates
  route: LocationCoordinates[]
  estimatedArrival: string
  lastUpdate: string
}

// Mock location data for New York area
export const mockLocations = {
  // Pickup locations
  pickup1: { lat: 40.7128, lng: -74.006 }, // Manhattan
  pickup2: { lat: 40.7589, lng: -73.9851 }, // Times Square
  pickup3: { lat: 40.7505, lng: -73.9934 }, // Midtown

  // Delivery locations
  delivery1: { lat: 40.6782, lng: -73.9442 }, // Brooklyn
  delivery2: { lat: 40.7282, lng: -73.7949 }, // Queens
  delivery3: { lat: 40.8176, lng: -73.9782 }, // Bronx

  // Current agent locations
  agent1: { lat: 40.73, lng: -73.995 },
  agent2: { lat: 40.72, lng: -73.98 },
}

// Mock tracking updates
export const mockTrackingUpdates: TrackingUpdate[] = [
  {
    id: "1",
    parcelId: "1",
    timestamp: "2024-01-16T14:30:00Z",
    location: mockLocations.agent1,
    status: "in-transit",
    message: "Package is on the way to delivery location",
    agentId: "2",
  },
  {
    id: "2",
    parcelId: "1",
    timestamp: "2024-01-16T12:15:00Z",
    location: mockLocations.pickup1,
    status: "picked-up",
    message: "Package picked up from sender",
    agentId: "2",
  },
]

// Mock parcel locations
export const mockParcelLocations: ParcelLocation[] = [
  {
    parcelId: "1",
    currentLocation: mockLocations.agent1,
    pickupLocation: mockLocations.pickup1,
    deliveryLocation: mockLocations.delivery1,
    route: [
      mockLocations.pickup1,
      { lat: 40.72, lng: -73.98 },
      mockLocations.agent1,
      { lat: 40.7, lng: -73.96 },
      mockLocations.delivery1,
    ],
    estimatedArrival: "2024-01-17T16:00:00Z",
    lastUpdate: "2024-01-16T14:30:00Z",
  },
]

// Tracking functions
export const getParcelLocation = async (parcelId: string): Promise<ParcelLocation | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockParcelLocations.find((loc) => loc.parcelId === parcelId) || null
}

export const getTrackingUpdates = async (parcelId: string): Promise<TrackingUpdate[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockTrackingUpdates.filter((update) => update.parcelId === parcelId)
}

export const getLiveAgentLocation = async (agentId: string): Promise<LocationCoordinates | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Mock live location updates
  const baseLocation = agentId === "2" ? mockLocations.agent1 : mockLocations.agent2

  // Add small random variations to simulate movement
  return {
    lat: baseLocation.lat + (Math.random() - 0.5) * 0.01,
    lng: baseLocation.lng + (Math.random() - 0.5) * 0.01,
  }
}

export const calculateDistance = (loc1: LocationCoordinates, loc2: LocationCoordinates): number => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180)
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) *
      Math.cos(loc2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  }
  return `${distance.toFixed(1)}km`
}

export const getEstimatedArrival = (distance: number, avgSpeed = 30): string => {
  const hours = distance / avgSpeed
  const arrivalTime = new Date(Date.now() + hours * 60 * 60 * 1000)
  return arrivalTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
}
