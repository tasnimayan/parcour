"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { useParcelDetails } from "@/hooks/use-parcels";
import { ParcelInfoCard } from "./parcel-info-card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/contexts/auth-context";
import { PaymentInfoCard } from "./payment-info-card";
import { CustomerInfoCard } from "./customer-info-card";
import { ParcelUpdateSection } from "./parcel-qr-update-card";

const ParcelDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { data: parcel, isLoading, isError } = useParcelDetails({ parcelId: id as string });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!parcel) return <EmptyState title="Parcel not found" />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={
          <>
            <Package className="h-8 w-8 text-primary" /> {parcel.trackingCode}
          </>
        }
        subtitle="Parcel Details & Status Management"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Recipient Information */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Recipient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Delivery Address</Label>
                <p className="text-foreground mt-1 font-medium">{parcel.deliveryAddress}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Name</Label>
                <p className="text-lg font-semibold text-foreground">{parcel.recipientName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Phone</Label>
                <p className="text-foreground">{parcel.recipientPhone}</p>
              </div>
            </CardContent>
          </Card>

          <ParcelInfoCard parcel={parcel} />

          <div className="grid grid-cols-2 gap-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Pickup Address</span>
                </CardTitle>
                <p className="px-4text-foreground mt-1">{parcel.pickupAddress}</p>
              </CardHeader>
            </Card>

            <CustomerInfoCard customer={parcel.customer} />
          </div>
        </div>

        {/* Status Management Sidebar */}
        <div className="space-y-6">
          {(user?.role === "admin" || user?.role === "agent") && <ParcelUpdateSection parcel={parcel} />}

          <PaymentInfoCard
            payment={
              parcel.payment || {
                amount: Number(parcel.codAmount),
                status: "pending",
                paymentType: parcel.paymentType,
              }
            }
          />

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
              {/* 
              {parcel.pickedAt && (
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-status-picked mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Picked Up</p>
                    <p className="text-xs text-muted-foreground">{format(parcel.pickedAt, "MMM dd, HH:mm")}</p>
                  </div>
                </div>
              )} */}

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-status-transit mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    {parcel.estimatedDeliveryDate && format(parcel.estimatedDeliveryDate, "MMM dd, HH:mm")}
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
