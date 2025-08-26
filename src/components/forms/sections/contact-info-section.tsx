"use client";

import { useFormContext } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";
import type { CustomerSignupFormData } from "@/lib/validations/customer";

type ContactInfo = Pick<CustomerSignupFormData, "phone" | "altPhone">;

export function ContactInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactInfo>();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommonFormField
          id="phone"
          label="Phone Number"
          type="tel"
          required
          placeholder="Phone number"
          register={register("phone")}
          error={errors.phone?.message}
        />

        <CommonFormField
          id="altPhone"
          label="Alternative Phone"
          type="tel"
          placeholder="Alternative phone (optional)"
          register={register("altPhone")}
          error={errors.altPhone?.message}
        />
      </div>
    </div>
  );
}
