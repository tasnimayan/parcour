import ParcelList from "@/components/agent/parcels/parcel-list";
import { PageHeader } from "@/components/shared/page-header";

export default function Page() {
  return (
    <>
      <PageHeader title="My Parcels" subtitle="Manage assigned deliveries" />
      <ParcelList />
    </>
  );
}
