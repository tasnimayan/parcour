"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { SearchInput } from "@/components/shared/search-input";
import { ParcelCard } from "./parcel-card";
import { useParcels } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";

const Parcels = ({ searchTerm }: { searchTerm: string }) => {
  const { data, isLoading, isError } = useParcels({ searchTerm, status: "delivered" });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!data?.parcels?.length) return <EmptyState title="No delivery history found" />;

  return (
    <div className="space-y-4">
      {data?.parcels?.map((parcel) => (
        <ParcelCard key={parcel.id} parcel={parcel} />
      ))}
    </div>
  );
};
export default function DeliveryHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<string>("All");

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-end">
        <div className="flex flex-col sm:flex-row gap-4 w-1/2">
          <SearchInput
            placeholder="Search by tracking number or recipient..."
            searchTerm={searchTerm}
            onChange={setSearchTerm}
          />

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
      </div>

      {/* History List */}
      <Parcels searchTerm={searchTerm} />
    </div>
  );
}
