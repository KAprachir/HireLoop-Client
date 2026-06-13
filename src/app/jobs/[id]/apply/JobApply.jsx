"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, Button } from "@heroui/react";
import { Rocket, PaperPlane, Briefcase, MapPin } from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/application";

const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-populate states with safe fallbacks from the applicant session payload
  const [formData, setFormData] = useState({
    fullName: applicant?.name || applicant?.username || "",
    email: applicant?.email || "",
    resumeLink: applicant?.resumeUrl || applicant?.resume || "", // Populates your user profile resume link
    coverLetter: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Structure the comprehensive dataset to match your database payload
    const submissionPayload = {
      jobId: job._id?.$oid || job._id || job.id,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      applicantId: applicant._id?.$oid || applicant._id || applicant.id,
      ...formData,
      appliedAt: new Date().toISOString(),
    };

    console.log("Submitting Application Data:", submissionPayload);

    try {
      // 1. Properly await the backend response
      const res = await submitApplication(submissionPayload);

      if (res?.insertedId) {
        alert("Application submitted successfully!");

        // 2. Safely clear optional text areas while preserving profile info
        setFormData((prev) => ({
          ...prev,
          coverLetter: "",
        }));
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("A network error occurred. Please try again.");
    } finally {
      // 3. Always turn off the loading state when done
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl">
      {/* Upper Context Branding Header */}
      <div className="border-b border-zinc-800 pb-6 mb-8 flex items-start gap-4">
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 p-1.5 object-contain"
          />
        )}
        <div>
          <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
            Application Submission
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mt-0.5">
            {job.jobTitle}
          </h1>
          <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1.5 flex-wrap">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-zinc-600" />{" "}
              {job.companyName}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-600" /> {job.location}
            </span>
          </div>
        </div>
      </div>

      {/* HeroUI v3 Structural Validation Form */}
      <Form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Full Name Input Box */}
        <TextField
          name="fullName"
          isRequired
          className="w-full flex flex-col gap-2"
        >
          <Label className="text-zinc-400 text-sm font-medium">Full Name</Label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white py-2.5 px-3 h-11 text-sm focus:outline-none focus:border-zinc-700 transition"
          />
        </TextField>

        {/* Email Address Input */}
        <TextField
          name="email"
          isRequired
          className="w-full flex flex-col gap-2 opacity-80"
        >
          <Label className="text-zinc-400 text-sm font-medium">
            Verified Email Address
          </Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            placeholder="yourname@domain.com"
            className="w-full bg-zinc-950/50 border border-zinc-800 rounded-xl text-zinc-400 py-2.5 px-3 h-11 text-sm cursor-not-allowed focus:outline-none transition"
          />
        </TextField>

        {/* Updated Resume Link Field */}
        <TextField
          name="resumeLink"
          isRequired
          className="w-full flex flex-col gap-2"
        >
          <Label className="text-zinc-400 text-sm font-medium">
            Resume Link (Google Drive, Dropbox, or PDF URL)
          </Label>
          <Input
            type="url"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleInputChange}
            placeholder="https://drive.google.com/.../my-resume.pdf"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white py-2.5 px-3 h-11 text-sm focus:outline-none focus:border-zinc-700 transition"
          />
        </TextField>

        {/* Cover Letter Multi-line Field Box */}
        <TextField
          name="coverLetter"
          isRequired
          className="w-full flex flex-col gap-2"
        >
          <Label className="text-zinc-400 text-sm font-medium">
            Cover Letter
          </Label>
          <TextArea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            rows={5}
            placeholder="Briefly describe why you are an excellent fit for this engineering challenge..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl text-white py-2.5 px-3 text-sm focus:outline-none focus:border-zinc-700 transition resize-none leading-relaxed"
          />
        </TextField>

        {/* System Disclaimer Info Block */}
        <div className="bg-zinc-950/40 border border-zinc-800/60 p-4 rounded-xl flex items-start gap-3 w-full">
          <PaperPlane className="text-zinc-600 w-4 h-4 mt-0.5" />
          <p className="text-xs text-zinc-500 leading-normal">
            By submitting this application, your profile metadata (registered
            email, resume history) will be safely dispatched to the hiring desk
            at {job.companyName}.
          </p>
        </div>

        {/* Action Form Submission Trigger */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full bg-white hover:bg-zinc-200 text-zinc-950 font-semibold h-12 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg"
          endContent={!isSubmitting && <Rocket className="w-4 h-4" />}
        >
          {isSubmitting ? "Submitting Application" : "Submit Application Now"}
        </Button>
      </Form>
    </div>
  );
};

export default JobApply;
