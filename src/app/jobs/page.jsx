import React from "react";
import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getjobs } from "@/lib/api/job";

export const revalidate = 0;

export default async function Page({ searchParams }) {
  const filters = await searchParams;

  const filterObj = {
    ...filters,
    isRemote: filters.isRemote === "true" ? true : false,
  };

  const querySearch = new URLSearchParams();
  if (filters.search) querySearch.set("search", filters.search);
  if (filters.jobType) querySearch.set("jobType", filters.jobType);
  if (filters.jobCategory) querySearch.set("jobCategory", filters.jobCategory);
  if (filters.isRemote) querySearch.set("isRemote", filters.isRemote);
  if (filters.page) querySearch.set("page", filters.page);

  const queryString = querySearch.toString();

  // Fetch server-side payload object
  const jobsData = await getjobs(queryString);

  const standardizedJobs =
    jobsData && jobsData.jobs
      ? jobsData
      : { jobs: [], totalJobs: 0, totalPages: 1 };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto mb-10 border-b border-zinc-900 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
          Open Positions
        </h1>
      </div>

      <JobListingContainer filters={filterObj} jobs={standardizedJobs} />
    </div>
  );
}
