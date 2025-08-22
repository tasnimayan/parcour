"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, MapPin, Package, Search, Filter } from "lucide-react";
import { ParcelStatus } from "@/types/parcel";
import { StatusBadge } from "@/components/agent/parcels/status-badge";

// Dummy booking data
const bookings = [
  {
    id: "PKG001234",
    trackingNumber: "TRK-2024-001234",
    recipientName: "Jane Smith",
    recipientPhone: "+1 (555) 987-6543",
    pickupAddress: "123 Main St, New York, NY 10001",
    deliveryAddress: "456 Oak Ave, Brooklyn, NY 11201",
    status: "In Transit" as ParcelStatus,
    priority: "Express",
    weight: 2.5,
    dimensions: "30×20×15",
    estimatedDelivery: new Date("2024-01-25"),
    createdAt: new Date("2024-01-20"),
    paymentMethod: "COD",
    cost: "$15.99",
  },
  {
    id: "PKG001235",
    trackingNumber: "TRK-2024-001235",
    recipientName: "Bob Johnson",
    recipientPhone: "+1 (555) 456-7890",
    pickupAddress: "789 Pine St, New York, NY 10002",
    deliveryAddress: "321 Elm St, Queens, NY 11101",
    status: "Delivered" as ParcelStatus,
    priority: "Standard",
    weight: 1.2,
    dimensions: "25×15×10",
    estimatedDelivery: new Date("2024-01-18"),
    createdAt: new Date("2024-01-15"),
    paymentMethod: "Instant",
    cost: "$8.50",
  },
  {
    id: "PKG001236",
    trackingNumber: "TRK-2024-001236",
    recipientName: "Alice Brown",
    recipientPhone: "+1 (555) 321-0987",
    pickupAddress: "555 Cedar Rd, New York, NY 10003",
    deliveryAddress: "777 Maple Dr, Manhattan, NY 10004",
    status: "Pending" as ParcelStatus,
    priority: "Urgent",
    weight: 0.8,
    dimensions: "20×10×8",
    estimatedDelivery: new Date("2024-01-24"),
    createdAt: new Date("2024-01-22"),
    paymentMethod: "COD",
    cost: "$12.99",
  },
];

const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Picked Up">Picked Up</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No bookings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't made any bookings yet"}
              </p>
              <Button>Book Your First Parcel</Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{booking.trackingNumber}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Booked on {booking.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <StatusBadge status={booking.status} />
                    <Badge variant={booking.priority === "Urgent" ? "destructive" : "secondary"}>
                      {booking.priority}
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
                        <p className="text-muted-foreground">{booking.pickupAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium">To:</p>
                        <p className="text-muted-foreground">{booking.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="font-medium">Recipient: {booking.recipientName}</p>
                      <p className="text-muted-foreground">{booking.recipientPhone}</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Package Details:</p>
                      <p className="text-muted-foreground">
                        {booking.weight}kg • {booking.dimensions}cm
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Payment: {booking.paymentMethod}</p>
                      <p className="text-muted-foreground">Cost: {booking.cost}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Estimated Delivery:</p>
                    <p className="font-medium">{booking.estimatedDelivery.toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {booking.status === "in_transit" && <Button size="sm">Track Live</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;
