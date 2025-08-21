import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  location: string;
  lastActive: string;
  joinDate: string;
  avatar?: string;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  itemsPerPage: number;
}

export function UserTable({
  users,
  currentPage,
  itemsPerPage,
}: UserTableProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(paginatedUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const getStatusBadge = (status: User["status"]) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
    } as const;

    const colors = {
      active: "bg-success text-success",
      inactive: "bg-muted text-muted-foreground",
      pending: "bg-warning text-warning",
    };

    return (
      <Badge className={colors[status]} variant={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: "bg-destructive text-destructive-foreground",
      manager: "bg-primary text-primary-foreground",
      driver: "bg-accent text-accent-foreground",
      dispatcher: "bg-secondary text-secondary-foreground",
      customer_service: "bg-muted text-muted-foreground",
    } as Record<string, string>;

    return (
      <Badge
        className={colors[role] || "bg-muted text-muted-foreground"}
        variant="secondary"
      >
        {role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Badge>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="w-12">
            <Checkbox
              checked={
                selectedUsers.length === paginatedUsers.length &&
                paginatedUsers.length > 0
              }
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedUsers.map((user) => (
          <TableRow
            key={user.id}
            className="hover:bg-blue-100 transition-colors"
          >
            <TableCell>
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onCheckedChange={(checked) =>
                  handleSelectUser(user.id, checked as boolean)
                }
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>{getStatusBadge(user.status)}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{user.location}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {user.lastActive}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {user.joinDate}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit user
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete user
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
