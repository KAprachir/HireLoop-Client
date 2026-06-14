import StatsSection from "@/components/StatsSection";
import Link from "next/link";
import {
  Briefcase,
  Magnifier,
  Thunderbolt,
  CircleCheck,
  Globe,
  ArrowRight,
} from "@gravity-ui/icons";

export default function Home() {
  const features = [
    {
      icon: <Thunderbolt className="w-6 h-6 text-violet-400" />,
      title: "AI-Powered Matching",
      description:
        "Connect your profiles and portfolios. Get matched with engineering roles seeking your exact tech stack automatically.",
    },
    {
      icon: <CircleCheck className="w-6 h-6 text-fuchsia-400" />,
      title: "Verified Compensation",
      description:
        "Every job post displays clear, verified salary ranges. No standard guessing or hidden pricing tiers.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      title: "Direct-to-Engineering",
      description:
        "Skip the legacy HR filters. Get connected directly to engineering managers and technical team leads.",
    },
    {
      icon: <Globe className="w-6 h-6 text-emerald-400" />,
      title: "Workspace Freedom",
      description:
        "From fast-growing startup offices to asynchronous remote pipelines, locate workspace terms built for your life.",
    },
  ];

  const popularTags = ["React", "Next.js", "Rust", "Python", "TypeScript"];

  return (
    <div className="w-full min-h-screen bg-black text-white overflow-hidden selection:bg-violet-500/30">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-fuchsia-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            The AI-Native Engineering Career Board
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Where builders find their
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-300">
              next loop.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore curated developer, systems, and product engineering roles
            at high-growth tech companies. Skip HR; go direct.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mb-6">
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
                  placeholder="Search by role name, skill, or company..."
                  className="w-full bg-transparent text-white placeholder-zinc-500 outline-none text-sm md:text-base py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-white hover:bg-zinc-200 text-black font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
              >
                Search
              </button>
            </form>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-sm">
            <span className="text-zinc-500">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/jobs?search=${tag}`}
                className="px-3.5 py-1 rounded-full border border-zinc-850 bg-zinc-900/30 text-zinc-300 hover:text-white hover:border-zinc-700 transition"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-12 flex justify-center gap-4">
            <Link
              href="/jobs"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-sm hover:from-violet-500 hover:to-fuchsia-500 transition shadow-lg shadow-violet-500/10 flex items-center gap-2"
            >
              Browse Open Jobs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold text-sm hover:bg-zinc-850 hover:text-white transition"
            >
              Post a Position
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Engineered for high-performing talent.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg">
              HireLoop is built by builders, for builders. We streamline candidate matching
              and eliminate typical corporate recruitment bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-zinc-900 bg-zinc-900/30 backdrop-blur-xl flex gap-6 hover:border-zinc-800 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-855 flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 md:p-16 rounded-[40px] border border-violet-500/20 bg-gradient-to-br from-violet-950/30 via-zinc-950 to-zinc-950 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-violet-600/10 blur-[80px]" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Ready to find your next engineering challenge?
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Create your candidate profile, connect your technical credentials, and discover active pipelines matching your pace today.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition"
              >
                Get Started Free
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 rounded-xl bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-semibold text-sm transition"
              >
                Explore Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
