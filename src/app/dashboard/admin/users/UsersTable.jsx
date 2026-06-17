"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Persons,
  Briefcase,
} from "@gravity-ui/icons";
import { toast } from "react-hot-toast";
import { updateUser } from "@/lib/actions/user";

export default function UsersTable({ initialUsers = [] }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState(null);

  // Asynchronous user attribute mutation pipeline handler
  const handleUserAction = async (userId, updatedFields) => {
    if (!userId) return;
    setLoadingId(userId);

    try {
      const data = await updateUser(userId, updatedFields);

      if (
        data &&
        (data.modifiedCount > 0 || data.acknowledged || data.matchedCount > 0)
      ) {
        toast.success("Account parameters updated successfully.");

        // Synchronize state directly to frontend row views instantly
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            (u._id?.toString() || u.id) === userId
              ? { ...u, ...updatedFields }
              : u,
          ),
        );
      } else {
        toast.error("Failed to commit profile modifications.");
      }
    } catch (err) {
      console.error("Mutation failed:", err);
      toast.error("Network synchronization loop error.");
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusStyles = (status = "active") => {
    return status.toLowerCase() === "active"
      ? "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
      : "text-red-400 bg-red-500/5 border-red-500/10";
  };

  return (
    <div className="bg-[#121214]/40 border border-zinc-900 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/40 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              <th className="py-4 px-6">User Name</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Join Date</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/40 text-sm">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-12 px-6 text-center text-zinc-500"
                >
                  No registered active users found inside the collection
                  database.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                // FIXED: 'user' loop parsing constants are declared safely inside the map context scope bounds
                const cleanId = user._id?.toString() || user.id;

                const userRole = (user.role || "seeker").toLowerCase();
                const isRecruiter = userRole === "recruiter";
                const isSeeker = userRole === "seeker";

                const userStatus = user.status || "Active";
                const isSuspended = userStatus.toLowerCase() === "suspended";
                const isRowProcessing = loadingId === cleanId;

                return (
                  <tr
                    key={cleanId}
                    className="hover:bg-zinc-900/20 transition-colors group"
                  >
                    {/* User Identity Avatar Slot */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-[10px] font-bold font-mono tracking-wider flex items-center justify-center text-zinc-400">
                          {user.name
                            ? user.name.substring(0, 2).toUpperCase()
                            : "US"}
                        </div>
                        <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Email Column matching MongoDB lowercase keys */}
                    <td className="py-4 px-6 font-mono text-xs text-zinc-400">
                      {user.email || "no-email@hireloop.com"}
                    </td>

                    {/* Dynamic Role Badge Column */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300">
                        {isRecruiter ? (
                          <>
                            <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                            Recruiter
                          </>
                        ) : (
                          <>
                            <Persons className="w-3.5 h-3.5 text-zinc-500" />
                            Seeker
                          </>
                        )}
                      </span>
                    </td>

                    {/* Dynamic Date Localizer Row */}
                    <td className="py-4 px-6 text-zinc-400 text-xs">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                        : "Jun 10, 2026"}
                    </td>

                    {/* Current System Status Badge */}
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${getStatusStyles(userStatus)}`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${isSuspended ? "bg-red-400" : "bg-emerald-400"}`}
                        />
                        <span className="capitalize">{userStatus}</span>
                      </div>
                    </td>

                    {/* Interactive Operational Control Call Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4 text-xs font-medium text-zinc-400">
                        {isSuspended ? (
                          <button
                            type="button"
                            disabled={isRowProcessing}
                            onClick={() =>
                              handleUserAction(cleanId, { status: "Active" })
                            }
                            className="text-emerald-400 hover:underline transition disabled:opacity-30"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={isRowProcessing}
                            onClick={() =>
                              handleUserAction(cleanId, {
                                role: isRecruiter ? "seeker" : "recruiter",
                              })
                            }
                            className="hover:text-white transition disabled:opacity-30"
                          >
                            Make {isRecruiter ? "Seeker" : "Recruiter"}
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={isRowProcessing}
                          onClick={() =>
                            handleUserAction(cleanId, {
                              status: isSuspended ? "Active" : "Suspended",
                            })
                          }
                          className="text-red-500/90 hover:text-red-400 transition disabled:opacity-30"
                        >
                          {isSuspended ? "Unsuspend" : "Suspend"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Drawer Blocks */}
      <div className="bg-zinc-900/20 border-t border-zinc-900 px-6 py-4 flex items-center justify-between text-xs text-zinc-400">
        <p className="font-medium">
          Showing <span className="text-zinc-200">1-{users.length}</span> of{" "}
          <span className="text-zinc-200">{users.length}</span> users
        </p>
        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-700 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-white text-zinc-950 font-bold"
          >
            1
          </button>
          <button
            disabled
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-700 cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
