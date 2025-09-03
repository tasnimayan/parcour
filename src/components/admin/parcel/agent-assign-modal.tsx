import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SearchInput } from "@/components/shared/search-input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePaginationState } from "@/hooks/use-pagination";
import { useQuery } from "@tanstack/react-query";
import { AgentData, MetaData, getAllAgents } from "@/lib/admin-api";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";

type AgentCardProps = {
  agent: AgentData;
  isSelected?: boolean;
  onSelect: (agentId: string) => void;
};

type AgentListProps = {
  searchTerm: string;
  currentPage: number;
  selectedAgent: string;
  onSelect: (agentId: string) => void;
};

interface AgentAssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parcelId: string;
  onAssignAgent: (parcelId: string, agentId: string) => void;
}

const AgentCard = ({ agent, isSelected, onSelect }: AgentCardProps) => {
  return (
    <Button
      onClick={() => onSelect(agent.userId)}
      variant="outline"
      size="auto"
      className={cn(
        "justify-start p-2 hover:border-blue-500/50 hover:bg-blue-100/50",
        isSelected && "border-blue-500 bg-blue-100"
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {/* <AvatarImage src={agent.avatar} alt={agent.name} /> */}
          <AvatarFallback>{agent.fullName[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0 text-start">
          <h4 className="font-medium text-foreground truncate mb-1">{agent.fullName}</h4>
          <p className="text-sm text-muted-foreground mb-2 truncate">{agent.user.email}</p>
        </div>
      </div>
    </Button>
  );
};

const AgentList = ({ searchTerm, currentPage, selectedAgent, onSelect }: AgentListProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["AGENTS", searchTerm, currentPage],
    queryFn: () =>
      getAllAgents({
        search: searchTerm,
        page: currentPage,
      }),
    select: (data) => ({
      agents: data.data,
      meta: data.meta as MetaData,
    }),
  });

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState size="sm" />;
  if (!data?.agents || data.agents.length === 0) return <EmptyState icon={Search} size="sm" title="No agents found" />;

  return (
    <>
      <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Available Agents ({data.agents.length})
      </h3>
      <div className="flex flex-col gap-3">
        {data.agents.map((agent) => (
          <AgentCard key={agent.userId} agent={agent} isSelected={selectedAgent === agent.userId} onSelect={onSelect} />
        ))}
      </div>
    </>
  );
};

export const AgentListDialog = ({ isOpen, onClose, parcelId, onAssignAgent }: AgentAssignmentDialogProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const { currentPage } = usePaginationState(1, 20);

  const handleAssign = () => {
    if (!selectedAgent || !parcelId) return;

    onAssignAgent(parcelId, selectedAgent);
    setSelectedAgent("");
    setSearchTerm("");
    onClose();
  };

  const handleClose = () => {
    setSelectedAgent("");
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Assign Agent to Parcel</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto space-y-3 p-2">
          {/* Search */}
          <SearchInput searchTerm={searchTerm} onChange={setSearchTerm} placeholder="Search agents..." />
          <AgentList
            searchTerm={searchTerm}
            currentPage={currentPage}
            selectedAgent={selectedAgent}
            onSelect={setSelectedAgent}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedAgent}>
            Assign Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
