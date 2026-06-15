"use client";

import React from "react";
import { Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft, House } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-6 selection:bg-zinc-800">
      <div className="max-w-md w-full text-center p-8 md:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Subtle top amber-to-orange security alert gradient bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

        {/* Shield Alert Badge Icon Wrapper */}
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6 text-amber-400">
          <ShieldExclamation className="w-7 h-7" />
        </div>

        {/* Error Code Flag & Typography */}
        <span className="text-[11px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
          Error 401: Unauthorized
        </span>

        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100 mt-4">
          Access Restricted
        </h1>

        <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
          You do not have the required account permissions or role clearances to
          view this directory block. Please switch profiles or head back to
          secure routes.
        </p>

        {/* Separation Divider */}
        <div className="border-t border-zinc-800/60 my-6 w-full" />

        {/* Action Directives Layout Footer */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => router.back()}
            className="flex-1 h-11 font-semibold rounded-xl text-sm bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 transition duration-200"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>

          <Button
            as={Link}
            href="/"
            className="flex-1 h-11 font-semibold rounded-xl text-sm bg-white hover:bg-zinc-200 text-zinc-950 transition duration-200"
            startContent={<House className="w-4 h-4" />}
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
