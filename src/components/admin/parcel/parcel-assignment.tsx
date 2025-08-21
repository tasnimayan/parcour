"use client";

import { useState, useMemo } from "react";
import { ParcelFilters } from "./parcel-filters";
import { ParcelTable } from "./parcel-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockParcels, mockAgents, Parcel } from "@/lib/mock-parcels";

import { Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentAssignmentDialog } from "./agent-assign-modal";
import { UserPagination } from "../../shared/user-pagination";

const ITEMS_PER_PAGE = 10;

interface SelectionHeaderProps {
  selectedCount?: number;
  selectedParcels?: Parcel[];
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
        parcel={null}
        parcels={selectedParcels}
        agents={mockAgents}
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
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("pending");

  // Filter parcels based on search, filters, and active tab
  const filteredParcels = useMemo(() => {
    return parcels.filter((parcel) => {
      const matchesSearch =
        parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.sender.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        parcel.recipient.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTab = parcel.status === activeTab;
      const matchesStatus = statusFilter === "all" || parcel.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || parcel.priority === priorityFilter;
      const matchesService = serviceFilter === "all" || parcel.service === serviceFilter;

      return matchesSearch && matchesTab && matchesStatus && matchesPriority && matchesService;
    });
  }, [parcels, searchTerm, activeTab, statusFilter, priorityFilter, serviceFilter]);

  // Paginate filtered parcels
  const paginatedParcels = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredParcels.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredParcels, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredParcels.length / itemsPerPage);

  const handleAssignAgent = (parcelIds: string | string[], agentId: string) => {
    const agent = mockAgents.find((a) => a.id === agentId);
    if (!agent) return;

    const idsArray = Array.isArray(parcelIds) ? parcelIds : [parcelIds];

    setParcels((prevParcels) =>
      prevParcels.map((parcel) =>
        idsArray.includes(parcel.id)
          ? {
              ...parcel,
              assignedAgent: {
                id: agent.id,
                name: agent.name,
                avatar: agent.avatar,
              },
              status: parcel.status === "pending" ? "in_transit" : parcel.status,
            }
          : parcel
      )
    );

    // Clear selection after bulk assignment
    if (Array.isArray(parcelIds)) {
      setSelectedParcels([]);
    }
  };

  const handleSelectParcel = (parcelId: string, isSelected: boolean) => {
    setSelectedParcels((prev) => (isSelected ? [...prev, parcelId] : prev.filter((id) => id !== parcelId)));
  };

  const handleSelectAll = (isSelected: boolean) => {
    setSelectedParcels(isSelected ? paginatedParcels.map((p) => p.id) : []);
  };

  const getTabCounts = () => {
    const statuses = ["pending", "delivered", "failed", "returned"] as const;
    return statuses.reduce((acc, status) => {
      acc[status] = parcels.filter((p) => p.status === status).length;
      return acc;
    }, {} as Record<string, number>);
  };

  const tabCounts = getTabCounts();

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setServiceFilter("all");
    setCurrentPage(1);
    setSelectedParcels([]);
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
              <SelectionHeader
                selectedCount={selectedParcels.length}
                onBulkAssignAgent={(agentId) => handleAssignAgent(selectedParcels, agentId)}
                selectedParcels={
                  selectedParcels.map((id) => paginatedParcels.find((p) => p.id === id)).filter(Boolean) as Parcel[]
                }
              />
            </div>
          </div>

          <ParcelTable
            parcels={paginatedParcels}
            selectedParcels={selectedParcels}
            onSelectParcel={handleSelectParcel}
            onSelectAll={handleSelectAll}
          />

          {totalPages > 1 && (
            <UserPagination
              currentPage={currentPage}
              totalItems={filteredParcels.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
