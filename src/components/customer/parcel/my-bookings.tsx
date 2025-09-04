"use client";
import { useState } from "react";
import { ParcelStatus } from "@/types/parcel";
import { useParcels } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { SelectStatus } from "@/components/shared/filter-options";
import { PackageCard } from "./parcel-card";
import { SearchInput } from "@/components/shared/search-input";

const MyParcels = ({ searchTerm, status }: { searchTerm: string; status: ParcelStatus | "all" }) => {
  const { data, isLoading, isError } = useParcels({
    searchTerm,
    status,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data?.parcels?.length) return <EmptyState title="No bookings found" />;

  return (
    <div className="space-y-4">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
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
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <SearchInput searchTerm={searchTerm} onChange={setSearchTerm} />
        <SelectStatus value={status} onChange={setStatus} />
      </div>

      {/* Bookings List */}
      <MyParcels searchTerm={searchTerm} status={status} />
    </div>
  );
};

export default MyBookings;
