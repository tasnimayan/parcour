import TrackParcel from "@/components/customer/track-parcel";
import { Suspense } from "react";
import { LoadingState } from "@/components/shared/data-states";

export default function Track() {
  return (
    <div className="my-16 py-12 px-6">
      <Suspense fallback={<LoadingState />}>
        <TrackParcel />
      </Suspense>
    </div>
  );
}
