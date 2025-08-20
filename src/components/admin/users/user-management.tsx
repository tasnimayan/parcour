"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllUsers, deleteUser, updateUserRole } from "@/lib/admin-data";
import { Users, Search, Trash2, Settings, Truck, UserIcon } from "lucide-react";
import { LoadingState } from "./shared/loading-state";
import { AlertManager } from "./shared/alert-manager";
import { useAdminState } from "@/hooks/use-admin-state";
import { User, UserRole } from "@/lib/auth";

const ROLE_CONFIG = {
  admin: { icon: Settings, color: "text-red-600 bg-red-50", label: "Admin" },
  agent: {
    icon: Truck,
    color: "text-blue-600 bg-blue-50",
    label: "Delivery Agent",
  },
  customer: {
    icon: UserIcon,
    color: "text-green-600 bg-green-50",
    label: "Customer",
  },
} as const;

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  const {
    loading,
    setLoading,
    error,
    success,
    showError,
    showSuccess,
    clearMessages,
  } = useAdminState();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter]);

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
      showError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setUpdatingUser(userId);
    clearMessages();

    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      showSuccess("User deleted successfully");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Failed to delete user");
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleUpdateRole = async (
    userId: string,
    newRole: "admin" | "agent" | "customer"
  ) => {
    setUpdatingUser(userId);
    clearMessages();

    try {
      const updatedUser = await updateUserRole(userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));
      showSuccess(`User role updated to ${ROLE_CONFIG[newRole].label}`);
    } catch (err) {
      showError(
        err instanceof Error ? err.message : "Failed to update user role"
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  const getRoleIcon = (role: string) => {
    const config = ROLE_CONFIG[role as keyof typeof ROLE_CONFIG];
    const Icon = config?.icon || UserIcon;
    return <Icon className="w-4 h-4" />;
  };

  const getRoleColor = (role: string) =>
    ROLE_CONFIG[role as keyof typeof ROLE_CONFIG]?.color ||
    "text-gray-600 bg-gray-50";

  const getRoleLabel = (role: string) =>
    ROLE_CONFIG[role as keyof typeof ROLE_CONFIG]?.label || role;

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <AlertManager error={error} success={success} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            User Management ({filteredUsers.length})
          </CardTitle>
          <CardDescription>Manage system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                  <SelectItem key={role} value={role}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* User List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      {user.phone && (
                        <p className="text-sm text-muted-foreground">
                          {user.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Select
                      value={user.role}
                      onValueChange={(newRole) =>
                        handleUpdateRole(user.id, newRole as UserRole)
                      }
                      disabled={updatingUser === user.id}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ROLE_CONFIG).map(([role, config]) => (
                          <SelectItem key={role} value={role}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      disabled={updatingUser === user.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {user.address && (
                  <div className="mt-3 text-sm text-muted-foreground">
                    <strong>Address:</strong> {user.address}
                  </div>
                )}
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No users found</p>
                <p className="text-sm mt-2">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
