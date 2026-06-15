"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import {
  Magnifier,
  Bell,
  Envelope,
  Bookmark,
  Briefcase,
  ChevronRight,
} from "@gravity-ui/icons";
import { Card, Progress, Button } from "@heroui/react";

export default function SeekerDashboardHome() {
  const { data: session } = useSession();
  const user = session?.user || {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    plan: "seeker-pro",
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Simulated metrics based on Image 1
  const metrics = [
    {
      title: "Saved Jobs",
      value: 12,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </svg>
      ),
      href: "/dashboard/seeker/saved",
    },
    {
      title: "Applications Submitted",
      value: 24,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-zinc-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      href: "/dashboard/seeker/applications",
    },
    {
      title: "Interviews Scheduled",
      value: 3,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
        </svg>
      ),
      href: "/dashboard/seeker/applications",
    },
    {
      title: "Offers Received",
      value: 1,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.75V10.5h.75c.621 0 1.125-.504 1.125-1.125V8.25M6.75 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.75V10.5h-.75a1.125 1.125 0 01-1.125-1.125V8.25M9.75 18.75V9m4.5 9.75V9m-4.5 0a1.5 1.5 0 001.5-1.5V5.625c0-.621-.504-1.125-1.125-1.125H11.25a9 9 0 00-9 9v1.125c0 .621.504 1.125 1.125 1.125h.75M14.25 9a1.5 1.5 0 01-1.5-1.5V5.625c0-.621.504-1.125 1.125-1.125h.375a9 9 0 019 9v1.125c0 .621-.504 1.125-1.125 1.125h-.75" />
        </svg>
      ),
      href: "/dashboard/seeker/applications",
    },
  ];

  // Status distributions based on Image 1
  const statuses = [
    { label: "Applied", count: 10, max: 10, color: "bg-white", textClass: "text-white" },
    { label: "Under Review", count: 6, max: 10, color: "bg-amber-500", textClass: "text-amber-400" },
    { label: "Shortlisted", count: 5, max: 10, color: "bg-blue-500", textClass: "text-blue-400" },
    { label: "Rejected", count: 2, max: 10, color: "bg-red-500", textClass: "text-red-400" },
    { label: "Offered", count: 1, max: 10, color: "bg-emerald-500", textClass: "text-emerald-400" },
  ];

  // Activity list based on Image 1
  const activities = [
    {
      id: 1,
      time: "2 hours ago",
      icon: (
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </div>
      ),
      content: (
        <span className="text-zinc-300">
          Application for <span className="text-white font-medium">Senior Product Designer</span> at{" "}
          <span className="text-white font-medium">TechFlow</span> updated to{" "}
          <Link href="/dashboard/seeker/applications" className="text-amber-400 hover:text-amber-300 underline font-medium">
            'Under Review'
          </Link>
        </span>
      ),
    },
    {
      id: 2,
      time: "5 hours ago",
      icon: (
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
        </div>
      ),
      content: (
        <span className="text-zinc-300">
          New Job Alert: <span className="text-white font-medium">Lead Frontend Engineer</span> at{" "}
          <span className="text-white font-medium">FinGrid</span> matches your profile.
        </span>
      ),
    },
    {
      id: 3,
      time: "1 day ago",
      icon: (
        <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      ),
      content: (
        <span className="text-zinc-300">
          You have a new message from <span className="text-white font-medium">Sarah Jenkins</span> (Hiring Manager at{" "}
          <span className="text-white font-medium">CloudOps</span>).
        </span>
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 relative selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* --- TOP ROW HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search for opportunities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-400 hover:text-white transition">
              <Envelope className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
              <img
                src={user?.image}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- METRICS PANEL ROW --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((card, index) => (
            <Link href={card.href} key={index} className="block group">
              <Card className="p-5 bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800 rounded-2xl transition-all duration-300 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-850 flex items-center justify-center group-hover:border-zinc-700 transition-colors">
                    {card.icon}
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-zinc-100 group-hover:text-white transition-colors">
                  {card.value}
                </p>
              </Card>
            </Link>
          ))}
        </div>

        {/* --- MIDDLE COLUMN ROW: Profile Card & Application Status --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Profile Summary Card */}
          <div className="md:col-span-5 flex flex-col">
            <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex-1 flex flex-col justify-between items-center text-center">
              <div className="space-y-4 my-auto">
                {/* Large Avatar */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-800 mx-auto shadow-inner bg-zinc-800">
                  <img
                    src={user?.image}
                    alt="User Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Details */}
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{user?.name}</h3>
                  <p className="text-sm text-zinc-500 font-medium mt-1">{user?.email}</p>
                </div>
              </div>

              {/* Edit button */}
              <Link href="/dashboard/seeker/settings" className="w-full mt-6">
                <Button className="w-full h-11 bg-zinc-900 hover:bg-zinc-855 border border-zinc-800 text-zinc-200 text-sm font-semibold rounded-xl transition active:scale-[0.98]">
                  Edit Profile
                </Button>
              </Link>
            </Card>
          </div>

          {/* Application Status Chart */}
          <div className="md:col-span-7 flex flex-col">
            <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl flex-1 space-y-5">
              <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                Application Status
              </h3>
              <div className="space-y-3.5">
                {statuses.map((status, index) => {
                  const percentage = (status.count / status.max) * 100;
                  return (
                    <div key={index} className="flex items-center justify-between text-xs gap-3">
                      {/* Label on left */}
                      <span className="w-24 text-zinc-400 font-medium text-left truncate">
                        {status.label}
                      </span>
                      {/* Bar in center */}
                      <div className="flex-1 h-2 bg-zinc-950 border border-zinc-900 rounded-full overflow-hidden relative">
                        <div
                          className={`h-full ${status.color} rounded-full`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      {/* Count on right */}
                      <span className={`w-5 font-bold text-right ${status.textClass}`}>
                        {status.count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* --- BOTTOM ROW: Recent Activity --- */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/seeker/applications"
              className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
            >
              View All Activity
            </Link>
          </div>

          <div className="divide-y divide-zinc-900">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between py-4 first:pt-0 last:pb-0 gap-4"
              >
                <div className="flex items-center gap-4">
                  {act.icon}
                  <div className="text-sm leading-normal">{act.content}</div>
                </div>
                <span className="text-xs text-zinc-500 whitespace-nowrap pt-1">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FLOATING ACTION BUTTON --- */}
      <Link href="/jobs" className="fixed bottom-6 right-6 z-50">
        <button className="w-12 h-12 rounded-full bg-white hover:bg-zinc-200 text-black shadow-2xl flex items-center justify-center font-bold text-xl transition active:scale-90 select-none">
          +
        </button>
      </Link>
    </div>
  );
}
