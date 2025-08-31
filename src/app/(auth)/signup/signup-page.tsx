"use client";

import { CustomerSignupForm } from "@/components/forms/customer-signup-form";
import type { CustomerSignupFormData } from "@/lib/validations/customer";
import { toast } from "sonner";
import { customerSignupRequest } from "@/lib/auth-api";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "@/hooks/use-location";

export default function SignupPage() {
  const location = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: customerSignupRequest,
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = (data: CustomerSignupFormData) => {
    const formData = { ...data, address: { ...data.address, latitude: location?.lat, longitude: location?.lng } };
    mutate(formData);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Join Our Courier Service</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start sending and receiving packages with ease
          </p>
        </div>

        <CustomerSignupForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
