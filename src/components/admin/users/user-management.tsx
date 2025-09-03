"use client";

import { useState } from "react";
import { UserFilters } from "./user-filters";
import { UserList } from "./user-list";
import { UserRole, UserStatus } from "@/types";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<UserStatus | "all">("all");

  return (
    <div className="flex flex-col gap-y-6 flex-1">
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <UserList role={selectedRole} status={selectedStatus} searchTerm={searchTerm} />
    </div>
  );
}
