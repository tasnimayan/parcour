import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelData } from "@/lib/admin-api";
import { User, Phone } from "lucide-react";

interface CustomerInfoProps {
  customer: ParcelData["customer"];
}

export function CustomerInfoCard({ customer }: CustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{customer.fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
