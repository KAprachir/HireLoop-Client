import React from "react";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className="p-8 md:p-16 rounded-[40px] border border-violet-500/20 bg-cover bg-center text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/cta-bg.png')",
        }}
      >
        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-[80px]" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Your next role is
            <br />
            already looking for you
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
            Create your candidate profile, connect your technical credentials, and discover active pipelines matching your pace today.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/signup"
              className="px-8 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black font-bold text-xs transition active:scale-[0.98] shadow font-sans"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-3 rounded-xl bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold text-xs transition active:scale-[0.98] font-sans"
            >
              Explore Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
