import Link from "next/link";

export interface RoleConfig {
  title: string;
  description: string;
  loginPath: string;
  registerPath: string;
}

export function RoleCard({ config }: { config: RoleConfig }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500" />

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{config.description}</p>

        <div className="mt-4 flex gap-3">
          <Link
            href={config.loginPath}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium transition hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href={config.registerPath}
            className="flex-1 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
