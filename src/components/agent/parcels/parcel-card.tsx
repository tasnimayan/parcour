import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, MapPin, Clock, Phone } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge } from "./status-badge";
import Link from "next/link";
import { ParcelData } from "@/lib/admin-api";

interface ParcelCardProps {
  parcel: ParcelData;
}

const ParcelCard = ({ parcel }: ParcelCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-status-failed";
      case "express":
        return "text-status-transit";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Link href={`/agent/parcels/${parcel.id}`}>
      <Card className="card-hover cursor-pointer gradient-card">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">{parcel.trackingCode}</h3>
                <p className="text-sm text-muted-foreground">{parcel.recipientName}</p>
              </div>
            </div>
            <StatusBadge status={parcel.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-muted-foreground">Delivery Address</p>
              <p className="text-foreground font-medium">{parcel.deliveryAddress}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {parcel.estimatedDeliveryDate && format(parcel.estimatedDeliveryDate, "MMM dd, HH:mm")}
              </span>
            </div>
            <span className={`font-medium ${getPriorityColor(parcel.priorityType)}`}>{parcel.priorityType}</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{parcel.recipientPhone}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ParcelCard;
