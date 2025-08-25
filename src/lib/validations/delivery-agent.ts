import { z } from "zod"

export const deliveryAgentSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  altPhone: z.string().optional(),
  governmentId: z.string().optional(),
  dob: z.string().optional(),
  vehicleType: z.enum(["BIKE", "CAR", "VAN", "TRUCK", "BICYCLE"], {
    required_error: "Please select a vehicle type",
  }),
  vehicleNumber: z.string().optional(),
  licenseNo: z.string().optional(),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"], {
    required_error: "Please select employment type",
  }),
})

export type DeliveryAgentSignupFormData = z.infer<typeof deliveryAgentSignupSchema>
