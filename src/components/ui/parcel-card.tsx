"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatStatus, getStatusColor, type ParcelStatus } from "@/lib/parcel-data";
import { Parcel } from "@/types/parcel";
import {
  Package,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Navigation,
} from "lucide-react";

interface ParcelCardProps {
  parcel: Parcel;
  variant?: "customer" | "agent" | "admin" | "tracker";
  onStatusUpdate?: (parcelId: string, status: ParcelStatus) => void;
  onAssign?: (parcelId: string, agentId: string) => void;
  isUpdating?: boolean;
  showActions?: boolean;
  className?: string;
}

export function ParcelCard({
  parcel,
  variant = "customer",
  onStatusUpdate,
  // onAssign,
  isUpdating = false,
  showActions = true,
  className = "",
}: ParcelCardProps) {
  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: ParcelStatus) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "picked_up":
        return <Package className="w-4 h-4 text-blue-600" />;
      case "in_transit":
        return <Navigation className="w-4 h-4 text-purple-600" />;
      case "pending":
        return <Truck className="w-4 h-4 text-orange-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNextStatuses = (currentStatus: ParcelStatus): ParcelStatus[] => {
    switch (currentStatus) {
      case "pending":
        return ["assigned"];
      case "assigned":
        return ["picked_up"];
      case "picked_up":
        return ["in_transit", "failed"];
      case "in_transit":
        return ["delivered", "failed"];
      default:
        return [];
    }
  };

  return (
    <Card
      className={`group hover:shadow-md transition-all duration-200 border-l-4 ${
        parcel.status === "delivered"
          ? "border-l-green-500"
          : parcel.status === "failed"
          ? "border-l-red-500"
          : parcel.status === "in_transit"
          ? "border-l-purple-500"
          : parcel.status === "pending"
          ? "border-l-orange-500"
          : parcel.status === "picked_up"
          ? "border-l-blue-500"
          : "border-l-yellow-500"
      } ${className}`}
    >
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50">{getStatusIcon(parcel.status)}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{parcel.trackingCode}</h3>
                <Badge className={`${getStatusColor(parcel.status)} font-medium`}>{formatStatus(parcel.status)}</Badge>
              </div>
              {/* <p className="text-sm text-muted-foreground font-medium">{parcel.description}</p> */}
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">Created</span>
            </div>
            <span>{formatDate(parcel.createdAt)}</span>
          </div>
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <div className="p-1 rounded bg-accent/10">
                <MapPin className="w-3 h-3" />
              </div>
              Pickup Location
            </div>
            <p className="text-sm text-muted-foreground pl-6 leading-relaxed">{parcel.pickupAddress}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <div className="p-1 rounded bg-primary/10">
                <MapPin className="w-3 h-3" />
              </div>
              Delivery Location
            </div>
            <p className="text-sm text-muted-foreground pl-6 leading-relaxed">{parcel.deliveryAddress}</p>
          </div>
        </div>

        {/* Package Details */}
        <div className="flex flex-wrap gap-4 mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium capitalize">{parcel.parcelSize}</span>
            <span className="text-muted-foreground">({parcel.parcelWeight}kg)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium capitalize">{parcel.paymentType}</span>
            {parcel.codAmount && <span className="text-green-600 font-semibold">${parcel.codAmount}</span>}
          </div>
          {/* {parcel.agentId && (
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{parcel.agentId}</span>
            </div>
          )} */}
        </div>

        {/* Timeline Section */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Est. Delivery:</span>
            <span className="font-medium">{parcel.estimatedDelivery && formatDate(parcel.estimatedDelivery)}</span>
          </div>
          {parcel.deliveredAt && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-muted-foreground">Delivered:</span>
              <span className="text-green-600 font-semibold">{formatDate(parcel.deliveredAt)}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && variant === "agent" && getNextStatuses(parcel.status).length > 0 && (
          <div className="flex items-center gap-2 pt-4 border-t">
            <span className="text-sm font-medium text-muted-foreground">Update Status:</span>
            <div className="flex gap-2">
              {getNextStatuses(parcel.status).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={status === "failed" ? "destructive" : "default"}
                  onClick={() => onStatusUpdate?.(parcel.id, status)}
                  disabled={isUpdating}
                  className="text-xs"
                >
                  {formatStatus(status)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
