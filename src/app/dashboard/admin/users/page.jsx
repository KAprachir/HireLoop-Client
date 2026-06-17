import React from "react";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";
import { getUser } from "@/lib/api/users";
import UsersTable from "./UsersTable";
import { ArrowUpRight, ChevronDown } from "@gravity-ui/icons";

const AdminUserPage = async () => {
  const session = await getUserSession();

  // Guard: Protect admin route context layout
  if (!session || session.role !== "admin") {
    redirect("/unauthorized");
  }

  // Fetch live users array via your corrected API service function
  const users = (await getUser()) || [];

  // --- Dynamic Dashboard Metrics Counter Engine ---
  const totalUsers = users.length;
  const suspendedCount = users.filter(
    (u) => u.status?.toLowerCase() === "suspended",
  ).length;
  const recruiterCount = users.filter(
    (u) => u.role?.toLowerCase() === "recruiter",
  ).length;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-8 space-y-8 selection:bg-zinc-800">
      {/* --- TOP HEADER NAVIGATION ROW --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            User Management
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Review, filter, and manage platform access for all users.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="inline-flex items-center gap-2 text-xs font-semibold bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-zinc-300 hover:text-white transition">
            All Roles
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>
          <button className="text-xs font-bold bg-white text-zinc-950 px-4 py-2.5 rounded-xl hover:bg-zinc-200 transition shadow-md">
            Export List
          </button>
        </div>
      </div>

      {/* --- ANALYTIC SUMMARY METRIC CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#121214]/60 border border-zinc-900 rounded-2xl space-y-3 shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Total Active Users
          </p>
          <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {totalUsers.toLocaleString()}
          </p>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12% vs last month</span>
          </div>
        </div>

        <div className="p-5 bg-[#121214]/60 border border-zinc-900 rounded-2xl space-y-3 shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Recruiter Capacity
          </p>
          <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {recruiterCount.toLocaleString()}
          </p>
          <div className="text-xs text-emerald-400 font-medium">
            <span>High demand</span>
          </div>
        </div>

        <div className="p-5 bg-[#121214]/60 border border-zinc-900 rounded-2xl space-y-3 shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Suspended Accounts
          </p>
          <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {suspendedCount.toLocaleString()}
          </p>
          <div className="text-xs text-zinc-500 font-medium">
            <span>Operational baseline</span>
          </div>
        </div>

        <div className="p-5 bg-[#121214]/60 border border-zinc-900 rounded-2xl space-y-3 shadow-md">
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            New Signups (24h)
          </p>
          <p className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            42
          </p>
          <div className="text-xs text-amber-500 font-medium">
            <span>Steady activity</span>
          </div>
        </div>
      </div>

      {/* --- MAIN USERS INTERACTIVE TABLE PANEL --- */}
      <UsersTable initialUsers={users} />
    </div>
  );
};

export default AdminUserPage;
