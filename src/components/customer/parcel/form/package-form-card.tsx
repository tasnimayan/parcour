import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { ParcelFormValues } from "@/lib/validations/parcel";
import { Controller, useFormContext } from "react-hook-form";
import { CommonFormField } from "@/components/forms/common-form-field";
import { CommonSelect } from "@/components/shared/common-select";

export const PackageForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ParcelFormValues>();

  return (
    <Card>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-orange-600" />
          <CardTitle className="text-xl font-semibold text-slate-900">Package Details</CardTitle>
        </div>
        <CardDescription className="text-slate-600">
          Provide information about the package contents and dimensions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="parcelType"
            control={control}
            render={({ field, fieldState }) => (
              <CommonSelect
                label="Package Type"
                name="parcelType"
                options={[
                  { value: "documents", label: "Documents" },
                  { value: "electronics", label: "Electronics" },
                  { value: "fragile", label: "Fragile" },
                  { value: "others", label: "Others" },
                ]}
                placeholder="Select parcel type"
                onValueChange={field.onChange}
                value={field.value}
                error={fieldState.error?.message}
              />
            )}
          />

          <CommonFormField
            name="parcelWeight"
            type="number"
            label="Weight (kg)"
            register={register("parcelWeight", { valueAsNumber: true })}
            placeholder="0.0"
            step="0.1"
            required
            error={errors.parcelWeight?.message}
          />
        </div>

        <div className="space-y-4">
          <Label className="text-sm font-medium text-slate-700">Package Size (cm) *</Label>
          <div className="grid grid-cols-3 gap-4">
            <CommonFormField
              name="parcelSize.length"
              type="number"
              label="Length"
              register={register("parcelSize.length", { valueAsNumber: true })}
              placeholder="0"
              error={errors.parcelSize?.length?.message}
            />

            <CommonFormField
              name="parcelSize.width"
              type="number"
              label="Width"
              register={register("parcelSize.width", { valueAsNumber: true })}
              placeholder="0"
              error={errors.parcelSize?.width?.message}
            />

            <CommonFormField
              name="parcelSize.height"
              type="number"
              label="Height"
              register={register("parcelSize.height", { valueAsNumber: true })}
              placeholder="0"
              error={errors.parcelSize?.height?.message}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Special Instructions</Label>
          <Textarea id="note" {...register("note")} placeholder="e.g. Handle with care..." />
        </div>
      </CardContent>
    </Card>
  );
};
