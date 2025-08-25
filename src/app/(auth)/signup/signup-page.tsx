"use client";

import { useEffect, useState } from "react";
import { CustomerSignupForm } from "@/components/forms/customer-signup-form";
import type { CustomerSignupFormData } from "@/lib/validations/customer";
import { toast } from "sonner";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleSignup = async (data: CustomerSignupFormData) => {
    setIsLoading(true);

    try {
      // Here you would typically make an API call to create the customer
      console.log("Customer signup data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Account created successfully!");

      // Redirect to dashboard or login page
      // router.push('/dashboard')
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Join Our Courier Service</h1>
          <p className="text-muted-foreground mt-2">
            Create your account to start sending and receiving packages with ease
          </p>
        </div>

        <CustomerSignupForm onSubmit={handleSignup} isLoading={isLoading} location={location} />
      </div>
    </div>
  );
}
