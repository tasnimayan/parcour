import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  icon: LucideIcon;
  value: number;
  color: string;
}

export const StatsCard = ({ label, icon: Icon, value, color }: StatsCardProps) => {
  return (
    <Card className="gradient-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 pb-3">
          <div className="text-sm font-medium text-muted-foreground p-1 rounded-lg">
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <span>{label}</span>
        </div>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
};
