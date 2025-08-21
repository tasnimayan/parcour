import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlignEndVertical, Filter, SortAsc } from "lucide-react";
import { ParcelStatus, ParcelPriority, ParcelService } from "@/types/parcel";
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SERVICE_OPTIONS } from "@/lib/constants";

interface SelectStatusProps<T> {
  value: T | "all";
  onChange: (value: T | "all") => void;
}

export const SelectStatus = ({ value, onChange }: SelectStatusProps<ParcelStatus>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-48">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const SelectPriority = ({ value, onChange }: SelectStatusProps<ParcelPriority>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-48">
        <SortAsc className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        {PRIORITY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const SelectService = ({ value, onChange }: SelectStatusProps<ParcelService>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-48">
        <AlignEndVertical className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Select Service" />
      </SelectTrigger>
      <SelectContent>
        {SERVICE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
