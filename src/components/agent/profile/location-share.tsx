"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

const useLocationShare = (token: string) => {
  const socket = getSocket(token);

  useEffect(() => {
    // Connect as agent
    socket.emit("agent:connect");
    // Example: send location every 60s
    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((pos) => {
        socket.emit("agent:location-update", {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          status: "on_delivery",
        });
      });
    }, 1000 * 30);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};

export default function AgentLocationSharer({ token }: { token: string }) {
  useLocationShare(token);
  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <p className="text-sm text-green-800 font-medium">✓ Location sharing is enabled</p>
      <p className="text-xs text-green-600 mt-1">
        Your location will be shared with customers during active deliveries
      </p>
    </div>
  );
}
