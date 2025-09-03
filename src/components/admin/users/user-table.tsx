import { useState } from "react";
import { MoreHorizontal, Edit, Trash2, Eye, Search } from "lucide-react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { UserData, updateUserStatus } from "@/lib/admin-api";
import { UserStatus } from "@/types";
import { format } from "date-fns";
import { toast } from "sonner";
import { EmptyState } from "@/components/shared/data-states";
import { useSelection } from "@/hooks/use-selection";

const headers = [
  { id: "name", label: "User" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "contact", label: "Contact" },
  { id: "joinDate", label: "Join Date" },
  { id: "actions", label: "Actions", style: "text-right" },
];

const StatusDropdown = ({
  userId,
  status,
  onChange,
}: {
  userId: string;
  status: UserStatus;
  onChange: (userId: string, newStatus: UserStatus) => void;
}) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const colors = {
    pending: "text-orange-600",
    active: "text-green-600 ",
    inactive: "text-muted-foreground",
    suspended: "text-yellow-600",
    deleted: "text-red-600",
  };

  const handleStatusChange = (newStatus: UserStatus) => {
    setCurrentStatus(newStatus);
    onChange(userId, newStatus);
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger
        className={`w-auto min-h-0 py-0.5 px-2 gap-2 font-semibold border-none bg-transparent shadow-none  focus:ring-0 !h-6 ${colors[currentStatus]}`}
      >
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="suspended">Suspended</SelectItem>
        <SelectItem value="deleted" disabled>
          Deleted
        </SelectItem>
        <SelectItem value="pending" disabled>
          Pending
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const getRoleBadge = (role: string) => {
  return <span>{role.replace(/\b\w/g, (l) => l.toUpperCase())}</span>;
};

export function UserTable({ users }: { users: UserData[] }) {
  const { selectedIds, isSelected, toggle, clear, toggleAll } = useSelection<string>();

  const onSelectAll = (checked: boolean) => {
    if (checked) {
      toggleAll(users.map((user) => user.id));
    } else {
      clear();
    }
  };

  const onStatusChange = async (userId: string, newStatus: UserStatus) => {
    updateUserStatus(userId, newStatus)
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Table className="flex-1 ">
      <TableHeader className="bg-muted">
        <TableRow>
          <TableHead className="w-12">
            <Checkbox checked={selectedIds.length === users.length && users.length > 0} onCheckedChange={onSelectAll} />
          </TableHead>
          {headers.map((header) => (
            <TableHead key={header.id} className={header.style}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="text-s">
        {users.length === 0 ? (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={headers.length + 1}>
              <EmptyState title="No users found" icon={Search} />
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox checked={isSelected(user.id)} onCheckedChange={() => toggle(user.id)} />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    {/* <AvatarImage src={user.avatar} alt={user.profile.fullName} /> */}
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.profile.fullName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-foreground">{user.profile.fullName}</div>
                    <div className="text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>
                <StatusDropdown
                  userId={user.id}
                  status={user.status.toLowerCase() as UserStatus}
                  onChange={onStatusChange}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <span>{user.profile.phone || "-"}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{format(user.createdAt, "dd MMM yyyy")}</TableCell>
              <TableCell className="text-right">
                <UserActions userId={user.id} />
              </TableCell>
            </TableRow>
          ))
        )}
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
