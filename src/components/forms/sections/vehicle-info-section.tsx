"use client";

import { Controller, useFormContext } from "react-hook-form";
import { AgentSignupFormData } from "@/lib/validations/auth";

import { CommonFormField } from "../common-form-field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EMPLOYMENT_OPTIONS, VEHICLE_OPTIONS } from "@/lib/constants";

export function VehicleInfoSection() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<AgentSignupFormData>();

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
                  {VEHICLE_OPTIONS.map((option) => (
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
                  {EMPLOYMENT_OPTIONS.map((option) => (
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
