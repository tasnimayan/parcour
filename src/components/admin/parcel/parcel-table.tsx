import { useState } from "react";
import { MoreVertical, User, MapPin, Clock, Package, DollarSign, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Parcel } from "@/lib/mock-parcels";
import { AgentAssignmentDialog } from "./agent-assign-modal";
import { mockAgents } from "@/lib/mock-parcels";
import Link from "next/link";

interface ParcelTableProps {
  parcels: Parcel[];
  selectedParcels: string[];
  onSelectParcel: (parcelId: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onAssignAgent: (parcelId: string, agentId: string) => void;
}

export const ParcelTable = ({
  parcels,
  selectedParcels,
  onSelectParcel,
  onSelectAll,
  onAssignAgent,
}: ParcelTableProps) => {
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const getStatusBadge = (status: Parcel["status"]) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      in_transit: { label: "In Transit", variant: "default" as const },
      delivered: { label: "Delivered", variant: "default" as const },
      failed: { label: "Failed", variant: "destructive" as const },
      returned: { label: "Returned", variant: "outline" as const },
    };

    return statusConfig[status];
  };

  const getPriorityBadge = (priority: Parcel["priority"]) => {
    const priorityConfig = {
      low: { label: "Low", variant: "outline" as const },
      medium: { label: "Medium", variant: "secondary" as const },
      high: { label: "High", variant: "default" as const },
      urgent: { label: "Urgent", variant: "destructive" as const },
    };

    return priorityConfig[priority];
  };

  const handleAssignAgent = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsAssignDialogOpen(true);
  };

  const isAllSelected = parcels.length > 0 && parcels.every((parcel) => selectedParcels.includes(parcel.id));
  const isIndeterminate = parcels.some((parcel) => selectedParcels.includes(parcel.id)) && !isAllSelected;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
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
            <TableHead className="w-32">Tracking #</TableHead>
            <TableHead>Sender & Recipient</TableHead>
            <TableHead className="w-24">Status</TableHead>
            <TableHead className="w-24">Priority</TableHead>
            <TableHead className="w-32">Service</TableHead>
            <TableHead>Assigned Agent</TableHead>
            <TableHead className="w-28">Value</TableHead>
            <TableHead className="w-32">Est. Delivery</TableHead>
            <TableHead className="w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.map((parcel) => {
            const statusConfig = getStatusBadge(parcel.status);
            const priorityConfig = getPriorityBadge(parcel.priority);

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
                    aria-label={`Select parcel ${parcel.trackingNumber}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-mono text-sm font-medium text-primary">{parcel.trackingNumber}</div>
                  <div className="text-xs text-muted-foreground">
                    {parcel.weight}kg • {parcel.dimensions}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-green-600" />
                      <span className="font-medium truncate max-w-40">{parcel.sender.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-3 w-3 text-red-600" />
                      <span className="truncate max-w-40">{parcel.recipient.name}</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant={statusConfig.variant} className="text-xs">
                    {statusConfig.label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant={priorityConfig.variant} className="text-xs">
                    {priorityConfig.label}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm capitalize">{parcel.service.replace("_", " ")}</span>
                  </div>
                </TableCell>

                <TableCell>
                  {parcel.assignedAgent ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={parcel.assignedAgent.avatar} alt={parcel.assignedAgent.name} />
                        <AvatarFallback className="text-xs">
                          {parcel.assignedAgent.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm truncate max-w-24">{parcel.assignedAgent.name}</span>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="gap-1 h-7" onClick={() => handleAssignAgent(parcel)}>
                      <User className="h-3 w-3" />
                      Assign
                    </Button>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm font-medium">{parcel.value.toFixed(2)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{formatDate(parcel.estimatedDelivery)}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem>
                        <Link href={`/admin/parcels/${parcel.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAssignAgent(parcel)}>
                        <User className="mr-2 h-4 w-4" />
                        {parcel.assignedAgent ? "Reassign Agent" : "Assign Agent"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {parcels.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No parcels found</p>
          <p className="text-sm">Try adjusting your search criteria</p>
        </div>
      )}
      <AgentAssignmentDialog
        isOpen={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        parcel={selectedParcel}
        agents={mockAgents}
        onAssignAgent={onAssignAgent}
      />
    </div>
  );
};
