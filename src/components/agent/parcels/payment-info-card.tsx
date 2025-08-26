import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { ParcelData } from "@/lib/admin-api";

interface PaymentInfoProps {
  payment: ParcelData["payment"];
}

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case "completed":
      return "bg-success text-success-foreground";
    case "pending":
      return "bg-warning text-warning-foreground";
    case "failed":
    case "cancelled":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function PaymentInfoCard({ payment }: PaymentInfoProps) {
  if (!payment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <Badge variant="outline" className="text-muted-foreground">
              No Payment Required
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mediup text-sm">BDT</span>
              <span className="font-bold text-lg">{payment.amount.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Badge className={getPaymentStatusColor(payment.status)}>{payment.status}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Method:</span>
            <Badge variant="outline">{payment.paymentType}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
