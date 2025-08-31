import { z } from "zod";

// Common address type
export const AddressSchema = z.object({
  label: z.string().min(1, "Address label is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Common base for all signup types
export const SignupBase = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
});

// Details shared by Customer and Agent
export const PersonDetails = z.object({
  phone: z.string().min(10, "Please enter a valid phone number"),
  altPhone: z.string().optional(),
  governmentId: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
});

export const customerSignupSchema = SignupBase.merge(PersonDetails).extend({
  address: AddressSchema,
});

export const agentSignupSchema = SignupBase.merge(PersonDetails).extend({
  vehicleType: z.enum(["bike", "car", "van", "truck", "bicycle"], {
    required_error: "Please select a vehicle type",
  }),
  vehicleNumber: z.string().optional(),
  licenseNo: z.string().optional(),
  employmentType: z.enum(["full_time", "part_time", "contract"], {
    required_error: "Please select employment type",
  }),
});

export const adminSignupSchema = SignupBase.extend({
  department: z.enum(["operation", "coordinator", "support"], {
    required_error: "Please select a department",
  }),
});

export type AdminSignupFormData = z.infer<typeof adminSignupSchema>;
export type AgentSignupFormData = z.infer<typeof agentSignupSchema>;
export type CustomerSignupFormData = z.infer<typeof customerSignupSchema>;
