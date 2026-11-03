import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { normalizePlanKey, openPaddleCheckout } from "@/lib/paddle";

export const Route = createFileRoute("/pay")({
  component: DirectPayPage,
  head: () => ({
    meta: [
      { title: "Direct Checkout — SmartCare TV" },
      { name: "description", content: "Direct payment checkout for SmartCare TV license." },
    ],
  }),
});

function DirectPayPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const emailParam = params.get("email");
    const plan = normalizePlanKey(planParam);

    // Open Paddle Checkout immediately
    const trigger = (attempts = 0) => {
      if (!window.Paddle) {
        if (attempts < 50) {
          setTimeout(() => trigger(attempts + 1), 100);
        }
        return;
      }

      openPaddleCheckout({
        priceId: plan.priceId,
        customerEmail: emailParam || undefined,
      });
    };

    trigger();
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0c0d0e] flex flex-col items-center justify-center text-center p-6 z-50">
      {/* Spinner */}
      <div className="size-12 rounded-full border-3 border-white/10 border-t-primary animate-spin mb-4" />
      <h2 className="text-lg font-semibold text-white tracking-tight">
        Opening Secure Checkout…
      </h2>
      <p className="mt-1 text-xs text-white/50 max-w-xs">
        Connecting to Paddle secure payment gateway. Please wait a moment.
      </p>
      
      {/* Fallback button if popup was closed or blocked */}
      <div className="mt-8">
        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            const plan = normalizePlanKey(params.get("plan"));
            openPaddleCheckout({ priceId: plan.priceId });
          }}
          className="text-xs text-white/60 hover:text-white underline underline-offset-4 cursor-pointer"
        >
          Didn't open? Click here to launch checkout
        </button>
      </div>
    </div>
  );
}
