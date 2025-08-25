"use client";

import { useState } from "react";
import { UserFilters } from "./user-filters";
import { UserList } from "./user-table";
import { UserRole } from "@/types";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div className="space-y-6 flex flex-col">
      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <UserList selectedRole={selectedRole} searchTerm={searchTerm} />
    </div>
  );
}
