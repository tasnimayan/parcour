import { Navigation } from "@/components/landing/nav-bar";

export default function GeneralLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navigation />
      {children}
    </div>
  );
}
