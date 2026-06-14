"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Card } from "@heroui/react";
import { Magnifier, Factory, Globe, ArrowRight } from "@gravity-ui/icons";

export default function CompaniesContainer({ initialCompanies = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter((company) => {
      const matchText = searchQuery.toLowerCase();
      return (
        company.name.toLowerCase().includes(matchText) ||
        (company.location || "").toLowerCase().includes(matchText) ||
        (company.category || "").toLowerCase().includes(matchText)
      );
    });
  }, [searchQuery, initialCompanies]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Filter input */}
      <div className="mb-8 max-w-md">
        <div className="relative flex items-center">
          <Magnifier className="absolute left-3.5 text-zinc-500 w-4.5 h-4.5 z-10" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by company name, location..."
            className="pl-11 pr-4 w-full bg-zinc-900 border border-zinc-800 rounded-xl text-white py-3 text-sm placeholder-zinc-550 outline-none focus:border-zinc-700 transition"
          />
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <Card
              key={`${company.name}-${index}`}
              className="p-6 border border-zinc-900 bg-zinc-900 text-zinc-100 rounded-[24px] flex flex-col justify-between hover:border-zinc-800 transition duration-200"
            >
              <div>
                {/* Logo and Name header */}
                <div className="flex items-center gap-4 mb-4">
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-12 h-12 object-contain bg-zinc-950 p-2 rounded-xl border border-zinc-850"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-center text-zinc-500">
                      <Factory className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-white tracking-tight">
                      {company.name}
                    </h3>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                      {company.category}
                    </span>
                  </div>
                </div>

                {/* Location and Info */}
                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-6">
                  <Globe className="w-4 h-4 text-zinc-500" />
                  <span>{company.location}</span>
                </div>
              </div>

              {/* Footer details link */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-850/60">
                <span className="text-sm font-semibold text-violet-400">
                  {company.jobCount} {company.jobCount === 1 ? "Open Position" : "Open Positions"}
                </span>

                <Link
                  href={`/jobs?search=${encodeURIComponent(company.name)}`}
                  className="group flex items-center gap-1.5 text-sm font-medium text-white hover:text-violet-350 transition"
                >
                  View Jobs
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-850 rounded-[32px] bg-zinc-900/10">
          <p className="text-zinc-400 text-lg">No companies match your search.</p>
          <p className="text-zinc-650 text-sm mt-1">Try refining your filter parameters.</p>
        </div>
      )}
    </div>
  );
}
