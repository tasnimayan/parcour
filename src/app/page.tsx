import React from "react";
import Link from "next/link";

type RoleKey = "customer" | "agent" | "admin";

type RoleConfig = {
  key: RoleKey;
  title: string;
  blurb: string;
  loginPath: string;
  registerPath: string;
};

export type LandingPageProps = {
  /** Override default paths if your routes differ */
  paths?: Partial<Record<RoleKey, { login: string; register: string }>>;
};

const defaultPaths: Record<RoleKey, { login: string; register: string }> = {
  customer: { login: "/customer/login", register: "/customer/register" },
  agent: { login: "/agent/login", register: "/agent/register" },
  admin: { login: "/admin/login", register: "/admin/register" },
};

const rolesMeta: Record<RoleKey, { title: string; blurb: string }> = {
  customer: {
    title: "Customer",
    blurb: "Book shipments, track parcels in real-time, and manage deliveries.",
  },
  agent: {
    title: "Delivery Agent",
    blurb: "Accept assignments, update statuses, and navigate optimal routes.",
  },
  admin: {
    title: "Admin",
    blurb: "Oversee operations, assign agents, and manage the entire network.",
  },
};

const roleOrder: RoleKey[] = ["customer", "agent", "admin"];

function RoleCard({ cfg }: { cfg: RoleConfig }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-sm backdrop-blur transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900/70">
      {/* Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      <div className="p-6 sm:p-7">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">{cfg.title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{cfg.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={cfg.loginPath}
            aria-label={`Login as ${cfg.title}`}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Login
          </Link>
          <Link
            href={cfg.registerPath}
            aria-label={`Register as ${cfg.title}`}
            className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-100 dark:text-gray-900 dark:focus:ring-gray-100"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ paths }: LandingPageProps) {
  const mergedPaths: Record<RoleKey, { login: string; register: string }> = {
    customer: { ...defaultPaths.customer, ...(paths?.customer || {}) },
    agent: { ...defaultPaths.agent, ...(paths?.agent || {}) },
    admin: { ...defaultPaths.admin, ...(paths?.admin || {}) },
  };

  const roleConfigs: RoleConfig[] = roleOrder.map((key) => ({
    key,
    title: rolesMeta[key].title,
    blurb: rolesMeta[key].blurb,
    loginPath: mergedPaths[key].login,
    registerPath: mergedPaths[key].register,
  }));

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-500/10" />
      </div>

      {/* Container */}
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Header / Hero */}
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur dark:border-gray-800 dark:text-gray-400">
            ✉️ Courier & Parcel Platform
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
            Fast, Reliable, Real‑Time Deliveries
          </h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg dark:text-gray-400">
            Welcome! Choose your role to sign in or create an account. Manage parcels, assign agents, and track
            shipments seamlessly.
          </p>

          <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3 sm:max-w-none sm:inline-flex sm:grid-cols-none">
            <Link
              href="#roles"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-100 dark:text-gray-900"
            >
              Get Started
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Track a Parcel
            </Link>
          </div>
        </header>

        {/* Roles */}
        <section id="roles" className="mt-12 sm:mt-14">
          <h2 className="sr-only">Select a role</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roleConfigs.map((cfg) => (
              <RoleCard key={cfg.key} cfg={cfg} />
            ))}
          </div>
        </section>

        {/* Footer blurb */}
        <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-500">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:no-underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:no-underline">
            Privacy Policy
          </Link>
          .
        </footer>
      </div>
    </main>
  );
}
