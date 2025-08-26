import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const AgentSchedule = () => {
  return (
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
  );
};
