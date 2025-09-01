"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { Controller, useFormContext } from "react-hook-form";
import { calculateParcelCost } from "@/lib/utils";

const PAYMENT_OPTIONS = [
  { value: "cod", label: "Cash on Delivery (COD)", description: "Pay when your package is delivered" },
  { value: "online", label: "Online Payment", description: "Pay now with card or digital wallet" },
  { value: "prepaid", label: "Prepaid", description: "Pay when your package is picked up" },
];

export const PaymentMethod = () => {
  const { control, watch } = useFormContext<ParcelFormValues>();

  const [parcelSize, parcelWeight, serviceType] = watch(["parcelSize", "parcelWeight", "serviceType"]);

  const totalCost = calculateParcelCost({
    length: Number(parcelSize?.length) || 0,
    width: Number(parcelSize?.width) || 0,
    height: Number(parcelSize?.height) || 0,
    weight: Number(parcelWeight) || 0,
    serviceType: serviceType || "standard",
  });

  return (
    <div>
      <Label htmlFor="paymentType" className="flex items-center gap-2 mb-4 text-base">
        <CreditCard className="h-5 w-5" />
        Payment Method
      </Label>
      <Controller
        name="paymentType"
        control={control}
        render={({ field, fieldState }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex items-center space-x-2">
            {PAYMENT_OPTIONS.map((item) => (
              <Label
                key={item.value}
                htmlFor={item.value}
                className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer"
              >
                <RadioGroupItem value={item.value} id={item.value} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                </div>
              </Label>
            ))}

            {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
          </RadioGroup>
        )}
      />

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Estimated Cost:</span>
          <span className="font-medium">{totalCost} BDT</span>
        </div>
        <div className="h-px bg-muted my-2" />
        <div className="flex items-center justify-between font-medium">
          <span>Total:</span>
          <span>{totalCost} BDT</span>
        </div>
      </div>
    </div>
  );
};
