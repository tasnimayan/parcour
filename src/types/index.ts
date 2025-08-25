export type UserRole = "ADMIN" | "AGENT" | "CUSTOMER";
export type UserStatus = "active" | "inactive" | "pending";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  error?: string;
  meta?: {
    [key: string]: string | number | undefined | null;
  };
};
