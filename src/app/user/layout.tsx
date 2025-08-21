import { TopNavigation } from "@/components/dashboard/top-navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
