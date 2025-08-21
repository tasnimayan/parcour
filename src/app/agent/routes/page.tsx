import RouteOptimizer from "@/components/agent/route/route-optimizer";
import { PageHeader } from "@/components/shared/page-header";
import { Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <>
      <PageHeader title="Route Optimizer" subtitle="Plan the most efficient delivery route">
        <Button size="sm" className="ml-auto">
          <Route className="h-4 w-4 mr-2" />
          Optimize Route
        </Button>
      </PageHeader>
      <RouteOptimizer />
    </>
  );
}
