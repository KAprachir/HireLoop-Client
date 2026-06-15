"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  Magnifier,
  Bell,
  Envelope,
  ArrowDownToSquare,
  Check,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

export default function BillingPage() {
  const { data: session } = useSession();
  const user = session?.user || {
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    plan: "seeker-pro",
  };

  const [searchQuery, setSearchQuery] = useState("");

  const transactions = [
    {
      date: "Sep 24, 2023",
      plan: "Professional Tier",
      amount: "$29.00",
      txId: "TRX-948102-HL",
      status: "PAID",
    },
    {
      date: "Aug 24, 2023",
      plan: "Professional Tier",
      amount: "$29.00",
      txId: "TRX-771920-HL",
      status: "PAID",
    },
    {
      date: "Jul 24, 2023",
      plan: "Professional Tier",
      amount: "$29.00",
      txId: "TRX-331005-HL",
      status: "PAID",
    },
    {
      date: "Jun 24, 2023",
      plan: "Standard Tier",
      amount: "$12.00",
      txId: "TRX-220199-HL",
      status: "PAID",
    },
  ];

  const handleExportPDF = () => {
    toast.success("Billing statement exported as PDF!");
  };

  const handleUpgrade = () => {
    toast.success("Redirecting to plan checkout...");
  };

  const handleManage = () => {
    toast.success("Loading billing portal configuration...");
  };

  const handleAddPayment = () => {
    toast.success("Opening add payment method dialog...");
  };

  const handleContact = () => {
    toast.success("Support ticket drawer opened!");
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* --- LOCAL TOP BAR ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search invoices or plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-400 hover:text-white transition">
              <Envelope className="w-5 h-5" />
            </button>
            <button className="text-zinc-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
              <img
                src={user?.image}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- PAGE HEADER --- */}
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Subscription & Billing</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your professional tier features, recurring payments, and billing history.
          </p>
        </div>

        {/* --- DUAL CARDS COLUMN ROW (PLAN & PAYMENT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Professional Plan Details Card */}
          <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-white text-black rounded-full uppercase tracking-wider">
                  Current Plan
                </span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-white">$29</span>
                  <span className="text-zinc-500 text-xs font-semibold">/mo</span>
                  <p className="text-[10px] text-zinc-500 font-medium mt-1">Next billing date: Oct 24, 2023</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Professional Tier</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Unlock global job insights and unlimited applications.
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  "Unlimited Applications",
                  "Premium Job Insights",
                  "Priority Candidate Badge",
                  "Direct Recruiter Messaging",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={handleUpgrade}
                className="flex-1 h-11 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl transition active:scale-[0.98]"
              >
                Upgrade Plan
              </Button>
              <Button
                onClick={handleManage}
                className="flex-1 h-11 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl transition active:scale-[0.98]"
              >
                Manage Plan
              </Button>
            </div>
          </Card>

          {/* Custom Visa Card Credit Visual Layout */}
          <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                  Payment Method
                </h3>
                <span className="text-[10px] font-bold border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Secure by Stripe
                </span>
              </div>

              {/* Visa card visual */}
              <div className="w-full bg-gradient-to-br from-zinc-800/80 to-zinc-900 border border-zinc-700 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[145px] hover:border-zinc-600 transition-colors">
                {/* Chip & Logo */}
                <div className="flex items-start justify-between">
                  {/* Gold chip design */}
                  <div className="w-8 h-6 bg-amber-500/25 border border-amber-500/30 rounded-md relative overflow-hidden flex flex-col justify-around p-0.5">
                    <div className="h-px bg-amber-500/40 w-full" />
                    <div className="h-px bg-amber-500/40 w-full" />
                    <div className="h-px bg-amber-500/40 w-full" />
                  </div>
                  <span className="text-sm font-bold italic tracking-wide text-zinc-400">VISA</span>
                </div>

                {/* Card Number */}
                <p className="text-lg font-bold tracking-widest text-zinc-100 font-mono my-3 text-left">
                  •••• •••• •••• 4242
                </p>

                {/* Cardholder & Expiry */}
                <div className="flex items-end justify-between">
                  <div className="text-left">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Card Holder</p>
                    <p className="text-xs font-bold text-zinc-300 font-mono">{user?.name ? user.name.toUpperCase() : "ALEXANDER SEEKER"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-zinc-500 font-semibold">Expires</p>
                    <p className="text-xs font-bold text-zinc-300 font-mono">12/25</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Payment link */}
            <button
              onClick={handleAddPayment}
              className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-white transition py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-900/10"
            >
              + Add New Payment Method
            </button>
          </Card>
        </div>

        {/* --- BILLING HISTORY TABLE LIST ROW --- */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-3xl overflow-hidden shadow-lg p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
              Billing History
            </h3>
            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl"
            >
              <ArrowDownToSquare className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse whitespace-nowrap text-sm">
              <thead>
                <tr className="border-b border-zinc-900 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-3">
                  <th className="py-3 px-4 pl-0">Date</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Transaction ID</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/20 transition-colors group">
                    <td className="py-4 px-4 pl-0 text-zinc-300 font-medium">{tx.date}</td>
                    <td className="py-4 px-4 text-zinc-400">{tx.plan}</td>
                    <td className="py-4 px-4 text-zinc-300 font-semibold">{tx.amount}</td>
                    <td className="py-4 px-4 text-zinc-500 font-mono text-xs">{tx.txId}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 tracking-wider">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- INVOICE SUPPORT CALLOUT BLOCK ROW --- */}
        <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg">
          <div className="text-left space-y-1">
            <h4 className="text-base font-bold text-white tracking-tight">Need help with your invoice?</h4>
            <p className="text-xs text-zinc-400 max-w-xl leading-normal">
              Our support team is available 24/7 to help you resolve any payment issues or clarify billing details.
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button
              onClick={handleContact}
              className="h-10 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-xs rounded-xl px-5 transition active:scale-[0.98]"
            >
              Contact Support
            </Button>
            <Link
              href="/pricing"
              className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors underline"
            >
              Read Refund Policy
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
