"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { ContactInfoSection } from "./sections/contact-info-section";
import { VehicleInfoSection } from "./sections/vehicle-info-section";
import Link from "next/link";
import { agentSignupSchema, AgentSignupFormData } from "@/lib/validations/auth";

interface AgentSignupFormProps {
  onSubmit: (data: AgentSignupFormData) => void;
  isPending?: boolean;
  defaultValues?: Partial<AgentSignupFormData>;
}

export function DeliveryAgentSignupForm({ onSubmit, isPending = false, defaultValues }: AgentSignupFormProps) {
  const form = useForm<AgentSignupFormData>({
    resolver: zodResolver(agentSignupSchema),
    defaultValues: defaultValues || {},
  });

  return (
    <Card className="w-full max-w-2xl mx-auto pt-6">
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoSection />
            <ContactInfoSection />
            <VehicleInfoSection />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </FormProvider>
        <div className="mt-6 text-center">
          <Link href="/login/agent" className="text-sm underline">
            {"Already have an account? Sign in"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
