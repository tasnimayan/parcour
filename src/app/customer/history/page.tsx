import MyBookings from "@/components/customer/parcel/my-bookings";
import { Package } from "lucide-react";

export default function History() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
          <p className="text-muted-foreground">Track and manage your parcel deliveries</p>
        </div>
      </div>
      <MyBookings />
    </div>
  );
}
