"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutSideContentLeft,
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  Magnifier,
  Person,
  LayoutCellsLarge,
  Bookmark,
  FileText,
  CreditCard,
  Persons,
  BranchesDown,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export const DashboardSidebar = () => {
  const { data: session } = useSession();
  const user = session?.user || { role: "seeker", plan: "seeker-free", name: "Guest" };
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const recruiterNavLinks = [
    { icon: LayoutCellsLarge, href: "/dashboard/recruiter", label: "Dashboard" },
    { icon: Briefcase, href: "/dashboard/recruiter/company", label: "My Company" },
    { icon: FileText, href: "/dashboard/recruiter/jobs", label: "Manage Jobs" },
    { icon: Envelope, href: "/dashboard/recruiter/applications", label: "Applications" },
    { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
  ];

  const seekerNavLinks = [
    {
      icon: LayoutCellsLarge,
      href: "/dashboard/seeker",
      label: "Dashboard",
    },
    {
      icon: Magnifier,
      href: "/jobs",
      label: "Jobs",
    },
    {
      icon: Bookmark,
      href: "/dashboard/seeker/saved",
      label: "Saved Jobs",
    },
    {
      icon: FileText,
      href: "/dashboard/seeker/applications",
      label: "Applications",
    },
    {
      icon: CreditCard,
      href: "/dashboard/seeker/billing",
      label: "Billing",
    },
    {
      icon: Gear,
      href: "/dashboard/seeker/settings",
      label: "Settings",
    },
  ];

  const adminNavLinks = [
    {
      icon: LayoutCellsLarge,
      href: "/dashboard/admin",
      label: "Dashboard",
    },
    {
      icon: Persons,
      href: "/dashboard/admin/users",
      label: "Users",
    },
    {
      icon: BranchesDown,
      href: "/dashboard/admin/companies",
      label: "Companies",
    },
    {
      icon: Briefcase,
      href: "/dashboard/admin/jobs",
      label: "Jobs",
    },
    {
      icon: CreditCard,
      href: "/dashboard/admin/payments",
      label: "Payments",
    },
    {
      icon: Gear,
      href: "/dashboard/admin/settings",
      label: "Settings",
    },
  ];

  const navLinksmap = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  const currentRole = user?.role || "seeker";
  const navItems = navLinksmap[currentRole];

  // Dynamic label for user tier
  const getPlanLabel = (plan) => {
    if (plan === "seeker-pro") return "Professional Tier";
    if (plan === "seeker-premium") return "Premium Tier";
    return "Free Tier";
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#09090b] text-white">
      {/* Brand Header */}
      <div className="px-3 py-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white hover:text-zinc-300 transition-colors">
            HireLoop
          </span>
        </Link>
        {(currentRole === "seeker" || currentRole === "recruiter") && (
          <span className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider block mt-1">
            {currentRole === "recruiter" ? "Recruiter Dashboard" : "Seeker Dashboard"}
          </span>
        )}
      </div>

      {/* Profile Info block */}
      {(currentRole === "seeker" || currentRole === "recruiter") && (
        <div className="px-3 mb-6">
          <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800 flex-shrink-0">
              <img
                src={
                  user?.image ||
                  (currentRole === "recruiter"
                    ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                    : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face")
                }
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-zinc-100 truncate">
                {currentRole === "recruiter" && user?.name === "Guest" ? "Alex Sterling" : (user?.name || "Seeker Portal")}
              </p>
              {currentRole === "recruiter" ? (
                <div className="space-y-0.5 mt-0.5">
                  <p className="text-[10px] text-zinc-500 font-semibold">Recruiter</p>
                  <span className="inline-block text-[8px] font-extrabold px-1.5 py-0.5 bg-zinc-950 border border-zinc-850 rounded text-zinc-300 uppercase tracking-wider">
                    Premium Account
                  </span>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                  {getPlanLabel(user?.plan)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard/seeker" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-white"
              }`}
              href={item.href}
            >
              <item.icon className={`size-4 ${isActive ? "text-white" : "text-zinc-400"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-zinc-900 flex flex-col gap-3">
        {currentRole === "seeker" && (
          <Link
            href="/dashboard/seeker/settings"
            className="w-full"
          >
            <Button className="w-full h-11 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-xl transition active:scale-[0.98]">
              Post Resume
            </Button>
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition w-full text-left"
        >
          {/* Custom Logout SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-900 lg:block h-screen sticky top-0 bg-[#09090b]">
        {navContent}
      </aside>

      {/* Mobile Drawer Trigger & Drawer */}
      <div className="lg:hidden p-4 sticky top-0 z-40 bg-[#09090b] border-b border-zinc-900 flex items-center justify-between w-full">
        <span className="text-lg font-bold tracking-tight text-white">HireLoop</span>
        <Button
          className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold"
          variant="secondary"
          onClick={() => setIsOpen(true)}
        >
          <LayoutSideContentLeft className="size-4 mr-1" />
          Menu
        </Button>
      </div>

      <Drawer isOpen={isOpen} onOpenChange={setIsOpen} placement="left">
        <Drawer.Content className="bg-[#09090b] text-white max-w-[260px] p-0">
          <Drawer.Body className="p-0 h-full">
            {navContent}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>
    </>
  );
};
