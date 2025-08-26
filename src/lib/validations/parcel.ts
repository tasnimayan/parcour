import { z } from "zod";

export const parcelSchema = z.object({
  senderName: z.string().min(2, "Sender name is required"),
  senderPhone: z.string().min(5, "Phone is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),

  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(5, "Recipient phone is required"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),

  parcelType: z.enum(["documents", "electronics", "fragile", "others"], {
    required_error: "Parcel type is required",
  }),
  parcelSize: z.enum(["small", "medium", "large", "extra_large"], {
    required_error: "Parcel size is required",
  }),
  parcelWeight: z.number({ invalid_type_error: "Weight must be a number" }).positive("Weight must be greater than 0"),
  serviceType: z.enum(["standard", "express", "urgent"], {
    required_error: "Service type is required",
  }),

  note: z.string().optional(),

  paymentType: z.enum(["cod", "prepaid", "online"]),
  codAmount: z.number().optional(),
});

export type ParcelFormValues = z.infer<typeof parcelSchema>;
