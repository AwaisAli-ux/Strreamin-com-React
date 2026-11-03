import { useEffect, useState } from "react";
import { PADDLE_CLIENT_TOKEN, initializePaddle, openPaddleCheckout, normalizePlanKey } from "@/lib/paddle";

// Extend window type to include Paddle
declare global {
  interface Window {
    Paddle?: {
      Initialize: (options: {
        token: string;
        eventCallback?: (event: PaddleEvent) => void;
      }) => void;
      Checkout: {
        open: (options: {
          items?: Array<{ priceId: string; quantity?: number }>;
          transactionId?: string;
          customer?: { email?: string };
          settings?: {
            displayMode?: "overlay" | "inline";
            theme?: "dark" | "light";
            locale?: string;
            successUrl?: string;
          };
        }) => void;
      };
    };
  }
}

export interface PaddleEvent {
  name: string;
  data?: unknown;
}

export function usePaddle() {
  const transactionId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("_ptxn")
      : null;

  const directPlanParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("checkout_plan")
      : null;

  const isCheckoutMode = Boolean(transactionId);
  const [checkoutClosed, setCheckoutClosed] = useState(false);

  useEffect(() => {
    const init = (retries = 0) => {
      if (!window.Paddle) {
        if (retries < 50) {
          setTimeout(() => init(retries + 1), 100);
        }
        return;
      }

      initializePaddle(PADDLE_CLIENT_TOKEN);

      // If legacy ?_ptxn= is present
      if (transactionId) {
        window.Paddle.Checkout.open({ transactionId });
        document.documentElement.style.visibility = "visible";
      }

      // If direct checkout_plan is requested on home URL
      if (directPlanParam) {
        const plan = normalizePlanKey(directPlanParam);
        if (plan) {
          openPaddleCheckout({ priceId: plan.priceId });
        }
      }
    };

    init();
  }, [transactionId, directPlanParam]);

  return { isCheckoutMode, checkoutClosed };
}
