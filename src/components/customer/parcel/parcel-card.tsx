"use client";

import { StatusBadge } from "@/components/agent/parcels/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelData } from "@/lib/admin-api";
import { format } from "date-fns";
import { Package, MapPin, Phone, DollarSign, User } from "lucide-react";
import Link from "next/link";

export function PackageCard({
  id,
  trackingCode,
  status,
  pickupAddress,
  deliveryAddress,
  recipientName,
  recipientPhone,
  parcelSize,
  parcelWeight,
  estimatedDeliveryDate,
  paymentType,
  codAmount,
  assignment,
  createdAt,
}: ParcelData) {
  return (
    <Card key={id} className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <CardTitle className="text-lg">{trackingCode}</CardTitle>
              <p className="text-sm text-muted-foreground">Booked on {format(createdAt, "PP")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 grow">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">From:</p>
              <p className="text-muted-foreground">{pickupAddress}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium">Recipient:</p>
            <p>{recipientName}</p>
            <p className="text-muted-foreground">{recipientPhone}</p>
          </div>

          <div className="flex items-start space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">Payment: {paymentType}</p>
              <p className="text-muted-foreground">
                Amount: <span className="font-medium text-green-600">{codAmount}</span> BDT
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium">To:</p>
              <p className="text-muted-foreground">{deliveryAddress}</p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium">Package Details:</p>
            <p className="text-muted-foreground">
              {parcelWeight}kg • {parcelSize}cm
            </p>
          </div>

          {assignment && (
            <div className="flex items-start space-x-2">
              <User className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Assigned Agent:</p>
                <p className="text-muted-foreground">{assignment.agent.fullName}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t mt-auto">
          <div className="text-sm">
            <p className="text-muted-foreground">Estimated Delivery:</p>
            <p className="font-medium">{estimatedDeliveryDate}</p>
          </div>
          <div className="flex space-x-2">
            {assignment && (
              <Button size="sm" className="ms-auto bg-green-500 hover:bg-green-600">
                <Phone /> Contact Agent
              </Button>
            )}
            <Button variant="default" size="sm" asChild>
              <Link href={`/customer/parcels/${id}`}>View Details</Link>
            </Button>
            {status === "in_transit" && <Button size="sm">Track Live</Button>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
