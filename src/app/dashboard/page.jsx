import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export default async function DashboardRoot() {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin?redirect=/dashboard/recruiter");
  }
  redirect("/dashboard/recruiter");
}
