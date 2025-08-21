"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Route, Clock, Fuel, Navigation, RotateCcw, Play } from "lucide-react";

interface RouteStop {
  id: string;
  address: string;
  parcelCount: number;
  estimatedTime: string;
  priority: "Standard" | "Express" | "Urgent";
}

export default function RouteOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [route, setRoute] = useState<RouteStop[]>(mockRoute);
  const [routeStats] = useState({
    totalDistance: "47.2 km",
    estimatedTime: "4h 15m",
    fuelCost: "$18.50",
    totalStops: route.length,
  });

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true);
    // Simulate API call
    setTimeout(() => {
      setIsOptimizing(false);
      // In real app, this would update with optimized route
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-status-failed text-status-failed-foreground";
      case "Express":
        return "bg-status-transit text-status-transit-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Route Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Total Distance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{routeStats.totalDistance}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Estimated Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{routeStats.estimatedTime}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Fuel className="h-4 w-4" />
              <span>Fuel Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{routeStats.fuelCost}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Total Stops</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{routeStats.totalStops}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Steps */}
        <div className="lg:col-span-2">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Route className="h-5 w-5 text-primary" />
                <span>Optimized Route</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {route.map((stop, index) => (
                  <div key={stop.id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {index + 1}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-foreground truncate">{stop.address}</h3>
                        <Badge className={getPriorityColor(stop.priority)}>{stop.priority}</Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{stop.estimatedTime}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>
                            {stop.parcelCount} parcel{stop.parcelCount !== 1 ? "s" : ""}
                          </span>
                        </span>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm">
                      <Navigation className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder & Actions */}
        <div className="space-y-6">
          {/* Map Placeholder */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Interactive map view</p>
                  <p className="text-xs">Google Maps integration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Start Navigation
              </Button>

              <Button className="w-full justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Export to GPS
              </Button>

              <Button className="w-full justify-start" variant="outline">
                <Route className="h-4 w-4 mr-2" />
                Share Route
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Mock route data
const mockRoute: RouteStop[] = [
  {
    id: "1",
    address: "123 Business Ave, Downtown",
    parcelCount: 3,
    estimatedTime: "10:30 AM",
    priority: "Express",
  },
  {
    id: "2",
    address: "789 Corporate Plaza, Business District",
    parcelCount: 1,
    estimatedTime: "11:15 AM",
    priority: "Standard",
  },
  {
    id: "3",
    address: "456 Elm Street, Residential Area",
    parcelCount: 2,
    estimatedTime: "12:00 PM",
    priority: "Urgent",
  },
  {
    id: "4",
    address: "321 Oak Avenue, Suburb",
    parcelCount: 1,
    estimatedTime: "12:45 PM",
    priority: "Standard",
  },
  {
    id: "5",
    address: "789 Pine Street, City Center",
    parcelCount: 4,
    estimatedTime: "2:30 PM",
    priority: "Express",
  },
];
