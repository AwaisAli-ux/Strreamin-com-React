import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { normalizePlanKey, openPaddleCheckout } from "@/lib/paddle";

export const Route = createFileRoute("/payment")({
  component: DirectPaymentPage,
  head: () => ({
    meta: [
      { title: "Checkout" },
      { name: "description", content: "Secure Checkout" },
    ],
  }),
});

function DirectPaymentPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pure neutral dark background, no trace of website
    document.documentElement.style.background = "#0e1015";
    document.body.style.background = "#0e1015";

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const emailParam = params.get("email");
    const matched = normalizePlanKey(planParam);

    // Open Paddle Checkout modal directly with zero website traces
    const openCheckout = (attempt = 0) => {
      if (!window.Paddle) {
        if (attempt < 80) {
          setTimeout(() => openCheckout(attempt + 1), 50);
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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#0e1015",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Minimal neutral spinner while Paddle modal loads */}
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255, 255, 255, 0.08)",
          borderTop: "3px solid #00c3ff",
          borderRadius: "50%",
          animation: "payment-spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes payment-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
