import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertManagerProps {
  error?: string;
  success?: string;
}

export function AlertManager({ error, success }: AlertManagerProps) {
  if (!error && !success) return null;

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
