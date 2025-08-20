// Mock authentication system for the courier management platform
export type UserRole = "admin" | "agent" | "customer";

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
  status: string;
  data?: T | null;
  error?: string;
};

// Mock user data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@courier.com",
    name: "Admin User",
    role: "admin",
    phone: "01645800408",
  },
  {
    id: "2",
    email: "agent@courier.com",
    name: "John Delivery",
    role: "agent",
    phone: "01752100936",
  },
  {
    id: "3",
    email: "customer@example.com",
    name: "Jane Customer",
    role: "customer",
    phone: "01955907174",
    address: "Mirpur 1, Dhaka-1210, Bangladesh",
  },
];

// modification: Update These with actual API calls
const login = async (
  email: string,
  password: string
): Promise<ApiResponse<User>> => {
  // fetch: post request on login api
  const user = mockUsers.find((u) => u.email === email);

  if (!user || password !== "password123") {
    throw new Error("Invalid credentials");
  }
  // store session on cookie
  return { status: "success", data: user };
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

export { login, logout, register };
