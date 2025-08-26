"use client";

import { useCustomerStats } from "@/hooks/use-parcels";
import { EmptyState, ErrorState, LoadingState } from "@/components/shared/data-states";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Package, TrendingUp } from "lucide-react";

export const CustomerParcelStats = () => {
  const { data: stats, isLoading, isError } = useCustomerStats();

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!stats) return <EmptyState title="No stats found" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalParcels}</p>
              <p className="text-sm text-muted-foreground">Total Parcels</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalInTransit}</p>
              <p className="text-sm text-muted-foreground">In Transit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalDelivered}</p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
