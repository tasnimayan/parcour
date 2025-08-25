import UserManagement from "@/components/admin/users/user-management";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <>
      <PageHeader title="Users" subtitle="Manage your users and their roles">
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </PageHeader>
      <UserManagement />
    </>
  );
}
