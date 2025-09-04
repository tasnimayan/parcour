import { AgentProfilePage } from "./agent-profile-page";
import { cookies } from "next/headers";

export default function page() {
  const token = cookies().get("parcour_auth")?.value;

  return (
    <div className="flex items-center justify-center h-full">
      <AgentProfilePage token={token} />
    </div>
  );
}
