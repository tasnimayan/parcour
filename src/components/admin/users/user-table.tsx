import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: "active" | "inactive" | "pending";
  location: string;
  joinDate: string;
  lastActive?: string;
  avatar?: string;
}

interface UserTableProps {
  users: User[];
  currentPage: number;
  itemsPerPage: number;
}

const StatusDropdown = ({
  status,
  onChange,
}: {
  status: User["status"];
  onChange: (newStatus: User["status"]) => void;
}) => {
  const colors = {
    active: "bg-green-600 text-white",
    inactive: "bg-muted text-muted-foreground",
    pending: "bg-red-100 text-red-600",
  };

  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger
        className={`w-auto h-auto py-0.5 px-2 gap-1 border-none bg-transparent shadow-none focus:ring-0 ${colors[status]}`}
      >
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
};

const getRoleBadge = (role: string) => {
  return <span>{role.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}</span>;
};

export function UserTable({ users, currentPage, itemsPerPage }: UserTableProps) {
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

  const headers = [
    { id: "name", label: "User" },
    { id: "role", label: "Role" },
    { id: "status", label: "Status" },
    { id: "location", label: "Location" },
    { id: "joinDate", label: "Join Date" },
    { id: "actions", label: "Actions", style: "text-right" },
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted">
          <TableHead className="w-12">
            <Checkbox
              checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
              onCheckedChange={handleSelectAll}
            />
          </TableHead>
          {headers.map((header) => (
            <TableHead key={header.id} className={header.style}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox
                checked={selectedUsers.includes(user.id)}
                onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email || user.phone}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>
              <StatusDropdown status={user.status} onChange={(newStatus) => console.log(newStatus)} />
              {/* {getStatusBadge(user.status)} */}
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{user.location}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{user.joinDate}</TableCell>
            <TableCell className="text-right">
              <UserActions userId={user.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const UserActions = ({ userId }: { userId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/users/${userId}`}>
            <Eye className="mr-2 h-4 w-4" />
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/users/${userId}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit user
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
