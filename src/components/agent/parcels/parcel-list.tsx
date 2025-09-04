"use client";

import { useState } from "react";
import ParcelCard from "./parcel-card";
import { ParcelFilter } from "./parcel-filter";
import { ParcelData } from "@/lib/admin-api";
import { ParcelService, ParcelStatus } from "@/types/parcel";
import { LoadingState } from "@/components/shared/data-states";
import { Package } from "lucide-react";
import { usePaginationState } from "@/hooks/use-pagination";
import { UserPagination } from "@/components/shared/user-pagination";
import { useParcels } from "@/hooks/use-parcels";
import { EmptyState } from "@/components/shared/data-states";

const Parcels = ({ parcels }: { parcels: ParcelData[] }) => {
  if (!parcels || parcels.length === 0)
    return <EmptyState icon={Package} title="No parcels found" description="Try adjusting your filter" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {parcels.map((parcel) => (
        <ParcelCard key={parcel.id} parcel={parcel} />
      ))}
    </div>
  );
};

const ParcelsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<ParcelStatus | "all">("all");
  const [service, setService] = useState<ParcelService | "all">("all");
  const { currentPage, itemsPerPage, onPageChange, onLimitChange } = usePaginationState(1, 10);

  const { data, isLoading, isError } = useParcels({
    searchTerm,
    status,
    priority: "all",
    service,
    currentPage,
    itemsPerPage,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <div>Error loading parcels</div>;

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <ParcelFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={status}
        onStatusChange={setStatus}
        serviceFilter={service}
        onServiceChange={setService}
      />

      <Parcels parcels={data?.parcels || []} />
      <UserPagination
        currentPage={currentPage}
        totalItems={data?.meta?.total || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onLimitChange}
      />
    </div>
  );
};

export default ParcelsList;
