"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import {
  type User,
  type AuthState,
  login as authLogin,
  logout as authLogout,
  register as authRegister,
  type UserRole,
} from "../../lib/auth";

import Cookies from "js-cookie";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    phone?: string,
    address?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "REGISTER_START" }
  | { type: "REGISTER_SUCCESS"; payload: User }
  | { type: "REGISTER_ERROR" };

interface AuthReducerState extends AuthState {
  loading: boolean;
}

const authReducer = (state: AuthReducerState, action: AuthAction): AuthReducerState => {
  switch (action.type) {
    case "LOGIN_START":
    case "REGISTER_START":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGIN_ERROR":
    case "REGISTER_ERROR":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: false,
  });

  // Check for stored user on mount
  useEffect(() => {
    const sessionToken = Cookies.get("parcour_user");
    if (sessionToken) {
      try {
        // GET USER FROM auth/session route
        const user = JSON.parse(sessionToken);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        console.log("Auth provider error:", error);
        Cookies.remove("parcour_user");
      }
    }
  }, []);

  // Partially complete - need validation
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await authLogin(email, password);

      if (!res.data) {
        throw new Error("Invalid credentials");
      }
      Cookies.set("parcour_user", JSON.stringify(res.data?.token));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data?.user.id,
          email: res.data?.user.email,
          name: res.data?.user.profile.fullName,
          role: res.data?.user.role as UserRole,
        },
      });
    } catch (error) {
      dispatch({ type: "LOGIN_ERROR" });
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    phone?: string,
    address?: string
  ) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const user = await authRegister(email, password, name, role, phone, address);
      localStorage.setItem("parcour-user", JSON.stringify(user.data));
      dispatch({ type: "REGISTER_SUCCESS", payload: user.data! });
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR" });
      throw error;
    }
  };

  const logout = async () => {
    await authLogout();
    localStorage.removeItem("parcour-user");
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
