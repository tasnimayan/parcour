import { z } from "zod";

export const parcelSchema = z.object({
  senderName: z.string().min(2, "Sender name is required"),
  senderPhone: z.string().min(5, "Phone is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  pickupCity: z.string().min(2, "Pickup city is required"),
  pickupPostal: z.string().min(2, "Pickup postal is required"),

  recipientName: z.string().min(2, "Recipient name is required"),
  recipientPhone: z.string().min(5, "Recipient phone is required"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  deliveryCity: z.string().min(2, "Delivery city is required"),
  deliveryPostal: z.string().min(2, "Delivery postal is required"),

  parcelType: z.enum(["documents", "electronics", "fragile", "others"], {
    required_error: "Parcel type is required",
  }),
  parcelSize: z.object({
    length: z.number({ invalid_type_error: "Length must be a number" }).positive("Length must be greater than 0"),
    width: z.number({ invalid_type_error: "Width must be a number" }).positive("Width must be greater than 0"),
    height: z.number({ invalid_type_error: "Height must be a number" }).positive("Height must be greater than 0"),
  }),
  parcelWeight: z
    .number({ invalid_type_error: "Weight must be a number" })
    .positive("Weight must be greater than 0")
    .optional(),
  serviceType: z.enum(["standard", "express", "urgent"], {
    required_error: "Service type is required",
  }),

  note: z.string().optional(),
  paymentType: z.enum(["cod", "prepaid", "online"]),
});

export type ParcelFormValues = z.infer<typeof parcelSchema>;
