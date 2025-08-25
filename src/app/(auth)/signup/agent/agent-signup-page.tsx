import { DeliveryAgentSignupForm } from "@/components/forms/delivery-agent-signup-form";

export default function AgentSignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Delivery Agent Registration</h1>
          <p className="mt-2 text-gray-600">Join thousands of delivery agents earning flexible income</p>
        </div>
        <DeliveryAgentSignupForm />
      </div>
    </div>
  );
}
