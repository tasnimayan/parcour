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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetaData, UserData, getAllUsers } from "@/lib/admin-api";
import { useQuery } from "@tanstack/react-query";
import { UserRole, UserStatus } from "@/types";
import { LoadingState } from "@/components/shared/data-states";
import { UserPagination } from "@/components/shared/user-pagination";
import { usePaginationState } from "@/hooks/use-pagination";

interface UserTableProps {
  users: UserData[];
  currentPage: number;
  itemsPerPage: number;
}

const StatusDropdown = ({ status, onChange }: { status: UserStatus; onChange: (newStatus: UserStatus) => void }) => {
  const colors = {
    pending: "bg-red-100 text-red-600",
    active: "bg-green-600 text-white",
    inactive: "bg-muted text-muted-foreground",
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
    <Table className="flex-1">
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
                  {/* <AvatarImage src={user.avatar} alt={user.profile.fullName} /> */}
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {user.profile.fullName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{user.profile.fullName}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>
              <StatusDropdown
                status={user.status.toLowerCase() as UserStatus}
                onChange={(newStatus) => console.log(newStatus)}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{user.profile.phone}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{user.createdAt}</TableCell>
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

type UserFilterProps = {
  selectedRole: UserRole | "all";
  searchTerm: string;
};

export function UserList({ selectedRole, searchTerm }: UserFilterProps) {
  const { currentPage, itemsPerPage, onPageChange, onLimitChange } = usePaginationState(1, 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllUsers({
        role: selectedRole !== "all" ? selectedRole : undefined,
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      }),
    select: (data) => ({
      users: data.data,
      meta: data.meta as MetaData,
    }),
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <div>Error fetching data</div>;
  if (!data) return <div>No data found</div>;

  return (
    <>
      <UserTable users={data.users || []} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <UserPagination
        currentPage={currentPage}
        totalItems={data.meta.total}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onLimitChange}
      />
    </>
  );
}
