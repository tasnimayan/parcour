"use client";

import { useState } from "react";
import { Parcel, ParcelStatus, ParcelService } from "@/types/parcel";
import ParcelCard from "./parcel-card";
import { Button } from "@/components/ui/button";
import { Search, SortAsc } from "lucide-react";
import { useRouter } from "next/navigation";
import { ParcelFilter } from "./parcel-filter";

const ParcelsList = () => {
  const router = useRouter();
  const [parcels] = useState<Parcel[]>(mockParcels);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ParcelStatus | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ParcelService | "all">("all");

  const handleParcelClick = (parcel: Parcel) => {
    router.push(`/agent/parcels/${parcel.id}`);
  };

  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch =
      parcel.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || parcel.status === statusFilter;
    const matchesService = serviceFilter === "all" || parcel.service === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <ParcelFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        serviceFilter={serviceFilter}
        onServiceChange={setServiceFilter}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredParcels.length} of {parcels.length} parcels
        </p>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 mr-2" />
          Sort by Date
        </Button>
      </div>

      {/* Parcels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredParcels.map((parcel) => (
          <ParcelCard key={parcel.id} parcel={parcel} onClick={handleParcelClick} />
        ))}
      </div>

      {/* Empty State */}
      {filteredParcels.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No parcels found</p>
            <p className="text-sm">Try adjusting your search or filter criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock data for demonstration
const mockParcels: Parcel[] = [
  {
    id: "1",
    trackingCode: "TRK001234",
    recipientName: "John Smith",
    recipientPhone: "+1 (555) 123-4567",
    pickupAddress: "123 Business Ave, Downtown",
    deliveryAddress: "456 Elm Street, Residential Area",
    status: "pending" as ParcelStatus,
    customerId: "1",
    parcelType: "box",
    service: "express",
    priority: "high",
    parcelWeight: 2.5,
    parcelSize: "30x20x15 cm",
    notes: "Fragile - Handle with care",
    estimatedDelivery: new Date("2024-01-15T14:00:00"),
    createdAt: new Date("2024-01-14T09:00:00"),
  },
  {
    id: "2",
    trackingCode: "TRK001235",
    recipientName: "Sarah Johnson",
    recipientPhone: "+1 (555) 234-5678",
    pickupAddress: "789 Corporate Plaza, Business District",
    deliveryAddress: "321 Oak Avenue, Suburb",
    status: "picked_up" as ParcelStatus,
    service: "standard",
    priority: "high",
    parcelType: "box",
    parcelWeight: 1.8,
    parcelSize: "25x15x10 cm",
    pickedAt: new Date("2024-01-15T10:30:00"),
    estimatedDelivery: new Date("2024-01-15T16:30:00"),
    createdAt: new Date("2024-01-14T11:15:00"),
  },
  {
    id: "3",
    trackingCode: "TRK001236",
    recipientName: "Mike Davis",
    recipientPhone: "+1 (555) 345-6789",
    pickupAddress: "555 Industrial Road, Warehouse District",
    deliveryAddress: "789 Pine Street, City Center",
    status: "in_transit" as ParcelStatus,
    service: "urgent",
    priority: "high",
    parcelType: "box",
    parcelWeight: 4.2,
    parcelSize: "40x30x20 cm",
    notes: "Signature required",
    pickedAt: new Date("2024-01-15T08:00:00"),
    estimatedDelivery: new Date("2024-01-15T12:00:00"),
    createdAt: new Date("2024-01-14T16:20:00"),
  },
  {
    id: "4",
    trackingCode: "TRK001237",
    recipientName: "Emma Wilson",
    recipientPhone: "+1 (555) 456-7890",
    pickupAddress: "222 Commerce Street, Mall",
    deliveryAddress: "654 Maple Drive, Residential",
    status: "delivered" as ParcelStatus,
    service: "standard",
    priority: "high",
    parcelType: "box",
    parcelWeight: 0.8,
    parcelSize: "20x15x5 cm",
    pickedAt: new Date("2024-01-14T14:00:00"),
    deliveryDate: new Date("2024-01-14T18:30:00"),
    estimatedDelivery: new Date("2024-01-14T18:00:00"),
    createdAt: new Date("2024-01-13T12:00:00"),
  },
];

export default ParcelsList;
