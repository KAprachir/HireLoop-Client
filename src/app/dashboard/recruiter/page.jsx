"use client";
import StatsGrid from "@/components/dashboard/StatsGrid";
import { useSession } from "@/lib/auth-client";
import { FileText, Persons, Thunderbolt, CircleCheck } from "@gravity-ui/icons";

const RecruiterPage = () => {
  const { data: session, isPending } = useSession();

  const recruiterStats = [
    {
      title: "Total Job Posts",
      value: "48",
      icon: FileText,
    },
    {
      title: "Total Applicants",
      value: "1,284",
      icon: Persons,
    },
    {
      title: "Active Jobs",
      value: "18",
      icon: Thunderbolt,
    },
    {
      title: "Jobs Closed",
      value: "32",
      icon: CircleCheck,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold p-2">
        Welcome Back, {session?.user?.name}!
      </h1>
      <StatsGrid stats={recruiterStats} />
    </div>
  );
};

export default RecruiterPage;
