"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Truck } from "lucide-react";
import { useAuth } from "../contexts/auth-context";
import Link from "next/link";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      if (!res.success) {
        toast.error(res.message);
      }
      return router.push(`/${res.role}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg">
            <Truck className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Parcour</CardTitle>
        <CardDescription>Sign in to your logistics dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <DemoLoginDataPopulate handleDemoLogin={handleDemoLogin} />

        <div className="mt-6 text-center">
          <Link href="/signup" className="text-sm underline">
            {"Don't have an account? Sign up"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

const DemoLoginDataPopulate = ({ handleDemoLogin }: { handleDemoLogin: (email: string, password: string) => void }) => {
  const path = usePathname();

  const Component = () => {
    switch (path) {
      case "/login/admin":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("admin@gmail.com", "@Testadmin121")}
            className="text-xs"
          >
            Admin Demo
          </Button>
        );
      case "/login/agent":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("agent@gmail.com", "@Testagent121")}
            className="text-xs"
          >
            Delivery Agent Demo
          </Button>
        );
      case "/login":
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDemoLogin("customer@gmail.com", "@Testcustomer121")}
            className="text-xs"
          >
            Customer Demo
          </Button>
        );
    }
  };

  return (
    <div className="mt-6">
      <div className="grid gap-2">
        <Component />
      </div>
    </div>
  );
};
