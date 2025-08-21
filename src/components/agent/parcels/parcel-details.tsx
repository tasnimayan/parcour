"use client";

import { useState } from "react";
import { Parcel, ParcelStatus } from "@/types/parcel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Phone, Clock, Weight, Ruler, Save, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { StatusBadge } from "./status-badge";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";

// Mock data - in real app this would come from an API
const mockParcel: Parcel = {
  id: "1",
  trackingNumber: "TRK001234",
  recipientName: "John Smith",
  recipientPhone: "+1 (555) 123-4567",
  pickupAddress: "123 Business Ave, Downtown, City 12345",
  deliveryAddress: "456 Elm Street, Residential Area, City 67890",
  status: "In Transit" as ParcelStatus,
  priority: "urgent",
  service: "express",
  weight: 2.5,
  dimensions: "30x20x15 cm",
  notes: "Fragile - Handle with care. Ring doorbell twice.",
  estimatedDelivery: new Date("2024-01-15T14:00:00"),
  createdAt: new Date("2024-01-14T09:00:00"),
  pickupDate: new Date("2024-01-15T10:30:00"),
};

const ParcelDetails = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel>(mockParcel);
  const [newStatus, setNewStatus] = useState<ParcelStatus>(parcel.status);
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const handleStatusUpdate = () => {
    setParcel((prev) => ({ ...prev, status: newStatus }));
    toast("Status Updated");
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "express":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <>
            <Package className="h-8 w-8 text-primary" /> {parcel.trackingNumber}
          </>
        }
        subtitle="Parcel Details & Status Management"
      >
        <div className="flex items-center space-x-3">
          <Badge className="rounded-full" variant={getPriorityVariant(parcel.priority)}>
            {parcel.priority}
          </Badge>
          <StatusBadge className="rounded-full" status={parcel.status} />
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recipient Information */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>Recipient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Name</label>
                <p className="text-lg font-semibold text-foreground">{parcel.recipientName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="text-foreground">{parcel.recipientPhone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Addresses</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <label className="text-sm font-medium text-muted-foreground">Pickup Address</label>
                <p className="text-foreground mt-1">{parcel.pickupAddress}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <label className="text-sm font-medium text-muted-foreground">Delivery Address</label>
                <p className="text-foreground mt-1 font-medium">{parcel.deliveryAddress}</p>
              </div>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span>Package Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Weight className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-semibold text-foreground">{parcel.weight} kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Dimensions</p>
                  <p className="font-semibold text-foreground">{parcel.dimensions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Notes */}
          {parcel.notes && (
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <span>Special Instructions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-foreground">{parcel.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Status Management Sidebar */}
        <div className="space-y-6">
          {/* Status Update */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Update Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">Current Status</label>
                <StatusBadge status={parcel.status} className="w-full justify-center" />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">New Status</label>
                <Select value={newStatus} onValueChange={(value) => setNewStatus(value as ParcelStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Picked Up">Picked Up</SelectItem>
                    <SelectItem value="In Transit">In Transit</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Delivery Notes (Optional)
                </label>
                <Textarea
                  placeholder="Add any notes about the delivery..."
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <Button onClick={handleStatusUpdate} className="w-full" disabled={newStatus === parcel.status}>
                <Save className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Created</p>
                  <p className="text-xs text-muted-foreground">{format(parcel.createdAt, "MMM dd, HH:mm")}</p>
                </div>
              </div>

              {parcel.pickupDate && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-status-picked mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Picked Up</p>
                    <p className="text-xs text-muted-foreground">{format(parcel.pickupDate, "MMM dd, HH:mm")}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-status-transit mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">{format(parcel.estimatedDelivery, "MMM dd, HH:mm")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetails;
