"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";
const MiniMap = dynamic(() => import("./map-location"), { ssr: false });
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

interface AgentLocation {
  latitude: number;
  longitude: number;
  status: string;
}

export default function LocationTracking({ parcelId, token }: { parcelId: string; token?: string }) {
  const [agentLocation, setAgentLocation] = useState<AgentLocation | null>(null);
  const socket = getSocket(token!);

  useEffect(() => {
    // Request tracking for parcel
    socket.emit("customer:track-parcel", parcelId);

    // Listen for location updates
    socket.on("parcel:location-update", (data) => {
      setAgentLocation(data.agentLocation);
    });

    return () => {
      socket.off("parcel:location-update");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelId, token]);

  if (!agentLocation) {
    return (
      <div className="text-center space-y-2">
        <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="text-lg font-medium text-muted-foreground">Interactive Map</p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Real-time GPS tracking would be displayed here if the parcel is in transit or the agent is on the way to
          deliver the parcel.
        </p>
      </div>
    );
  }

  return (
    <MiniMap
      lat={Number(agentLocation?.latitude)}
      lng={Number(agentLocation?.longitude)}
      status={agentLocation?.status}
    />
  );
}
