"use client";

import React, { useState } from "react";
import { Card, Button } from "@heroui/react";
import {
  Check,
  Rocket,
  ShieldCheck,
  Flame,
  ChevronDown,
} from "@gravity-ui/icons";

export default function PricingPage() {
  const [selectedRole, setSelectedRole] = useState("seekers");

  // Data Tier Structures
  const seekerPlans = [
    {
      id: "seeker-free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for exploring the local engineering landscape.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic candidate profile view",
        "Weekly automated email alerts",
      ],
      cta: "Get Started",
      popular: false,
      icon: <Rocket className="w-5 h-5 text-zinc-400" />,
    },
    {
      id: "seeker-pro",
      name: "Pro",
      price: "$19",
      period: "month",
      description: "For active builders hunting for their next challenge.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved positions",
        "Real-time application status tracking",
        "Interactive salary distribution insights",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      icon: <Flame className="w-5 h-5 text-amber-500" />,
    },
    {
      id: "seeker-premium",
      name: "Premium",
      price: "$39",
      period: "month",
      description: "Full force toolkit for fast-tracking direct placements.",
      features: [
        "Everything in Pro included",
        "Unlimited monthly job applications",
        "Profile boost badge sent directly to recruiters",
        "24-hour early access to fresh positions",
        "Priority dedicated support helpdesk",
      ],
      cta: "Go Premium",
      popular: false,
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
  ];

  const recruiterPlans = [
    {
      id: "recruiter-free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Great for establishing your first corporate team presence.",
      features: [
        "Up to 3 active live job posts",
        "Basic applicant pipeline management",
        "Standard search index visibility",
        "Good for small startups / side-projects",
      ],
      cta: "Post a Free Job",
      popular: false,
      icon: <Rocket className="w-5 h-5 text-zinc-400" />,
    },
    {
      id: "recruiter-growth",
      name: "Growth",
      price: "$49",
      period: "month",
      description: "For scaling engineering branches requiring steady loops.",
      features: [
        "Up to 10 active live job posts",
        "Advanced Applicant Tracking (ATS)",
        "Basic funnel interaction metrics",
        "Standard email helpdesk support",
      ],
      cta: "Start Scaling",
      popular: true,
      icon: <Flame className="w-5 h-5 text-amber-500" />,
    },
    {
      id: "recruiter-enterprise",
      name: "Enterprise",
      price: "$149",
      period: "month",
      description: "Maximum output visibility for competitive recruitment.",
      features: [
        "Up to 50 active live job posts",
        "Advanced telemetry analytics dashboard",
        "Featured listings pinned to the top of boards",
        "Multi-seat team workflow collaboration",
        "Custom enterprise career-branding tools",
        "Dedicated account priority support manager",
      ],
      cta: "Contact Enterprise",
      popular: false,
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    },
  ];

  const activePlans = selectedRole === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-12 selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto">
        {/* Upper Title Branding Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Predictable, transparent plans.
          </h1>
          <p className="text-zinc-400 mt-4 text-base md:text-lg leading-relaxed">
            Whether you are shipping code or scaling engineering teams, find a
            tier built for your pace.
          </p>

          {/* High-Performance State Selector Toggle (Eliminates <Tabs> crash dependency) */}
          <div className="mt-8 flex justify-center">
            <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl flex gap-2">
              <button
                onClick={() => setSelectedRole("seekers")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  selectedRole === "seekers"
                    ? "bg-zinc-800 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                For Job Seekers
              </button>
              <button
                onClick={() => setSelectedRole("recruiters")}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  selectedRole === "recruiters"
                    ? "bg-zinc-800 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                For Recruiters
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column Tier Cards Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-24">
          {activePlans.map((plan) => (
            <Card
              key={plan.id}
              className={`bg-zinc-900 border p-6 md:p-8 rounded-[24px] flex flex-col h-full relative overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? "border-amber-500/40 ring-1 ring-amber-500/20 shadow-xl shadow-amber-500/5 scale-[1.01]"
                  : "border-zinc-800 hover:border-zinc-700 shadow-lg"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-3 right-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                {plan.icon}
                <h3 className="text-xl font-bold text-zinc-100">{plan.name}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 min-h-[40px]">
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-zinc-500 text-sm font-medium">
                  /{plan.period}
                </span>
              </div>
              <ul className="space-y-3.5 flex-grow mb-8">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-zinc-300 leading-normal"
                  >
                    <div className="w-4 h-4 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="plan_id" value={plan.id} />
                <section>
                  <button
                    className={`w-full h-11 font-semibold rounded-xl text-sm tracking-wide transition transform active:scale-[0.98] ${
                      plan.popular
                        ? "bg-amber-500 hover:bg-amber-400 text-zinc-950"
                        : "bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-200"
                    }`}
                    type="submit"
                    role="link"
                  >
                    {plan.cta}
                  </button>
                </section>
              </form>
            </Card>
          ))}
        </div>

        {/* Separator Line */}
        <div className="border-t border-zinc-900 my-16" />

        {/* FAQ Area — Styled with native `<details>` layouts to eliminate collection nesting issues */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-zinc-100 mb-8">
            Frequently Asked Billing Questions
          </h2>

          <div className="space-y-4">
            <details className="group bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-zinc-950/40 transition">
                <span className="text-zinc-200 text-sm md:text-base font-semibold">
                  Can I cancel my active subscription at any time?
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="text-zinc-400 text-sm leading-relaxed pb-4 px-5 pt-3 border-t border-zinc-950">
                Yes, absolutely. You can cancel your subscription inside your
                account profile dashboard settings anytime. You will maintain
                unrestricted access to all your upgraded plan parameters until
                the current monthly billing period concludes.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-zinc-950/40 transition">
                <span className="text-zinc-200 text-sm md:text-base font-semibold">
                  How do refunds operate on your platform?
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="text-zinc-400 text-sm leading-relaxed pb-4 px-5 pt-3 border-t border-zinc-950">
                We stand behind our services with an unconditional 14-day
                money-back guarantee policy. If you find the premium resources
                do not match your deployment workflow needs, simply notify
                support inside 14 days of purchase for a complete refund.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-zinc-950/40 transition">
                <span className="text-zinc-200 text-sm md:text-base font-semibold">
                  Which specific payment methods are securely processed?
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="text-zinc-400 text-sm leading-relaxed pb-4 px-5 pt-3 border-t border-zinc-950">
                We process all digital payments through an encrypted connection
                backed by Stripe. We safely support all major international
                credit cards (Visa, Mastercard, American Express), Apple Pay,
                Google Pay, and localized bank transactions.
              </div>
            </details>

            <details className="group bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none hover:bg-zinc-950/40 transition">
                <span className="text-zinc-200 text-sm md:text-base font-semibold">
                  Can I seamlessly switch or shift between tiers later?
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-500 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="text-zinc-400 text-sm leading-relaxed pb-4 px-5 pt-3 border-t border-zinc-950">
                Yes, you can upgrade or downgrade between plan profiles anytime.
                Upgrades apply immediately on a prorated basis, while down-tier
                structural caps shift into place at the start of your subsequent
                monthly renewal window.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
