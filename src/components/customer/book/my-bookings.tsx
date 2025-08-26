"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, MapPin, Package, Search } from "lucide-react";
import { ParcelStatus } from "@/types/parcel";
import { StatusBadge } from "@/components/agent/parcels/status-badge";
import { useParcels } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { SelectStatus } from "@/components/shared/filter-options";
import Link from "next/link";

const MyParcels = ({ searchTerm, status }: { searchTerm: string; status: ParcelStatus | "all" }) => {
  const { data, isLoading, isError } = useParcels({
    searchTerm,
    status,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data?.parcels?.length) return <EmptyState title="No bookings found" />;

  return (
    <div className="space-y-4">
      {data?.parcels?.map((parcel) => (
        <Card key={parcel.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{parcel.trackingCode}</CardTitle>
                  <p className="text-sm text-muted-foreground">Booked on {parcel.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <StatusBadge status={parcel.status} />
                <Badge variant={parcel.priorityType === "urgent" ? "destructive" : "secondary"}>
                  {parcel.priorityType}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">From:</p>
                    <p className="text-muted-foreground">{parcel.pickupAddress}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium">To:</p>
                    <p className="text-muted-foreground">{parcel.deliveryAddress}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Recipient: {parcel.recipientName}</p>
                  <p className="text-muted-foreground">{parcel.recipientPhone}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Package Details:</p>
                  <p className="text-muted-foreground">
                    {parcel.parcelWeight}kg • {parcel.parcelSize}cm
                  </p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Payment: {parcel.paymentType}</p>
                  <p className="text-muted-foreground">Cost: {parcel.codAmount}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm">
                <p className="text-muted-foreground">Estimated Delivery:</p>
                <p className="font-medium">{parcel.estimatedDeliveryDate}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/customer/parcels/${parcel.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                {parcel.status === "in_transit" && <Button size="sm">Track Live</Button>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<ParcelStatus | "all">("all");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by tracking number or recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <SelectStatus value={status} onChange={setStatus} />
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <MyParcels searchTerm={searchTerm} status={status} />
    </div>
  );
};

export default MyBookings;
