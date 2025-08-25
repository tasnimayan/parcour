"use client";
import { usePathname } from "next/navigation";

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
