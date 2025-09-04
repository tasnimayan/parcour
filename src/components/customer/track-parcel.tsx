"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Clock, Truck, Navigation, Phone, User } from "lucide-react";
import { StatusBadge } from "../agent/parcels/status-badge";
import { useParcelTracking } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "../shared/data-states";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import LocationTracking from "../shared/location-tracking";
import Cookies from "js-cookie";

const TrackingData = ({ trackingCode }: { trackingCode: string }) => {
  const { data, isLoading, isError } = useParcelTracking(trackingCode);
  const token = Cookies.get("parcour_auth");

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data)
    return (
      <EmptyState
        title="No tracking information found"
        description="Please check your tracking number and try again."
      />
    );

  if (data?.status === "delivered")
    return (
      <Card>
        <EmptyState title="Parcel has been delivered" />
      </Card>
    );

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{data.trackingCode}</CardTitle>
            <StatusBadge status={data.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Recipient</p>
                <p className="text-sm text-muted-foreground">{data.recipientName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Current Location</p>
                <p className="text-sm text-muted-foreground">on delivery</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Est. Delivery</p>
                {data?.estimatedDeliveryDate && (
                  <p className="text-sm text-muted-foreground">{format(data?.estimatedDeliveryDate, "dd MMM yyyy")}</p>
                )}
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
            <LocationTracking parcelId={data?.id} token={token} />
          </div>
        </CardContent>
      </Card>

      {/* Agent Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Delivery Agent</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{data.agent?.fullName}</p>
                <p className="text-sm text-muted-foreground">Vehicle: {data.agent?.vehicleType}</p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Contact Agent</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TrackParcel = () => {
  const [inputValue, setInputValue] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const query = useSearchParams();
  const trackingCode = query.get("code");
  const handleTrackingNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      setTrackingNumber(inputValue.trim());
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
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
                placeholder="e.g., TRK-2025-11585722"
                value={inputValue}
                onChange={handleTrackingNumberChange}
                className="pl-10"
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button onClick={handleSearch} disabled={!inputValue.trim()}>
              Track
            </Button>
          </div>
          <span className="text-sm text-muted-foreground mt-1">TRK-2025-11585722 is a sample tracking number.</span>
        </CardContent>
      </Card>

      {/* Results */}
      <TrackingData trackingCode={trackingCode || trackingNumber} />
    </div>
  );
};

export default TrackParcel;
