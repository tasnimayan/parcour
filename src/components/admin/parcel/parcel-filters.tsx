import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/shared/search-input";
import { SelectPriority, SelectService, SelectStatus } from "@/components/shared/filter-options";
import { ParcelPriority, ParcelService, ParcelStatus } from "@/types/parcel";

interface ParcelFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ParcelStatus | "all";
  onStatusFilterChange: (value: ParcelStatus | "all") => void;
  priorityFilter: ParcelPriority | "all";
  onPriorityFilterChange: (value: ParcelPriority | "all") => void;
  serviceFilter: ParcelService | "all";
  onServiceFilterChange: (value: ParcelService | "all") => void;
  onReset: () => void;
}

export const ParcelFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  serviceFilter,
  onServiceFilterChange,
  onReset,
}: ParcelFiltersProps) => {
  const activeFiltersCount = [statusFilter, priorityFilter, serviceFilter].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SearchInput searchTerm={searchTerm} onChange={onSearchChange} placeholder="Search by tracking number or city" />

      <SelectStatus value={statusFilter as ParcelStatus} onChange={onStatusFilterChange} />
      <SelectPriority value={priorityFilter} onChange={onPriorityFilterChange} />
      <SelectService value={serviceFilter} onChange={onServiceFilterChange} />

      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
};
