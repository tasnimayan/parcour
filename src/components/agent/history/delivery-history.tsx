"use client";

import { useState } from "react";
import { Parcel } from "@/types/parcel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, Download, CheckCircle, XCircle, Package, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { StatusBadge } from "../parcels/status-badge";
import { SearchInput } from "@/components/shared/search-input";

export default function DeliveryHistory() {
  const [history] = useState<Parcel[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [dateFilter, setDateFilter] = useState<string>("All");

  const filteredHistory = history.filter((parcel) => {
    const matchesSearch =
      parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.recipientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || parcel.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "All") {
      const today = new Date();
      const parcelDate = parcel.deliveryDate || parcel.createdAt;

      switch (dateFilter) {
        case "Today":
          matchesDate = format(parcelDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
          break;
        case "This Week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = parcelDate >= weekAgo;
          break;
        case "This Month":
          matchesDate = parcelDate.getMonth() === today.getMonth();
          break;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = {
    total: history.length,
    delivered: history.filter((p) => p.status === "delivered").length,
    failed: history.filter((p) => p.status === "failed").length,
    onTimeRate: (
      (history.filter((p) => p.status === "delivered" && p.deliveryDate && p.deliveryDate <= p.estimatedDelivery)
        .length /
        history.filter((p) => p.status === "delivered").length) *
      100
    ).toFixed(1),
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Total Deliveries</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Successful</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-delivered">{stats.delivered}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <XCircle className="h-4 w-4" />
              <span>Failed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-failed">{stats.failed}</div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>On-Time Rate</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.onTimeRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          placeholder="Search by tracking number or recipient..."
          searchTerm={searchTerm}
          onChange={setSearchTerm}
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Time</SelectItem>
            <SelectItem value="Today">Today</SelectItem>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredHistory.length} of {history.length} deliveries
        </p>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((parcel) => (
          <Card key={parcel.id} className="gradient-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold text-foreground">{parcel.trackingNumber}</h3>
                    <StatusBadge status={parcel.status} />
                    <Badge variant={parcel.priority === "urgent" ? "destructive" : "secondary"}>
                      {parcel.priority}
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
                    {parcel.pickupDate && <span>Picked up: {format(parcel.pickupDate, "MMM dd, HH:mm")}</span>}
                    {parcel.deliveryDate && <span>Delivered: {format(parcel.deliveryDate, "MMM dd, HH:mm")}</span>}
                    {parcel.status === "failed" && parcel.notes && (
                      <span className="text-status-failed">Reason: {parcel.notes}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {parcel.deliveryDate && parcel.estimatedDelivery && (
                    <div className="text-sm">
                      {parcel.deliveryDate <= parcel.estimatedDelivery ? (
                        <Badge className="bg-status-delivered/10 text-status-delivered border-status-delivered/20">
                          On Time
                        </Badge>
                      ) : (
                        <Badge className="bg-status-failed/10 text-status-failed border-status-failed/20">
                          Delayed
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No delivery history found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock historical data
const mockHistory: Parcel[] = [
  {
    id: "h1",
    trackingNumber: "TRK001230",
    recipientName: "Alice Brown",
    recipientPhone: "+1 (555) 111-2222",
    pickupAddress: "100 Main St, Downtown",
    deliveryAddress: "200 First Ave, Uptown",
    status: "delivered",
    priority: "low",
    service: "standard",
    weight: 1.2,
    dimensions: "20x15x10 cm",
    pickupDate: new Date("2024-01-10T09:00:00"),
    deliveryDate: new Date("2024-01-10T15:30:00"),
    estimatedDelivery: new Date("2024-01-10T16:00:00"),
    createdAt: new Date("2024-01-09T14:00:00"),
  },
  {
    id: "h2",
    trackingNumber: "TRK001231",
    recipientName: "Bob Wilson",
    recipientPhone: "+1 (555) 333-4444",
    pickupAddress: "300 Business Blvd, Industrial",
    deliveryAddress: "400 Residential Dr, Suburbs",
    status: "failed",
    priority: "medium",
    service: "express",
    weight: 3.5,
    dimensions: "35x25x20 cm",
    notes: "Customer not available",
    pickupDate: new Date("2024-01-12T08:30:00"),
    estimatedDelivery: new Date("2024-01-12T14:00:00"),
    createdAt: new Date("2024-01-11T16:30:00"),
  },
  {
    id: "h3",
    trackingNumber: "TRK001232",
    recipientName: "Carol Davis",
    recipientPhone: "+1 (555) 555-6666",
    pickupAddress: "500 Commerce Center, Mall District",
    deliveryAddress: "600 Park Ave, Downtown",
    status: "delivered",
    priority: "high",
    service: "urgent",
    weight: 0.8,
    dimensions: "15x10x5 cm",
    pickupDate: new Date("2024-01-13T11:00:00"),
    deliveryDate: new Date("2024-01-13T13:45:00"),
    estimatedDelivery: new Date("2024-01-13T14:00:00"),
    createdAt: new Date("2024-01-12T10:00:00"),
  },
  {
    id: "h4",
    trackingNumber: "TRK001233",
    recipientName: "David Lee",
    recipientPhone: "+1 (555) 777-8888",
    pickupAddress: "700 Tech Plaza, Innovation District",
    deliveryAddress: "800 University Way, Campus Area",
    status: "delivered",
    priority: "low",
    service: "standard",
    weight: 2.1,
    dimensions: "25x20x12 cm",
    pickupDate: new Date("2024-01-14T10:15:00"),
    deliveryDate: new Date("2024-01-14T16:20:00"),
    estimatedDelivery: new Date("2024-01-14T17:00:00"),
    createdAt: new Date("2024-01-13T12:45:00"),
  },
];
