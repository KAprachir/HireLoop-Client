import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

const DashBoardLayout = async ({ children }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin?redirect=/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
