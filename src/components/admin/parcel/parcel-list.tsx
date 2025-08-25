import { useQuery } from "@tanstack/react-query";
import { ParcelTable } from "./parcel-table";
import { MetaData, getAllParcels } from "@/lib/admin-api";
import { ParcelPriority, ParcelService, ParcelStatus } from "@/types/parcel";
import { LoadingState } from "@/components/shared/loading-state";
import { usePaginationState } from "@/hooks/use-pagination";
import { UserPagination } from "@/components/shared/user-pagination";

type ParcelListProps = {
  searchTerm: string;
  status: ParcelStatus | "all";
  priority: ParcelPriority | "all";
  service: ParcelService | "all";
};

export const ParcelList = ({ searchTerm, status, priority, service }: ParcelListProps) => {
  const { currentPage, itemsPerPage, onPageChange, onLimitChange } = usePaginationState(1, 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllParcels({
        search: searchTerm,
        status: status === "all" ? undefined : status,
        priority: priority === "all" ? undefined : priority,
        service: service === "all" ? undefined : service,
        page: currentPage,
        limit: itemsPerPage,
      }),
    select: (data) => ({
      parcels: data.data,
      meta: data.meta as MetaData,
    }),
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.parcels?.length) return <div>No data found</div>;

  return (
    <div>
      <ParcelTable parcels={data.parcels} />
      <UserPagination
        currentPage={currentPage}
        totalItems={data.meta.total}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onLimitChange}
      />
    </div>
  );
};
