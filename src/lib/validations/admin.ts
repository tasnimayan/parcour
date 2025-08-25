import { z } from "zod"

export const adminSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  department: z.enum(["operation", "coordinator", "support"], {
    required_error: "Please select a department",
  }),
})

export type AdminSignupFormData = z.infer<typeof adminSignupSchema>
