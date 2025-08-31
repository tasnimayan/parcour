// src/app/(auth)/nav-bar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <span className="text-xl font-bold text-white">P</span>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Parcour
            </span>
          </Link>

          <div className="flex space-x-2">
            <Link
              href="/login/admin"
              className={`
                px-5 py-2.5 rounded-lg font-medium text-sm
                transition-all duration-200
                ${
                  pathname === "/login/admin"
                    ? "bg-white text-blue-700 shadow-md"
                    : "text-white hover:bg-white/10 hover:shadow-sm"
                }`}
            >
              Admin Portal
            </Link>
            <Link
              href="/login/agent"
              className={`
                px-5 py-2.5 rounded-lg font-medium text-sm
                transition-all duration-200
                ${
                  pathname === "/login/agent"
                    ? "bg-white text-blue-700 shadow-md"
                    : "text-white hover:bg-white/10 hover:shadow-sm"
                }`}
            >
              Agent Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
