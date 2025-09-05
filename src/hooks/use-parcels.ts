import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MetaData, fetchAllParcels } from "@/lib/admin-api";
import { ParcelPriority, ParcelService, ParcelStatus } from "@/types/parcel";
import { fetchAgentStats, fetchParcelDetails } from "@/lib/agent-api";
import { fetchCustomerStats, fetchParcelByTrackingCode } from "@/lib/customer-api";
import { fetchUpdateParcelStatus } from "@/lib/parcel-api";
import { toast } from "sonner";

/*
 * Exports hooks for parcels
 * useParcels - fetches all parcels
 * useParcelDetails - fetches a single parcel
 * useAgentStats - fetches agent stats
 * useCustomerStats - fetches customer stats
 * useParcelTracking - fetches parcel tracking details
 */

type ParcelListProps = {
  searchTerm?: string;
  status?: ParcelStatus | "all";
  priority?: ParcelPriority | "all";
  service?: ParcelService | "all";
  currentPage?: number;
  itemsPerPage?: number;
};

export const useParcels = ({
  searchTerm,
  status,
  priority,
  service,
  currentPage = 1,
  itemsPerPage = 10,
}: ParcelListProps) => {
  return useQuery({
    queryKey: ["PARCELS", { page: currentPage, limit: itemsPerPage }, { searchTerm, status, priority, service }],
    queryFn: () =>
      fetchAllParcels({
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
};

export const useParcelDetails = ({ parcelId }: { parcelId: string }) => {
  return useQuery({
    queryKey: ["PARCELS", parcelId],
    queryFn: () => fetchParcelDetails(parcelId),
    select: (data) => data.data,
    enabled: !!parcelId,
  });
};

export const useAgentStats = () => {
  return useQuery({
    queryKey: ["AGENT", "STATS_COUNT"],
    queryFn: fetchAgentStats,
    select: (data) => data.data,
  });
};

export const useCustomerStats = () => {
  return useQuery({
    queryKey: ["CUSTOMER", "STATS_COUNT"],
    queryFn: fetchCustomerStats,
    select: (data) => data.data,
  });
};

export const useParcelTracking = (trackingCode: string) => {
  return useQuery({
    queryKey: ["PARCELS", "TRACKING_DETAILS", trackingCode],
    queryFn: () => fetchParcelByTrackingCode(trackingCode),
    select: (data) => data.data,
    enabled: !!trackingCode,
  });
};

export const useUpdateParcelStatus = (parcelId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (newStatus: ParcelStatus) => fetchUpdateParcelStatus(parcelId, newStatus),
    onSuccess: () => {
      toast.success("Parcel status updated successfully");
      qc.invalidateQueries({ queryKey: ["PARCELS", parcelId] });
    },
    onError: () => {
      toast.error("Failed to update parcel status");
    },
  });
};
