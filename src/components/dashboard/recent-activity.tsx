// Modification: Unused
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest parcel updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Parcel CP2024001 is in transit</p>
              <p className="text-sm text-muted-foreground">Expected delivery: Jan 17, 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
              <Package className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Parcel CP2024002 delivered successfully</p>
              <p className="text-sm text-muted-foreground">Delivered on Jan 12, 2024</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
