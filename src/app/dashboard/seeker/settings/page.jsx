"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import {
  Magnifier,
  Bell,
  Envelope,
} from "@gravity-ui/icons";
import { Card, Button } from "@heroui/react";

export default function SeekerSettings() {
  const { data: session } = useSession();

  // Settings states initialized with dummy/mockup data from Image 5
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const currentFullName = fullName !== null ? fullName : (session?.user?.name || "Jane Doe");
  const currentEmail = email !== null ? email : (session?.user?.email || "jane.doe@example.com");
  const currentAvatar = avatar !== null ? avatar : (session?.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face");

  const [resumeName, setResumeName] = useState("Jane_Doe_Resume_2023.pdf");
  const [resumeSize, setResumeSize] = useState("1.2 MB");
  const [resumeUpdated, setResumeUpdated] = useState("Last updated 2 days ago");
  
  const [headline, setHeadline] = useState("Senior UX/UI Designer");
  const [bio, setBio] = useState(
    "Passionate designer with 5+ years of experience crafting user-centric digital experiences..."
  );
  const [skills, setSkills] = useState(["Figma", "UI Design", "Prototyping"]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      if (session?.user) {
        // Update user name dynamically using better-auth client SDK
        const { error } = await authClient.updateUser({
          name: currentFullName,
        });
        if (error) {
          toast.error(error.message || "Failed to update profile details.");
          return;
        }
      }
      toast.success("Profile information updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving profile.");
    }
  };

  const handleResetPassword = () => {
    toast.success("Password reset email link sent!");
  };

  const handleResumeReplace = () => {
    // Simulate file replacement
    const mockResumes = ["Jane_Doe_Resume_2026.pdf", "Jane_Doe_CV_Updated.pdf", "Jane_Doe_Product_Designer.pdf"];
    const randomResume = mockResumes[Math.floor(Math.random() * mockResumes.length)];
    setResumeName(randomResume);
    setResumeSize("1.4 MB");
    setResumeUpdated("Last updated just now");
    toast.success(`Resume replaced with ${randomResume}!`);
  };

  const handleResumeRemove = () => {
    setResumeName("");
    setResumeSize("");
    setResumeUpdated("");
    toast.success("Resume removed from profile.");
  };

  const handleAddSkill = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const trimmed = newSkillInput.trim();
      if (trimmed && !skills.includes(trimmed)) {
        setSkills([...skills, trimmed]);
        setNewSkillInput("");
        toast.success(`Skill "${trimmed}" added!`);
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
    toast.success(`Skill "${skillToRemove}" removed`);
  };

  const handleSaveDetails = (e) => {
    e.preventDefault();
    toast.success("Professional details and skills saved!");
  };

  const handleChangeAvatar = () => {
    // Simulate dynamic avatar change
    const urls = [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ];
    const newAvatar = urls[Math.floor(Math.random() * urls.length)];
    setAvatar(newAvatar);
    toast.success("Avatar modified successfully!");
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
              placeholder="Search settings..."
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
                 src={currentAvatar}
                 alt="Profile Avatar"
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>

        {/* --- PAGE HEADER --- */}
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Settings</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your account details and professional profile.
          </p>
        </div>

        {/* --- DUAL COLUMNS GRID (PROFILE & RESUME) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Profile Details Form Card */}
          <Card className="lg:col-span-7 p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl space-y-6">
            <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
              Profile Information
            </h3>

            {/* Avatar Selector block */}
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-800 bg-zinc-900 flex-shrink-0">
                <img
                  src={currentAvatar}
                  alt="Current Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <Button
                  onClick={handleChangeAvatar}
                  className="h-9 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 hover:border-zinc-650 text-xs font-semibold rounded-xl transition"
                >
                  Change Avatar
                </Button>
                <p className="text-[10px] text-zinc-500">JPG, GIF or PNG. Max size of 5MB.</p>
              </div>
            </div>

            {/* Fields Form */}
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    value={currentFullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-zinc-950 text-sm border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-zinc-750 transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    value={currentEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled
                    className="w-full bg-zinc-950 text-sm border border-zinc-900 text-zinc-500 rounded-xl px-4 py-2.5 cursor-not-allowed select-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3">
                <Button
                  type="submit"
                  className="h-10 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl px-6 transition active:scale-[0.98]"
                >
                  Update Profile
                </Button>
                <Button
                  type="button"
                  onClick={handleResetPassword}
                  className="h-10 bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-200 font-semibold text-xs rounded-xl px-4 transition active:scale-[0.98]"
                >
                  Reset Password
                </Button>
              </div>
            </form>
          </Card>

          {/* Resume Upload Form Card */}
          <Card className="lg:col-span-5 p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                Resume
              </h3>
              <p className="text-xs text-zinc-500 leading-normal">
                Upload your most recent resume to enable one-click applications.
              </p>

              {/* Upload block graphic layout */}
              <div className="w-full border-2 border-dashed border-zinc-800 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-950/20">
                {resumeName ? (
                  <>
                    {/* PDF Document Graphic */}
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-200 truncate max-w-[220px]">
                        {resumeName}
                      </p>
                      <p className="text-[10px] text-zinc-500 font-medium">
                        {resumeUpdated} • {resumeSize}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Upload Empty State */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5h10.5a2.25 2.25 0 002.25-2.25V7.41a2.25 2.25 0 00-.659-1.591l-3.99-3.99A2.25 2.25 0 0013.1 1.25H6.75A2.25 2.25 0 004.5 3.5v13.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </div>
                    <p className="text-xs text-zinc-500">No active resume uploaded.</p>
                  </>
                )}
              </div>
            </div>

            {/* Replace / Remove buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleResumeReplace}
                className="flex-1 h-10 bg-zinc-800 hover:bg-zinc-755 text-zinc-200 border border-zinc-700 font-semibold text-xs rounded-xl transition"
              >
                {resumeName ? "Replace" : "Upload"}
              </Button>
              {resumeName && (
                <Button
                  onClick={handleResumeRemove}
                  className="flex-1 h-10 bg-transparent border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-red-400 font-semibold text-xs rounded-xl transition"
                >
                  Remove
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* --- BOTTOM SECTION (PROFESSIONAL DETAILS) --- */}
        <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-3xl space-y-6 shadow-lg">
          <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
            Professional Details
          </h3>

          <form onSubmit={handleSaveDetails} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Professional Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
                className="w-full bg-zinc-950 text-sm border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-zinc-750 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400">Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
                rows={4}
                className="w-full bg-zinc-950 text-sm border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:outline-none focus:border-zinc-750 transition resize-none leading-relaxed"
              />
            </div>

            {/* Skills tag input */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-zinc-400">Skills</label>
              <div className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 flex flex-wrap items-center gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold pl-3 pr-2 py-1 bg-zinc-900 border border-zinc-850 text-zinc-200 rounded-xl hover:border-zinc-700 transition"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-300 font-bold hover:bg-zinc-800 transition"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Tag Input */}
                <input
                  type="text"
                  placeholder="Add a skill..."
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  className="bg-transparent border-none outline-none text-xs text-zinc-300 placeholder-zinc-500 flex-grow min-w-[120px] py-1 px-2"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="h-11 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl px-8 transition active:scale-[0.98]"
              >
                Save Details
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
