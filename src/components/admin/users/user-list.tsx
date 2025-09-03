import { MetaData, getAllUsers } from "@/lib/admin-api";
import { useQuery } from "@tanstack/react-query";
import { UserRole } from "@/types";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { UserPagination } from "@/components/shared/user-pagination";
import { usePaginationState } from "@/hooks/use-pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserTable } from "./user-table";
import { UserStatus } from "@/types";
import { Search } from "lucide-react";

type UserFilterProps = {
  role: UserRole | "all";
  status: UserStatus | "all";
  searchTerm: string;
};

export function UserList({ role, status, searchTerm }: UserFilterProps) {
  const { currentPage, itemsPerPage, onPageChange, onLimitChange } = usePaginationState(1, 10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["USERS", role, status, searchTerm, currentPage, itemsPerPage],
    queryFn: () =>
      getAllUsers({
        role: role !== "all" ? role : undefined,
        status: status !== "all" ? status : undefined,
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
  if (isError) return <ErrorState />;
  if (!data) return <EmptyState title="No users found" icon={Search} />;

  return (
    <>
      <ScrollArea className="flex-1">
        <UserTable users={data.users || []} />
      </ScrollArea>
      <UserPagination
        currentPage={currentPage}
        totalItems={data.meta?.total || 0}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onLimitChange}
      />
    </>
  );
}
