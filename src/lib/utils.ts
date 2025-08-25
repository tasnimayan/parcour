"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useActivePath() {
  const pathname = usePathname();

  const isActive = (path: string, exact: boolean = false): boolean => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };
  return { pathname, isActive };
}
