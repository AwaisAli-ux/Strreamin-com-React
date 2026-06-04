import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Play, Download, ShieldCheck, Lock, RefreshCcw, Cpu, Star,
  Tv, ListMusic, Heart, Headphones, Check, AlertTriangle, FileText,
} from "lucide-react";
import logo from "@/assets/logo.png";
import heroTv from "@/assets/hero-tv.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "SmartCare TV — Premium Media Player for Android TV" },
      {
        name: "description",
        content:
          "SmartCare TV is a premium standalone media player for Android TV. Load your own M3U playlists or Xtream credentials and enjoy a fluid, cinematic interface. No content included.",
      },
      { property: "og:title", content: "SmartCare TV — Premium Media Player" },
      {
        property: "og:description",
        content:
          "Bring your own content. Customize your playlist interface. Pure performance, zero content included.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Legal />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="SmartCare TV logo" width={48} height={48} className="rounded-lg" />
          <span className="font-display font-semibold tracking-tight">SmartCare TV</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#legal" className="hover:text-foreground transition">Legal</a>
        </nav>
        <a
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-full bg-grad-primary px-4 py-2 text-sm font-medium shadow-glow hover:opacity-95 transition"
        >
          Get License
        </a>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-radial-red)]" />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center relative">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-6">
            <span className="inline-block size-1.5 rounded-full bg-primary shadow-glow" />
            Built for Android TV · Fire TV · Smart Devices
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            <span className="text-gradient-red">SmartCare TV</span>
            <br />
            <span className="text-foreground/90">The Ultimate Premium Media Player for Android TV</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Bring your own content, customize your playlist interface, and enjoy a premium, fluid
            navigation system designed for big screens.{" "}
            <span className="text-foreground font-medium">Pure performance, zero content included.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <StoreButton
              title="GET IT ON"
              brand="Google Play"
              icon={<GooglePlayIcon className="size-7" />}
            />
            <StoreButton
              title="AVAILABLE AT"
              brand="Amazon Appstore"
              icon={<AmazonIcon className="size-7" />}
            />
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
              ))}
              <span className="ml-1 text-foreground">4.9</span>
            </div>
            <span>·</span>
            <span>10,000+ active licenses</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 bg-grad-primary opacity-25 blur-3xl rounded-full" />
          <div className="relative rounded-3xl overflow-hidden shadow-elegant glass animate-float">
            <img
              src={heroTv}
              alt="SmartCare TV dashboard mockup on a premium television"
              width={1536}
              height={1024}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}



function StoreButton({
  title, brand, icon,
}: { title: string; brand: string; icon: React.ReactNode }) {
  return (
    <button className="group inline-flex items-center gap-3 rounded-2xl bg-foreground text-background px-5 py-3 hover:bg-foreground/90 transition shadow-card">
      <span className="shrink-0">{icon}</span>
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-widest opacity-70">{title}</span>
        <span className="block text-base font-semibold">{brand}</span>
      </span>
    </button>
  );
}

function GooglePlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#00C3FF" d="M3.6 2.3C3.2 2.6 3 3.1 3 3.8v16.4c0 .7.2 1.2.6 1.5l9.3-9.7L3.6 2.3z" />
      <path fill="#FFCE00" d="M17.6 9.2 14.3 7.3 3.6 2.3l9.3 9.7 4.7-2.8z" />
      <path fill="#FF3A44" d="m21.1 11.1-3.5-1.9-4.7 2.8 4.7 2.8 3.5-1.9c1.1-.6 1.1-1.2 0-1.8z" />
      <path fill="#00E676" d="m12.9 12-9.3 9.7c.4.3.9.3 1.6-.1l12.4-7.2L12.9 12z" />
    </svg>
  );
}

function AmazonIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#FF9900" d="M14.8 13.6c-2.3 1.7-5.6 2.5-8.5 2.5-4 0-7.7-1.5-10.4-4-.2-.2 0-.5.2-.4 2.9 1.7 6.6 2.7 10.3 2.7 2.6 0 5.4-.5 8.1-1.6.4-.2.7.3.3.8z" transform="translate(4 0)"/>
      <path fill="#FF9900" d="M19.6 12.8c-.3-.4-1.9-.2-2.7-.1-.2 0-.3-.2-.1-.3 1.3-.9 3.4-.6 3.7-.3.2.3-.1 2.5-1.3 3.5-.2.2-.4.1-.3-.1.3-.7.9-2.3.7-2.7z"/>
      <path fill="#fff" d="M14 4.5V3.4c0-.2.1-.3.3-.3h5c.2 0 .3.1.3.3v.9c0 .2-.2.4-.4.7l-2.6 3.7c1-0 2 .1 2.9.6.2.1.2.3.3.5v1.1c0 .2-.2.4-.4.3-1.5-.8-3.5-.9-5.2 0-.2.1-.4-.1-.4-.3v-1c0-.2 0-.5.2-.8L17 4.8h-2.7c-.2 0-.3-.1-.3-.3z"/>
    </svg>
  );
}

