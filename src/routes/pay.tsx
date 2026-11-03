import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { normalizePlanKey, openPaddleCheckout } from "@/lib/paddle";

export const Route = createFileRoute("/pay")({
  component: DirectPayPage,
  head: () => ({
    meta: [
      { title: "Checkout" },
      { name: "description", content: "Secure Checkout" },
    ],
  }),
});

function DirectPayPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.style.background = "#0e1015";
    document.body.style.background = "#0e1015";

    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const emailParam = params.get("email");
    const plan = normalizePlanKey(planParam);

    const trigger = (attempts = 0) => {
      if (!window.Paddle) {
        if (attempts < 80) {
          setTimeout(() => trigger(attempts + 1), 50);
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
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255, 255, 255, 0.08)",
          borderTop: "3px solid #00c3ff",
          borderRadius: "50%",
          animation: "pay-spin 0.8s linear infinite",
        }}
      />
      <style>{`
        @keyframes pay-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
