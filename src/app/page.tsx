import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { RoleCard } from "@/components/landing/role-card";

export const rolesMeta = {
  customer: {
    title: "Customer",
    description: "Book shipments, track parcels in real-time, and manage deliveries.",
    loginPath: "/login",
    registerPath: "/signup",
  },
  agent: {
    title: "Delivery Agent",
    description: "Accept assignments, update statuses, and navigate optimal routes.",
    loginPath: "/login/agent",
    registerPath: "/signup/agent",
  },
  admin: {
    title: "Admin",
    description: "Oversee operations, assign agents, and manage the entire network.",
    loginPath: "/login/admin",
    registerPath: "/signup/admin",
  },
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-950 dark:to-gray-900">
      <div aria-hidden className="fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Hero />

        <section id="roles" className="mt-12 sm:mt-14">
          <h2 className="sr-only">Select a role</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(rolesMeta).map((config) => (
              <RoleCard key={config.title} config={config} />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
