"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Clock, CheckCircle, Package, Truck, Navigation, Phone, User } from "lucide-react";
import { ParcelStatus } from "@/types/parcel";
import { StatusBadge } from "../agent/parcels/status-badge";

// Dummy tracking data
const trackingData = {
  "TRK-2024-001234": {
    id: "PKG001234",
    trackingNumber: "TRK-2024-001234",
    status: "In Transit" as ParcelStatus,
    recipientName: "Jane Smith",
    recipientPhone: "+1 (555) 987-6543",
    currentLocation: "Distribution Center, Brooklyn, NY",
    estimatedDelivery: new Date("2024-01-25T14:30:00"),
    driver: {
      name: "Mike Johnson",
      phone: "+1 (555) 123-4567",
      vehicle: "VAN-001",
    },
    timeline: [
      {
        status: "Package Picked Up",
        location: "123 Main St, New York, NY",
        timestamp: new Date("2024-01-20T09:30:00"),
        completed: true,
      },
      {
        status: "In Transit to Hub",
        location: "NYC Distribution Center",
        timestamp: new Date("2024-01-20T12:15:00"),
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Brooklyn Distribution Center",
        timestamp: new Date("2024-01-25T08:00:00"),
        completed: true,
      },
      {
        status: "Delivered",
        location: "456 Oak Ave, Brooklyn, NY",
        timestamp: new Date("2024-01-25T14:30:00"),
        completed: false,
      },
    ],
  },
};

const TrackParcel = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchResult, setSearchResult] = useState<(typeof trackingData)["TRK-2024-001234"] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = trackingData[trackingNumber as keyof typeof trackingData];
    setSearchResult(result || null);
    setIsSearching(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Navigation className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Track Your Parcel</h1>
          <p className="text-muted-foreground">Enter your tracking number to see real-time updates</p>
        </div>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Tracking Number</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="e.g., TRK-2024-001234"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={!trackingNumber.trim() || isSearching}>
              {isSearching ? "Searching..." : "Track"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Try: TRK-2024-001234 for demo data</p>
        </CardContent>
      </Card>

      {/* Results */}
      {searchResult ? (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{searchResult.trackingNumber}</CardTitle>
                <StatusBadge status={searchResult.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Recipient</p>
                    <p className="text-sm text-muted-foreground">{searchResult.recipientName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Current Location</p>
                    <p className="text-sm text-muted-foreground">{searchResult.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Est. Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      {searchResult.estimatedDelivery.toLocaleDateString()} at{" "}
                      {searchResult.estimatedDelivery.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Live Tracking</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-80 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-lg font-medium text-muted-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Real-time GPS tracking would be displayed here showing the exact location of your parcel and
                    delivery route.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Driver Info */}
          {searchResult.driver && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Delivery Driver</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{searchResult.driver.name}</p>
                      <p className="text-sm text-muted-foreground">Vehicle: {searchResult.driver.vehicle}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Contact Driver</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResult.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full ${event.completed ? "bg-primary" : "bg-muted"}`}>
                        {event.completed ? (
                          <CheckCircle className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      {index < searchResult.timeline.length - 1 && (
                        <div className={`w-px h-8 ${event.completed ? "bg-primary" : "bg-muted"}`} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${event.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {event.status}
                        </p>
                        <Badge variant={event.completed ? "default" : "secondary"}>
                          {event.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      <p className="text-xs text-muted-foreground">{event.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : trackingNumber && !isSearching ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No tracking information found</h3>
            <p className="text-muted-foreground">
              Please check your tracking number and try again. Make sure you&apos;ve entered it correctly.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default TrackParcel;
