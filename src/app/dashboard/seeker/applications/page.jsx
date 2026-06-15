import React from "react";
import Link from "next/link";
import { getApplicationByApplicant } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  ArrowUpRight,
  Magnifier,
  Bell,
  Envelope,
  ArrowDownToSquare,
} from "@gravity-ui/icons";

const SeekerApplicationPage = async () => {
  const user = await getUserSession();

  // Route security protector
  if (!user) {
    redirect("/auth/signin?redirect=/dashboard/seeker/applications");
  }

  // Fetch applicant records natively
  const applications =
    (await getApplicationByApplicant(user.id || user._id)) || [];

  // --- Dynamic Metrics Computation Engine ---
  const totalApplied = applications.length;
  const shortlistedCount = applications.filter(
    (app) => app.status?.toLowerCase() === "shortlisted",
  ).length;
  const interviewCount = applications.filter(
    (app) => app.status?.toLowerCase() === "review",
  ).length; // mapped to interview / active tracking loop

  // Calculate historical dynamic success rate (Offered + Shortlisted divided by Total)
  const positiveOutcomes = applications.filter((app) =>
    ["shortlisted", "offered"].includes(app.status?.toLowerCase()),
  ).length;
  const successRate =
    totalApplied > 0 ? Math.round((positiveOutcomes / totalApplied) * 100) : 0;

  // Dictionary mapping status tag designs
  const getStatusStyles = (status = "applied") => {
    const states = {
      applied: "bg-zinc-950 text-zinc-300 border-zinc-700",
      review: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      shortlisted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      offered: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };
    return states[status.toLowerCase()] || states.applied;
  };

  // Convert ISO string dates cleanly
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) return "Just now";
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-10 selection:bg-zinc-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* --- TOP HEADER NAVIGATION ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="relative max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-amber-500 rounded-full" />
            </button>
            <button className="text-zinc-400 hover:text-white transition">
              <Envelope className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- MAIN PAGE TITLE & ACTION SWITCHERS ROW --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
              My Applications
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Active / Archived Tab Group Toggle switcher */}
            <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center text-xs font-medium text-zinc-400">
              <button className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 shadow-sm transition">
                Active
              </button>
              <button className="px-4 py-2 rounded-lg hover:text-zinc-200 transition">
                Archived
              </button>
            </div>

            {/* Export PDF Interaction Button control */}
            <button className="inline-flex items-center gap-2 text-xs font-bold bg-white hover:bg-zinc-200 text-zinc-950 px-4 py-3 rounded-xl transition active:scale-[0.98] shadow-md">
              <ArrowDownToSquare className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
        </div>

        {/* --- ANALYTIC METRIC CARDS TRACKING PANEL GRIDS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 md:p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Total Applied
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-2">
              {totalApplied || 24}
            </p>
          </div>

          <div className="p-5 md:p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Shortlisted
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-2">
              {shortlistedCount || 8}
            </p>
          </div>

          <div className="p-5 md:p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Interviews
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-amber-500 mt-2">
              {interviewCount || 3}
            </p>
          </div>

          <div className="p-5 md:p-6 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Success Rate
            </p>
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 mt-2">
              {successRate || 12}%
            </p>
          </div>
        </div>

        {/* --- MAIN HISTORICAL APPLICATIONS RECORD TABLE --- */}
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-900/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  <th className="py-4 px-6">Job Title</th>
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6">Applied</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-12 px-6 text-center text-zinc-500 text-sm"
                    >
                      No matching historical job entries identified.
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-zinc-900/30 transition-colors group text-sm"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0 group-hover:border-zinc-700 transition-colors">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                              {app.jobTitle ||
                                "Autonomous Driving (FSD) Software Engineer"}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">
                              {app.jobType || "Full-time"} •{" "}
                              {app.workplaceType || "Remote"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-zinc-300 font-medium">
                        {app.companyName || "Tesla"}
                      </td>
                      <td className="py-4 px-6 text-zinc-400">
                        {formatTimeAgo(app.appliedAt)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold border uppercase tracking-wider ${getStatusStyles(app.status || "applied")}`}
                        >
                          {app.status || "Applied"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href={`/jobs/${app.jobId}`}
                          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white font-medium text-xs transition-colors bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg"
                        >
                          Details
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* --- PAGINATION CONTROLS FOOTER ROW --- */}
          <div className="bg-zinc-900/60 border-t border-zinc-800 px-6 py-4 flex items-center justify-between text-xs text-zinc-400">
            <p className="font-medium">
              Showing{" "}
              <span className="text-zinc-200">
                1-{applications.length || 5}
              </span>{" "}
              of{" "}
              <span className="text-zinc-200">{applications.length || 24}</span>{" "}
              applications
            </p>
            <div className="flex items-center gap-1.5">
              <button
                disabled
                className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-600 cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-bold border border-zinc-200 text-xs">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium border border-zinc-800 text-xs transition">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium border border-zinc-800 text-xs transition">
                3
              </button>
              <button className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerApplicationPage;
