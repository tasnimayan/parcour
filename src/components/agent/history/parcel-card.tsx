import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { StatusBadge } from "../parcels/status-badge";
import { ParcelData } from "@/lib/admin-api";

export const ParcelCard = ({ parcel }: { parcel: ParcelData }) => {
  return (
    <Card key={parcel.id} className="gradient-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-4">
              <h3 className="font-semibold text-foreground">{parcel.trackingCode}</h3>
              <StatusBadge status={parcel.status} />
              <Badge variant={parcel.priorityType === "urgent" ? "destructive" : "secondary"}>
                {parcel.priorityType}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Recipient</p>
                <p className="font-medium text-foreground">{parcel.recipientName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Delivery Address</p>
                <p className="font-medium text-foreground">{parcel.deliveryAddress}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              {/* {parcel.pickedAt && <span>Picked up: {format(parcel.pickedAt, "MMM dd, HH:mm")}</span>} */}
              {parcel.deliveredAt && <span>Delivered: {format(parcel.deliveredAt, "MMM dd, HH:mm")}</span>}
              {parcel.status === "failed" && parcel.note && (
                <span className="text-status-failed">Reason: {parcel.note}</span>
              )}
            </div>
          </div>

          <div className="text-right">
            {parcel.deliveredAt && parcel.estimatedDeliveryDate && (
              <div className="text-sm">
                {parcel.deliveredAt <= parcel.estimatedDeliveryDate ? (
                  <Badge className="bg-status-delivered/10 text-status-delivered border-status-delivered/20">
                    On Time
                  </Badge>
                ) : (
                  <Badge className="bg-status-failed/10 text-status-failed border-status-failed/20">Delayed</Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
