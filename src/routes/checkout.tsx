import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ShieldCheck, Lock, Check, ArrowLeft, CreditCard,
  Sparkles, RefreshCcw, Mail, Headphones
} from "lucide-react";
import logo from "@/assets/logo.png";
import { PADDLE_PLANS, normalizePlanKey, openPaddleCheckout, PlanConfig } from "@/lib/paddle";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Secure Checkout — SmartCare TV License" },
      {
        name: "description",
        content: "Complete your SmartCare TV player license activation via secure Paddle checkout.",
      },
    ],
  }),
});

function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanConfig>(PADDLE_PLANS["6months"]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync plan from URL search parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const planParam = params.get("plan");
      const matched = normalizePlanKey(planParam);
      setSelectedPlan(matched);

      // Pre-fill email if passed in query (e.g. ?email=test@example.com)
      const emailParam = params.get("email");
      if (emailParam) {
        setCustomerEmail(emailParam);
      }

      // Auto-open checkout if ?auto=1 or ?open=1 is passed
      if (params.get("auto") === "1" || params.get("open") === "1") {
        setTimeout(() => {
          openPaddleCheckout({
            priceId: matched.priceId,
            customerEmail: emailParam || undefined,
          });
        }, 500);
      }
    }
  }, []);

  const handleCheckout = () => {
    setIsLoading(true);
    if (typeof window !== "undefined") {
      const emailQuery = customerEmail.trim() ? `&email=${encodeURIComponent(customerEmail.trim())}` : "";
      window.history.pushState({}, "", `/payment?plan=${selectedPlan.id}${emailQuery}`);
    }
    openPaddleCheckout({
      priceId: selectedPlan.priceId,
      customerEmail: customerEmail.trim() || undefined,
    });
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft className="size-4 text-muted-foreground group-hover:text-foreground transition" />
            <img src={logo} alt="SmartCare TV" width={36} height={36} className="rounded-lg" />
            <span className="font-display font-semibold tracking-tight text-sm sm:text-base">
              SmartCare TV
            </span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-full">
            <Lock className="size-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-10 w-full flex-1">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="size-3.5" />
            Official License Checkout
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Complete Your Software License
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Activate your standalone SmartCare TV media player. Instant automated key delivery to your email.
          </p>
        </div>

        {/* Plan Selector Pills */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 rounded-2xl glass max-w-2xl w-full">
            {Object.values(PADDLE_PLANS).map((p) => {
              const active = selectedPlan.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlan(p)}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-medium transition flex flex-col items-center gap-0.5 ${
                    active
                      ? "bg-grad-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <span className="font-semibold">{p.label}</span>
                  <span className="text-[11px] opacity-80">${p.price}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Checkout Card Grid */}
        <div className="grid md:grid-cols-5 gap-6 items-start">
          {/* Plan Details (3 Cols) */}
          <div className="md:col-span-3 rounded-3xl p-7 glass bg-grad-card border border-border shadow-card relative">
            {selectedPlan.popular && (
              <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest bg-grad-primary rounded-full px-2.5 py-1 text-primary-foreground shadow-glow">
                Most Popular
              </div>
            )}
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Selected Package
            </div>
            <h2 className="mt-1 text-2xl font-bold text-foreground">{selectedPlan.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{selectedPlan.billingText}</p>

            <div className="mt-5 pb-5 border-b border-border flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-gradient-red">${selectedPlan.price}</span>
              <span className="text-xs text-muted-foreground">USD / {selectedPlan.duration}</span>
            </div>

            <div className="mt-5">
              <div className="text-xs font-semibold text-foreground/80 mb-3 uppercase tracking-wider">
                What's included in this license:
              </div>
              <ul className="space-y-2.5">
                {selectedPlan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <div className="size-4 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Merchant Guarantee Box */}
            <div className="mt-6 pt-5 border-t border-border/60 flex items-start gap-3 text-xs text-muted-foreground">
              <RefreshCcw className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>7-Day Technical Warranty:</strong> Full refund if software fails on your hardware and support cannot resolve it.
              </span>
            </div>
          </div>

          {/* Payment Action Box (2 Cols) */}
          <div className="md:col-span-2 rounded-3xl p-6 glass bg-card border border-border shadow-card flex flex-col gap-5">
            <div>
              <h3 className="font-semibold text-base text-foreground">Order Summary</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Guest checkout — no password needed.</p>
            </div>

            {/* Price Line Items */}
            <div className="space-y-2 text-sm pt-2 border-t border-border">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{selectedPlan.label} Plan</span>
                <span className="font-semibold">${selectedPlan.price}.00</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Platform Delivery</span>
                <span className="text-emerald-400 font-medium">Instant Free</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-border">
                <span>Total Due</span>
                <span className="text-gradient-red">${selectedPlan.price}.00</span>
              </div>
            </div>

            {/* Optional Customer Email Pre-fill */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground/80 flex items-center gap-1.5">
                <Mail className="size-3 text-muted-foreground" />
                Your Delivery Email (Optional)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-xl bg-background border border-border px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
              <p className="text-[11px] text-muted-foreground">
                Your license key & receipt will be delivered here automatically.
              </p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full rounded-2xl bg-grad-primary py-3.5 px-4 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CreditCard className="size-4" />
              <span>{isLoading ? "Opening Checkout…" : `Buy Now — $${selectedPlan.price}`}</span>
            </button>

            {/* Payment Badges */}
            <div className="pt-2 border-t border-border/70 flex flex-col items-center gap-2">
              <div className="text-[11px] text-muted-foreground text-center">
                Supported payment methods via Paddle:
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                <span className="px-2 py-0.5 rounded bg-muted/60 text-[11px]">Visa</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 text-[11px]">Mastercard</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 text-[11px]">PayPal</span>
                <span className="px-2 py-0.5 rounded bg-muted/60 text-[11px]">Apple Pay</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="rounded-xl p-3 bg-muted/30 border border-border/50 text-[11px] text-muted-foreground flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
              <span>Official Merchant of Record checkout for <strong>smartcaretv.com</strong></span>
            </div>
          </div>
        </div>

        {/* Policy Notice Below */}
        <div className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto space-y-2">
          <p>
            SmartCare TV is a standalone media player tool. No streams, channels, or playlists are hosted or included.
            Questions or support? Reach out anytime at{" "}
            <a href="mailto:support@smartcaretv.com" className="text-primary underline">
              support@smartcaretv.com
            </a>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} SmartCare TV. All rights reserved.</div>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <a href="/#legal" className="hover:text-foreground">Refund Policy</a>
            <a href="/#legal" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
