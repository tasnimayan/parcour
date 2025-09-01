import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { useFormContext } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";

export const SenderForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ParcelFormValues>();

  return (
    <Card>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-xl font-semibold text-slate-900">Sender Information</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          Enter the details of the person or business sending the parcel
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommonFormField
            name="senderName"
            label="Full Name"
            register={register("senderName")}
            placeholder="Enter full name"
            required
            error={errors.senderName?.message}
          />
          <CommonFormField
            name="senderPhone"
            label="Phone Number"
            register={register("senderPhone")}
            placeholder="Enter phone number"
            required
            error={errors.senderPhone?.message}
          />
        </div>
        <CommonFormField
          name="pickupAddress"
          label="Pickup Address"
          register={register("pickupAddress")}
          placeholder="Enter pickup address"
          required
          error={errors.pickupAddress?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CommonFormField
            name="pickupCity"
            label="Pickup City"
            register={register("pickupCity")}
            placeholder="Enter pickup city"
            required
            error={errors.pickupCity?.message}
          />
          <CommonFormField
            name="pickupPostal"
            label="Pickup Postal Code"
            register={register("pickupPostal")}
            placeholder="Enter pickup postal code"
            required
            error={errors.pickupPostal?.message}
          />
        </div>
      </CardContent>
    </Card>
  );
};
