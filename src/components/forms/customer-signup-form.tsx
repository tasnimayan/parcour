"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { customerSignupSchema, type CustomerSignupFormData } from "@/lib/validations/customer";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { ContactInfoSection } from "./sections/contact-info-section";
import { AddressSection } from "./sections/address-section";

interface CustomerSignupFormProps {
  onSubmit: (data: CustomerSignupFormData) => void;
  isLoading?: boolean;
  location?: { lat: number; lng: number } | null;
}

export function CustomerSignupForm({ onSubmit, isLoading = false, location }: CustomerSignupFormProps) {
  const form = useForm<CustomerSignupFormData>({
    resolver: zodResolver(customerSignupSchema),
    defaultValues: {
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
        latitude: location?.lat,
        longitude: location?.lng,
      },
    },
  });

  const handleSubmit = (data: CustomerSignupFormData) => {
    onSubmit(data);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Join our courier service to start sending and receiving packages</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <PersonalInfoSection form={form} />

          <div className="h-px bg-muted-foreground w-full" />

          <ContactInfoSection form={form} />

          <div className="h-px bg-muted-foreground w-full" />

          <AddressSection form={form} />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
