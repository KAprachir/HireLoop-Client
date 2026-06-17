import React from "react";
import Link from "next/link";
import {
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronLeft,
  ChevronRight,
  Persons,
  Briefcase,
  Layers,
  Display,
  Check,
  Clock,
  Xmark,
} from "@gravity-ui/icons";

const AdminDashboardHomePage = async () => {
  // --- PRODUCTION READY DATA OR MOCK STRINGS FROM REFS (image_3b849e.png) ---
  const stats = [
    {
      label: "Total Users",
      value: "124,892",
      trend: "+12%",
      isUp: true,
      icon: Persons,
    },
    {
      label: "Total Recruiters",
      value: "12,405",
      trend: "+8%",
      isUp: true,
      icon: Briefcase,
    },
    {
      label: "Total Companies",
      value: "4,281",
      trend: "-0.1%",
      isUp: false,
      icon: Layers,
    },
    {
      label: "Jobs Posted",
      value: "8,920",
      trend: "+24%",
      isUp: true,
      icon: Display,
    },
    {
      label: "Platform Revenue",
      value: "$245,800",
      trend: "+18.5%",
      isUp: true,
      icon: Display,
    },
  ];

  const categories = [
    { name: "Engineering", height: "h-36" },
    { name: "Design", height: "h-24" },
    { name: "Marketing", height: "h-20" },
    { name: "Sales", height: "h-40" },
    { name: "Operations", height: "h-14" },
  ];

  const transactions = [
    {
      user: "marcus.k@techcorp.io",
      company: "TechCorp Inc.",
      plan: "Enterprise Monthly",
      txId: "#TXN-882341",
      amount: "$1,299.00",
      date: "Oct 24, 2026, 14:20",
      status: "Success",
    },
    {
      user: "sarah.l@creativestudio.com",
      company: "Creative Studio",
      plan: "Professional Annual",
      txId: "#TXN-882183",
      amount: "$499.00",
      date: "Oct 24, 2026, 11:05",
      status: "Success",
    },
    {
      user: "j.doe@freelance.org",
      company: "Independent",
      plan: "Starter Monthly",
      txId: "#TXN-774129",
      amount: "$49.00",
      date: "Oct 23, 2026, 18:45",
      status: "Pending",
    },
    {
      user: "admin@retailglobal.net",
      company: "Retail Global",
      plan: "Enterprise Monthly",
      txId: "#TXN-552014",
      amount: "$1,299.00",
      date: "Oct 23, 2026, 09:12",
      status: "Failed",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-8 space-y-8 selection:bg-zinc-800">
      {/* --- DASHBOARD HEADER PANEL --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Dashboard Overview
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Real-time platform performance and growth metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-zinc-300 hover:text-white transition">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            Last 30 Days
          </button>
          <button className="text-xs font-bold bg-white text-zinc-950 px-3 py-2 rounded-lg hover:bg-zinc-200 transition">
            Export Report
          </button>
        </div>
      </div>

      {/* --- METRICS ROW MATRIX --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="p-4 bg-[#121214]/60 border border-zinc-900 rounded-xl space-y-3 shadow-md relative overflow-hidden group hover:border-zinc-800/80 transition-all"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div
                  className={`inline-flex items-center text-[10px] font-bold ${stat.isUp ? "text-emerald-400" : "text-zinc-500"}`}
                >
                  {stat.isUp ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  {stat.label}
                </p>
                <p className="text-2xl font-extrabold text-zinc-100 tracking-tight mt-1">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- CHARTS ROW SECTION (Split-Grid layout from image_3b849e.png) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Job Posts by Category */}
        <div className="lg:col-span-7 p-6 bg-[#121214]/40 border border-zinc-900 rounded-2xl flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
              Job Posts by Category
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-zinc-600" />
              Active Listings
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 pt-4 w-full h-44 border-b border-zinc-900 px-2">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-1 space-y-3 group"
              >
                <div
                  className={`w-full ${cat.height} bg-zinc-800/60 rounded-t-md group-hover:bg-zinc-700/60 transition-colors duration-300 relative`}
                />
                <span className="text-[10px] font-medium text-zinc-500 tracking-tight text-center pb-2 truncate w-full">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: New User Analytics Vector Canvas Line */}
        <div className="lg:col-span-5 p-6 bg-[#121214]/40 border border-zinc-900 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
              New Users (30d)
            </h2>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              +2,410
            </span>
          </div>

          {/* SVG Vector Layout matching line asset path directly from reference snapshot image_3b849e.png */}
          <div className="w-full h-40 relative mt-4">
            <svg
              viewBox="0 0 400 150"
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Shaded Area */}
              <path
                d="M 30 110 Q 90 90 140 70 T 260 90 T 350 40 L 350 150 L 30 150 Z"
                fill="url(#chartGradient)"
              />
              {/* Smooth Core Data Path */}
              <path
                d="M 30 110 Q 90 90 140 70 T 260 90 T 350 40"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Data Points Indicators */}
              <circle cx="30" cy="110" r="3.5" fill="#ffffff" />
              <circle cx="140" cy="70" r="3.5" fill="#ffffff" />
              <circle cx="260" cy="90" r="3.5" fill="#ffffff" />
              <circle
                cx="350"
                cy="40"
                r="4.5"
                fill="#ffffff"
                stroke="#000000"
                strokeWidth="1"
              />
            </svg>

            {/* Peak Target Label Bubble badge */}
            <div className="absolute top-[10%] right-[14%] bg-white text-[9px] font-extrabold text-zinc-950 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md scale-95 pointer-events-none">
              Peak Growth
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-medium font-mono pt-2">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Day 30</span>
          </div>
        </div>
      </div>

      {/* --- SUBSCRIPTIONS TRANSACTIONS PANEL TABLE --- */}
      <div className="bg-[#121214]/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-5 border-b border-zinc-900 flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wide">
            Recent Subscription Transactions
          </h2>
          <Link
            href="/dashboard/admin/transactions"
            className="text-xs font-semibold text-zinc-400 hover:text-white border border-zinc-800 bg-zinc-900/50 px-2.5 py-1.5 rounded-lg transition"
          >
            View All Activity
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b border-zinc-900 bg-zinc-900/40 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                <th className="py-4 px-6">User / Recruiter</th>
                <th className="py-4 px-6">Plan Type</th>
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/40 text-sm">
              {transactions.map((tx, idx) => {
                const statusLower = tx.status.toLowerCase();
                return (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-900/20 transition-colors group"
                  >
                    {/* User Info identity slot column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-[10px] font-bold font-mono tracking-wider flex items-center justify-center text-zinc-300">
                          {tx.user.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                            {tx.user}
                          </span>
                          <span className="text-xs text-zinc-500 font-medium">
                            {tx.company}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Plan classification metadata badge slot */}
                    <td className="py-4 px-6">
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-md uppercase">
                        {tx.plan}
                      </span>
                    </td>

                    {/* Transaction Reference Number string */}
                    <td className="py-4 px-6 font-mono text-xs text-zinc-500">
                      {tx.txId}
                    </td>

                    {/* Cash Currency metrics parsing output value */}
                    <td className="py-4 px-6 font-bold text-zinc-200">
                      {tx.amount}
                    </td>

                    {/* Event Timestamp calendar string */}
                    <td className="py-4 px-6 text-zinc-400 text-xs">
                      {tx.date}
                    </td>

                    {/* Status Badge layout conditional routing matrix block */}
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${
                          statusLower === "success"
                            ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                            : statusLower === "pending"
                              ? "text-amber-400 bg-amber-500/5 border-amber-500/10"
                              : "text-red-400 bg-red-500/5 border-red-500/10"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            statusLower === "success"
                              ? "bg-emerald-400"
                              : statusLower === "pending"
                                ? "bg-amber-400"
                                : "bg-red-400"
                          }`}
                        />
                        <span>{tx.status}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- SYSTEM TABULAR PAGINATION CONTROLS FOOTER --- */}
        <div className="bg-zinc-900/20 border-t border-zinc-900 px-6 py-4 flex items-center justify-center sm:justify-end gap-2 text-xs">
          <button
            disabled
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-700 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-bold">
            1
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium border border-zinc-800 transition">
            2
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium border border-zinc-800 transition">
            3
          </button>
          <button className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHomePage;
