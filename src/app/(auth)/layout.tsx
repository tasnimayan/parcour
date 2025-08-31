import AuthNavbar from "./nav-bar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AuthNavbar />
      <main className="p-6">
        <div className="container mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
