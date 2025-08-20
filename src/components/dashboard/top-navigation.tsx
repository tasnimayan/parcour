"use client";

import { useAuth } from "../contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Package,
  User,
  LogOut,
  Home,
  History,
  MapPin,
  Plus,
} from "lucide-react";
import { useState } from "react";

export function TopNavigation() {
  const [activeTab, onTabChange] = useState("dashboard");
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "book", label: "Book Parcel", icon: Plus },
    { id: "track", label: "Track Parcel", icon: MapPin },
    { id: "history", label: "My Parcels", icon: History },
  ];

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">CourierPro</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="gap-2"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4" />
            <span className="font-medium">{user?.name}</span>
            <span className="text-muted-foreground">(Customer)</span>
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
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                className="flex-col gap-1 h-auto py-2"
                onClick={() => onTabChange(item.id)}
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
