import { z } from "zod";

export const customerSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  altPhone: z.string().optional(),
  governmentId: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  address: z.object({
    label: z.string().min(1, "Address label is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City is required"),
    postalCode: z.string().min(3, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
});

export type CustomerSignupFormData = z.infer<typeof customerSignupSchema>;
