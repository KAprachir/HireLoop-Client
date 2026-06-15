import React from "react";
import { redirect } from "next/navigation";
import { getCompanies } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";
import CompaniesTable from "@/components/dashboard/CompaniesTable";

const CompaniesReviewPage = async () => {
  const user = await getUserSession();

  // Guard: Protect admin route context layout
  if (!user || user.role !== "admin") {
    redirect("/unauthorized");
  }

  // Fetch all company registration profiles from MongoDB Atlas
  const companies = (await getCompanies()) || [];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-10 selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Simple Header Area */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Company Approvals
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Review corporate workspace profiles awaiting verification status
            modifications.
          </p>
        </div>

        {/* Modular Interactive Data Table Component Wrapper */}
        <CompaniesTable initialCompanies={companies} />
      </div>
    </div>
  );
};

export default CompaniesReviewPage;
