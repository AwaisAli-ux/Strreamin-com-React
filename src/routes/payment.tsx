import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, ShieldCheck, RefreshCcw } from "lucide-react";
import logo from "@/assets/logo.png";
import { normalizePlanKey, openPaddleCheckout, PlanConfig, PADDLE_PLANS } from "@/lib/paddle";

export const Route = createFileRoute("/payment")({
  component: DirectPaymentPage,
  head: () => ({
    meta: [
      { title: "Complete Payment — SmartCare TV" },
      { name: "description", content: "Secure Paddle payment for SmartCare TV license." },
    ],
  }),
});

function DirectPaymentPage() {
  const [plan, setPlan] = useState<PlanConfig>(PADDLE_PLANS["6months"]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const emailParam = params.get("email");
    const matched = normalizePlanKey(planParam);
    setPlan(matched);

    // Immediately trigger Paddle checkout
    const openCheckout = (attempt = 0) => {
      if (!window.Paddle) {
        if (attempt < 50) {
          setTimeout(() => openCheckout(attempt + 1), 100);
        }
        return;
      }

      openPaddleCheckout({
        priceId: matched.priceId,
        customerEmail: emailParam || undefined,
      });
    };

    openCheckout();
  }, []);

  const handleReopen = () => {
    openPaddleCheckout({ priceId: plan.priceId });
  };

  return (
    <div className="fixed inset-0 bg-[#0c0d0e] flex flex-col justify-between p-6 z-50 text-foreground overflow-y-auto">
      {/* Top Header */}
      <div className="mx-auto max-w-4xl w-full flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="SmartCare TV" width={32} height={32} className="rounded-lg" />
          <span className="font-display font-semibold text-white text-sm">SmartCare TV</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1 rounded-full">
          <Lock className="size-3" />
          <span>Paddle Verified Payment</span>
        </div>
      </div>

      {/* Center Card */}
      <div className="my-auto mx-auto max-w-md w-full text-center py-8">
        <div className="rounded-3xl p-7 glass bg-card/60 border border-border/80 shadow-2xl">
          <div className="size-12 rounded-full border-2 border-white/10 border-t-emerald-500 animate-spin mx-auto mb-4" />
          
          <h2 className="text-xl font-bold text-white tracking-tight">
            Opening Secure Payment Window
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {plan.name} — <strong className="text-white">${plan.price} USD</strong>
          </p>

          <div className="mt-6 pt-5 border-t border-border/60">
            <button
              onClick={handleReopen}
              className="w-full rounded-xl bg-grad-primary py-3 px-4 text-xs font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition cursor-pointer"
            >
              Click here if payment screen did not open
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>256-bit encrypted · Guest checkout (No signup)</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto max-w-4xl w-full text-center text-xs text-muted-foreground py-2 flex justify-between items-center">
        <span>© {new Date().getFullYear()} SmartCare TV</span>
        <Link to="/checkout" className="text-xs hover:text-white underline">
          Change Plan
        </Link>
      </div>
    </div>
  );
}
