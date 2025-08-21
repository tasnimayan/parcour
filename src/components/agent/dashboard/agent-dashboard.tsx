"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { DeliveryStats } from "@/types/parcel";

// Mock data for demonstration
const mockStats: DeliveryStats = {
  total: 45,
  pending: 8,
  pickedUp: 12,
  inTransit: 15,
  delivered: 8,
  failed: 2,
};

export default function AgentDashboard() {
  const completionRate = ((mockStats.delivered / mockStats.total) * 100).toFixed(1);

  const statsCards = [
    {
      title: "Total Parcels",
      value: mockStats.total,
      icon: Package,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pending",
      value: mockStats.pending,
      icon: Clock,
      color: "text-status-pending-foreground",
      bgColor: "bg-status-pending/10",
    },
    {
      title: "In Transit",
      value: mockStats.inTransit,
      icon: TrendingUp,
      color: "text-status-transit-foreground",
      bgColor: "bg-status-transit/10",
    },
    {
      title: "Delivered",
      value: mockStats.delivered,
      icon: CheckCircle,
      color: "text-status-delivered-foreground",
      bgColor: "bg-status-delivered/10",
    },
    {
      title: "Failed",
      value: mockStats.failed,
      icon: AlertCircle,
      color: "text-status-failed-foreground",
      bgColor: "bg-status-failed/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
                <span className="text-sm font-bold text-status-delivered">{completionRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-status-delivered h-2 rounded-full transition-all"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">On-time Delivery</span>
                <span className="text-sm font-bold text-primary">94.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full transition-all" style={{ width: "94.2%" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Today&apos;s Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Morning Pickups</p>
                <p className="text-sm text-muted-foreground">8:00 AM - 12:00 PM</p>
              </div>
              <span className="text-sm font-bold text-status-picked">6 parcels</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Afternoon Deliveries</p>
                <p className="text-sm text-muted-foreground">1:00 PM - 6:00 PM</p>
              </div>
              <span className="text-sm font-bold text-status-transit">12 parcels</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Evening Route</p>
                <p className="text-sm text-muted-foreground">6:00 PM - 8:00 PM</p>
              </div>
              <span className="text-sm font-bold text-primary">3 parcels</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left bg-primary/10 hover:bg-primary/20 rounded-lg transition-all group">
              <Package className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">View Parcels</h3>
              <p className="text-sm text-muted-foreground">Check your assigned parcels</p>
            </button>

            <button className="p-4 text-left bg-status-transit/10 hover:bg-status-transit/20 rounded-lg transition-all group">
              <TrendingUp className="h-8 w-8 text-status-transit mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Optimize Route</h3>
              <p className="text-sm text-muted-foreground">Get the best delivery route</p>
            </button>

            <button className="p-4 text-left bg-status-delivered/10 hover:bg-status-delivered/20 rounded-lg transition-all group">
              <CheckCircle className="h-8 w-8 text-status-delivered mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">Delivery History</h3>
              <p className="text-sm text-muted-foreground">View completed deliveries</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// <Card>
//   <CardHeader>
//     <CardTitle className="flex items-center gap-2">
//       <TrendingUp className="w-5 h-5" />
//       Today&apos;s Performance
//     </CardTitle>
//     <CardDescription>Your delivery performance metrics</CardDescription>
//   </CardHeader>
//   <CardContent>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <div className="text-center">
//         <div className="text-3xl font-bold text-green-600">
//           {stats.totalAssigned > 0 ? Math.round((stats.delivered / stats.totalAssigned) * 100) : 0}%
//         </div>
//         <p className="text-sm text-muted-foreground">Success Rate</p>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold text-blue-600">4.8</div>
//         <p className="text-sm text-muted-foreground">Average Rating</p>
//       </div>
//       <div className="text-center">
//         <div className="text-3xl font-bold text-accent">12</div>
//         <p className="text-sm text-muted-foreground">Deliveries Today</p>
//       </div>
//     </div>
//   </CardContent>
// </Card>
