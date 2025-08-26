import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { SearchInput } from "@/components/shared/search-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePaginationState } from "@/hooks/use-pagination";
import { useQuery } from "@tanstack/react-query";
import { AgentData, MetaData, getAllAgents } from "@/lib/admin-api";
import { LoadingState } from "@/components/shared/data-states";

const AgentCard = ({ agent, isSelected }: { agent: AgentData; isSelected?: boolean }) => {
  return (
    <div
      className={cn(
        "p-4 border border-border rounded-lg cursor-pointer transition-all",
        isSelected ? "border-blue-500 bg-blue-100" : "hover:border-blue-500/50 hover:bg-blue-100/50"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12">
          {/* <AvatarImage src={agent.avatar} alt={agent.name} /> */}
          <AvatarFallback>{agent.fullName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate mb-1">{agent.fullName}</h4>
          <p className="text-sm text-muted-foreground mb-2 truncate">{agent.user.email}</p>
        </div>
      </div>
    </div>
  );
};

interface AgentAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parcels?: string[];
  onAssignAgent: (parcelId: string | string[], agentId: string) => void;
}

export const AgentAssignmentDialog = ({ isOpen, onClose, parcels, onAssignAgent }: AgentAssignmentDialogProps) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage, itemsPerPage } = usePaginationState(1, 20);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getAllAgents({
        search: searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      }),
    select: (data) => ({
      agents: data.data,
      meta: data.meta as MetaData,
    }),
  });

  const handleAssign = () => {
    if (!selectedAgentId) return;

    const isBulkAssignment = parcels && parcels.length > 1;

    if (isBulkAssignment) {
      onAssignAgent(parcels, selectedAgentId);
      toast.success(`Agent successfully assigned to ${parcels.length} parcels`);
    } else if (parcels?.length) {
      onAssignAgent(parcels[0], selectedAgentId);
      toast.success("Agent successfully assigned to parcel");
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

  if (isLoading) return <LoadingState />;
  if (isError) return <div>Error fetching data</div>;
  if (!data?.agents) return <div>No data found</div>;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {parcels && parcels.length > 1 ? `Assign Agent to ${parcels.length} Parcels` : "Assign Agent to Parcel"}
          </DialogTitle>
          {parcels && parcels.length > 1 && (
            <p className="text-sm text-muted-foreground">Bulk assigning agent to {parcels.length} selected parcels</p>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Search */}
          <SearchInput searchTerm={searchTerm} onChange={setSearchTerm} placeholder="Search agents..." />

          <div className="space-y-6">
            {/* Available Agents */}
            {data.agents.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Available Agents ({data.agents.length})
                </h3>
                <div className="space-y-2">
                  {data.agents.map((agent) => (
                    <AgentCard key={agent.userId} agent={agent} />
                  ))}
                </div>
              </div>
            )}

            {data.agents.length === 0 && (
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
