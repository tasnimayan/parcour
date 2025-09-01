import { Navigation } from "@/components/landing/nav-bar";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900">
      <Navigation />
      {children}
    </div>
  );
}
