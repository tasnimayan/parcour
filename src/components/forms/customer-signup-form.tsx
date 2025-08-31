"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { customerSignupSchema, type CustomerSignupFormData } from "@/lib/validations/customer";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { ContactInfoSection } from "./sections/contact-info-section";
import { AddressSection } from "./sections/address-section";

interface CustomerSignupFormProps {
  onSubmit: (data: CustomerSignupFormData) => void;
  isPending?: boolean;
  defaultValues?: CustomerSignupFormData;
}

export function CustomerSignupForm({ onSubmit, isPending = false, defaultValues }: CustomerSignupFormProps) {
  const form = useForm<CustomerSignupFormData>({
    resolver: zodResolver(customerSignupSchema),
    defaultValues: defaultValues || {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      altPhone: "",
      governmentId: "",
      dob: "",
      gender: undefined,
      address: {
        label: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Join our courier service to start sending and receiving packages</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoSection />

            <ContactInfoSection />

            <AddressSection />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
