"use client";

import { Controller, useFormContext } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";
import type { CustomerSignupFormData } from "@/lib/validations/customer";
import { CommonSelect } from "@/components/shared/common-select";

export function AddressSection() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CustomerSignupFormData>();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Address Information</h3>

      <div className="space-y-4">
        <CommonFormField
          id="address.label"
          label="Address Label"
          required
          placeholder="e.g., Home, Office, Warehouse"
          register={register("address.label")}
          error={errors.address?.label?.message}
        />

        <CommonFormField
          id="address.address"
          label="Street Address"
          required
          placeholder="Street address"
          register={register("address.address")}
          error={errors.address?.address?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonFormField
            id="address.city"
            label="City"
            required
            placeholder="City"
            register={register("address.city")}
            error={errors.address?.city?.message}
          />

          <CommonFormField
            id="address.postalCode"
            label="Postal Code"
            required
            placeholder="Postal code"
            register={register("address.postalCode")}
            error={errors.address?.postalCode?.message}
          />

          <Controller
            name="address.country"
            control={control}
            render={({ field }) => (
              <CommonSelect
                name="address.country"
                label="Country"
                value={field.value}
                options={[
                  { value: "Bangladesh", label: "Bangladesh" },
                  { value: "India", label: "India" },
                  { value: "Pakistan", label: "Pakistan" },
                ]}
                placeholder="Country"
                onValueChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
