import { getJobsById } from "@/lib/api/job";
import { Link } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronLeft,
  ShieldCheck,
  Rocket,
  CircleDollar,
  Gear, // Added missing icon import
} from "@gravity-ui/icons";

const JobDetailsPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobsById(id);

  // Fallback state if no job document is found
  if (!job) {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6">
        <p className="text-zinc-400 text-lg">
          Job listing not found or expired.
        </p>
        <Link
          href="/jobs"
          className="mt-4 text-zinc-400 hover:text-white flex items-center gap-2 text-sm transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to open positions
        </Link>
      </div>
    );
  }

  // Format currency neatly (e.g., $150,000)
  const formatSalary = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: job.currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-12 selection:bg-zinc-800">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-8 transition group"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition" />
          Back to Open Positions
        </Link>

        {/* Header Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-800 pb-8 mb-10">
          <div className="flex items-center gap-5">
            {job.companyLogo && (
              <img
                src={job.companyLogo}
                alt={`${job.companyName} logo`}
                className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 object-contain"
              />
            )}
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-zinc-400 font-medium text-lg">
                  {job.companyName}
                </span>
                {job.isRemote && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider">
                    Remote
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 text-zinc-100">
                {job.jobTitle}
              </h1>
            </div>
          </div>

          {/* Action Call to Action Button */}
          <Link
            href={`/jobs/${id}/apply`}
            className="w-full md:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-semibold px-8 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
          >
            <Rocket className="w-4 h-4" />
            Apply Now
          </Link>
        </div>

        {/* Core Breakdown Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <CircleDollar className="text-zinc-500 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Salary Range
              </p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                {formatSalary(job.minSalary)} - {formatSalary(job.maxSalary)}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <MapPin className="text-zinc-500 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5 truncate max-w-[180px]">
                {job.location}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <Briefcase className="text-zinc-500 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Job Nature
              </p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5 capitalize">
                {job.jobType}
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-xl flex items-start gap-3">
            <Calendar className="text-zinc-500 w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                Application Due
              </p>
              <p className="text-sm font-semibold text-zinc-200 mt-0.5">
                {job.deadline}
              </p>
            </div>
          </div>
        </div>

        {/* Comprehensive Text Details Container */}
        <div className="space-y-10 max-w-3xl">
          {/* Responsibilities */}
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-3">
              <ShieldCheck className="text-zinc-400 w-5 h-5" /> Role Overview &
              Responsibilities
            </h2>
            <p className="text-zinc-400 leading-relaxed text-base bg-zinc-900/30 p-5 border border-zinc-900 rounded-xl">
              {job.responsibilities}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-3">
              <Gear className="text-zinc-400 w-5 h-5" /> Requirements &
              Qualifications
            </h2>
            <p className="text-zinc-400 leading-relaxed text-base bg-zinc-900/30 p-5 border border-zinc-900 rounded-xl whitespace-pre-line">
              {job.requirements}
            </p>
          </div>

          {/* Benefits */}
          {job.benefits && (
            <div>
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2 mb-3">
                <Briefcase className="text-zinc-400 w-5 h-5" /> Perks & Benefits
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.benefits.split(",").map((benefit, idx) => (
                  <span
                    key={idx}
                    className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-sm text-zinc-300"
                  >
                    {benefit.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
