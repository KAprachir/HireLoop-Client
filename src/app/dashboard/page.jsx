import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export default async function DashboardRoot() {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin?redirect=/dashboard");
  }
  
  if (user.role === "admin") {
    redirect("/dashboard/admin");
  } else if (user.role === "seeker") {
    redirect("/dashboard/seeker");
  } else {
    redirect("/dashboard/recruiter");
  }
}
