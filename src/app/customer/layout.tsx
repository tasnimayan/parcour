import { TopNavigation } from "@/components/dashboard/top-navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="p-6">
        <div className="container mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
