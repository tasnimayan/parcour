"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ParcelStatus } from "@/types/parcel";
import { useParcels } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { SelectStatus } from "@/components/shared/filter-options";
import { PackageCard } from "./parcel-card";

const MyParcels = ({ searchTerm, status }: { searchTerm: string; status: ParcelStatus | "all" }) => {
  const { data, isLoading, isError } = useParcels({
    searchTerm,
    status,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data?.parcels?.length) return <EmptyState title="No bookings found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data?.parcels?.map((parcel) => (
        <PackageCard key={parcel.id} {...parcel} />
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
