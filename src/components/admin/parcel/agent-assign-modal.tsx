import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Truck, CheckCircle } from "lucide-react";
import { Agent, Parcel } from "@/lib/mock-parcels";
import { toast } from "sonner";

interface AgentAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: Parcel | null;
  parcels?: Parcel[];
  agents: Agent[];
  onAssignAgent: (parcelId: string | string[], agentId: string) => void;
}

export const AgentAssignmentDialog = ({
  isOpen,
  onClose,
  parcel,
  parcels,
  agents,
  onAssignAgent,
}: AgentAssignmentDialogProps) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableAgents = filteredAgents.filter(
    (agent) => agent.status === "available"
  );
  const busyAgents = filteredAgents.filter((agent) => agent.status === "busy");
  const offlineAgents = filteredAgents.filter(
    (agent) => agent.status === "offline"
  );

  const handleAssign = () => {
    if (!selectedAgentId) return;

    const isBulkAssignment = parcels && parcels.length > 1;

    if (isBulkAssignment) {
      onAssignAgent(
        parcels.map((p) => p.id),
        selectedAgentId
      );
      toast(`Agent successfully assigned to ${parcels.length} parcels`);
    } else if (parcel) {
      onAssignAgent(parcel.id, selectedAgentId);
      toast(`Agent successfully assigned to parcel ${parcel.trackingNumber}`);
    }

    setSelectedAgentId("");
    setSearchTerm("");
    onClose();
  };

  const handleClose = () => {
    setSelectedAgentId("");
    setSearchTerm("");
    onClose();
  };

  const getStatusBadge = (status: Agent["status"]) => {
    const statusConfig = {
      available: {
        label: "Available",
        variant: "default" as const,
        color: "text-green-600",
      },
      busy: {
        label: "Busy",
        variant: "secondary" as const,
        color: "text-yellow-600",
      },
      offline: {
        label: "Offline",
        variant: "outline" as const,
        color: "text-gray-500",
      },
    };

    return statusConfig[status];
  };

  const AgentCard = ({
    agent,
    isDisabled = false,
  }: {
    agent: Agent;
    isDisabled?: boolean;
  }) => {
    const statusConfig = getStatusBadge(agent.status);

    return (
      <div
        className={`p-4 border border-border rounded-lg cursor-pointer transition-all ${
          selectedAgentId === agent.id
            ? "border-primary bg-primary/5"
            : isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-primary/50 hover:bg-accent/50"
        }`}
        onClick={() => !isDisabled && setSelectedAgentId(agent.id)}
      >
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={agent.avatar} alt={agent.name} />
            <AvatarFallback>
              {agent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-foreground truncate">
                {agent.name}
              </h4>
              <Badge variant={statusConfig.variant} className="text-xs">
                {statusConfig.label}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-2 truncate">
              {agent.email}
            </p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>{agent.activeDeliveries} active</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                <span>{agent.completedDeliveries} completed</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-current text-yellow-500" />
                <span>{agent.rating}</span>
              </div>
            </div>
          </div>

          {selectedAgentId === agent.id && (
            <CheckCircle className="h-5 w-5 text-primary" />
          )}
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {parcels && parcels.length > 1
              ? `Assign Agent to ${parcels.length} Parcels`
              : "Assign Agent to Parcel"}
          </DialogTitle>
          {parcel && !parcels && (
            <p className="text-sm text-muted-foreground">
              Tracking: {parcel.trackingNumber} | Priority:{" "}
              {parcel.priority.toUpperCase()}
            </p>
          )}
          {parcels && parcels.length > 1 && (
            <p className="text-sm text-muted-foreground">
              Bulk assigning agent to {parcels.length} selected parcels
            </p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-6">
            {/* Available Agents */}
            {availableAgents.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Available Agents ({availableAgents.length})
                </h3>
                <div className="space-y-2">
                  {availableAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
            )}

            {/* Busy Agents */}
            {busyAgents.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  Busy Agents ({busyAgents.length})
                </h3>
                <div className="space-y-2">
                  {busyAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
            )}

            {/* Offline Agents */}
            {offlineAgents.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Offline Agents ({offlineAgents.length})
                </h3>
                <div className="space-y-2">
                  {offlineAgents.map((agent) => (
                    <AgentCard key={agent.id} agent={agent} isDisabled />
                  ))}
                </div>
              </div>
            )}

            {filteredAgents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No agents found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedAgentId}>
            Assign Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
