"use client";

import { useActivePath } from "@/hooks/use-path";
import { useAuth } from "../contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Package, User, LogOut, Home, History, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function TopNavigation() {
  const { user, logout } = useAuth();
  const { isActive } = useActivePath();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const navigationItems = [
    { path: "/customer", label: "Dashboard", icon: Home },
    { path: "/customer/parcels/create", label: "Create Parcel", icon: Plus },
    { path: "/tracking", label: "Track Parcel", icon: MapPin },
    { path: "/customer/history", label: "History", icon: History },
  ];

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Parcour</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={isActive(item.path, true) ? "secondary" : "ghost"}
                className="gap-2 transition-colors"
                asChild
              >
                <Link href={item.path}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="border rounded-full p-1">
              <User className="w-4 h-4" />
            </span>
            <span className="font-medium">{user?.name}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <nav className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant={isActive(item.path, true) ? "default" : "ghost"}
                size="sm"
                className="flex-col gap-1 h-auto py-2 transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
