import { EmptyState } from "@/components/shared/data-states";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-full">
      <EmptyState title="Select a parcel to view details" />
    </div>
  );
}
