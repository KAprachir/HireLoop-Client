import React from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedOpportunities from "@/components/FeaturedOpportunities";
import AdvantagesSection from "@/components/AdvantagesSection";
import PricingSection from "@/components/PricingSection";
import CTABanner from "@/components/CTABanner";
import { getjobs } from "@/lib/api/job";

export const dynamic = "force-dynamic";

export default async function Home() {
  let jobs = [];
  try {
    const jobsData = await getjobs();
    jobs = jobsData?.jobs || [];
  } catch (error) {
    console.error("Failed to load jobs from Express server API:", error);
  }

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden selection:bg-violet-500/30">
      {/* Search and Hero Intro Section */}
      <HeroSection />

      {/* Global Interactive Platform Stats & Globe Illustration */}
      <StatsSection />

      {/* Featured Jobs Dynamic DB Feed */}
      <FeaturedOpportunities initialJobs={jobs} />

      {/* Structured Core Platform Advantages */}
      <AdvantagesSection />

      {/* Flexible Plan Options with Annual Billing Toggle */}
      <PricingSection />

      {/* Bottom Conversion Mesh Callout */}
      <CTABanner />
    </div>
  );
}
