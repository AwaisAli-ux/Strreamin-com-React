import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, ArrowRight, ShieldCheck, Download } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/success")({
  component: SuccessPage,
  head: () => ({
    meta: [
      { title: "Payment Successful — SmartCare TV" },
      { name: "description", content: "Your payment was processed successfully." },
    ],
  }),
});

function SuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="SmartCare TV" width={36} height={36} className="rounded-lg" />
            <span className="font-display font-semibold tracking-tight text-sm sm:text-base">
              SmartCare TV
            </span>
          </Link>
          <div className="text-xs text-muted-foreground">Order Completed</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-2xl px-6 py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="size-20 rounded-full bg-emerald-500/20 text-emerald-400 grid place-items-center mb-6 shadow-glow animate-bounce">
          <CheckCircle2 className="size-10 stroke-[2.5]" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Payment Successful!
        </h1>
        <p className="mt-3 text-base text-muted-foreground max-w-lg">
          Thank you for choosing SmartCare TV. Your license purchase has been processed securely by Paddle.
        </p>

        {/* Info Box */}
        <div className="mt-8 w-full rounded-3xl p-6 glass bg-card border border-border shadow-card text-left space-y-4">
          <div className="flex items-start gap-3.5">
            <Mail className="size-5 text-primary shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                Check Your Email Inbox
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Paddle has automatically sent your official invoice and payment confirmation. Your license activation details will follow shortly.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-start gap-3.5">
            <Download className="size-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                Install SmartCare TV App
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Download the player from Google Play Store or Amazon Appstore onto your Android TV or Fire TV device.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-start gap-3.5">
            <ShieldCheck className="size-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-foreground">
                Need Help with Activation?
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Our support team is available 24/7. Contact us at{" "}
                <a href="mailto:support@smartcaretv.com" className="text-primary font-medium underline">
                  support@smartcaretv.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-grad-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-95 transition"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} SmartCare TV. All rights reserved.</div>
      </footer>
    </div>
  );
}
