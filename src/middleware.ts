import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Secret key used in your backend to sign the JWT
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

type Payload = {
  userId: string;
  email: string;
  role: "admin" | "agent" | "customer";
};

async function verifyJWT(token: string) {
  try {
    return await jwtVerify<Payload>(token, SECRET);
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("parcour_auth")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = payload.payload.role;

  const path = req.nextUrl.pathname;

  // Protect role-based routes
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/agent") && role !== "agent") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (path.startsWith("/customer") && role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/agent/:path*", "/customer/:path*"],
};
