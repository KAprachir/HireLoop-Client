"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "./JobsFilter";

// Interactive inner calculations engine
// UPDATED: Destructures 'jobs' directly
function JobListingInner({ jobs, filters }) {
  // Component Filter States
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedType, setSelectedType] = useState(filters.JobType || "all");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.jobCategory || "all",
  );
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);

  const router = useRouter();
  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) {
      sp.set("search", searchQuery);
    }

    if (selectedType !== "all") {
      sp.set("JobType", selectedType);
    }
    if (selectedCategory !== "all") {
      sp.set("jobCategory", selectedCategory);
    }
    if (isRemoteOnly === true) {
      sp.set("isRemote", true);
    }
    console.log("search params", sp.toString());

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [selectedCategory, router, selectedType, isRemoteOnly, searchQuery]);

  // // Compute active matching database rows dynamically with fallback string protections
  // const filteredJobs = useMemo(() => {
  //   return jobs.filter((job) => {
  //     if (!job) return false;

  //     // 1. Keyword search evaluation (Title, Company, or Requirements matching)
  //     const matchesSearch =
  //       (job.jobTitle?.toLowerCase() || "").includes(
  //         searchQuery.toLowerCase(),
  //       ) ||
  //       (job.companyName?.toLowerCase() || "").includes(
  //         searchQuery.toLowerCase(),
  //       ) ||
  //       (job.requirements?.toLowerCase() || "").includes(
  //         searchQuery.toLowerCase(),
  //       );

  //     // 2. Employment Term Matching
  //     const matchesType =
  //       selectedType === "all" ||
  //       (job.jobType?.toLowerCase() || "") === selectedType.toLowerCase();

  //     // 3. Category Structural Matching
  //     const matchesCategory =
  //       selectedCategory === "all" ||
  //       (job.jobCategory?.toLowerCase() || "") ===
  //         selectedCategory.toLowerCase();

  //     // 4. Remote Toggle Evaluation
  //     const matchesRemote =
  //       !isRemoteOnly || job.isRemote === true || job.isRemote === "true";

  //     return matchesSearch && matchesType && matchesCategory && matchesRemote;
  //   });
  // }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, jobs]);

  return (
    <>
      {/* Central Interactivity Controls */}
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      {/* Operational Results Counter Bar */}
      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500 font-medium tracking-tight">
        Showing {jobs.length} {jobs.length === 1 ? "position" : "positions"}
      </div>

      {/* Grid Render vs Fallback Layout Matrix */}
      {jobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((jobItem, index) => {
            const cleanKey =
              jobItem._id?.$oid ||
              jobItem._id?.toString() ||
              jobItem.id ||
              `job-card-index-fallback-key-${index}`;

            return <JobCard key={cleanKey} job={jobItem} />;
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-900 rounded-[24px] max-w-7xl mx-auto bg-zinc-900/10">
          <p className="text-zinc-400 text-base font-semibold">
            No positions match your search criteria.
          </p>
          <p className="text-zinc-600 text-xs mt-1">
            Try tweaking your filters or adjusting your keywords.
          </p>
        </div>
      )}
    </>
  );
}

// Global Core Container Export Hooked up with Next.js Suspense standard protocols
// UPDATED: Accept and pass through the 'jobs' property token directly
export default function JobListingContainer({ jobs, filters }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto text-zinc-500 py-20 text-center text-sm font-medium animate-pulse">
          Loading live engine career listings...
        </div>
      }
    >
      <JobListingInner filters={filters} jobs={jobs} />
    </Suspense>
  );
}
