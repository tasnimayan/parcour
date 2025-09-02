"use client";
import { useState } from "react";
import { MoreVertical, User, MapPin, Clock, Package, DollarSign, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AgentAssignmentDialog } from "./agent-assign-modal";
import Link from "next/link";
import { ParcelData, setAgentToParcel } from "@/lib/admin-api";
import { format } from "date-fns";
import { EmptyState } from "@/components/shared/data-states";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ParcelTableProps {
  parcels: ParcelData[];
}

export const ParcelTable = ({ parcels }: ParcelTableProps) => {
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);

  const isAllSelected = parcels.length > 0 && parcels.every((parcel) => selectedParcels.includes(parcel.id));
  const isIndeterminate = parcels.some((parcel) => selectedParcels.includes(parcel.id)) && !isAllSelected;

  const onSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedParcels(parcels.map((parcel) => parcel.id));
    } else {
      setSelectedParcels([]);
    }
  };

  const onSelectParcel = (parcelId: string, checked: boolean) => {
    if (checked) {
      setSelectedParcels([...selectedParcels, parcelId]);
    } else {
      setSelectedParcels(selectedParcels.filter((id) => id !== parcelId));
    }
  };
  const qc = useQueryClient();

  const assignAgent = useMutation({
    mutationKey: ["ASSIGN_AGENT"],
    mutationFn: ({ parcelId, agentId }: { parcelId: string; agentId: string }) => setAgentToParcel(parcelId, agentId),
    onSuccess: () => {
      toast.success("Agent assigned successfully");
      setSelectedParcels([]);
      qc.invalidateQueries({ queryKey: ["PARCELS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAssignAgent = (parcelId: string, agentId: string) => {
    if (!parcelId || !agentId) return;
    assignAgent.mutate({ parcelId, agentId });
  };

  if (!parcels || parcels.length === 0)
    return <EmptyState icon={Package} title="No parcels found" description="Try adjusting your filter" />;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="w-12">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={onSelectAll}
              aria-label="Select all parcels"
              className={isIndeterminate ? "data-[state=checked]:bg-primary" : ""}
            />
          </TableHead>
          <TableHead className="w-40">Tracking #</TableHead>
          <TableHead>Sender & Recipient</TableHead>
          <TableHead className="w-32">Service</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead className="w-24">Priority</TableHead>
          <TableHead className="w-28">Value</TableHead>
          <TableHead className="w-32">Est. Delivery</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parcels.map((parcel) => {
          return (
            <TableRow
              key={parcel.id}
              className={`hover:bg-muted/30 ${
                selectedParcels.includes(parcel.id) ? "bg-primary/5 border-primary/20" : ""
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedParcels.includes(parcel.id)}
                  onCheckedChange={(checked) => onSelectParcel(parcel.id, checked as boolean)}
                  aria-label={`Select parcel ${parcel.trackingCode}`}
                />
              </TableCell>
              <TableCell>
                <div className="font-mono text-sm font-medium text-primary">{parcel.trackingCode}</div>
                <div className="text-xs text-muted-foreground">
                  {parcel.parcelWeight}kg • {parcel.parcelSize}
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-green-600" />
                    <span className="font-medium truncate max-w-40">{parcel.customer?.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3 text-red-600" />
                    <span className="truncate max-w-40">{parcel.customer?.fullName}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm capitalize">Express</span>
                </div>
              </TableCell>

              <TableCell>
                <Badge className="text-xs rounded-full">{parcel.status || "Pending"}</Badge>
              </TableCell>

              <TableCell>
                <Badge className="text-xs rounded-full">Low</Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{parcel.codAmount}</span>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{parcel.createdAt && format(parcel.createdAt, "dd MMM")}</span>
                </div>
              </TableCell>

              <TableCell>
                <ParcelActionMenu
                  parcelId={parcel.id}
                  isAgentAssigned={!!parcel.assignment?.agentId}
                  onAssignAgent={handleAssignAgent}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const ParcelActionMenu = ({
  parcelId,
  isAgentAssigned,
  onAssignAgent,
}: {
  parcelId: string;
  isAgentAssigned: boolean;
  onAssignAgent: (parcelId: string, agentId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AgentAssignmentDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        parcelId={parcelId}
        onAssignAgent={onAssignAgent}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild>
            <Link href={`/admin/parcels/${parcelId}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            {isAgentAssigned ? "Reassign Agent" : "Assign Agent"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
