import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface CommonFormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
  type?: "text" | "email" | "password" | "tel" | "date" | "number";
  placeholder?: string;
  step?: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

export const CommonFormField = ({
  id,
  label,
  error,
  type = "text",
  required = false,
  className,
  register,
  ...props
}: CommonFormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <Input id={id} type={type} placeholder={props.placeholder} step={props.step} {...(register || {})} />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
