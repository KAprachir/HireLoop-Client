"use client";

import React, { useState, useMemo } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "./JobsFilter";

export default function JobListingContainer({ initialJobs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);

  // Compute active database rows dynamically with defensive string mapping protection
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      if (!job) return false;

      // 1. Unified Keyword Filter Setup (Title, Company, or Core Requirements Match)
      const matchesSearch =
        (job.jobTitle?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        ) ||
        (job.companyName?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        ) ||
        (job.requirements?.toLowerCase() || "").includes(
          searchQuery.toLowerCase(),
        );

      // 2. Employment Term Type Match
      const matchesType =
        selectedType === "all" ||
        (job.jobType?.toLowerCase() || "") === selectedType.toLowerCase();

      // 3. Category Safe Token Match
      const matchesCategory =
        selectedCategory === "all" ||
        (job.jobCategory?.toLowerCase() || "") ===
          selectedCategory.toLowerCase();

      // 4. Remote Setting Conditional Match
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, initialJobs]);

  return (
    <>
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

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-400">
        Showing {filteredJobs.length} position{filteredJobs.length !== 1 && "s"}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((jobItem, index) => {
            const cleanKey =
              jobItem._id?.$oid ||
              jobItem._id ||
              jobItem.id ||
              `job-card-key-${index}`;
            return <JobCard key={cleanKey} job={jobItem} />;
          })}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto bg-zinc-900/10">
          <p className="text-zinc-400 text-lg">
            No positions match your search criteria.
          </p>
          <p className="text-zinc-600 text-sm mt-1">
            Try tweaking your filters or resetting text fields.
          </p>
        </div>
      )}
    </>
  );
}
