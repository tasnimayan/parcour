import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchInput = ({
  searchTerm,
  onChange,
  placeholder = "Search...",
}: {
  searchTerm: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};
