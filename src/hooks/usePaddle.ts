import { useEffect, useState } from "react";

// Extend window type to include Paddle
declare global {
  interface Window {
    Paddle?: {
      Initialize: (options: { token: string; eventCallback?: (event: PaddleEvent) => void }) => void;
      Checkout: {
        open: (options: { transactionId: string }) => void;
      };
    };
  }
}

interface PaddleEvent {
  name: string;
  data?: unknown;
}

/**
 * usePaddle – Initializes Paddle.js globally and automatically opens the
 * checkout overlay when the `?_ptxn=` query parameter is present in the URL.
 *
 * Returns `isCheckoutMode: true` immediately (synchronously) when `?_ptxn=`
 * is detected, so the parent can render a blocking overlay before the website
 * content becomes visible.
 */
export function usePaddle() {
  // Detect ?_ptxn= synchronously on first render (no useEffect delay)
  const transactionId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("_ptxn")
      : null;

  const isCheckoutMode = Boolean(transactionId);

  // Once checkout closes, we can lift the overlay
  const [checkoutClosed, setCheckoutClosed] = useState(false);

  useEffect(() => {
    const token = import.meta.env.VITE_PADDLE_TOKEN as string | undefined;

    if (!token || token === "REPLACE_WITH_YOUR_PADDLE_CLIENT_TOKEN") {
      console.warn(
        "[Paddle] No valid token found. Set VITE_PADDLE_TOKEN in your .env file."
      );
      return;
    }

    // Wait until the Paddle script has fully loaded
    const initPaddle = () => {
      if (!window.Paddle) {
        setTimeout(initPaddle, 50);
        return;
      }

      // Initialize Paddle with the client token
      window.Paddle.Initialize({
        token,
        eventCallback(event: PaddleEvent) {
          // When checkout is dismissed/closed, reveal the website
          if (
            event.name === "checkout.closed" ||
            event.name === "checkout.completed"
          ) {
            setCheckoutClosed(true);
          }
        },
      });

      // Open checkout immediately if transaction ID is in URL
      if (transactionId) {
        window.Paddle.Checkout.open({ transactionId });
        // Restore visibility now that Paddle's own overlay is taking over
        document.documentElement.style.visibility = "visible";
      }
    };

    initPaddle();
  }, [transactionId]);

  return { isCheckoutMode, checkoutClosed };
}
