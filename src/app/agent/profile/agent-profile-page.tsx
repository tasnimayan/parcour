"use client";

import AgentLocationSharer from "@/components/agent/profile/location-share";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Mail, Star, Package, Shield, User } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/lib/agent-api";
import { EmptyState, LoadingState } from "@/components/shared/data-states";

const useAgentProfile = () => {
  return useQuery({
    queryKey: ["AGENT_PROFILE"],
    queryFn: () => fetchProfile(),
    select: (data) => data?.data,
  });
};

export const AgentProfilePage = ({ token }: { token?: string }) => {
  const { data: agent, isLoading } = useAgentProfile();
  const [isShareLocation, setIsShareLocation] = useState(false);

  const socket = getSocket(token!);
  // Check for existing location sharing preference from cookies
  useEffect(() => {
    const locationCookie = document.cookie.split("; ").find((row) => row.startsWith("location_sharing="));
    const agentIdCookie = document.cookie.split("; ").find((row) => row.startsWith("agent_id="));

    if (locationCookie) {
      const isEnabled = locationCookie.split("=")[1] === "true";
      setIsShareLocation(isEnabled);
    }
  }, []);

  const handleLocationToggle = (enabled: boolean) => {
    setIsShareLocation(enabled);

    // Set cookie for location sharing preference
    document.cookie = `location_sharing=${enabled}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days

    if (enabled) {
      // Additional cookie with agent ID for location tracking
      document.cookie = `agent_id=${agent?.id}; path=/; max-age=${60 * 60 * 24 * 30}`;
    } else {
      socket.disconnect();
    }
  };

  if (isLoading) return <LoadingState />;
  if (!agent) return <EmptyState icon={User} title="No Agent Found" />;

  const profile = agent.profile;

  return (
    <div className="p-6 space-y-6">
      {/* {token ? <AgentLocationSharer token={token} /> : <p>Please log in to share your location.</p>} */}
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {/* <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} /> */}
              <AvatarFallback>
                {profile.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl">{profile.fullName}</CardTitle>
              </div>
              <p className="text-muted-foreground">Delivery Agent ID: {agent.id}</p>
              <div className="flex items-center space-x-1 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{profile.rating}</span>
                <span className="text-muted-foreground">({profile.totalDeliveries} deliveries)</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{agent.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
          </CardContent>
        </Card>
        {/* Location Sharing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Location Sharing</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share Current Location</p>
                <p className="text-sm text-muted-foreground">
                  Allow customers to track your location during deliveries
                </p>
              </div>
              <Switch checked={isShareLocation} onCheckedChange={handleLocationToggle} />
            </div>

            {isShareLocation && token && <AgentLocationSharer token={token} />}
          </CardContent>
        </Card>

        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Service Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Deliveries:</span>
              <span className="font-medium">{profile.totalDeliveries}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle Type:</span>
              <span className="font-medium">{profile.vehicleType}</span>
            </div>
          </CardContent>
        </Card>

        {/* License Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>License Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <span className="text-muted-foreground">License Number:</span>
              <span className="font-medium">{profile.licenseNo}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
