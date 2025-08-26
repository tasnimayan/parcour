"use client";

import { CommonFormField } from "@/components/forms/common-form-field";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CustomerSignupFormData } from "@/lib/validations/customer";

export function PersonalInfoSection() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<CustomerSignupFormData>();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommonFormField
          id="fullName"
          label="Full Name"
          required
          placeholder="Full name"
          register={register("fullName")}
          error={errors.fullName?.message}
        />

        <CommonFormField
          id="email"
          label="Email"
          type="email"
          required
          placeholder="Email"
          register={register("email")}
          error={errors.email?.message}
        />

        <CommonFormField
          id="password"
          label="Password"
          type="password"
          required
          placeholder="Password"
          register={register("password")}
          error={errors.password?.message}
        />

        <CommonFormField
          id="dob"
          label="Date of Birth"
          type="date"
          register={register("dob")}
          error={errors.dob?.message}
        />

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} className="flex gap-2">
                <Label className="flex items-center gap-2">
                  <RadioGroupItem value="MALE" />
                  Male
                </Label>
                <Label className="flex items-center gap-2">
                  <RadioGroupItem value="FEMALE" />
                  Female
                </Label>
              </RadioGroup>
            )}
          />
          {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
        </div>

        <div className="col-span-2">
          <CommonFormField
            id="governmentId"
            label="NID"
            placeholder="NID number (optional)"
            register={register("governmentId")}
            error={errors.governmentId?.message}
          />
        </div>
      </div>
    </div>
  );
}
