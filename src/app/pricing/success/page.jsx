import { redirect } from "next/navigation";
import { ArrowRight, Envelope, CircleCheckFill } from "@gravity-ui/icons";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { createSubscription } from "@/lib/actions/subscription";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  // Safety fallback if someone navigates here manually without a token
  if (!session_id) {
    return redirect("/pricing");
  }

  // Retrieve details from Stripe securely on the server
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session?.status;
  const customerEmail = session?.customer_details?.email;

  // FIX 1: Read metadata from the session object, not the status string!
  const metadata = session?.metadata || {};

  // Force redirect back to homepage if checkout is still incomplete or abandoned
  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subInfo = {
      email: customerEmail,
      planId: metadata?.planId || "seeker-free", // Clean fallback wrapper
    };

    // Updates your user table and active subscription state natively
    const result = await createSubscription(subInfo);
    console.log("Subscription Sync Result:", result);
  }

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-6 selection:bg-zinc-800">
      <div className="max-w-md w-full text-center p-8 md:p-10 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

        {/* Animated Checkmark Circle Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400 animate-pulse">
          <CircleCheckFill className="w-8 h-8" />
        </div>

        {/* Header Typography */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-100">
          Payment Successful!
        </h1>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          Thank you for your purchase. Your premium features are now unlocked
          and active on your profile.
        </p>

        {/* Summary Info Container */}
        <div className="bg-zinc-950/50 border border-zinc-800/80 p-5 rounded-xl text-left my-8 space-y-3">
          <div className="flex items-start gap-2.5 text-xs text-zinc-400 leading-normal">
            <Envelope className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
            <p>
              A confirmation receipt and workspace invoice have been dispatched
              to:{" "}
              <span className="text-zinc-200 font-medium break-all">
                {customerEmail}
              </span>
            </p>
          </div>
        </div>

        {/* Action Directives Layout */}
        <div className="space-y-3">
          <Link
            href="/jobs"
            className="inline-flex w-full justify-center items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-bold py-3.5 px-4 rounded-xl text-sm transition shadow-md active:scale-[0.98] group"
          >
            Start Applying Now
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <p className="text-xs text-zinc-500 pt-4 leading-normal">
            Need customized support assistance? Contact our team at{" "}
            <a
              href="mailto:orders@example.com"
              className="text-zinc-400 hover:text-white underline transition decoration-zinc-600"
            >
              orders@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
