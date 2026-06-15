import React from "react";

export default function AdvantagesSection() {
  const advantages = [
    {
      title: "AI-Powered Matching",
      desc: "Connect your profiles and portfolios. Get matched with roles seeking your exact tech stack automatically.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-violet-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
    {
      title: "Verified Compensation",
      desc: "Every job post displays clear, verified salary ranges. No standard guessing or hidden pricing tiers.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-fuchsia-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
          />
        </svg>
      ),
    },
    {
      title: "Direct-to-Engineering",
      desc: "Skip the legacy HR filters. Get connected directly to engineering managers and technical team leads.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-blue-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 01-.75-.75v-4.25m16.5 0a3 3 0 00-3-3H7a3 3 0 00-3 3m16.5 0V9a3 3 0 00-3-3H7a3 3 0 00-3 3v5.15M12 9h.008v.008H12V9zm-3 0h.008v.008H9V9zm6 0h.008v.008H15V9z"
          />
        </svg>
      ),
    },
    {
      title: "Workspace Freedom",
      desc: "From fast-growing startup offices to asynchronous remote pipelines, locate workspace terms built for your life.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-emerald-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12.75 3.03v.568c0 .334.148.65.405.864l.406.34c.125.104.244.223.34.346l.34.405a1.125 1.125 0 01.244.71v.002c0 .496-.328.923-.807 1.047l-.22.057a1.125 1.125 0 00-.817.817l-.057.22c-.124.479-.551.807-1.047.807h-.002a1.125 1.125 0 01-.71-.244l-.405-.34a1.125 1.125 0 00-.346-.34l-.405-.34a1.125 1.125 0 01-.244-.71v-.002c0-.496.328-.923.807-1.047l.22-.057a1.125 1.125 0 00.817-.817l.057-.22c.124-.479.551-.807 1.047-.807h.002z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      ),
    },
    {
      title: "Salary Insights",
      desc: "Gain deep wage brackets telemetry and interactive compensation charts based on active listings.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-amber-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
    },
    {
      title: "Real-Time Tracking",
      desc: "Track the status of your applications and interview pipelines live inside your seeker dashboard panel.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      ),
    },
    {
      title: "24/7 Priority Support",
      desc: "Get fast-track help desk support and candidate feedback whenever you need assistance.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-cyan-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499c.174-.537.943-.537 1.118 0l1.833 5.592a1 1 0 00.95.69h5.88c.563 0 .797.72.344 1.058l-4.757 3.457a1 1 0 00-.364 1.118l1.832 5.592c.175.538-.433 1.07-.9-.756L12 17.51l-4.758 3.456c-.467.339-1.075-.192-.9-.755l1.832-5.592a1 1 0 00-.364-1.118L3.05 10.84c-.453-.339-.22-.1058.343-.1058h5.882a1 1 0 00.95-.69l1.833-5.592z"
          />
        </svg>
      ),
    },
    {
      title: "Early Access Protection",
      desc: "Unlock fresh listings 24 hours before they are publicly indexed for free-tier seeker search engines.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-purple-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m-3.75 3h16.5a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/20 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">
            Our Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to succeed
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-xl flex flex-col items-start gap-4 hover:border-zinc-850 hover:bg-zinc-900/30 transition text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-900 flex items-center justify-center flex-shrink-0">
                {item.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
