"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Package, Truck } from "lucide-react";
import { useAuth } from "../contexts/auth-context";

interface LoginFormProps {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-accent rounded-lg">
            <Truck className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">CourierPro</CardTitle>
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

        <div className="mt-6">
          <div className="text-sm text-muted-foreground text-center mb-3">Demo Accounts (password: password123)</div>
          <div className="grid gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("admin@courier.com")}
              className="text-xs"
            >
              Admin Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("agent@courier.com")}
              className="text-xs"
            >
              Delivery Agent Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("customer@example.com")}
              className="text-xs"
            >
              Customer Demo
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="link" onClick={onToggleMode} className="text-sm">
            {"Don't have an account? Sign up"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
