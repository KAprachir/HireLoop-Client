"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import { updateCompany } from "@/lib/actions/companies";
import { toast } from "react-hot-toast";

export default function CompaniesTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [processingId, setProcessingId] = useState(null); // Track network flight by specific company ID

  // FIXED: Parameter alignment & UI state synchronization
  const handleAction = async (companyId, actionType) => {
    if (!companyId) return;

    // Map button actions to your Express $set layout strings
    const statusText = actionType === "approve" ? "Approved" : "Rejected";

    setProcessingId(companyId);

    try {
      // Execute the backend PATCH route payload mutation
      const result = await updateCompany(companyId, { status: statusText });

      // Check if your backend wrapper returns a successful modification flag
      if (result?.modifiedCount > 0 || result?.acknowledged || result) {
        toast.success(`Company profile status changed to ${statusText}`);

        // Update local React state instantly so the row changes live
        setCompanies((prevCompanies) =>
          prevCompanies.map((item) =>
            (item._id?.toString() || item.id) === companyId
              ? { ...item, status: statusText }
              : item,
          ),
        );
      } else {
        toast.error("Failed to apply document metadata changes.");
      }
    } catch (error) {
      console.error("Status Update Pipeline Aborted:", error);
      toast.error("A network connectivity error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusStyles = (status = "pending") => {
    switch (status.toLowerCase()) {
      case "approved":
        return "text-emerald-400 bg-emerald-500/5 border-emerald-500/10";
      case "rejected":
        return "text-red-400 bg-red-500/5 border-red-500/10";
      case "pending":
      default:
        return "text-amber-400 bg-amber-500/5 border-amber-500/10";
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              <th className="py-4 px-6">Company Name</th>
              <th className="py-4 px-6">Recruiter Email</th>
              <th className="py-4 px-6">Industry</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800/60 text-sm">
            {companies.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-12 px-6 text-center text-zinc-500"
                >
                  No company verification profile entries available.
                </td>
              </tr>
            ) : (
              companies.map((company) => {
                const statusLower = (company.status || "pending").toLowerCase();
                const cleanId = company._id?.toString() || company.id;
                const isCurrentRowLoading = processingId === cleanId;

                return (
                  <tr
                    key={cleanId}
                    className="hover:bg-zinc-900/20 transition-colors group"
                  >
                    {/* Brand Meta Identity item wrapper */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        {company.logo ? (
                          <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={company.logo}
                              alt={company.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 font-bold text-xs flex items-center justify-center text-zinc-300">
                            {company.name?.substring(0, 2).toUpperCase() ||
                              "CO"}
                          </div>
                        )}
                        <span className="font-semibold text-zinc-200 group-hover:text-white transition-colors">
                          {company.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-zinc-400 font-mono text-xs">
                      {company.email ||
                        `${company.name?.toLowerCase().replace(/\s+/g, "")}@workspace.io`}
                    </td>

                    <td className="py-4 px-6">
                      <span className="bg-zinc-800/40 text-zinc-400 text-[10px] px-2.5 py-1 rounded-md border border-zinc-800 uppercase tracking-wide font-medium">
                        {company.industry || "Technology"}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(company.status)}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            statusLower === "approved"
                              ? "bg-emerald-400"
                              : statusLower === "rejected"
                                ? "bg-red-400"
                                : "bg-amber-400"
                          }`}
                        />
                        <span className="capitalize">
                          {company.status || "Pending"}
                        </span>
                      </div>
                    </td>

                    {/* Interactive Action Control Blocks */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {statusLower !== "approved" && (
                          <button
                            type="button"
                            disabled={isCurrentRowLoading}
                            onClick={() => handleAction(cleanId, "approve")}
                            className="inline-flex items-center justify-center text-xs font-bold bg-emerald-950/40 hover:bg-emerald-500 border border-emerald-900/60 hover:border-emerald-400 text-emerald-400 hover:text-zinc-950 px-3 py-1.5 rounded-lg transition-all active:scale-[0.97] disabled:opacity-30 disabled:pointer-events-none"
                          >
                            {isCurrentRowLoading ? "..." : "Approve"}
                          </button>
                        )}
                        {statusLower !== "rejected" && (
                          <button
                            type="button"
                            disabled={isCurrentRowLoading}
                            onClick={() => handleAction(cleanId, "reject")}
                            className="inline-flex items-center justify-center text-xs font-bold bg-red-950/20 hover:bg-red-500 border border-red-950 hover:border-red-400 text-red-500/80 hover:text-white px-3 py-1.5 rounded-lg transition-all active:scale-[0.97] disabled:opacity-30 disabled:pointer-events-none"
                          >
                            {isCurrentRowLoading ? "..." : "Reject"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Elements */}
      <div className="bg-zinc-900/60 border-t border-zinc-800 px-6 py-4 flex items-center justify-between text-xs text-zinc-400">
        <p className="font-medium">
          Showing <span className="text-zinc-200">1-{companies.length}</span> of{" "}
          <span className="text-zinc-200">{companies.length}</span> companies
        </p>
        <div className="flex items-center gap-1.5">
          <button
            disabled
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-600 cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 font-bold border border-zinc-200">
            1
          </button>
          <button
            disabled
            className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-600 cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
