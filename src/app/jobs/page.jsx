import JobListingContainer from "@/components/jobs/JobListingContainer";
import { getjobs } from "@/lib/api/job";

export default async function Page() {
  // Fetch data server-side
  const jobs = await getjobs();

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Open Positions</h1>
        <p className="text-zinc-400 mt-2">
          Discover your next engineering challenge.
        </p>
      </div>

      {/* Pass data securely to the container */}
      <JobListingContainer initialJobs={jobs || []} />
    </div>
  );
}
