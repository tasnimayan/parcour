import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type CommonSelectProps = {
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  error?: string;
};
export const CommonSelect = ({
  name,
  label,
  value,
  options,
  placeholder,
  onValueChange,
  required,
  disabled,
  labelClassName,
  className,
  error,
}: CommonSelectProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
        <Select value={value} onValueChange={onValueChange} required={required} disabled={disabled}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </>
  );
};
