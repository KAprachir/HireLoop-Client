import { getJobsById } from "@/lib/api/job";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import {
  ChevronLeft,
  ShieldExclamation,
  CircleInfo,
  CircleCheck,
  ArrowRight,
} from "@gravity-ui/icons";
import Link from "next/link";
import JobApply from "./JobApply";
import { getApplicationByApplicant } from "@/lib/api/applications";
import { getPlanById } from "@/lib/api/plans";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  // Guard 1: User authentication protection
  if (!user) {
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
  }

  // Guard 2: Unauthorized Role Protection
  if (user.role !== "seeker") {
    return (
      <div className="w-full min-h-[85vh] flex flex-col justify-center items-center bg-zinc-950 text-white p-6">
        <div className="max-w-md w-full text-center p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-5 text-amber-400">
            <ShieldExclamation className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100 mb-2">
            Access Restricted
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Only registered job seekers can apply for open positions. Please
            switch to or sign in with a seeker account to proceed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex w-full justify-center items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-xl text-sm transition"
          >
            <ChevronLeft className="w-4 h-4" /> Return to Job Board
          </Link>
        </div>
      </div>
    );
  }

  // Fetch applicant records natively
  const applications = (await getApplicationByApplicant(user.id)) || [];

  // Fetch job documents using your data engine
  const job = await getJobsById(id);

  if (!job) {
    return (
      <div className="w-full min-h-[85vh] flex flex-col justify-center items-center bg-zinc-950 text-white p-6">
        <p className="text-zinc-400 text-base">
          The position you are looking for does not exist or has expired.
        </p>
        <Link
          href="/jobs"
          className="mt-4 text-sm text-zinc-500 hover:text-white transition flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Back to listings
        </Link>
      </div>
    );
  }

  // Fetch the actual plan metrics from MongoDB using your imported helper
  const planIdString = user?.plan || "seeker-free";
  const plan = await getPlanById(planIdString);

  // Read the correct fields from your loaded database collection safely
  const maxAllowed =
    plan?.maxApplicationsPerMonth ?? plan?.maxApplications ?? 3;

  // Guard 3: Duplicate Application Check
  const hasAlreadyApplied = applications.some(
    (app) => (app.jobId?.$job_id || app.jobId || app.id) === id,
  );

  // Guard 4: FIXED dynamic limit verification check statement
  const isLimitReached = maxAllowed !== -1 && applications.length >= maxAllowed;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm mb-6 transition group"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition" />
          Back to Job Details
        </Link>

        {/* Dynamic Track Metrics Banner */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <CircleInfo className="text-zinc-400 w-5 h-5" />
            <div>
              <p className="text-sm font-medium text-zinc-200">
                Application Allowance Status ({plan?.name || "Free"} Plan)
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {maxAllowed === -1
                  ? "Your premium tier permits unlimited active job applications."
                  : `Your current tier permits up to ${maxAllowed} active applications.`}
              </p>
            </div>
          </div>
          <span
            className={`text-sm font-semibold px-3 py-1 rounded-xl border ${
              isLimitReached
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : "bg-zinc-950 text-zinc-300 border-zinc-800"
            }`}
          >
            {applications.length} / {maxAllowed === -1 ? "∞" : maxAllowed} Used
          </span>
        </div>

        {/* Dynamic Reordered Control Flow */}
        {isLimitReached ? (
          /* Case B: Limit Cap Hit Warning Layout (Shows Buy Subscription Button) */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">
              <ShieldExclamation className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">
              Application Limit Exceeded
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mt-2 mb-6 leading-relaxed">
              You have reached your maximum plan allocation cap of {maxAllowed}{" "}
              concurrent job applications. Upgrade your account package to
              unlock additional entry room or withdraw an existing submission.
            </p>

            {/* Styled Subscription Link */}
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3 px-6 rounded-xl text-sm transition group shadow-lg active:scale-[0.98]"
            >
              Buy Subscription
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ) : hasAlreadyApplied ? (
          /* Case A: Already Applied Screen Layout */
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4 text-emerald-400">
              <CircleCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-100">
              Application Registered
            </h3>
            <p className="text-zinc-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
              You have already submitted an application for the{" "}
              <span className="text-zinc-200 font-medium">{job.jobTitle}</span>{" "}
              position. Our hiring teams will review your records shortly.
            </p>
          </div>
        ) : (
          /* Case C: Active submission path unlocked */
          <JobApply applicant={user} job={job} />
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
