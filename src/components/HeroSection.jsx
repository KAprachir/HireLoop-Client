"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Magnifier } from "@gravity-ui/icons";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const popularTags = ["React", "Next.js", "Rust", "Python", "TypeScript"];

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-fuchsia-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          🔥 OVER 100,000+ DEVELOPERS TRUST US
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Find Your Dream
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300">
            Job Today
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Find developer, systems, and product engineering roles at high-growth tech companies. Skip HR; go direct.
        </p>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto pt-4">
          <form
            action="/jobs"
            method="GET"
            className="flex items-center gap-2 p-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-xl focus-within:border-violet-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 px-3 flex-grow min-w-0">
              <Magnifier className="text-zinc-500 w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role name, skill, or company..."
                className="w-full bg-transparent text-white placeholder-zinc-600 outline-none text-sm md:text-base py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all cursor-pointer active:scale-95"
            >
              Search
            </button>
          </form>
        </div>

        {/* Popular Searches */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs pt-2">
          <span className="text-zinc-500">Popular:</span>
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/jobs?search=${tag}`}
              className="px-3 py-1 rounded-full border border-zinc-850 bg-zinc-900/30 text-zinc-400 hover:text-white hover:border-zinc-700 transition"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
