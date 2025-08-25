// Mock authentication system for the courier management platform
export type UserRole = "admin" | "agent" | "customer";
type AdminLoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    lastLogin: string;
    profile: {
      fullName: string;
      department: string;
      permissions: string[];
    };
  };
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt?: string; // Added for reports
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  error?: string;
  [key: string]: unknown;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Login API fetch
const login = async (email: string, password: string): Promise<ApiResponse<AdminLoginResponse>> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Invalid credentials");
  }
  return data;
};

// Modification:
const register = async (
  email: string,
  password: string,
  name: string,
  role: UserRole,
  phone?: string,
  address?: string
): Promise<ApiResponse<User>> => {
  if (name || email || password || role) {
    return { status: "fail", error: "Fields can not be empty" };
  }

  // Check if user already exists
  if (mockUsers.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role,
    phone,
    address,
    createdAt: new Date().toISOString(), // Added for reports
  };

  mockUsers.push(newUser);
  return { status: "success", data: newUser };
};

const logout = async (): Promise<void> => {
  // clear session data
  await new Promise((resolve) => setTimeout(resolve, 500));
};

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@gmail.com",
    name: "Admin User",
    role: "admin",
    phone: "01645800408",
  },
  {
    id: "2",
    email: "agent@gmail.com",
    name: "John Delivery",
    role: "agent",
    phone: "01752100936",
  },
  {
    id: "3",
    email: "customer@gmail.com",
    name: "Jane Customer",
    role: "customer",
    phone: "01955907174",
    address: "Mirpur 1, Dhaka-1210, Bangladesh",
  },
];
export { login, logout, register };
