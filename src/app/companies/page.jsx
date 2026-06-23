import { getjobs } from "@/lib/api/job";
import CompaniesContainer from "./CompaniesContainer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Companies Hiring - Hire Loop",
  description: "Browse tech teams and engineering departments actively hiring developers on Hire Loop.",
};

export default async function CompaniesPage() {
  // Fetch active jobs server-side
  const jobsData = await getjobs();
  const jobs = jobsData?.jobs || [];

  // Extract unique companies from jobs array
  const companyMap = {};
  
  if (Array.isArray(jobs)) {
    jobs.forEach((job) => {
      if (!job || !job.companyName) return;
      const key = job.companyName.trim().toLowerCase();
      if (!companyMap[key]) {
        companyMap[key] = {
          name: job.companyName,
          logo: job.companyLogo || null,
          location: job.location || "Remote",
          category: job.jobCategory || "Technology",
          jobCount: 0,
        };
      }
      companyMap[key].jobCount += 1;
    });
  }

  const companiesList = Object.values(companyMap);

  return (
    <div className="w-full min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="max-w-7xl mx-auto mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
          Hiring Companies
        </h1>
        <p className="text-zinc-400 mt-2">
          Explore innovative tech teams hiring active developers and builders.
        </p>
      </div>

      <CompaniesContainer initialCompanies={companiesList} />
    </div>
  );
}
