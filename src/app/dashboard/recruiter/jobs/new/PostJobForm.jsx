"use client";

import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { toast } from "react-hot-toast";
import { Briefcase, Globe } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/job";

export default function PostJobForm({ company }) {
  const router = useRouter();
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};
    if (!data.jobTitle) newErrors.jobTitle = "Job title is required";
    if (!data.jobCategory) newErrors.jobCategory = "Job category is required";
    if (!data.jobType) newErrors.jobType = "Job type is required";
    if (!data.minSalary) newErrors.minSalary = "Minimum salary is required";
    if (!data.maxSalary) newErrors.maxSalary = "Maximum salary is required";
    if (!isRemote && !data.location)
      newErrors.location = "Location is required";
    if (!data.deadline) newErrors.deadline = "Deadline is required";
    if (!data.responsibilities)
      newErrors.responsibilities = "Responsibilities are required";
    if (!data.requirements)
      newErrors.requirements = "Requirements are required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error("Please fill in all required fields.");
      return;
    }

    setErrors({});

    try {
      const res = await createJob({
        ...data,
        isRemote,
        companyId: company._id || company.id,
        companyName: company.name,
        companyLogo: company.logo || "",
        status: "active",
        isPubliclyVisible: true,
      });

      if (res?.insertedId || res?.acknowledged) {
        toast.success("Job posted successfully!");
        router.push("/dashboard/recruiter/jobs");
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to publish job listing.");
      }
    } catch (error) {
      toast.error("An error occurred while publishing.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg h-12 px-3 text-sm placeholder:text-zinc-600 outline-none transition-all";
  const areaStyle =
    "w-full text-white bg-[#1c1c1e] border border-zinc-800 hover:bg-[#242426] focus:border-zinc-600 rounded-lg p-3 text-sm placeholder:text-zinc-600 outline-none transition-all";

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-[#121214] border border-zinc-900 rounded-xl p-8 shadow-2xl">
        {/* Header Header */}
        <div className="border-b border-zinc-800 pb-6 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <div className="mt-4 inline-flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-400">
            <Briefcase size={14} /> Posting as:{" "}
            <span className="font-semibold text-zinc-300">{company?.name}</span>
          </div>
        </div>

        {!company?._id ? (
          <div className="p-6 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/80">
            <p className="text-zinc-400 text-sm">
              Please register your company first before posting jobs.
            </p>
          </div>
        ) : company?.status !== "Approved" ? (
          <div className="p-6 text-center rounded-2xl bg-zinc-900/30 border border-zinc-800/80">
            <p className="text-zinc-400 text-sm">
              Awaiting administrator profile verification details.
            </p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-medium text-sm">
                    Job Title
                  </label>
                  <input
                    name="jobTitle"
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputStyle}
                  />
                  {errors.jobTitle && (
                    <span className="text-xs text-red-400">
                      {errors.jobTitle}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-medium text-sm">
                    Job Category
                  </label>
                  <select name="jobCategory" className={inputStyle}>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-medium text-sm">
                    Job Type
                  </label>
                  <select name="jobType" className={inputStyle}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-medium text-sm">
                    Salary Range
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      name="minSalary"
                      placeholder="Min"
                      type="number"
                      className={inputStyle}
                    />
                    <input
                      name="maxSalary"
                      placeholder="Max"
                      type="number"
                      className={inputStyle}
                    />
                    <select name="currency" className={inputStyle}>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400 font-medium text-sm">
                      Location
                    </span>
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isRemote}
                        onChange={(e) => setIsRemote(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-zinc-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:bg-black peer-checked:bg-white relative" />
                      <span className="text-xs font-semibold text-zinc-400">
                        Remote
                      </span>
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <Globe
                      size={16}
                      className="absolute left-3 text-zinc-600 pointer-events-none"
                    />
                    <input
                      name="location"
                      placeholder={
                        isRemote ? "Global / Remote" : "e.g. Austin, TX"
                      }
                      disabled={isRemote}
                      className={`${inputStyle} pl-10 disabled:opacity-40`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-zinc-400 font-medium text-sm">
                    Application Deadline
                  </label>
                  <input type="date" name="deadline" className={inputStyle} />
                </div>
              </div>
            </div>

            <div className="space-y-6 w-full">
              <div className="flex flex-col gap-1.5">
                <label className="text-zinc-400 font-medium text-sm">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  placeholder="Outline everyday tasks..."
                  rows={4}
                  className={areaStyle}
                />
                {errors.responsibilities && (
                  <span className="text-xs text-red-400">
                    {errors.responsibilities}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-zinc-400 font-medium text-sm">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  placeholder="List required experience..."
                  rows={4}
                  className={areaStyle}
                />
                {errors.requirements && (
                  <span className="text-xs text-red-400">
                    {errors.requirements}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800 w-full">
              <Button
                type="button"
                className="bg-transparent border border-zinc-800 text-zinc-300 rounded-lg px-6 h-11"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-white text-black font-semibold rounded-lg px-6 h-11"
              >
                Post Job
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
