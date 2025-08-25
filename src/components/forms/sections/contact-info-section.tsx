"use client";

import type { UseFormReturn } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";
import type { CustomerSignupFormData } from "@/lib/validations/customer";

type ContactInfo = Pick<CustomerSignupFormData, "phone" | "altPhone">;

interface ContactInfoSectionProps<T extends ContactInfo> {
  form: UseFormReturn<T>;
}

export function ContactInfoSection({ form }: ContactInfoSectionProps<ContactInfo>) {
  const {
    register,
    formState: { errors },
  } = form;

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
