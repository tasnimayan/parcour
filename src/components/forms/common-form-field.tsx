"use client";

import type React from "react";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface BaseFormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type?: "text" | "email" | "password" | "tel" | "date" | "number";
  placeholder?: string;
  step?: string;
  register?: any;
}

interface SelectFormFieldProps extends BaseFormFieldProps {
  placeholder?: string;
  options: { value: string; label: string }[];
  onValueChange?: (value: string) => void;
}

type CommonFormFieldProps = InputFormFieldProps | SelectFormFieldProps;

export const CommonFormField = forwardRef<HTMLInputElement | HTMLButtonElement, CommonFormFieldProps>(
  ({ id, label, error, required = false, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        <Label htmlFor={id}>
          {label} {required && "*"}
        </Label>
        <Input
          id={id}
          type={props.type || "text"}
          placeholder={props.placeholder}
          step={props.step}
          {...(props.register || {})}
          ref={ref as React.Ref<HTMLInputElement>}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

CommonFormField.displayName = "CommonFormField";
