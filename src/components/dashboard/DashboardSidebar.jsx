import { getUserSession } from "@/lib/core/session";
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

export const DashboardSidebar = async () => {
  const user = await getUserSession();
  const recruiterNavLinks = [
    { icon: House, href: "/dashboard/recruiter", label: "Home" },
    { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
    {
      icon: Bell,
      href: "/dashboard/recruiter/jobs/new",
      label: "Post A Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    { icon: Envelope, href: "/messages", label: "Messages" },
    { icon: Person, href: "/profile", label: "Profile" },
    { icon: Gear, href: "/settings", label: "Settings" },
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
      href: "/pricing",
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

  const navItems = navLinksmap[user.role || "seeker"];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          href={item.href}
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSideContentLeft />
          Sidebar
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};
