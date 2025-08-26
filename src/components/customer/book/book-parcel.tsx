"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { PaymentMethod } from "./payment-method";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ParcelFormValues, parcelSchema } from "@/lib/validations/parcel";
import { CommonSelect } from "@/components/shared/common-select";
import { fetchCreateParcel } from "@/lib/customer-api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/contexts/auth-context";

const BookParcel = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      paymentType: "cod",
    },
  });
  const {
    register,
    formState: { errors },
  } = form;

  const { mutate } = useMutation({
    mutationKey: ["CREATE_PARCEL"],
    mutationFn: (data: ParcelFormValues) => fetchCreateParcel({ ...data, customerId: userId! }),
    onSuccess: () => {
      toast.success("Parcel booked successfully!");
    },
    onError: () => {
      toast.error("Failed to book parcel!");
    },
  });

  const onSubmit = (data: ParcelFormValues) => {
    mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Package className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Parcel Pickup</h1>
          <p className="text-muted-foreground">Schedule a pickup for your package</p>
        </div>
      </div>

      {/* Form */}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Sender Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Sender Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input {...register("senderName")} placeholder="John Doe" />
                  {errors.senderName && <p className="text-sm text-red-500">{errors.senderName.message}</p>}
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input {...register("senderPhone")} placeholder="+1 (555) 123-4567" />
                  {errors.senderPhone && <p className="text-sm text-red-500">{errors.senderPhone.message}</p>}
                </div>
              </div>
              <div>
                <Label>Pickup Address</Label>
                <Textarea {...register("pickupAddress")} placeholder="123 Main St..." />
                {errors.pickupAddress && <p className="text-sm text-red-500">{errors.pickupAddress.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Recipient Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Recipient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input {...register("recipientName")} placeholder="Jane Smith" />
                  {errors.recipientName && <p className="text-sm text-red-500">{errors.recipientName.message}</p>}
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input {...register("recipientPhone")} placeholder="+1 (555) 987-6543" />
                  {errors.recipientPhone && <p className="text-sm text-red-500">{errors.recipientPhone.message}</p>}
                </div>
              </div>
              <div>
                <Label>Delivery Address</Label>
                <Textarea {...register("deliveryAddress")} placeholder="456 Oak Ave..." />
                {errors.deliveryAddress && <p className="text-sm text-red-500">{errors.deliveryAddress.message}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Package Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Package Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="parcelSize"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <CommonSelect
                      name="parcelSize"
                      label="Parcel Size"
                      options={[
                        { value: "small", label: "Small" },
                        { value: "medium", label: "Medium" },
                        { value: "large", label: "Large" },
                        { value: "extra_large", label: "Extra Large" },
                      ]}
                      placeholder="Select parcel size"
                      onValueChange={field.onChange}
                      value={field.value}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <div className="space-y-2">
                  <Label>Weight (kg)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register("parcelWeight", { valueAsNumber: true })}
                    placeholder="2.5"
                  />
                  {errors.parcelWeight && <p className="text-sm text-red-500">{errors.parcelWeight.message}</p>}
                </div>

                <Controller
                  name="parcelType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <CommonSelect
                      label="Parcel Type"
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
                <Controller
                  name="serviceType"
                  control={form.control}
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
              </div>

              <div>
                <Label>Special Instructions</Label>
                <Textarea {...register("note")} placeholder="Handle with care..." />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <PaymentMethod />

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" className="px-8">
              {"a" ? "Pay & Book Pickup" : "Book Pickup"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

// const BookParcel = () => {
//   const [paymentMethod, setPaymentMethod] = useState("cod");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     toast("Booking Confirmed!");
//   };

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <div className="flex items-center space-x-3 mb-6">
//         <div className="p-2 bg-primary/10 rounded-lg">
//           <Package className="h-6 w-6 text-primary" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-foreground">Book Parcel Pickup</h1>
//           <p className="text-muted-foreground">Schedule a pickup for your package</p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Sender Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <User className="h-5 w-5" />
//               <span>Sender Information</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="senderName">Full Name</Label>
//                 <Input id="senderName" placeholder="John Doe" required />
//               </div>
//               <div>
//                 <Label htmlFor="senderPhone">Phone Number</Label>
//                 <Input id="senderPhone" placeholder="+1 (555) 123-4567" required />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="senderAddress">Pickup Address</Label>
//               <Textarea id="senderAddress" placeholder="123 Main St, City, State 12345" required />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recipient Information */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <MapPin className="h-5 w-5" />
//               <span>Recipient Information</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="recipientName">Full Name</Label>
//                 <Input id="recipientName" placeholder="Jane Smith" required />
//               </div>
//               <div>
//                 <Label htmlFor="recipientPhone">Phone Number</Label>
//                 <Input id="recipientPhone" placeholder="+1 (555) 987-6543" required />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="recipientAddress">Delivery Address</Label>
//               <Textarea id="recipientAddress" placeholder="456 Oak Ave, City, State 67890" required />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Package Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Package className="h-5 w-5" />
//               <span>Package Details</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="parcelType">Parcel Type</Label>
//                 <Select required>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select parcel type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="documents">Documents</SelectItem>
//                     <SelectItem value="electronics">Electronics</SelectItem>
//                     <SelectItem value="fragile">Fragile</SelectItem>
//                     <SelectItem value="others">Others</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <Label htmlFor="parcelSize">Parcel Size</Label>
//                 <Select required>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select size" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="small">Small</SelectItem>
//                     <SelectItem value="medium">Medium</SelectItem>
//                     <SelectItem value="large">Large</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="weight">Weight (kg)</Label>
//                 <Input id="weight" type="number" placeholder="2.5" step="0.1" required />
//               </div>

//               <div>
//                 <Label htmlFor="serviceType">Service Type</Label>
//                 <Select required>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select service" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="standard">Standard</SelectItem>
//                     <SelectItem value="express">Express</SelectItem>
//                     <SelectItem value="urgent">Urgent</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="note">Special Instructions (Optional)</Label>
//               <Textarea id="note" placeholder="Handle with care, fragile items..." />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Method */}
//         <PaymentMethod />

//         {/* Submit Button */}
//         <div className="flex justify-end space-x-4">
//           <Button type="button" variant="outline">
//             Save as Draft
//           </Button>
//           <Button type="submit" className="px-8">
//             {paymentMethod === "instant" ? "Pay & Book Pickup" : "Book Pickup"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

export default BookParcel;
