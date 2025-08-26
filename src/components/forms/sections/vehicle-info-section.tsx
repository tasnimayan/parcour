"use client";

import { Controller, useFormContext } from "react-hook-form";
import type { DeliveryAgentSignupFormData } from "@/lib/validations/delivery-agent";
import { CommonFormField } from "../common-form-field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const VehicleOptions = [
  { value: "BIKE", label: "Bike" },
  { value: "CAR", label: "Car" },
  { value: "VAN", label: "Van" },
  { value: "TRUCK", label: "Truck" },
  { value: "BICYCLE", label: "Bicycle" },
];

const EmploymentOptions = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
];

export function VehicleInfoSection() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<DeliveryAgentSignupFormData>();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Vehicle & Employment Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type *</Label>

          <Controller
            name="vehicleType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  {VehicleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.vehicleType && <p className="text-sm text-destructive">{errors.vehicleType.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type *</Label>

          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {EmploymentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.employmentType && <p className="text-sm text-destructive">{errors.employmentType.message}</p>}
        </div>

        <CommonFormField
          id="vehicleNumber"
          label="Vehicle Number"
          register={register("vehicleNumber")}
          error={errors.vehicleNumber?.message}
          placeholder="Vehicle number"
        />

        <CommonFormField
          id="licenseNo"
          label="License Number"
          register={register("licenseNo")}
          error={errors.licenseNo?.message}
          placeholder="License number"
        />
      </div>
    </div>
  );
}
