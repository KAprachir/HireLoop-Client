"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  ArrowUpToLine,
  Globe,
  Factory,
  ArrowRight,
  Pencil,
  ChevronDown,
  Magnifier,
  Bell,
  Envelope,
  Check,
} from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";
import { Card, Button } from "@heroui/react";

// Tailwind classes for form styling
const textInputClass =
  "w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition text-sm";
const textAreaClass =
  "w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-4 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none text-sm leading-relaxed";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  // --- Core States ---
  const [company, setCompany] = useState(recruiterCompany);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [logoUrl, setLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form values state for registration
  const [industry, setIndustry] = useState("technology");
  const [employeeCount, setEmployeeCount] = useState("1-10");

  // --- IMGBB Upload Handler ---
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, logo: "File size exceeds 5MB limit" }));
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setLogoUrl(data.data.url);
        setErrors((prev) => ({ ...prev, logo: null }));
        toast.success("Logo uploaded successfully!");
      } else {
        setErrors((prev) => ({ ...prev, logo: "Upload failed. Try again." }));
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        logo: "Network error during logo upload",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  // --- Form Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const companyName = formData.get("companyName");
    const websiteUrl = formData.get("websiteUrl");
    const location = formData.get("location");
    const description = formData.get("description");

    const newErrors = {};
    if (!companyName) newErrors.companyName = "Company name is required";
    if (!websiteUrl) newErrors.websiteUrl = "Website URL is required";
    if (!location) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payloadData = {
      name: companyName,
      websiteUrl,
      industry: industry || "Technology",
      location,
      employeeCount: employeeCount || "1-10 employees",
      description,
      logo: logoUrl || (company ? company.logo : ""),
      status: "Approved", // Set Approved directly matching mockup state
      recruiterId: recruiter?.id,
    };

    try {
      const payload = await createCompany(payloadData);

      if (payload?.insertedId || payload) {
        const savedCompany = {
          ...payloadData,
          _id: payload?.insertedId || "mock-id-lt",
        };
        setCompany(savedCompany);
        toast.success("Company registered successfully!");
        setErrors({});
        setIsModalOpen(false);
      } else {
        toast.error("Failed to register company profile details.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during registration.");
    }
  };

  // Mock Active Roles & Gallery details matching LuminaTech mockups
  const activeRoles = [
    {
      title: "Senior Distributed Systems Engineer",
      details: ["SF / Remote", "$180k - $240k"],
      applicants: 15,
    },
    {
      title: "Product Design Lead",
      details: ["New York", "$160k - $210k"],
      applicants: 8,
    },
    {
      title: "DevOps Architect (Infra)",
      details: ["Remote", "$190k+"],
      applicants: 22,
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop", // open office space
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=400&h=300&fit=crop", // modern conference board
    "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&h=300&fit=crop", // double monitors code
  ];

  const handleEditProfile = () => {
    // Populate form data
    if (company) {
      setLogoUrl(company.logo);
      setIndustry(company.industry?.toLowerCase() || "technology");
      setEmployeeCount(company.employeeCount || "1-10");
    }
    setIsModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-4 md:p-8 selection:bg-zinc-800">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- LOCAL TOP BAR ROW --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
          <div className="relative max-w-md w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500">
              <Magnifier className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search companies or jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/60 text-sm border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition"
            />
          </div>

          <div className="flex items-center justify-end gap-5">
            <button className="text-zinc-400 hover:text-white transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            </button>
            <button className="text-zinc-400 hover:text-white transition">
              <Envelope className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
              <img
                src={recruiter?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- VIEW 1: UNREGISTERED EMPTY STATE LAYOUT (Image 2) --- */}
        {!company?._id && (
          <div className="py-20 flex flex-col items-center justify-center">
            {/* Header Title */}
            <div className="w-full max-w-2xl text-left border-b border-zinc-900 pb-4 mb-16">
              <h2 className="text-xl font-bold text-zinc-100 tracking-wide">My Company</h2>
            </div>

            {/* Empty block card container */}
            <div className="w-full max-w-2xl bg-zinc-900/10 border border-zinc-900 rounded-[32px] p-12 text-center flex flex-col items-center space-y-6 relative shadow-lg">
              
              {/* Graphic icon box */}
              <div className="w-24 h-24 bg-zinc-900/40 border border-zinc-800/80 rounded-3xl flex items-center justify-center shadow-inner relative">
                {/* SVG store with + sign */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-zinc-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72M6.75 18h3.5a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75h-3.5a.75.75 0 00-.75.75v3.75c0 .414.336.75.75.75z"
                  />
                </svg>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-black font-extrabold text-xs shadow">
                  +
                </div>
              </div>

              {/* Title & subtitle */}
              <div className="space-y-2 max-w-md">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Company not registered yet
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Set up your business profile to start posting high-performance job listings and manage your talent loop.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full max-w-xs">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-11 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl transition active:scale-[0.98] shadow-md"
                >
                  Register your company
                </button>
                <button
                  onClick={() => toast.success("FAQ document coming soon!")}
                  className="w-full h-11 bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl transition active:scale-[0.98]"
                >
                  View FAQ
                </button>
              </div>

              {/* Help subtext */}
              <span className="text-[10px] text-zinc-600 pt-8 block">
                Need specialized assistance? Contact our enterprise support team.
              </span>
            </div>
          </div>
        )}

        {/* --- VIEW 2: REGISTERED COMPANY PROFILE VIEW (Image 4) --- */}
        {company?._id && (
          <div className="space-y-6">
            
            {/* Top Banner Card */}
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-[32px] overflow-hidden shadow-2xl relative">
              {/* Universe/Globe wide graphic */}
              <div className="w-full h-56 relative overflow-hidden bg-zinc-950">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
                  alt="Company Banner"
                  className="w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-80" />
              </div>

              {/* Overlaid Logo and Description Grid */}
              <div className="p-6 md:p-8 pt-0 -mt-10 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                  {/* Logo block */}
                  <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-850 p-2 overflow-hidden flex items-center justify-center shadow-2xl flex-shrink-0">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl font-extrabold text-amber-500 font-mono">
                        {company.name ? company.name.substring(0, 1).toUpperCase() : "L"}
                      </span>
                    )}
                  </div>

                  {/* Text meta */}
                  <div className="space-y-1">
                    <div className="flex items-center flex-wrap gap-2.5">
                      <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                        {company.name}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 tracking-wider">
                        <Check className="w-2.5 h-2.5" />
                        APPROVED
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                      {company.description || "Engineering the future of enterprise cloud intelligence and distributed ledger solutions."}
                    </p>
                  </div>
                </div>

                {/* Follow/Website buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => toast.success(`Following ${company.name}!`)}
                    className="h-10 bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl px-4 transition active:scale-[0.98]"
                  >
                    + Follow
                  </button>
                  <a
                    href={company.websiteUrl?.startsWith("http") ? company.websiteUrl : `https://${company.websiteUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="h-10 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl px-5 transition active:scale-[0.98] shadow-md flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      Visit Website
                    </button>
                  </a>
                  <button
                    onClick={handleEditProfile}
                    className="h-10 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white px-3.5 rounded-xl transition"
                    title="Edit profile"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Company stats card details */}
              <div className="p-6 md:p-8 pt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Employees count */}
                <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl text-left">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Employees</p>
                  <p className="text-lg font-bold text-white mt-1">
                    {company.employeeCount === "1-10" ? "1-10 employees" : company.employeeCount === "11-50" ? "11-50 employees" : company.employeeCount === "51-200" ? "51-200 employees" : "12,400+ Employees"}
                  </p>
                </div>
                {/* Location headquarters */}
                <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl text-left">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Headquarters</p>
                  <p className="text-lg font-bold text-white mt-1">{company.location || "San Francisco"}</p>
                </div>
                {/* Industry Category */}
                <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl text-left">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Industry</p>
                  <p className="text-lg font-bold text-white mt-1 capitalize">{company.industry || "Technology"}</p>
                </div>
              </div>
            </div>

            {/* Split layout (About / Gallery vs Open roles / hiring team) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (About & Office Photos Gallery) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* About block details */}
                <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg space-y-4 text-left">
                  <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                    About {company.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    Founded in 2014, {company.name} has emerged as a global leader in high-performance cloud infrastructure and decentralized computing systems. We bridge the gap between traditional enterprise legacy architectures and the next generation of intelligent, automated cloud ecosystems.
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    Our mission is to empower organizations with resilient, scalable, and secure technologies that drive meaningful progress. With a focus on R&D, we hold over 140 patents in data encryption and real-time processing, ensuring our clients stay at the bleeding edge of the digital revolution.
                  </p>
                </Card>

                {/* Life at Company gallery layout */}
                <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                      Life at {company.name}
                    </h3>
                    <button
                      onClick={() => toast.success("Gallery drawer coming soon!")}
                      className="text-xs font-semibold text-zinc-500 hover:text-white transition-colors"
                    >
                      View Gallery
                    </button>
                  </div>

                  {/* Photogrid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {galleryImages.map((img, idx) => (
                      <div key={idx} className="h-32 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-900 group hover:border-zinc-800 transition-colors">
                        <img
                          src={img}
                          alt="Office workspace"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column (Open Roles list & Hiring Team Card) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Open/Active roles list */}
                <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-zinc-300 tracking-wide uppercase">
                        Active Roles
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded-md text-zinc-400">
                        14
                      </span>
                    </div>
                  </div>

                  {/* Roles list */}
                  <div className="space-y-4">
                    {activeRoles.map((role, idx) => (
                      <div key={idx} className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl space-y-3 hover:border-zinc-850 transition-colors text-left group">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                            {role.title}
                          </p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-zinc-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          {/* Tags details */}
                          <div className="flex items-center gap-2 flex-wrap text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">
                            {role.details.map((det, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-850 rounded">
                                {det}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => toast.success(`Application draft created for ${role.title}!`)}
                            className="bg-white hover:bg-zinc-200 text-black font-bold text-[10px] rounded-lg px-3 py-1.5 transition active:scale-[0.98]"
                          >
                            Quick Apply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => toast.success("Loading remaining role items...")}
                    className="w-full text-center text-xs font-semibold text-zinc-500 hover:text-white transition pt-2"
                  >
                    See all 14 openings
                  </button>
                </Card>

                {/* Hiring team details */}
                <Card className="p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl shadow-lg space-y-5">
                  <h3 className="text-xs font-bold text-zinc-500 tracking-wide uppercase text-left">
                    Hiring Team
                  </h3>

                  <div className="flex items-center gap-3.5 text-left">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-850 bg-zinc-900 flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                        alt="Talent Acquisition"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-200 truncate">Sarah Chen</p>
                      <p className="text-[10px] text-zinc-500 font-medium truncate mt-0.5">
                        Head of Talent Acquisition
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => toast.success("Opening messages link dialog...")}
                    className="w-full h-11 bg-zinc-900 border border-zinc-850 hover:border-zinc-750 text-zinc-200 text-xs font-semibold rounded-xl transition active:scale-[0.98]"
                  >
                    Message Team
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW 3: FORM REGISTRATION DIALOG MODAL (Image 3) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
              
              {/* Modal header details */}
              <div className="p-6 border-b border-zinc-850 relative">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Register New Company
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-normal">
                  Enter your business details to start hiring on HireLoop.
                </p>

                {/* Close cross trigger button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-zinc-500 hover:text-white transition"
                  title="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form body container */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                
                {/* Input Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-400">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    defaultValue={company?.name || ""}
                    placeholder="e.g. Acme Corp"
                    required
                    className={textInputClass}
                  />
                  {errors.companyName && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors.companyName}</p>
                  )}
                </div>

                {/* Dropdown Industry */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-400">Industry / Category</label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className={`${textInputClass} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="technology">Technology</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="finance">Finance</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* Row 2 (Website URL + Location) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-zinc-400">Website URL</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[11px] font-bold text-zinc-600 select-none pointer-events-none border-r border-zinc-800 pr-2.5">
                        https://
                      </span>
                      <input
                        type="text"
                        name="websiteUrl"
                        defaultValue={company?.websiteUrl || ""}
                        placeholder="www.company.com"
                        required
                        className={`${textInputClass} pl-[72px]`}
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="text-[10px] text-red-400 font-semibold">{errors.websiteUrl}</p>
                    )}
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-zinc-400">Location</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="location"
                        defaultValue={company?.location || ""}
                        placeholder="City, Country"
                        required
                        className={textInputClass}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-[10px] text-red-400 font-semibold">{errors.location}</p>
                    )}
                  </div>
                </div>

                {/* Row 3 (Size + Logo Upload) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-zinc-400">Employee Count Range</label>
                    <div className="relative">
                      <select
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        className={`${textInputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201+">201+ employees</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Logo block upload container */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-zinc-400">Company Logo</label>
                    <div className="flex items-center gap-3 mt-1.5">
                      <label className="w-11 h-11 border border-dashed border-zinc-800 hover:border-zinc-700 bg-zinc-950/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden flex-shrink-0">
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        {logoUrl ? (
                          <img
                            src={logoUrl}
                            alt="Preview Logo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ArrowUpToLine className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                        )}
                      </label>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-zinc-300 truncate">
                          {isUploading ? "Uploading file..." : "Upload image"}
                        </p>
                        <p className="text-[9px] text-zinc-500 font-medium">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    {errors.logo && (
                      <p className="text-[10px] text-red-400 font-semibold">{errors.logo}</p>
                    )}
                  </div>
                </div>

                {/* Description textarea */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-400">Brief Description</label>
                  <textarea
                    name="description"
                    defaultValue={company?.description || ""}
                    placeholder="Tell us about your company's mission and culture..."
                    rows={3}
                    className={textAreaClass}
                  />
                </div>

                {/* Actions footer */}
                <div className="flex justify-end gap-3 pt-5 border-t border-zinc-850">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="h-10 bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-semibold text-xs rounded-xl px-5 transition active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-10 bg-white hover:bg-zinc-200 text-black font-bold text-xs rounded-xl px-6 transition active:scale-[0.98] shadow-md"
                  >
                    Register Company
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
