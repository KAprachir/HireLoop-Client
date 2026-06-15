"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  Magnifier,
  Bell,
  Envelope,
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

export default function RecruiterDashboardHome() {
  const { data: session } = useSession();
  const user = session?.user || {
    name: "Alex Sterling",
    email: "alex.sterling@techflow.inc",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "recruiter",
  };

  const [searchQuery, setSearchQuery] = useState("");

  const recruiterStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: <FileText className="w-5 h-5 text-zinc-400" />,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: <Persons className="w-5 h-5 text-zinc-400" />,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: <Thunderbolt className="w-5 h-5 text-violet-400" />,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: <CircleCheck className="w-5 h-5 text-zinc-400" />,
    },
  ];

  const recentApplications = [
    {
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      experience: "6 years",
      status: "Interviewing",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    },
    {
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      experience: "4 years",
      status: "New",
      statusColor: "text-zinc-300 border-zinc-700 bg-zinc-800/40",
    },
    {
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      experience: "8 years",
      status: "Reviewing",
      statusColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    },
    {
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      experience: "5 years",
      status: "Rejected",
      statusColor: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    },
  ];

  const topCompanies = [
    {
      name: "Google Inc.",
      logo: "G",
      logoBg: "bg-blue-600/10 text-blue-400 border-blue-500/15",
      industry: "Technology",
      location: "Mountain View",
      activeJobs: 24,
    },
    {
      name: "Meta Platforms",
      logo: "M",
      logoBg: "bg-indigo-600/10 text-indigo-400 border-indigo-500/15",
      industry: "Social Media",
      location: "Menlo Park",
      activeJobs: 18,
    },
    {
      name: "Stripe",
      logo: "S",
      logoBg: "bg-purple-600/10 text-purple-400 border-purple-500/15",
      industry: "Fintech",
      location: "San Francisco",
      activeJobs: 12,
    },
    {
      name: "Tesla",
      logo: "T",
      logoBg: "bg-red-600/10 text-red-400 border-red-500/15",
      industry: "Automotive",
      location: "Austin",
      activeJobs: 31,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 relative selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* --- LOCAL TOP BAR ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search applications, jobs, or talent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>
            {/* Header profile info */}
            <div className="flex items-center gap-3 border-l border-zinc-900 pl-5">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-zinc-200">{user?.name}</p>
                <p className="text-[10px] text-zinc-500 font-medium">TechFlow Inc.</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
                <img
                  src={user?.image}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- WELCOME HEADER --- */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight">
            Welcome back, {user?.name.split(" ")[0]}
          </h1>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {recruiterStats.map((stat, idx) => (
            <Card key={idx} className="p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center text-zinc-400">
                  {stat.icon}
                </div>
              </div>
              <p className="text-3xl font-extrabold text-zinc-100">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* --- MIDDLE SECTION: RECENT APPLICATIONS & TOP COMPANIES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Recent Applications Card */}
          <Card className="lg:col-span-8 p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                Recent Applications
              </h3>
              <Link
                href="/dashboard/recruiter/jobs"
                className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse whitespace-nowrap text-sm">
                <thead>
                  <tr className="border-b border-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-3">
                    <th className="py-3 px-4 pl-0">Candidate Name</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Date Applied</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {recentApplications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/20 transition-colors group">
                      <td className="py-4 px-4 pl-0">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                            {app.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            {app.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-400 font-medium">{app.role}</td>
                      <td className="py-4 px-4 text-zinc-500">{app.date}</td>
                      <td className="py-4 px-4 text-zinc-400">{app.experience}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* My Top Companies Card */}
          <Card className="lg:col-span-4 p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                  My Top Companies
                </h3>
                <Link
                  href="/companies"
                  className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
                >
                  View all
                </Link>
              </div>

              {/* Companies list */}
              <div className="divide-y divide-zinc-900">
                {topCompanies.map((comp, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 gap-3 group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors ${comp.logoBg}`}>
                        {comp.logo}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors truncate">
                          {comp.name}
                        </p>
                        <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                          {comp.industry} • {comp.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-extrabold text-zinc-200">{comp.activeJobs}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider mt-0.5">Active Jobs</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <Link href="/companies" className="w-full">
              <Button className="w-full h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition active:scale-[0.98]">
                View All Companies
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* --- FLOATING ACTION BUTTON --- */}
      <Link href="/dashboard/recruiter/jobs/new" className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 rounded-full bg-white hover:bg-zinc-200 text-black shadow-2xl flex items-center justify-center font-bold text-xl transition active:scale-90 select-none">
          +
        </button>
      </Link>
    </div>
  );
}
