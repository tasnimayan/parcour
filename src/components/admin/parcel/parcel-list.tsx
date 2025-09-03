"use client";
import { ParcelTable } from "./parcel-table";
import { ParcelPriority, ParcelService, ParcelStatus } from "@/types/parcel";
import { LoadingState } from "@/components/shared/data-states";
import { usePaginationState } from "@/hooks/use-pagination";
import { UserPagination } from "@/components/shared/user-pagination";
import { useParcels } from "@/hooks/use-parcels";
import { ErrorState } from "@/components/shared/data-states";
import { ScrollArea } from "@/components/ui/scroll-area";

type ParcelListProps = {
  searchTerm: string;
  status: ParcelStatus | "all";
  priority: ParcelPriority | "all";
  service: ParcelService | "all";
};

export const ParcelList = ({ searchTerm, status, priority, service }: ParcelListProps) => {
  const { currentPage, itemsPerPage, onPageChange, onLimitChange } = usePaginationState(1, 10);

  const { data, isLoading, isError } = useParcels({
    searchTerm,
    status,
    priority,
    service,
    currentPage,
    itemsPerPage,
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;

  return (
    <>
      <ScrollArea className="flex-1 gap-3">
        <ParcelTable parcels={data?.parcels || []} />
      </ScrollArea>
      <UserPagination
        currentPage={currentPage}
        totalItems={data?.meta?.total || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onLimitChange}
      />
    </>
  );
};
