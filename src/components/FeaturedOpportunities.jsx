"use client";

import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

export default function FeaturedOpportunities({ initialJobs = [] }) {
  // Curated fallback mockup data
  const mockFeaturedJobs = [
    {
      title: "Frontend Developer",
      company: "TechFlow",
      location: "San Francisco, CA",
      type: "Full-time",
      workplace: "Hybrid",
      salary: "$120k - $150k",
      desc: "Work on next-generation telemetry dashboards and user-centric features.",
      logoLetter: "T",
      logoBg: "bg-purple-950/60 text-purple-400 border-purple-900/40",
    },
    {
      title: "Backend Engineer",
      company: "Vercel",
      location: "Remote, Global",
      type: "Full-time",
      workplace: "Remote",
      salary: "$140k - $170k",
      desc: "Develop robust developer pipelines, edge functions, and hosting routing architecture.",
      logoLetter: "▲",
      logoBg: "bg-zinc-950 text-white border-zinc-800",
    },
    {
      title: "Full Stack Developer",
      company: "Linear",
      location: "New York, NY",
      type: "Full-time",
      workplace: "On-site",
      salary: "$130k - $160k",
      desc: "Help scale task-tracking systems, desktop engines, and real-time syncing pipelines.",
      logoLetter: "L",
      logoBg: "bg-red-950/40 text-red-400 border-red-900/30",
    },
    {
      title: "Systems Architect",
      company: "Meta",
      location: "Menlo Park, CA",
      type: "Full-time",
      workplace: "Hybrid",
      salary: "$180k - $220k",
      desc: "Design AI training models, distributed databases, and high-performance networks.",
      logoLetter: "∞",
      logoBg: "bg-blue-950/40 text-blue-400 border-blue-900/30",
    },
    {
      title: "Product Designer",
      company: "Stripe",
      location: "Remote, Global",
      type: "Full-time",
      workplace: "Remote",
      salary: "$110k - $140k",
      desc: "Craft seamless checkout portals, dashboard components, and payment widgets.",
      logoLetter: "S",
      logoBg: "bg-indigo-950/40 text-indigo-400 border-indigo-900/30",
    },
    {
      title: "Site Reliability Engineer",
      company: "Tesla",
      location: "Austin, TX",
      type: "Full-time",
      workplace: "On-site",
      salary: "$135k - $165k",
      desc: "Maintain battery manufacturing automation scripts, OS kernels, and cloud pipelines.",
      logoLetter: "T",
      logoBg: "bg-red-950/40 text-red-400 border-red-900/30",
    },
  ];

  const getLogoColors = (name) => {
    const colors = [
      { bg: "bg-purple-950/60 text-purple-400 border-purple-900/40" },
      { bg: "bg-zinc-950 text-white border-zinc-800" },
      { bg: "bg-red-950/40 text-red-400 border-red-900/30" },
      { bg: "bg-blue-950/40 text-blue-400 border-blue-900/30" },
      { bg: "bg-indigo-950/40 text-indigo-400 border-indigo-900/30" },
      { bg: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30" },
      { bg: "bg-fuchsia-950/40 text-fuchsia-400 border-fuchsia-900/30" },
      { bg: "bg-amber-950/40 text-amber-400 border-amber-900/30" },
    ];
    let hash = 0;
    if (name) {
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const formatSalary = (amount) => {
    if (!amount) return "";
    const numeric = parseInt(amount, 10);
    if (isNaN(numeric)) return amount;
    return numeric >= 1000 ? `$${Math.round(numeric / 1000)}k` : `$${numeric}`;
  };

  // Map backend jobs structure to landing page structure
  const mappedDbJobs = (initialJobs || [])
    .filter((job) => job && job.status === "active")
    .map((job) => {
      const colors = getLogoColors(job.companyName || "");
      const salaryDisplay =
        job.minSalary && job.maxSalary
          ? `${formatSalary(job.minSalary)} - ${formatSalary(job.maxSalary)}`
          : job.minSalary
          ? `${formatSalary(job.minSalary)}`
          : "Salary Negotiable";

      const workplaceDisplay = job.isRemote ? "Remote" : "On-site";

      return {
        _id: job._id?.toString() || job._id,
        title: job.jobTitle,
        company: job.companyName,
        location: job.location || (job.isRemote ? "Remote" : "Varies"),
        type: job.jobType
          ? job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)
          : "Full-time",
        workplace: workplaceDisplay,
        salary: salaryDisplay,
        desc:
          job.responsibilities ||
          job.requirements ||
          "Click apply to view full responsibilities and qualifications for this role.",
        logoLetter: job.companyName?.charAt(0) || "?",
        logoBg: colors.bg,
        companyLogo: job.companyLogo || null,
      };
    });

  // Merge database jobs and fallback mock jobs, keeping it capped at 6.
  const displayJobs = [...mappedDbJobs, ...mockFeaturedJobs].slice(0, 6);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/20 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">
            Featured Opportunities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayJobs.map((job, idx) => (
            <Card
              key={job._id || idx}
              className="bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 rounded-3xl p-6 flex flex-col justify-between h-full group transition duration-300 relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Company Logo Row */}
                <div className="flex items-center gap-3">
                  {job.companyLogo ? (
                    <div className="w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900/50 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={job.companyLogo}
                        alt={`${job.company || "Company"} logo`}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm flex-shrink-0 ${job.logoBg}`}
                    >
                      {job.logoLetter}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                      {job.company}
                    </p>
                    <p className="text-[10px] text-zinc-600 font-semibold">
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="text-left space-y-1.5">
                  <h3 className="text-base font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-normal line-clamp-2">
                    {job.desc}
                  </p>
                </div>
              </div>

              {/* Bottom detail tags and Action */}
              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                  <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded">
                    {job.type}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded">
                    {job.workplace}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded text-emerald-500">
                    {job.salary}
                  </span>
                </div>
                <Link href={job._id ? `/jobs/${job._id}` : "/jobs"}>
                  <button className="text-[10px] font-bold bg-zinc-900 hover:bg-white text-zinc-300 hover:text-black px-3.5 py-2 rounded-xl transition active:scale-[0.98]">
                    Apply
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center pt-4">
          <Link href="/jobs">
            <Button className="bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl px-8 h-11 transition active:scale-[0.98] shadow-md flex items-center gap-1.5">
              View All Jobs <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
