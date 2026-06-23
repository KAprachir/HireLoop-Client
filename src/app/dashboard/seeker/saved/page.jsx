"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  Magnifier,
  Bell,
  Bookmark,
  ChevronDown,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

// Sample Saved Jobs data based on Image 2
const initialSavedJobs = [
  {
    id: "job-1",
    title: "Senior Product Designer",
    company: "TechFlow",
    category: "Design",
    location: "San Francisco, CA (Hybrid)",
    salary: "$160k - $200k + Equity",
    savedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    timeAgoText: "Saved 2 hours ago",
    deadlineText: "Closes in 3 days",
    deadlineColor: "text-amber-500 bg-amber-500/5 border-amber-500/10",
    status: "Apply Now",
    logoLetter: "T",
    logoBg: "bg-purple-950/60 text-purple-400 border-purple-900/40",
  },
  {
    id: "job-2",
    title: "Frontend Engineer",
    company: "Vercel",
    category: "Engineering",
    location: "Remote, Global",
    salary: "$140k - $180k",
    savedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
    timeAgoText: "Saved yesterday",
    deadlineText: "",
    deadlineColor: "",
    status: "Apply Now",
    logoLetter: "▲",
    logoBg: "bg-zinc-950 text-white border-zinc-800",
  },
  {
    id: "job-3",
    title: "Staff UI Researcher",
    company: "Linear",
    category: "Design",
    location: "New York, NY (On-site)",
    salary: "$180k - $220k",
    savedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    timeAgoText: "Saved 3 days ago",
    deadlineText: "",
    deadlineColor: "",
    status: "Draft Started",
    logoLetter: "L",
    logoBg: "bg-red-950/40 text-red-400 border-red-900/30",
  },
  {
    id: "job-4",
    title: "Full Stack Developer",
    company: "Meta",
    category: "Engineering",
    location: "Menlo Park, CA (Hybrid)",
    salary: "$150k - $210k + Bonus",
    savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    timeAgoText: "Saved 5 days ago",
    deadlineText: "",
    deadlineColor: "",
    status: "Apply Now",
    logoLetter: "∞",
    logoBg: "bg-blue-950/40 text-blue-400 border-blue-900/30",
  },
  {
    id: "job-5",
    title: "Design Systems Lead",
    company: "Spotify",
    category: "Design",
    location: "Remote, USA",
    salary: "Closed",
    savedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    timeAgoText: "Closed yesterday",
    deadlineText: "Closed",
    deadlineColor: "text-red-400 bg-red-500/5 border-red-500/10",
    status: "Remove from List",
    logoLetter: "S",
    logoBg: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
    isClosed: true,
  },
];

