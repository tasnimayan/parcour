"use client";

import { AdminSignupForm } from "@/components/forms/admin-signup-form";
import { adminSignupRequest } from "@/lib/auth-api";
import { AdminSignupFormData } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminSignupPage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: adminSignupRequest,
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login/admin");
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = (data: AdminSignupFormData) => {
    mutate(data);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Registration</h1>
          <p className="text-gray-600 mt-2">Join our courier management team</p>
        </div>
        <AdminSignupForm onSubmit={handleSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
