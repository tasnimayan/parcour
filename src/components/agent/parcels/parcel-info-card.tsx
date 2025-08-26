import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Zap, Clock, CreditCard } from "lucide-react";
import { ParcelData } from "@/lib/admin-api";

export function ParcelInfoCard({ parcel }: { parcel: ParcelData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Package Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Size:</span>
              <Badge variant="outline">{parcel.parcelSize}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Weight:</span>
              <span className="text-sm font-medium">{parcel.parcelWeight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="text-sm font-medium">{parcel.parcelType}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Priority:</span>
              <Badge
                variant={
                  parcel.priorityType === "urgent"
                    ? "destructive"
                    : parcel.priorityType === "medium"
                    ? "default"
                    : "secondary"
                }
              >
                <Zap className="h-3 w-3 mr-1" />
                {parcel.priorityType}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Service:</span>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {parcel.serviceType.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Payment:</span>
              <Badge variant="outline">
                <CreditCard className="h-3 w-3 mr-1" />
                {parcel.paymentType}
              </Badge>
            </div>
          </div>
        </div>

        {parcel?.codAmount > 0 && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <p className="text-sm font-medium text-warning-foreground">
              COD Amount: ${Number(parcel.codAmount).toFixed(2)}
            </p>
          </div>
        )}

        {parcel?.note && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Note:</h4>
            <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">{parcel.note}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
