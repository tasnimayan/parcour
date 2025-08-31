"use client";

import { SummaryCard } from "./summary-card";
import { AnalyticsMetrics } from "./analytics-matrics";
import { Charts } from "./charts";

export function SystemOverview() {
  return (
    <div className="space-y-6">
      <AnalyticsMetrics />

      {/* Charts */}
      <Charts />

      <SummaryCard />
    </div>
  );
}
