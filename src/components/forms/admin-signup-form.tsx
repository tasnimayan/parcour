"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminSignupSchema, type AdminSignupFormData } from "@/lib/validations/auth";
import { AdminInfoSection } from "./sections/admin-info-section";
import Link from "next/link";
interface AdminSignupFormProps {
  onSubmit: (data: AdminSignupFormData) => void;
  isPending?: boolean;
}

export function AdminSignupForm({ onSubmit, isPending = false }: AdminSignupFormProps) {
  const form = useForm<AdminSignupFormData>({
    resolver: zodResolver(adminSignupSchema),
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form id="admin-signup-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AdminInfoSection />

            <Button type="submit" form="admin-signup-form" className="w-full" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </FormProvider>
        <div className="mt-6 text-center">
          <Link href="/login/admin" className="text-sm">
            {"Already have an account? Sign in"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
