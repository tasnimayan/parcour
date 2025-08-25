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
import ParcelQRCode from "./parcel-qr-code";
import { PARCEL_STATUS } from "@/lib/constants";

// Mock data - in real app this would come from an API
const mockParcel: Parcel = {
  id: "1",
  trackingCode: "TRK-2024-123456",
  customerId: "1",
  recipientName: "John Smith",
  recipientPhone: "+1 (555) 123-4567",
  pickupAddress: "123 Business Ave, Downtown, City 12345",
  deliveryAddress: "456 Elm Street, Residential Area, City 67890",
  status: "picked_up" as ParcelStatus,
  priority: "urgent",
  service: "express",
  parcelType: "",
  parcelWeight: 2.5,
  parcelSize: "30x20x15 cm",
  notes: "Fragile - Handle with care. Ring doorbell twice.",
  estimatedDelivery: "2024-01-15T14:00:00",
  createdAt: "2024-01-14T09:00:00",
  pickedAt: "2024-01-15T10:30:00",
};

const ParcelDetails = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel>(mockParcel);
  const [status, setStatus] = useState<ParcelStatus>(parcel.status);
  const [deliveryNotes, setDeliveryNotes] = useState("");

  console.log(id);
  const handleStatusUpdate = () => {
    setParcel((prev) => ({ ...prev, status: status }));
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
            <Package className="h-8 w-8 text-primary" /> {parcel.trackingCode}
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
                  <p className="font-semibold text-foreground">{parcel.parcelWeight} kg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Dimensions</p>
                  <p className="font-semibold text-foreground">{parcel.parcelSize}</p>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Update Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ParcelQRCode trackingNumber={parcel.trackingCode} />

              <div className="space-x-2">
                <label className="text-sm font-medium mb-2">Current Status</label>
                <StatusBadge status={parcel.status} />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">New Status</label>
                <Select value={status} onValueChange={(value) => setStatus(value as ParcelStatus)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PARCEL_STATUS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
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

              <Button onClick={handleStatusUpdate} className="w-full" disabled={status === parcel.status}>
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

              {parcel.pickedAt && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-status-picked mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Picked Up</p>
                    <p className="text-xs text-muted-foreground">{format(parcel.pickedAt, "MMM dd, HH:mm")}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-status-transit mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    {parcel.deliveryDate && format(parcel.deliveryDate, "MMM dd, HH:mm")}
                  </p>
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