export default function SavedJobs() {
  const { data: session } = useSession();
  const user = session?.user || { name: "Guest" };

  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [activeFilter, setActiveFilter] = useState("All Saved");
  const [sortBy, setSortBy] = useState("Recently Saved");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Categories and their count mapping
  const filters = [
    { label: "All Saved", count: savedJobs.length },
    { label: "Design", count: savedJobs.filter((j) => j.category === "Design").length },
    { label: "Engineering", count: savedJobs.filter((j) => j.category === "Engineering").length },
    { label: "Product", count: savedJobs.filter((j) => j.category === "Product").length },
  ];

  const handleRemove = (jobId, title) => {
    setSavedJobs(savedJobs.filter((j) => j.id !== jobId));
    toast.success(`Removed "${title}" from saved jobs`);
  };

  const handleApply = (jobId, title) => {
    setSavedJobs(
      savedJobs.map((j) =>
        j.id === jobId ? { ...j, status: "Draft Started" } : j
      )
    );
    toast.success(`Application draft started for "${title}"!`);
  };

  // Filter & Sort Logic
  const filteredJobs = savedJobs
    .filter((job) => {
      const matchesFilter =
        activeFilter === "All Saved" || job.category === activeFilter;
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "Recently Saved") {
        return b.savedAt.getTime() - a.savedAt.getTime();
      }
      if (sortBy === "Alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const closingSoonCount = savedJobs.filter((j) => j.deadlineText && j.deadlineText.includes("days")).length;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- LOCAL TOP BAR ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          {/* Search jobs */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          {/* Bell & Action Button */}
          <div className="flex items-center justify-end gap-4">
            <button className="text-zinc-400 hover:text-white transition relative p-2 rounded-lg hover:bg-zinc-900/50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>
            <Link href="/dashboard/seeker/settings">
              <Button className="h-10 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl transition active:scale-[0.98]">
                + Upload Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* --- PAGE HEADER & QUICK METRICS ROW --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Saved Jobs</h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage and track your bookmarked opportunities.
            </p>
          </div>

          {/* Quick Metrics (Image 2 right card) */}
          <div className="flex gap-4">
            {/* Total Saved Card */}
            <Card className="p-4 bg-zinc-900/30 border border-zinc-900 flex items-center gap-4 min-w-[140px] shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Total Saved</p>
                <p className="text-xl font-bold text-white mt-0.5">{savedJobs.length}</p>
              </div>
            </Card>

            {/* Closing Soon Card */}
            <Card className="p-4 bg-zinc-900/30 border border-zinc-900 flex items-center gap-4 min-w-[140px] shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Closing Soon</p>
                <p className="text-xl font-bold text-amber-500 mt-0.5">{closingSoonCount}</p>
              </div>
            </Card>
          </div>
        </div>

        {/* --- FILTER & SORT CONTROL BAR ROW --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-3">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                  activeFilter === filter.label
                    ? "bg-zinc-900 border-zinc-800 text-white shadow-sm"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {filter.label}
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 bg-zinc-950 border border-zinc-900 rounded-md font-bold text-zinc-500">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition"
            >
              <span>Sort by: {sortBy}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-10 py-1 overflow-hidden">
                <button
                  onClick={() => {
                    setSortBy("Recently Saved");
                    setIsSortOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                >
                  Recently Saved
                </button>
                <button
                  onClick={() => {
                    setSortBy("Alphabetical");
                    setIsSortOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                >
                  Alphabetical
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- SAVED JOBS CARDS LIST PANEL --- */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
              No saved jobs found matching current filters.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.id}
                className={`p-5 bg-zinc-900/40 border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all group duration-300 shadow-md ${
                  job.isClosed ? "border-zinc-950/80 opacity-60" : "border-zinc-900 hover:border-zinc-850"
                }`}
              >
                {/* Logo & Info details */}
                <div className="flex items-center gap-4 min-w-0">
                  {/* Brand Logo Box */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold text-lg flex-shrink-0 transition-colors ${job.logoBg}`}>
                    {job.logoLetter}
                  </div>

                  {/* Title & tags */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-zinc-200 group-hover:text-white transition-colors text-base truncate">
                        {job.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded-md text-zinc-400 uppercase tracking-wider">
                        {job.company}
                      </span>
                    </div>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mt-1.5 font-medium">
                      <span>{job.location}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>

                {/* Right side interactions */}
                <div className="flex flex-wrap items-center justify-start md:justify-end gap-4 flex-shrink-0">
                  {/* Info badges */}
                  <div className="flex flex-col items-start md:items-end gap-1.5">
                    <span className="text-[11px] text-zinc-500 font-medium">
                      {job.timeAgoText}
                    </span>
                    {job.deadlineText && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${job.deadlineColor}`}>
                        {job.deadlineText}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleRemove(job.id, job.title)}
                    className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 flex items-center justify-center text-white hover:text-red-400 transition"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-white" />
                  </button>

                  {/* CTA Action button */}
                  {job.status === "Apply Now" && (
                    <Button
                      onClick={() => handleApply(job.id, job.title)}
                      className="h-10 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl px-5 transition active:scale-[0.98]"
                    >
                      Apply Now
                    </Button>
                  )}
                  {job.status === "Draft Started" && (
                    <Button
                      disabled
                      className="h-10 bg-zinc-900 border border-zinc-800 text-zinc-400 font-semibold text-xs rounded-xl px-5"
                    >
                      Draft Started
                    </Button>
                  )}
                  {job.status === "Remove from List" && (
                    <Button
                      onClick={() => handleRemove(job.id, job.title)}
                      className="h-10 bg-transparent border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-red-400 font-bold text-xs rounded-xl px-4 transition active:scale-[0.98]"
                    >
                      Remove from List
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* --- LOAD MORE ROW --- */}
        {filteredJobs.length > 0 && (
          <div className="flex justify-center pt-4">
            <button className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs font-semibold transition py-2 px-4 rounded-xl bg-zinc-900/20 border border-transparent hover:border-zinc-800">
              <span>Load More</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
