"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "./JobsFilter";
import { Pagination } from "@heroui/react";

function JobListingInner({ jobsPayload, filters }) {
  // FIXED: Extract true rows and metrics from the updated server response payload
  const jobs = jobsPayload?.jobs || [];
  const totalItems = jobsPayload?.totalJobs || 0;
  const totalPages = jobsPayload?.totalPages || 1;

  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedType, setSelectedType] = useState(filters.jobType || "all");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.jobCategory || "all",
  );
  const [isRemoteOnly, setIsRemoteOnly] = useState(filters.isRemote || false);
  const [page, setPage] = useState(filters.page || 1);

  const router = useRouter();

  const itemsPerPage = 12;

  // FIXED: Dynamically calculate page number buttons based on actual database totals instead of a static [1..6] array
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // FIXED: Dynamic pagination offsets counter math
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  useEffect(() => {
    const sp = new URLSearchParams();

    if (searchQuery) sp.set("search", searchQuery);
    if (selectedType !== "all") sp.set("jobType", selectedType);
    if (selectedCategory !== "all") sp.set("jobCategory", selectedCategory);
    if (isRemoteOnly === true) sp.set("isRemote", true);
    if (page) sp.set("page", page);

    const path = `?${sp.toString()}`;
    router.push(path);
  }, [selectedCategory, router, selectedType, isRemoteOnly, searchQuery, page]);

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

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500 font-medium tracking-tight">
        Showing {jobs.length} {jobs.length === 1 ? "position" : "positions"}
      </div>

      {jobs.length > 0 ? (
        <>
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

          {/* UNCHANGED: Your exact HeroUI sub-component structure remains intact */}
          <Pagination className="w-full mt-6">
            <Pagination.Summary>
              Showing {startItem}-{endItem} of {totalItems} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => p - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      onPress={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => p + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-900 rounded-[24px] max-w-7xl mx-auto bg-zinc-900/10">
          <p className="text-zinc-400 text-base font-semibold">
            No positions match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}

export default function JobListingContainer({ jobs, filters }) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto text-zinc-500 py-20 text-center animate-pulse">
          Loading live listings...
        </div>
      }
    >
      {/* FIXED: Prop mapped as jobsPayload to allow clean destructuring safely */}
      <JobListingInner filters={filters} jobsPayload={jobs} />
    </Suspense>
  );
}
