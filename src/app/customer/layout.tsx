import { TopNavigation } from "@/components/dashboard/top-navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopNavigation />
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
