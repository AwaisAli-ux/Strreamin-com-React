import { useEffect } from "react";

// Extend window type to include Paddle
declare global {
  interface Window {
    Paddle?: {
      Initialize: (options: { token: string }) => void;
      Checkout: {
        open: (options: { transactionId: string }) => void;
      };
    };
  }
}

/**
 * usePaddle – Initializes Paddle.js globally and automatically opens the
 * checkout overlay when the `?_ptxn=` query parameter is present in the URL.
 *
 * Place this hook in the root layout component so it runs on every page.
 */
export function usePaddle() {
  useEffect(() => {
    const token = import.meta.env.VITE_PADDLE_TOKEN as string | undefined;

    if (!token || token === "REPLACE_WITH_YOUR_PADDLE_CLIENT_TOKEN") {
      console.warn(
        "[Paddle] No valid token found. Set VITE_PADDLE_TOKEN in your .env file."
      );
      return;
    }

    // Wait until the Paddle script has loaded
    const initPaddle = () => {
      if (!window.Paddle) {
        // Retry after a short delay if the script hasn't loaded yet
        setTimeout(initPaddle, 100);
        return;
      }

      // Initialize Paddle with the client token
      window.Paddle.Initialize({ token });

      // Check for the ?_ptxn= parameter and open checkout if found
      const params = new URLSearchParams(window.location.search);
      const transactionId = params.get("_ptxn");

      if (transactionId) {
        window.Paddle.Checkout.open({ transactionId });
      }
    };

    initPaddle();
  }, []);
}
