import { TopNavigation } from "@/components/dashboard/top-navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col relative">
      <TopNavigation />
      <div className="flex-1 overflow-y-auto">
        <main className="container mx-auto py-12 px-6">{children}</main>
      </div>
    </div>
  );
}
