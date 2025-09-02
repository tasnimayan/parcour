import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, HistoryIcon } from "lucide-react";
import { CustomerParcelStats } from "@/components/customer/customer-parcel-stats";
import Link from "next/link";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function Page() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground mt-1">Manage your parcels and track deliveries from your dashboard</p>
        </div>
      </div>

      {/* Quick Stats */}
      <CustomerParcelStats />

      {/* Main Content */}
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your parcel management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-auto p-6 flex flex-col items-center gap-2" asChild>
                <Link href="/customer/parcels/create">
                  <Plus className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">Book New Parcel</div>
                    <div className="text-sm opacity-90">Schedule pickup & delivery</div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/tracking">
                  <MapPin className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">Track Parcel</div>
                    <div className="text-sm opacity-70">Real-time location</div>
                  </div>
                </Link>
              </Button>

              <Button variant="outline" className="h-auto p-6 flex flex-col items-center gap-2 bg-transparent" asChild>
                <Link href="/customer/history">
                  <HistoryIcon className="w-8 h-8" />
                  <div className="text-center">
                    <div className="font-semibold">View History</div>
                    <div className="text-sm opacity-70">All your parcels</div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <RecentActivity />
      </div>
    </div>
  );
}
