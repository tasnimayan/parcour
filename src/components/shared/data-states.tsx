import { CloudAlert, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
  icon = <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />,
  title,
  description,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-center py-12 text-muted-foreground">
      {icon}
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
};

export const ErrorState = ({
  title = "Something went wrong!",
  description,
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <EmptyState
      icon={<CloudAlert className="h-12 w-12 mx-auto mb-4 opacity-50" />}
      title={title}
      description={description}
    />
  );
};
