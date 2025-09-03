import { CloudAlert, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeConfig = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
};

export const LoadingState = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </CardContent>
    </Card>
  );
};

export const EmptyState = ({
  icon: Icon = Truck,
  title,
  description,
  size = "md",
}: {
  icon?: React.ElementType;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <Icon className={cn(sizeConfig[size], "mx-auto mb-2 opacity-50")} />
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
};

export const ErrorState = ({
  title = "Something went wrong!",
  description,
  size = "md",
}: {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}) => {
  return <EmptyState icon={CloudAlert} title={title} description={description} size={size} />;
};
