import ParcelAssignment from "@/components/admin/parcel/parcel-assignment";
import { PageHeader } from "@/components/admin/shared/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <>
      <PageHeader
        title="Parcel Managements"
        subtitle="Track and manage all parcels in your logistics system"
      >
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Parcel
        </Button>
      </PageHeader>
      <ParcelAssignment />
    </>
  );
}
