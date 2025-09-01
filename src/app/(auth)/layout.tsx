import AuthNavbar from "./nav-bar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AuthNavbar />
      <main className="bg-background ">{children}</main>
    </div>
  );
}
