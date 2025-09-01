import { HeroSection } from "@/components/landing/hero-section";
import { RoleCard } from "@/components/landing/role-card";
import { CTASection } from "@/components/landing/cta-section";

const rolesMeta = {
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
    <main>
      <HeroSection />
      <div className="py-10 sm:px-6 lg:px-8 lg:py-14">
        <section id="roles" className="container mx-auto my-12 sm:my-14">
          <h2 className="sr-only">Select a role</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(rolesMeta).map((config) => (
              <RoleCard key={config.title} config={config} />
            ))}
          </div>
        </section>
      </div>
      <CTASection />
    </main>
  );
}
