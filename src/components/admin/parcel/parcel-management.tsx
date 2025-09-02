"use client";

import { useState } from "react";
import { ParcelFilters } from "./parcel-filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParcelList } from "./parcel-list";
import { ParcelStatus, ParcelPriority, ParcelService } from "@/types/parcel";

export default function ParcelManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ParcelStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<ParcelPriority | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ParcelService | "all">("all");

  const [activeTab, setActiveTab] = useState<ParcelStatus>("pending");

  const tabCounts = {
    all: 0,
    pending: 0,
    assigned: 0,
    delivered: 0,
    failed: 0,
  };
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setPriorityFilter("all");
    setServiceFilter("all");
  };

  const tabs = [
    { value: "all", label: "All Parcels", count: tabCounts.all },
    { value: "pending", label: "Pending", count: tabCounts.pending },
    { value: "assigned", label: "Assigned", count: tabCounts.assigned },
    { value: "delivered", label: "Delivered", count: tabCounts.delivered },
    { value: "failed", label: "Failed", count: tabCounts.failed },
  ];

  const countColors = {
    pending: "bg-primary text-primary-foreground",
    assigned: "bg-yellow-500 text-white",
    in_transit: "bg-orange-500 text-white",
    delivered: "bg-green-500 text-white",
    failed: "bg-red-500 text-white",
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

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ParcelStatus)} className="w-full">
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
            </div>
          </div>

          <ParcelList searchTerm={searchTerm} status={activeTab} priority={priorityFilter} service={serviceFilter} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
