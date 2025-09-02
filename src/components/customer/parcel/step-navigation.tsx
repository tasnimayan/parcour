import { Button } from "@/components/ui/button";

export const StepNavigation = ({
  currentStep,
  totalSteps,
  nextStep,
  prevStep,
  isSubmitting,
}: {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting?: boolean;
}) => (
  <div className="flex items-center justify-between pt-6">
    <Button
      type="button"
      variant="outline"
      onClick={prevStep}
      disabled={currentStep === 1}
      className="px-6 py-2 h-11 bg-transparent"
    >
      Previous
    </Button>

    <div className="flex items-center gap-2 text-sm text-slate-600">
      Step {currentStep} of {totalSteps}
    </div>

    {currentStep < totalSteps && (
      <Button type="button" onClick={nextStep} className="px-6 py-2 h-11 bg-blue-600 hover:bg-blue-700">
        Next Step
      </Button>
    )}

    <Button
      type="submit"
      form="create-parcel-form"
      className={`px-8 py-2 h-11 bg-green-600 hover:bg-green-700 ${
        currentStep === totalSteps ? "inline-flex" : "hidden"
      }`}
    >
      {isSubmitting ? "Creating..." : "Create Parcel"}
    </Button>
  </div>
);

export const ProgressIndicator = ({ currentStep }: { currentStep: number }) => {
  const labels = ["Sender", "Receiver", "Package", "Shipping"];
  return (
    <div className="px-4 sm:px-6 py-2 bg-white">
      <div className="flex items-center justify-between max-w-2xl flex-wrap mx-auto gap-2">
        {labels.map((label, step) => {
          const isActive = step + 1 <= currentStep;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div
                className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  isActive ? "bg-green-600 border-green-600 text-white" : "border-slate-300 text-slate-400"
                }`}
              >
                {step + 1}
              </div>
              <div className={`ml-2 text-sm font-medium ${isActive ? "text-green-600" : "text-slate-400"}`}>
                {label}
              </div>
              {step < labels.length - 1 && (
                <div className={`w-full border-b h-0.5 ml-4 ${step < currentStep ? "bg-blue-600" : "bg-slate-300"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
