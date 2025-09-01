import { Controller, useFormContext } from "react-hook-form";
import type { AdminSignupFormData } from "@/lib/validations/auth";
import { CommonFormField } from "../common-form-field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AdminInfoSection() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<AdminSignupFormData>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonFormField
        name="email"
        label="Email"
        type="email"
        placeholder="Email"
        register={register("email")}
        error={errors.email?.message}
        required
      />

      <CommonFormField
        name="password"
        label="Password"
        type="password"
        placeholder="Password"
        register={register("password")}
        error={errors.password?.message}
        required
      />

      <CommonFormField
        name="fullName"
        label="Full Name"
        placeholder="Full name"
        register={register("fullName")}
        error={errors.fullName?.message}
        required
      />

      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>

        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {[
                  { value: "operation", label: "Operation" },
                  { value: "coordinator", label: "Coordinator" },
                  { value: "support", label: "Support" },
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.department && <p className="text-sm text-destructive">{errors.department.message}</p>}
      </div>
    </div>
  );
}
