"use client";

import { ParcelData } from "@/lib/admin-api";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Save } from "lucide-react";
import { StatusBadge } from "./status-badge";
import ParcelQRCode from "./parcel-qr-code";
import { STATUS_OPTIONS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ParcelStatus } from "@/types/parcel";
import { fetchUpdateParcelStatus } from "@/lib/parcel-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const ParcelUpdateSection = ({ parcel }: { parcel: ParcelData }) => {
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [status, setStatus] = useState(parcel.status);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newStatus: ParcelStatus) => fetchUpdateParcelStatus(parcel.id, newStatus),
    onSuccess: () => {
      toast.success("Parcel status updated successfully");
      qc.invalidateQueries({ queryKey: ["PARCELS", parcel.id] });
    },
    onError: () => {
      toast.error("Failed to update parcel status");
    },
  });

  const handleUpdateStatus = () => {
    mutation.mutate(status);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary" />
          <span>Update Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ParcelQRCode trackingNumber={parcel.trackingCode} />

        <div className="space-x-2">
          <label className="text-sm font-medium mb-2">Current Status</label>
          <StatusBadge status={parcel.status} />
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">New Status</label>

          <Select value={status} onValueChange={(value) => setStatus(value as ParcelStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Delivery Notes (Optional)</label>
          <Textarea
            placeholder="Add any notes about the delivery..."
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Button className="w-full" disabled={status === parcel.status} onClick={handleUpdateStatus}>
          <Save className="h-4 w-4 mr-2" />
          Update Status
        </Button>
      </CardContent>
    </Card>
  );
};
