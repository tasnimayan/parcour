import { Parcel } from "@/types/parcel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Package, MapPin, Clock, Phone } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge } from "./status-badge";

interface ParcelCardProps {
  parcel: Parcel;
  onClick?: (parcel: Parcel) => void;
}

const ParcelCard = ({ parcel, onClick }: ParcelCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(parcel);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "text-status-failed";
      case "Express":
        return "text-status-transit";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="card-hover cursor-pointer gradient-card" onClick={handleClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{parcel.trackingNumber}</h3>
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
            <span className="text-muted-foreground">{format(parcel.estimatedDelivery, "MMM dd, HH:mm")}</span>
          </div>
          <span className={`font-medium ${getPriorityColor(parcel.priority)}`}>{parcel.priority}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{parcel.recipientPhone}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParcelCard;
