import { ParcelStatus } from "@/types/parcel";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: ParcelStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: ParcelStatus) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "picked_up":
        return "bg-green-100 text-green-800";
      case "in_transit":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return <Badge className={cn("rounded-full", getStatusStyles(status), className)}>{status}</Badge>;
};
