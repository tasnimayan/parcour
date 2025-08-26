"use client";
import { useAuth } from "@/components/contexts/auth-context";
import { LoadingState } from "@/components/shared/data-states";
import { useRouter } from "next/navigation";

export default function WithAuth({
  children,
  roles,
  redirect = "/",
}: {
  children: React.ReactNode;
  roles?: string[];
  redirect?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <LoadingState />;
  }

  if (!user) {
    router.replace(redirect);
    return null;
  }

  if (roles && !roles.includes(user.role)) {
    router.replace(redirect);
    return null;
  }

  return <>{children}</>;
}
