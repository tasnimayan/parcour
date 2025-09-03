"use client";
import { useState } from "react";
import { MoreVertical, User, Package, DollarSign, Eye } from "lucide-react";
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

import { AgentListDialog } from "./agent-assign-modal";
import Link from "next/link";
import { ParcelData, setAgentToParcel } from "@/lib/admin-api";
import { EmptyState } from "@/components/shared/data-states";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSelection } from "@/hooks/use-selection";

const useAssignAgent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["ASSIGN_AGENT"],
    mutationFn: ({ parcelId, agentId }: { parcelId: string; agentId: string }) => setAgentToParcel(parcelId, agentId),
    onSuccess: () => {
      toast.success("Agent assigned successfully");
      qc.invalidateQueries({ queryKey: ["PARCELS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const ParcelTable = ({ parcels }: { parcels: ParcelData[] }) => {
  const { selectedIds, isSelected, toggle, clear, toggleAll } = useSelection<string>();
  const assignAgent = useAssignAgent();

  const onSelectAll = (checked: boolean) => {
    if (checked) toggleAll(parcels.map((parcel) => parcel.id));
    else clear();
  };

  const isAllSelected = parcels.length > 0 && selectedIds.length === parcels.length;

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
            <Checkbox checked={isAllSelected} onCheckedChange={onSelectAll} aria-label="Select all parcels" />
          </TableHead>
          <TableHead className="w-40">Tracking #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className="w-32">Assigned Agent</TableHead>
          <TableHead className="w-32">Service</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead className="w-24">Priority</TableHead>
          <TableHead className="w-28">Value</TableHead>
          <TableHead className="w-20">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {parcels.map((parcel) => {
          return (
            <TableRow key={parcel.id} className={`hover:bg-muted/30`}>
              <TableCell>
                <Checkbox
                  checked={isSelected(parcel.id)}
                  onCheckedChange={() => toggle(parcel.id)}
                  aria-label={`Select parcel ${parcel.trackingCode}`}
                />
              </TableCell>
              <TableCell>
                <div className="font-mono text-sm font-medium text-blue-700">{parcel.trackingCode}</div>
                <div className="text-xs text-muted-foreground">
                  {parcel.parcelWeight}kg • {parcel.parcelSize}
                </div>
              </TableCell>

              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium truncate max-w-40">{parcel.customer?.fullName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate max-w-40">{parcel.customer?.phone}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1 text-sm">{parcel.assignment?.agent.fullName}</div>
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
                <Badge className="bg-gray-50 text-xs text-foreground rounded-full">{parcel.priorityType}</Badge>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{parcel.codAmount}</span>
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

interface ParcelActionMenuProps {
  parcelId: string;
  isAgentAssigned: boolean;
  onAssignAgent: (parcelId: string, agentId: string) => void;
}

const ParcelActionMenu = ({ parcelId, isAgentAssigned, onAssignAgent }: ParcelActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AgentListDialog
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
