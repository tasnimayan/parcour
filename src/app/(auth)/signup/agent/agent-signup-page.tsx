"use client";

import { DeliveryAgentSignupForm } from "@/components/forms/delivery-agent-signup-form";
import { AgentSignupFormData } from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { agentSignupRequest } from "@/lib/auth-api";
import { toast } from "sonner";

export default function AgentSignupPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: agentSignupRequest,
    onSuccess: () => {
      toast.success("Account created successfully!");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const onSubmit = async (data: AgentSignupFormData) => {
    mutate(data);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Delivery Agent Registration</h1>
          <p className="mt-2 text-gray-600">Join thousands of delivery agents earning flexible income</p>
        </div>
        <DeliveryAgentSignupForm onSubmit={onSubmit} isPending={isPending} />
      </div>
    </div>
  );
}
