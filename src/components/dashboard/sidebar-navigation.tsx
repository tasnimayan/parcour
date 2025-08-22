"use client";

import { useState } from "react";
import { useAuth } from "../contexts/auth-context";
import { Button } from "@/components/ui/button";
import { cn, useActivePath } from "@/lib/utils";
import {
  Package,
  Truck,
  Settings,
  Users,
  BarChart3,
  FileText,
  LogOut,
  Menu,
  X,
  Home,
  Route,
  Clock,
  LucideIcon,
} from "lucide-react";
import { User, mockUsers } from "@/lib/auth";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Navigation item
const adminNavItems = [
  { path: "/admin", label: "Overview", icon: Home },
  { path: "/admin/users", label: "User Mangement", icon: Users },
  { path: "/admin/assignments", label: "Parcel Assignment", icon: Package },
  { path: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/admin/reports", label: "Reports", icon: FileText },
];

const agentNavItems = [
  { path: "/agent", label: "Dashboard", icon: Home },
  { path: "/agent/parcels", label: "My Parcels", icon: Package },
  { path: "/agent/routes", label: "Route Optimizer", icon: Route },
  { path: "/agent/history", label: "Delivery History", icon: Clock },
];

function SidebarHeader({ isCollapsed, toggleCollapse }: { isCollapsed: boolean; toggleCollapse: () => void }) {
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
      <Button variant="ghost" size="sm" onClick={toggleCollapse} className="h-8 w-8 p-0">
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
  isCollapsed,
}: {
  items: { path: string; label: string; icon: LucideIcon }[];
  isCollapsed: boolean;
}) {
  const { isActive } = useActivePath();
  return (
    <nav className="flex-1 p-4">
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Button
                variant={isActive(item.path, true) ? "default" : "ghost"}
                className={cn("w-full justify-start gap-3", isCollapsed && "px-2")}
                asChild
              >
                <Link href={item.path}>
                  <Icon className="w-4 h-4" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const SidebarNavigation = ({
  navItems,
  user,
  onLogout,
}: {
  navItems: { path: string; label: string; icon: LucideIcon }[];
  user: User;
  onLogout: () => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-scree overflow-y-auto bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} toggleCollapse={() => setIsCollapsed((c) => !c)} />
      <NavigationList items={navItems} isCollapsed={isCollapsed} />
      <UserInfo user={user} isCollapsed={isCollapsed} />

      <div className="p-4 border-t">
        <Button
          variant="outline"
          className={cn("w-full justify-start gap-3", isCollapsed && "px-2")}
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export function AdminSidebarNav() {
  const { logout } = useAuth();
  const user = mockUsers.find((user) => user.role === "admin");

  const handleLogout = async () => {
    await logout();
  };

  return <SidebarNavigation navItems={adminNavItems} user={user!} onLogout={handleLogout} />;
}

export function AgentSidebarNav() {
  const { logout } = useAuth();
  const user = mockUsers.find((user) => user.role === "agent");

  const handleLogout = async () => {
    await logout();
  };

  return <SidebarNavigation navItems={agentNavItems} user={user!} onLogout={handleLogout} />;
}
