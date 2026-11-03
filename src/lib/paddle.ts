// Paddle configuration and helper methods

export interface PlanConfig {
  id: "1month" | "3months" | "6months" | "1year";
  name: string;
  label: string;
  duration: string;
  billingText: string;
  price: number;
  priceId: string;
  popular?: boolean;
  features: string[];
}

export const PADDLE_CLIENT_TOKEN =
  (import.meta.env.VITE_PADDLE_TOKEN as string) || "live_9aa678680a904c82d36002553ea";

export const PADDLE_PLANS: Record<string, PlanConfig> = {
  "1month": {
    id: "1month",
    name: "1 MONTH SUBSCRIPTION",
    label: "1 Month",
    duration: "Monthly License",
    billingText: "Billed monthly",
    price: 35,
    priceId: "pri_01m5wqg83jxym4wtbvb78d7vmp",
    features: [
      "1 Device Activation",
      "Premium EPG Engine",
      "Multiple Playlist Support",
      "Favorites List Management",
      "Hardware Acceleration (4K)",
      "24/7 Technical Support",
    ],
  },
  "3months": {
    id: "3months",
    name: "3 MONTHS SUBSCRIPTION",
    label: "3 Months",
    duration: "Quarterly License",
    billingText: "Billed every 3 months",
    price: 100,
    priceId: "pri_01m5wq7p7zatm49myk8tb41bfk",
    features: [
      "1 Device Activation",
      "Premium EPG Engine",
      "Multiple Playlist Support",
      "Favorites List Management",
      "Hardware Acceleration (4K)",
      "24/7 Technical Support",
    ],
  },
  "6months": {
    id: "6months",
    name: "6 MONTH SUBSCRIPTION",
    label: "6 Months",
    duration: "Semi-Annual License",
    billingText: "Billed every 6 months",
    price: 180,
    priceId: "pri_01m5wqf3xsp8krqy45qfq8mpdm",
    popular: true,
    features: [
      "1 Device Activation",
      "Premium EPG Engine",
      "Multiple Playlist Support",
      "Favorites List Management",
      "Hardware Acceleration (4K)",
      "Priority 24/7 Support",
    ],
  },
  "1year": {
    id: "1year",
    name: "1 YEAR SUBSCRIPTION",
    label: "1 Year",
    duration: "Annual License",
    billingText: "Billed yearly",
    price: 350,
    priceId: "pri_01m5wqdfex6pq4p08f4rtp4tmx",
    features: [
      "1 Device Activation",
      "Premium EPG Engine",
      "Multiple Playlist Support",
      "Favorites List Management",
      "Hardware Acceleration (4K)",
      "Priority VIP 24/7 Support",
    ],
  },
};

// Aliases for convenience in URL params (e.g. ?plan=6m, ?plan=6-months, ?plan=yearly)
export function normalizePlanKey(rawKey: string | null | undefined): PlanConfig {
  if (!rawKey) return PADDLE_PLANS["6months"];
  const clean = rawKey.toLowerCase().trim().replace(/[^a-z0-9]/g, "");

  if (clean.includes("1m") || clean.includes("one") || clean.includes("month1")) {
    return PADDLE_PLANS["1month"];
  }
  if (clean.includes("3m") || clean.includes("three")) {
    return PADDLE_PLANS["3months"];
  }
  if (clean.includes("6m") || clean.includes("six") || clean.includes("half")) {
    return PADDLE_PLANS["6months"];
  }
  if (clean.includes("1y") || clean.includes("year") || clean.includes("12m") || clean.includes("annual")) {
    return PADDLE_PLANS["1year"];
  }

  // Check if directly matches a key
  if (PADDLE_PLANS[rawKey]) return PADDLE_PLANS[rawKey];

  // Default to 6 months
  return PADDLE_PLANS["6months"];
}

let isInitialized = false;

export function initializePaddle(token = PADDLE_CLIENT_TOKEN) {
  if (typeof window === "undefined") return;
  if (!window.Paddle) return;
  if (isInitialized) return;

  try {
    window.Paddle.Initialize({
      token,
      eventCallback(event) {
        if (event?.name === "checkout.completed") {
          const successUrl = `${window.location.origin}/success`;
          window.location.href = successUrl;
        }
      },
    });
    isInitialized = true;
  } catch (err) {
    console.error("[Paddle] Initialization error:", err);
  }
}

export function openPaddleCheckout(params: {
  priceId: string;
  customerEmail?: string;
  onClose?: () => void;
}) {
  if (typeof window === "undefined") return;

  const run = (retryCount = 0) => {
    if (!window.Paddle) {
      if (retryCount < 40) {
        setTimeout(() => run(retryCount + 1), 100);
      } else {
        console.error("[Paddle] Script not loaded after timeout.");
      }
      return;
    }

    initializePaddle();

    try {
      window.Paddle.Checkout.open({
        items: [
          {
            priceId: params.priceId,
            quantity: 1,
          },
        ],
        customer: params.customerEmail ? { email: params.customerEmail } : undefined,
        settings: {
          displayMode: "overlay",
          theme: "dark",
          locale: "en",
          successUrl: `${window.location.origin}/success`,
        },
      });
    } catch (err) {
      console.error("[Paddle] Checkout error:", err);
    }
  };

  run();
}
