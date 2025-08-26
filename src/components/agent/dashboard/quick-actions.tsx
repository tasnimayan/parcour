import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

export const QuickActions = () => {
  return (
    <Card className="gradient-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/agent/parcels"
            className="p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-all group"
          >
            <Package className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground">View Parcels</h3>
            <p className="text-sm text-muted-foreground">Check your assigned parcels</p>
          </Link>

          <Link
            href="/agent/routes"
            className="p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-all group"
          >
            <TrendingUp className="h-8 w-8 text-status-transit mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground">Optimize Route</h3>
            <p className="text-sm text-muted-foreground">Get the best delivery route</p>
          </Link>

          <Link
            href="/agent/history"
            className="p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-all group"
          >
            <CheckCircle className="h-8 w-8 text-status-delivered mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-foreground">Delivery History</h3>
            <p className="text-sm text-muted-foreground">View completed deliveries</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
