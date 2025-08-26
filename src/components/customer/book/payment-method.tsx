"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { Controller, useFormContext } from "react-hook-form";
import { calculateParcelCost } from "@/lib/utils";

export const PaymentMethod = () => {
  const { control, watch } = useFormContext<ParcelFormValues>();

  const [parcelSize, parcelWeight, serviceType] = watch(["parcelSize", "parcelWeight", "serviceType"]);

  const totalCost = calculateParcelCost({
    size: parcelSize || "medium",
    weight: Number(parcelWeight) || 0,
    serviceType: serviceType || "standard",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Payment Method</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name="paymentType"
          control={control}
          render={({ field, fieldState }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Cash on Delivery (COD)</div>
                      <div className="text-sm text-muted-foreground">Pay when your package is delivered</div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Online Payment</div>
                      <div className="text-sm text-muted-foreground">Pay now with card or digital wallet</div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg">
                <RadioGroupItem value="prepaid" id="prepaid" />
                <Label htmlFor="prepaid" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Prepaid</div>
                      <div className="text-sm text-muted-foreground">Pay when your package is picked up</div>
                    </div>
                  </div>
                </Label>
              </div>
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
      </CardContent>
    </Card>
  );
};
