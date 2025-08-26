"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deliveryAgentSignupSchema, type DeliveryAgentSignupFormData } from "@/lib/validations/delivery-agent";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { ContactInfoSection } from "./sections/contact-info-section";
import { VehicleInfoSection } from "./sections/vehicle-info-section";
import { toast } from "sonner";

export function DeliveryAgentSignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<DeliveryAgentSignupFormData>({
    resolver: zodResolver(deliveryAgentSignupSchema),
  });

  const onSubmit = async (data: DeliveryAgentSignupFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Delivery Agent Signup Data:", data);

      toast.success("Delivery agent account created successfully.");

      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto pt-6">
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoSection />
            <ContactInfoSection />
            <VehicleInfoSection />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
