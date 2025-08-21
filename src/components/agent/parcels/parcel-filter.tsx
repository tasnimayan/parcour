import { SelectService, SelectStatus } from "../../shared/filter-options";
import { SearchInput } from "../../shared/search-input";
import { ParcelService, ParcelStatus } from "@/types/parcel";
import { Button } from "../../ui/button";
import { RotateCcw } from "lucide-react";

interface ParcelFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ParcelStatus | "all";
  onStatusChange: (value: ParcelStatus | "all") => void;
  serviceFilter: ParcelService | "all";
  onServiceChange: (value: ParcelService | "all") => void;
}

export const ParcelFilter = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  serviceFilter,
  onServiceChange,
}: ParcelFilterProps) => {
  const isFilterActive = statusFilter || serviceFilter;

  const onReset = () => {
    onStatusChange("all");
    onServiceChange("all");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <SearchInput searchTerm={searchTerm} onChange={onSearchChange} placeholder="Search by tracking number or city" />

      <SelectStatus value={statusFilter} onChange={onStatusChange} />
      <SelectService value={serviceFilter} onChange={onServiceChange} />
      {isFilterActive && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
};
