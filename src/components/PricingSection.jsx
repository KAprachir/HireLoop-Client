"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, Button } from "@heroui/react";

export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("yearly"); // 'monthly' or 'yearly'

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/10">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Pay for the leverage, not the listings
          </h2>

          {/* Toggle */}
          <div className="flex justify-center pt-2">
            <div className="bg-zinc-900 border border-zinc-850 p-1 rounded-xl flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  billingCycle === "monthly"
                    ? "bg-zinc-800 text-white shadow"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-white text-black shadow"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Yearly
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-violet-600 text-white rounded">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Free plan */}
          <Card className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl flex flex-col justify-between h-full text-left space-y-8 hover:border-zinc-850 transition duration-300">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-300">Free</h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-1">
                  Perfect for exploring the board.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-zinc-600 text-xs font-medium">/mo</span>
              </div>
              <ul className="space-y-3 pt-2 text-xs text-zinc-400 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Apply to 3
                  jobs per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Browse &
                  save up to 10 jobs
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Basic seeker
                  profile setup
                </li>
              </ul>
            </div>
            <Link href="/auth/signup">
              <Button className="w-full h-11 bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-200 font-semibold text-xs rounded-xl transition">
                Get Started Free
              </Button>
            </Link>
          </Card>

          {/* Pro plan */}
          <Card className="bg-zinc-900/30 border border-violet-500/20 hover:border-violet-500/40 p-8 rounded-3xl flex flex-col justify-between h-full text-left space-y-8 relative overflow-hidden transition duration-300 shadow-xl shadow-violet-500/5">
            <span className="absolute top-3 right-3 bg-violet-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              POPULAR
            </span>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Professional</h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-1">
                  Accelerate your active search loop.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === "yearly" ? "$17" : "$19"}
                </span>
                <span className="text-zinc-600 text-xs font-medium">/mo</span>
              </div>
              <ul className="space-y-3 pt-2 text-xs text-zinc-300 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="text-violet-400 font-bold">✓</span> Apply to 30
                  jobs per month
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-violet-400 font-bold">✓</span> Unlimited
                  saved listings
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-violet-400 font-bold">✓</span> Real-time
                  status tracking
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-violet-400 font-bold">✓</span> Salary
                  telemetry insights
                </li>
              </ul>
            </div>
            <Link href="/pricing">
              <Button className="w-full h-11 bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl transition shadow">
                Upgrade to Pro
              </Button>
            </Link>
          </Card>

          {/* Premium plan */}
          <Card className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl flex flex-col justify-between h-full text-left space-y-8 hover:border-zinc-850 transition duration-300">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-300">Premium</h3>
                <p className="text-[10px] text-zinc-500 font-medium mt-1">
                  Full access direct placement tools.
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  {billingCycle === "yearly" ? "$99" : "$119"}
                </span>
                <span className="text-zinc-600 text-xs font-medium">/mo</span>
              </div>
              <ul className="space-y-3 pt-2 text-xs text-zinc-400 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Everything
                  in Pro included
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Unlimited
                  monthly applications
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> Profile
                  badge boost to recruiters
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold">✓</span> 24h early
                  access + support
                </li>
              </ul>
            </div>
            <Link href="/pricing">
              <Button className="w-full h-11 bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-200 font-semibold text-xs rounded-xl transition">
                Go Premium
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
