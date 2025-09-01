import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Controller, useFormContext } from "react-hook-form";
import { CommonSelect } from "@/components/shared/common-select";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { PaymentMethod } from "./payment-method";
import { Clock } from "lucide-react";

export const ShippingOptionsForm = () => {
  const { control } = useFormContext<ParcelFormValues>();
  return (
    <Card>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          <CardTitle className="text-xl font-semibold text-slate-900">Shipping Options</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          Choose your preferred delivery speed and additional services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Controller
          name="serviceType"
          control={control}
          render={({ field, fieldState }) => (
            <CommonSelect
              label="Service Type"
              name="serviceType"
              options={[
                { value: "standard", label: "Standard" },
                { value: "express", label: "Express" },
                { value: "urgent", label: "Urgent" },
              ]}
              placeholder="Select service"
              onValueChange={field.onChange}
              value={field.value}
              error={fieldState.error?.message}
            />
          )}
        />

        <PaymentMethod />
      </CardContent>
    </Card>
  );
};
