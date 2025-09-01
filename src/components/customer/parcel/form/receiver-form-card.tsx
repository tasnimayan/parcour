import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { useFormContext } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";
import { MapPin } from "lucide-react";

export const ReceiverForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ParcelFormValues>();

  return (
    <Card>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          <CardTitle className="text-xl font-semibold text-slate-900">Receiver Information</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          Enter the details of the person or business receiving the parcel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommonFormField
            name="recipientName"
            label="Full Name"
            register={register("recipientName")}
            placeholder="Enter full name"
            required
            error={errors.recipientName?.message}
          />
          {/* <CommonFormField
            name="receiverEmail"
            label="Email Address"
            register={register("receiverEmail")}
            placeholder="Enter email address"
            required
            error={errors.receiverEmail?.message}
          />
          */}
          <CommonFormField
            name="recipientPhone"
            label="Phone Number"
            register={register("recipientPhone")}
            placeholder="Enter phone number"
            required
            error={errors.recipientPhone?.message}
          />
        </div>
        <CommonFormField
          name="deliveryAddress"
          label="Delivery Address"
          register={register("deliveryAddress")}
          placeholder="Enter delivery address"
          required
          error={errors.deliveryAddress?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommonFormField
            name="deliveryCity"
            label="Delivery City"
            register={register("deliveryCity")}
            placeholder="Enter delivery city"
            required
            error={errors.deliveryCity?.message}
          />
          <CommonFormField
            name="deliveryPostal"
            label="Delivery Postal Code"
            register={register("deliveryPostal")}
            placeholder="Enter delivery postal code"
            required
            error={errors.deliveryPostal?.message}
          />
        </div>
      </CardContent>
    </Card>
  );
};
