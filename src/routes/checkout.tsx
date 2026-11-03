import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Lock, ShieldCheck, CreditCard } from "lucide-react";
import logo from "@/assets/logo.png";
import { PADDLE_PLANS, normalizePlanKey, openPaddleCheckout, PlanConfig } from "@/lib/paddle";

export const Route = createFileRoute("/checkout")({
  component: SimpleCheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout — SmartCare TV" },
      { name: "description", content: "Complete your SmartCare TV license purchase." },
    ],
  }),
});

function SimpleCheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanConfig>(PADDLE_PLANS["3months"]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const matched = normalizePlanKey(planParam);
    setSelectedPlan(matched);

    // Auto-open checkout if ?open=1 is passed
    if (params.get("open") === "1" || params.get("auto") === "1") {
      setTimeout(() => {
        openPaddleCheckout({ priceId: matched.priceId });
      }, 400);
    }
  }, []);

  const handleCheckout = () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/payment?plan=${selectedPlan.id}`);
    }
    openPaddleCheckout({
      priceId: selectedPlan.priceId,
    });
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground flex flex-col justify-between p-6">
      {/* Top minimal header */}
      <header className="mx-auto max-w-xl w-full flex items-center justify-between py-2">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="SmartCare TV" width={32} height={32} className="rounded-lg" />
          <span className="font-display font-semibold text-white text-sm tracking-tight">
            SmartCare TV
          </span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-full">
          <Lock className="size-3" />
          <span>Secure Checkout</span>
        </div>
      </header>

      {/* Main Single Centered Card */}
      <main className="my-auto mx-auto max-w-md w-full">
        <div className="rounded-3xl p-8 glass bg-card/70 border border-border/80 shadow-2xl text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            Software License
          </div>

          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {selectedPlan.name}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedPlan.billingText} · 1 Device Activation
          </p>

          {/* Big Price */}
          <div className="my-8 py-6 rounded-2xl bg-muted/20 border border-border/40">
            <div className="text-5xl font-black text-gradient-red">
              ${selectedPlan.price}
            </div>
            <div className="text-xs text-muted-foreground mt-1">USD (Total Due)</div>
          </div>

          {/* Big Buy Now Button */}
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full rounded-2xl bg-grad-primary py-4 px-6 text-base font-bold text-primary-foreground shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <CreditCard className="size-5" />
            <span>{isLoading ? "Opening Payment…" : `Buy Now — $${selectedPlan.price}`}</span>
          </button>

          {/* Payment Methods */}
          <div className="mt-6 pt-5 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
              <span className="px-2 py-0.5 rounded bg-muted/50 text-[11px]">Card</span>
              <span className="px-2 py-0.5 rounded bg-muted/50 text-[11px]">Visa</span>
              <span className="px-2 py-0.5 rounded bg-muted/50 text-[11px]">Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-muted/50 text-[11px]">PayPal</span>
              <span className="px-2 py-0.5 rounded bg-muted/50 text-[11px]">Apple Pay</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>Paddle Verified Merchant · No account creation required</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-xl w-full text-center text-xs text-muted-foreground py-2">
        <div>© {new Date().getFullYear()} SmartCare TV. All rights reserved.</div>
      </footer>
    </div>
  );
}
