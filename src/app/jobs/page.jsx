import React from "react";
import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getjobs } from "@/lib/api/job";

export const revalidate = 0; // Guarantees fresh job postings are fetched on every request

export default async function Page({ searchParams }) {
  const filters = await searchParams;
  console.log(filters);
  // Fetch real-time job listings server-side via your central API utility
  const jobs = (await getjobs()) || [];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-12 selection:bg-zinc-800">
      {/* Page Header Block */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
          Open Positions
        </h1>
        <p className="text-zinc-400 mt-2 text-sm md:text-base">
          Discover your next engineering challenge and scale platform
          architectures.
        </p>
      </div>

      <JobListingContainer filters={filters} jobs={jobs} />
    </div>
  );
}
