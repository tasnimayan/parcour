"use client";

import { cn } from "@/lib/utils";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

interface MiniMapProps {
  lat: number;
  lng: number;
  className?: string;
  status?: string;
}

const MiniMap: React.FC<MiniMapProps> = ({ lat, lng, className, status }) => {
  return (
    <div className={cn("overflow-hidden w-full h-full", className)}>
      <MapContainer
        center={[lat, lng]}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        touchZoom={true}
        keyboard={true}
        boxZoom={true}
        zoom={14}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lat, lng]}
          icon={new Icon({ iconUrl: markerIconPng.src, iconSize: [24, 41], iconAnchor: [12, 41] })}
        >
          <Popup>{status}</Popup>
        </Marker>

        <Circle
          center={[lat, lng]}
          radius={200}
          pathOptions={{
            color: "#2563eb",
            fillColor: "#3b82f6",
            fillOpacity: 0.3,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MiniMap;
