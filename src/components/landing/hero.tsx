import Link from "next/link";

export function Hero() {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-400">
        ✉️ Courier & Parcel Platform
      </span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
        Fast, Reliable, Real‑Time Deliveries
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Welcome! Choose your role to sign in or create an account. Manage parcels, assign agents, and track shipments
        seamlessly.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/signup"
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 dark:bg-gray-100 dark:text-gray-900"
        >
          Get Started
        </Link>
        <Link
          href="/parcel/track"
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Track a Parcel
        </Link>
      </div>
    </header>
  );
}
