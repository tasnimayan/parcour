"use client";

import { useState } from "react";
import { ParcelFormValues, parcelSchema } from "@/lib/validations/parcel";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { fetchCreateParcel } from "@/lib/customer-api";
import { SenderForm } from "@/components/customer/parcel/form/sender-form-card";
import { ReceiverForm } from "@/components/customer/parcel/form/receiver-form-card";
import { PackageForm } from "@/components/customer/parcel/form/package-form-card";
import { ShippingOptionsForm } from "@/components/customer/parcel/form/shipping-form-card";
import { ProgressIndicator, StepNavigation } from "@/components/customer/parcel/step-navigation";

const steps = [
  { label: "Sender", component: SenderForm },
  { label: "Receiver", component: ReceiverForm },
  { label: "Package", component: PackageForm },
  { label: "Shipping", component: ShippingOptionsForm },
];

export default function CreateParcelPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      paymentType: "cod",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["CREATE_PARCEL"],
    mutationFn: (data: ParcelFormValues) => fetchCreateParcel(data),
    onSuccess: () => {
      toast.success("Parcel booked successfully!");
      setCurrentStep(1);
      form.reset();
    },
    onError: () => toast.error("Failed to book parcel!"),
  });

  const { errors, isSubmitted } = form.formState;

  const onSubmit = (data: ParcelFormValues) => mutate(data);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const StepComponent = steps[currentStep - 1].component;

  return (
    <div>
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-12">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="create-parcel-form" className="space-y-4">
            {isSubmitted && Object.keys(errors).length > 0 && (
              <div className="text-red-500">Please fill the required fields</div>
            )}
            <StepComponent />
          </form>
        </FormProvider>

        {/* Navigation Buttons */}
        <StepNavigation
          currentStep={currentStep}
          totalSteps={steps.length}
          nextStep={nextStep}
          prevStep={prevStep}
          isSubmitting={isPending}
        />
      </div>
    </div>
  );
}
