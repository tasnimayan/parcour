"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { AuthUser, type UserRole } from "../../types";
import { AdminPayload, AgentPayload, CustomerPayload } from "../../types/auth";
import Cookies from "js-cookie";
import { adminSignupRequest, loginRequest, logoutRequest, sessionRequest } from "@/lib/auth-api";

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  // Modification: set conditional payload type depending on role
  register: (
    role: UserRole,
    payload: AdminPayload | AgentPayload | CustomerPayload
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: AuthUser }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  });

  // Check for stored user on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionToken = Cookies.get("parcour_auth");
      if (sessionToken) {
        try {
          dispatch({ type: "AUTH_START" });
          const res = await sessionRequest();
          const user = res.data;
          if (user) {
            dispatch({
              type: "AUTH_SUCCESS",
              payload: { id: user.id, email: user.email, name: user.fullName, role: user.role },
            });
          }
        } catch (error) {
          console.log("Auth provider error:", error);
          Cookies.remove("parcour_auth");
        }
      }
      dispatch({ type: "AUTH_ERROR", payload: "" });
    };
    checkSession();
  }, []);

  // Partially complete - need validation
  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const res = await loginRequest(email, password);

      if (!res.data || !res.success) {
        return { success: false, message: res.message };
      }
      Cookies.set("parcour_auth", res.data.token);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          id: res.data.user.id,
          email: res.data.user.email,
          name: res.data.user.profile.fullName,
          role: res.data.user.role,
        },
      });
      return { success: true, message: "Login successful" };
    } catch (e) {
      dispatch({ type: "AUTH_ERROR", payload: (e as Error).message });
      return { success: false, message: (e as Error).message };
    }
  };

  // Modification: make it for all roles - use abstraction
  const register = async (role: string, payload: AdminPayload | AgentPayload | CustomerPayload) => {
    dispatch({ type: "AUTH_START" });
    try {
      let res;

      switch (role) {
        case "ADMIN":
          const { email, password, fullName, department } = payload as AdminPayload;
          res = await adminSignupRequest(email, password, fullName, department);
          break;
        case "AGENT":
          // const { email, password, fullName, phone } = payload as AgentPayload;
          // res = await agentSignupRequest(email, password, fullName, phone);
          break;
        case "CUSTOMER":
          // const { email, password, fullName, phone, address } = payload as CustomerPayload;
          // res = await customerSignupRequest(email, password, fullName, phone, address);
          break;
      }

      if (!res?.data) {
        return { success: false, message: "Invalid credentials" };
      }
      Cookies.set("parcour_auth", res.data?.token);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          id: res.data?.user.id,
          email: res.data?.user.email,
          name: res.data?.user.profile.fullName,
          role: role as UserRole,
        },
      });
      return { success: true, message: "Registration successful" };
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: (error as Error).message });
      return { success: false, message: (error as Error).message };
    }
  };

  // Logout - Ok
  const logout = async () => {
    if (!state.user) return;
    await logoutRequest();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
