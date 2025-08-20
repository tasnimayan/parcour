"use client";

import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Package,
  Truck,
  Settings,
  Users,
  BarChart3,
  MapPin,
  FileText,
  LogOut,
  Menu,
  X,
  Home,
  Route,
  Clock,
  LucideIcon,
} from "lucide-react";
import { User, UserRole } from "@/lib/auth";

// Navigation item types and definitions
const adminNavItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "users", label: "User Mangement", icon: Users },
  { id: "assignments", label: "Parcel Assignment", icon: Package },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
];

const agentNavItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "parcels", label: "My Parcels", icon: Package },
  { id: "routes", label: "Route Optimizer", icon: Route },
  { id: "tracking", label: "Live Tracking", icon: MapPin },
  { id: "history", label: "Delivery History", icon: Clock },
];

function SidebarHeader({
  isCollapsed,
  toggleCollapse,
}: {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {!isCollapsed && (
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Package className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="font-bold">Parcour</h2>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleCollapse}
        className="h-8 w-8 p-0"
      >
        {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
      </Button>
    </div>
  );
}

function UserInfo({ user, isCollapsed }: { user: User; isCollapsed: boolean }) {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
          {user?.role === "admin" ? (
            <Settings className="w-5 h-5 text-primary" />
          ) : (
            <Truck className="w-5 h-5 text-primary" />
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{user?.name}</p>
            <p className="text-sm text-muted-foreground">
              {user?.role === "admin" ? "Administrator" : "Delivery Agent"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function NavigationList({
  items,
  activeTab,
  onTabChange,
  isCollapsed,
}: {
  items: { id: string; label: string; icon: LucideIcon }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
}) {
  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isCollapsed && "px-2"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4" />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AdminSidebarNav() {
  const [activeTab, setActiveTab] = useState("overview");

  const { logout } = useAuth();
  const user = {
    id: "1",
    email: "admin@courier.com",
    name: "Admin User",
    role: "admin" as UserRole,
    phone: "01645800408",
  };
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed((c) => !c)}
      />
      <NavigationList
        items={adminNavItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
      />
      <UserInfo user={user} isCollapsed={isCollapsed} />

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-3", isCollapsed && "px-2")}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}

export function AgentSidebarNav() {
  const [activeTab, setActiveTab] = useState("overview");

  const { logout } = useAuth();
  const user = {
    id: "2",
    email: "agent@courier.com",
    name: "John Delivery",
    role: "agent" as UserRole,
    phone: "01752100936",
  };
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed((c) => !c)}
      />
      <NavigationList
        items={agentNavItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
      />
      <UserInfo user={user} isCollapsed={isCollapsed} />

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-3", isCollapsed && "px-2")}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