/* ---------------- FEATURES ---------------- */
function Features() {
  const items = [
    { icon: Tv, title: "Premium EPG Engine", desc: "Sleek electronic program guide with instant catch-up navigation." },
    { icon: ListMusic, title: "Multiple Playlist Support", desc: "Manage unlimited M3U sources and Xtream credentials in one place." },
    { icon: Heart, title: "Favorites Management", desc: "Pin, sort, and organize your channels and groups effortlessly." },
    { icon: Cpu, title: "Hardware Acceleration", desc: "Buttery-smooth 4K decoding on supported Android TV chipsets." },
    { icon: Lock, title: "Local-Only Storage", desc: "Your credentials never leave your device. Zero-logs by design." },
    { icon: Headphones, title: "24/7 Technical Support", desc: "Real engineers ready to help with installation and configuration." },
  ];
  return (
    <section id="features" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Features"
          title="Engineered for the big screen"
          subtitle="A purpose-built player that makes your personal media library feel cinematic."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass bg-grad-card rounded-2xl p-6 shadow-card hover:ring-red-glow transition">
              <div className="size-11 rounded-xl bg-grad-primary grid place-items-center shadow-glow">
                <Icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
        <span className="text-gradient-red">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Download the App",
      desc: "Install SmartCare TV from the official Google Play Store or Amazon Appstore on your device.",
      icon: Download,
    },
    {
      n: "02",
      title: "Load Your Own Sources",
      desc: "Enter your personal, legally owned M3U URL or Xtream credentials (username & password). Everything stays on your device.",
      icon: FileText,
    },
    {
      n: "03",
      title: "Stream & Navigate",
      desc: "Enjoy your personal media library through a high-end, smooth, big-screen interface.",
      icon: Play,
    },
  ];
  return (
    <section id="how" className="py-24 border-t border-border relative">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title="100% transparent. 100% your content."
          subtitle="We sell the player. You bring the content. No streams, no playlists, no media — ever — included or hosted by us."
        />
        <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
          {steps.map(({ n, title, desc, icon: Icon }) => (
            <div key={n} className="relative glass bg-grad-card rounded-3xl p-8 shadow-card">
              <div className="absolute -top-4 left-6 text-xs font-mono px-2 py-1 rounded-md bg-grad-primary shadow-glow">
                STEP {n}
              </div>
              <Icon className="size-8 text-primary" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
type Plan = {
  label: string;
  duration: string;
  highlight?: boolean;
  prices: { devices: number; price: number }[];
};
const plans: Plan[] = [
  {
    label: "1 Month",
    duration: "Monthly License",
    prices: [
      { devices: 1, price: 35 },
      { devices: 2, price: 55 },
      { devices: 3, price: 75 },
      { devices: 4, price: 100 },
    ],
  },
  {
    label: "3 Months",
    duration: "Quarterly License",
    prices: [
      { devices: 1, price: 100 },
      { devices: 2, price: 135 },
      { devices: 3, price: 150 },
      { devices: 4, price: 170 },
    ],
  },
  {
    label: "6 Months",
    duration: "Semi-Annual License",
    highlight: true,
    prices: [
      { devices: 1, price: 180 },
      { devices: 2, price: 210 },
      { devices: 3, price: 240 },
      { devices: 4, price: 260 },
    ],
  },
  {
    label: "1 Year",
    duration: "Annual License",
    prices: [
      { devices: 1, price: 350 },
      { devices: 2, price: 500 },
      { devices: 3, price: 600 },
      { devices: 4, price: 700 },
    ],
  },
];

const planFeatures = [
  "Premium EPG Engine",
  "Favorites List Management",
  "Multiple Playlist Support",
  "Hardware Acceleration",
  "24/7 Technical Support",
];

function Pricing() {
  const [devices, setDevices] = useState<1 | 2 | 3 | 4>(1);
  return (
    <section id="pricing" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <SectionHeader
            eyebrow="Software license plans"
            title="Activate your seats"
            subtitle="Transparent pricing for the SmartCare TV player software. License covers the number of device activations selected."
          />
          <div className="glass rounded-full p-1 flex items-center gap-1 self-start lg:self-end">
            {[1, 2, 3, 4].map((d) => (
              <button
                key={d}
                onClick={() => setDevices(d as 1 | 2 | 3 | 4)}
                className={`px-4 py-2 text-sm rounded-full transition ${
                  devices === d
                    ? "bg-grad-primary shadow-glow text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {d} {d === 1 ? "Device" : "Devices"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => {
            const item = plan.prices.find((p) => p.devices === devices)!;
            return (
              <div
                key={plan.label}
                className={`relative rounded-3xl p-7 shadow-card bg-grad-card glass overflow-hidden ${
                  plan.highlight ? "ring-red-glow" : ""
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-grad-primary rounded-full px-2 py-1 shadow-glow">
                    Most Popular
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{plan.duration}</div>
                <div className="mt-1 text-2xl font-display font-semibold">{plan.label}</div>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-bold text-gradient-red">${item.price}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {devices} device activation{devices > 1 ? "s" : ""}
                </div>
                <ul className="mt-6 space-y-2.5">
                  {planFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-7 w-full rounded-xl py-3 text-sm font-medium transition ${
                    plan.highlight
                      ? "bg-grad-primary shadow-glow hover:opacity-95"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  Activate {plan.label}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-muted-foreground max-w-3xl">
          All prices are for the SmartCare TV player software license only. SmartCare TV does not
          include, host, or provide any media content, channels, or playlists. You must supply your
          own legally acquired sources.
        </p>
      </div>
    </section>
  );
}

/* ---------------- LEGAL ---------------- */
function Legal() {
  const blocks = [
    {
      icon: RefreshCcw,
      title: "7-Day Technical Refund Policy",
      body:
        "We offer a strict 7-day money-back guarantee for technical software malfunctions. If the SmartCare TV application fails to run on your verified hardware and our technical support cannot resolve it, a full refund will be issued. Please note: Refunds are NOT granted for external content source failures, stream lagging caused by third-party playlist providers, or internet connectivity issues.",
    },
    {
      icon: AlertTriangle,
      title: "Strict Anti-Chargeback & Friendly Fraud Policy",
      body:
        "By purchasing a digital license for SmartCare TV, you acknowledge that you are purchasing an intangible software product. You explicitly waive the right to claim unauthorized transactions or dispute charges via your banking institution. Any forced chargeback initiated without first opening a formal technical support ticket will be treated as contractual breach, resulting in immediate, permanent ban of the application license/hardware ID and submission of compliance records to credit card dispute networks.",
    },
    {
      icon: ShieldCheck,
      title: "Privacy & Data Handling",
      body:
        "SmartCare TV operates on a zero-logs, strict privacy model. Your stream credentials, URLs, and authentication keys are processed entirely locally on your device and are never transmitted to, or stored on, our servers.",
    },
  ];
  return (
    <section id="legal" className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Compliance"
          title="Legal, refund & protection policies"
          subtitle="Read carefully before purchase. By completing checkout you agree to all policies below."
        />
        <div className="mt-12 grid lg:grid-cols-3 gap-5">
          {blocks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass bg-grad-card rounded-3xl p-7 shadow-card">
              <div className="size-11 rounded-xl bg-grad-primary grid place-items-center shadow-glow">
                <Icon className="size-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="SmartCare TV" width={48} height={48} className="rounded-lg" />
              <span className="font-display font-semibold">SmartCare TV</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              A premium standalone media player software for Android TV and Fire TV devices.
              Bring your own content. Enjoy a cinematic interface.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Features</a></li>
              <li><a href="#how" className="hover:text-foreground">How it works</a></li>
              <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Legal</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#legal" className="hover:text-foreground">Refund Policy</a></li>
              <li><a href="#legal" className="hover:text-foreground">Anti-Chargeback</a></li>
              <li><a href="#legal" className="hover:text-foreground">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-5 rounded-2xl glass text-xs text-muted-foreground leading-relaxed">
          <span className="text-foreground font-semibold">Disclaimer:</span>{" "}
          SmartCare TV does not supply, host, monetize, or own any digital media content or streams.
          Users must provide their own content sources. SmartCare TV is not affiliated with any
          third-party content providers.
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} SmartCare TV. All rights reserved.</div>
          <div>Software product — intangible digital license.</div>
        </div>
      </div>
    </footer>
  );
}
