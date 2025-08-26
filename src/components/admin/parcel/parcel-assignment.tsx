"use client";

import { useState } from "react";
import { ParcelFilters } from "./parcel-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAssignmentDialog } from "./agent-assign-modal";
import { ParcelList } from "./parcel-list";
import { ParcelStatus, ParcelPriority, ParcelService } from "@/types/parcel";

interface SelectionHeaderProps {
  selectedCount?: number;
  selectedParcels?: string[];
  onBulkAssignAgent?: (agentId: string) => void;
}

export const SelectionHeader = ({
  selectedCount = 0,
  selectedParcels = [],
  onBulkAssignAgent,
}: SelectionHeaderProps) => {
  const [isBulkAssignDialogOpen, setIsBulkAssignDialogOpen] = useState(false);
  return (
    <>
      <div className="flex items-center gap-3">
        {selectedCount > 0 ? (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm">
              <span className="font-medium">{selectedCount} selected</span>
              <Button variant="ghost" size="sm" className="h-auto p-0.5 hover:bg-primary/20">
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsBulkAssignDialogOpen(true)}>
              <Users className="h-4 w-4" />
              Bulk Assign Agent
            </Button>
          </>
        ) : null}
      </div>

      <AgentAssignmentDialog
        isOpen={isBulkAssignDialogOpen}
        onClose={() => setIsBulkAssignDialogOpen(false)}
        parcels={selectedParcels}
        onAssignAgent={(parcelIds, agentId) => {
          if (onBulkAssignAgent) {
            onBulkAssignAgent(agentId);
          }
        }}
      />
    </>
  );
};

export default function ParcelAssignment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ParcelStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<ParcelPriority | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ParcelService | "all">("all");

  const [activeTab, setActiveTab] = useState("pending");

  const tabCounts = {
    pending: 0,
    in_transit: 0,
    delivered: 0,
    failed: 0,
    returned: 0,
  };
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setServiceFilter("all");
  };

  const tabs = [
    { value: "pending", label: "Pending", count: tabCounts.pending },
    { value: "in_transit", label: "In Transit", count: tabCounts.in_transit },
    { value: "delivered", label: "Delivered", count: tabCounts.delivered },
    { value: "failed", label: "Failed", count: tabCounts.failed },
    { value: "returned", label: "Returned", count: tabCounts.returned },
  ];

  const countColors = {
    pending: "bg-primary text-primary-foreground",
    in_transit: "bg-primary text-primary-foreground",
    delivered: "bg-green-500 text-white",
    failed: "bg-red-500 text-white",
    returned: "bg-yellow-500 text-white",
  };

  return (
    <div className="min-h-screen bg-background space-y-6">
      <ParcelFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onReset={resetFilters}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="relative">
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`${
                    countColors[tab.value as keyof typeof countColors]
                  } ml-2 text-xs px-2 py-0.5 rounded-full`}
                >
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Parcels
              </h2>
              {/* <SelectionHeader
                selectedCount={selectedParcels.length}
                onBulkAssignAgent={(agentId) => handleAssignAgent(selectedParcels, agentId)}
                selectedParcels={
                  selectedParcels.map((id) => paginatedParcels.find((p) => p.id === id)).filter(Boolean) as Parcel[]
                }
              /> */}
            </div>
          </div>

          <ParcelList searchTerm={searchTerm} status={statusFilter} priority={priorityFilter} service={serviceFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
