import { AdminSignupForm } from "@/components/forms/admin-signup-form";

export default function AdminSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Registration</h1>
          <p className="text-gray-600 mt-2">Join our courier management team</p>
        </div>
        <AdminSignupForm />
      </div>
    </div>
  );
}
