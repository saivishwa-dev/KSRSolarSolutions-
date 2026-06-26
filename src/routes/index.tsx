import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type HTMLAttributes } from "react";
import {
  Play,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
  ArrowLeft,
  Facebook,
  Twitter,
  Youtube,
  Star,
  Quote,
} from "lucide-react";
import heroHouseDay from "@/assets/hero-house-day.jpg";
import aboutWorker from "@/assets/about-worker.png";
import servicesWorker from "@/assets/services-worker.png";
import projectSolar from "@/assets/project-solar.png";
import projectInverter from "@/assets/project-inverter.jpg";
import projectElectrical from "@/assets/project-electrical.jpg";
import ctaBuilding from "@/assets/cta-building.png";
import iconSolar from "@/assets/icon-solar.png";
import iconInverter from "@/assets/icon-inverter.png";
import iconElectrical from "@/assets/icon-electrical.png";
import Brands from "@/components/ui/Brands";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSR Solar Solutions" },
      {
        name: "description",
        content:
          "KSR Solar Solutions delivers reliable solar panel installation, wind, and renewable energy solutions for homes and businesses.",
      },
    ],
  }),
  component: Index,
});

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-xl font-extrabold ${light ? "text-white" : "text-ink"}`}>KSR</span>
      <span className={`text-xl font-extrabold ${light ? "text-sun" : "text-brand"}`}>Solar</span>
      <span className={`text-xl font-extrabold ${light ? "text-white" : "text-ink"}`}>
        Solutions
      </span>
    </div>
  );
}

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand/95 shadow-lg backdrop-blur-md" : "bg-brand"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="shrink-0">
          <Logo light />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`relative text-sm font-medium transition ${
                  isActive ? "text-sun" : "text-white/90 hover:text-sun"
                }`}
              >
                {s.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-sun transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </div>
        <a
          href={"tel:+918074964919"}
          className="rounded-full bg-sun px-6 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:brightness-95"
          aria-label="Call us"
        >
          Let's Talk
        </a>
      </nav>
    </header>
  );
}

type RevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "up" | "left" | "right" | "zoom";
  delay?: 0 | 100 | 200 | 300 | 400 | 500;
  as?: "div" | "section";
};

function Reveal({ children, variant = "up", delay = 0, className = "", ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const variantClass =
    variant === "left"
      ? "reveal reveal-left"
      : variant === "right"
        ? "reveal reveal-right"
        : variant === "zoom"
          ? "reveal reveal-zoom"
          : "reveal";
  const delayClass = delay ? `delay-${delay}` : "";
  return (
    <div ref={ref} className={`${variantClass} ${delayClass} ${className}`} {...rest}>
      {children}
    </div>
  );
}

function CountUp({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(end * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const WHATSAPP_NUMBER = "(+91) 8074964919";

// ── MAP CONTACT INFO ──────────────────────────────────────────────────────────
const MAP_INFO = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    value: "KSR Solar Solutions, Dasannapeta,\nVizianagaram, AP 535002",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 80749 64919",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "KSRSolarSolutions@gmail.com",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Working Hours",
    value: "Mon – Sat: 9:00 AM – 6:00 PM",
  },
];

function HeroImage() {
  return (
    <div className="relative animate-hero-in">
      <div className="pointer-events-none absolute -inset-6 -z-0 rounded-[2.5rem] bg-gradient-to-tr from-sun/40 via-brand-light/30 to-brand/20 blur-2xl animate-glow-pulse" />
      <div className="relative z-10 w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
        <img
          src={heroHouseDay}
          alt="Modern home powered by KSR Solar Solutions"
          width={1024}
          height={1024}
          className="h-full w-full object-cover animate-kenburns"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.04 2C6.58 2 2.12 6.45 2.12 11.92c0 1.96.51 3.88 1.48 5.57L2 22l5.26-1.38a9.94 9.94 0 004.78 1.21h.01c5.46 0 9.92-4.45 9.92-9.91S17.5 2 12.04 2zm5.46 13.73c-.24.67-1.38 1.28-1.93 1.36-.52.08-1.01.11-1.44-.06-.33-.12-.6-.23-.85-.33a8.2 8.2 0 01-2.66-1.6 7.3 7.3 0 01-1.78-2.2c-.18-.3-.03-.46.13-.61.14-.14.31-.36.47-.54.16-.18.21-.3.31-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.49-.66-.5-.17 0-.36 0-.55 0-.2 0-.51.07-.78.37-.27.3-1.03 1.01-1.03 2.47 0 1.46 1.05 2.87 1.19 3.07.15.2 2.1 3.2 5.08 4.49.58.25 1.04.4 1.39.52.59.19 1.12.16 1.54.1.47-.07 1.45-.59 1.66-1.16.21-.57.21-1.06.14-1.17-.07-.1-.22-.17-.47-.29z" />
    </svg>
  );
}

function WhatsAppButton() {
  const link = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999] flex flex-col items-center gap-2">

      {/* Tooltip label — visible always on desktop, hidden on mobile */}
      <div
        className="
          hidden md:flex
          flex-col items-center
          animate-bounce
        "
        style={{ animationDuration: "2s" }}
      >
        <span
          className="
            bg-white text-[#25D366]
            text-xs font-bold
            px-3 py-1.5
            rounded-full
            shadow-md
            whitespace-nowrap
            border border-[#25D366]/20
          "
        >
          💬 Chat with us!
        </span>
        {/* Arrow pointing down to the button */}
        <svg width="12" height="8" viewBox="0 0 12 8" className="text-white drop-shadow-sm">
          <path d="M6 8L0 0h12z" fill="white" />
        </svg>
      </div>

      {/* Mobile tooltip — shown only on mobile */}
      <div
        className="
          flex md:hidden
          animate-bounce
        "
        style={{ animationDuration: "2s" }}
      >
        <span
          className="
            bg-white text-[#25D366]
            text-[10px] font-bold
            px-2.5 py-1
            rounded-full
            shadow-md
            whitespace-nowrap
            border border-[#25D366]/20
          "
        >
          💬 Tap to chat
        </span>
      </div>

      {/* WhatsApp Circle Button */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          relative
          flex items-center justify-center

          h-14 w-14
          md:h-16 md:w-16

          rounded-full
          bg-[#25D366]
          text-white

          shadow-[0_8px_25px_rgba(37,211,102,0.4)]
          transition-all duration-300
          hover:scale-110
          hover:shadow-[0_14px_40px_rgba(37,211,102,0.6)]

          overflow-hidden
          isolate
          will-change-transform
        "
      >
        {/* Ping ring 1 — clipped safely by overflow-hidden */}
        <span
          className="
            absolute inset-0
            rounded-full
            border-2 border-white/50
            animate-ping
          "
          style={{ animationDuration: "1.5s" }}
        />

        {/* Ping ring 2 — slightly delayed for layered effect */}
        <span
          className="
            absolute inset-0
            rounded-full
            border-2 border-white/20
            animate-ping
          "
          style={{ animationDuration: "2.2s", animationDelay: "0.4s" }}
        />

        <WhatsAppIcon className="relative z-10 h-7 w-7 md:h-8 md:w-8" />
      </a>

      {/* "We reply fast" text below button */}
      <span
        className="
          text-[10px] md:text-xs
          text-gray-500
          font-medium
          whitespace-nowrap
        "
      >
        ⚡ We reply fast
      </span>

    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      {/* spacer for fixed nav */}
      <div className="h-[72px] bg-brand" />

      {/* HERO */}
      <section id="home" className="relative overflow-hidden bg-brand pb-32 scroll-mt-24">
        <div className="relative rounded-b-[40%_15%] bg-[oklch(0.97_0.005_250)] pb-24 pt-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-extrabold leading-[1.05] text-ink md:text-6xl">
                Power Your Future <br />
                With Reliable Solar
                <br /> Solutions
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                At KSR Solar Solutions, we are dedicated to delivering reliable and sustainable
                energy solutions for homes and businesses. Through expert solar installations,
                inverter systems, and electrical services, we help our customers reduce energy
                costs, improve efficiency, and embrace a cleaner, greener future powered by
                renewable energy.
              </p>
              <div className="mt-8 flex items-center gap-6">
                <button className="rounded-md bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-dark">
                  How We Work ?
                </button>
                <button
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/ksr_solar_solutions?igsh=MTJqaTdqaWJldXNqNQ==",
                      "_blank",
                    )
                  }
                  className="group flex items-center gap-3 text-sm font-semibold text-ink"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white transition group-hover:scale-110">
                    <Play className="h-4 w-4 fill-white" />
                  </span>
                  Watch Our Work
                </button>
              </div>
            </div>
            <Reveal variant="right" delay={200} className="relative">
              <div className="absolute -left-6 top-8 h-40 w-40 rounded-full bg-sun/30 blur-3xl" />
              <div className="absolute -right-4 bottom-0 h-32 w-32 rounded-full bg-brand/40 blur-3xl" />
              <HeroImage />
            </Reveal>
          </div>
        </div>

        {/* Services strip */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {[
            {
              icon: iconSolar,
              title: "Solar Panel Installation",
              text: "Expert solar panel installation for residential and commercial properties, delivering clean, reliable, and cost-effective energy solutions for a sustainable future.",
            },
            {
              icon: iconInverter,
              title: "Inverter Installations",
              text: "Professional inverter and battery installation services that provide reliable power backup during outages, ensuring uninterrupted electricity for homes and businesses.",
            },
            {
              icon: iconElectrical,
              title: "Electrical Works",
              text: "Professional electrical services for residential and commercial properties, including wiring, maintenance, safety upgrades to ensure reliable and efficient power systems.",
            },
          ].map((s, i) => (
            <Reveal
              key={s.title}
              delay={(i === 0 ? 0 : i === 1 ? 200 : 400) as 0 | 200 | 400}
              className="group text-center text-white"
            >
              <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/15 transition-all duration-500 group-hover:bg-white/10 group-hover:ring-sun/60 group-hover:shadow-[0_0_40px_oklch(0.86_0.18_95_/_0.4)]">
                <img
                  src={s.icon}
                  alt=""
                  className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-xs leading-relaxed text-white/80">
                {s.text}
              </p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-white transition-all hover:text-sun hover:gap-2.5"
              >
                Learn More <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-brand py-20 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <p className="text-sm font-bold uppercase tracking-wider text-sun">About Us</p>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
              Your Trusted Experts In
              <br />
              Solar & Renewable Energy Solutions
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80">
              KSR Solar Solutions is dedicated to providing professional solar and electrical
              services tailored to the needs of residential and commercial customers. From
              high-performance solar panel installations and efficient inverter systems to
              dependable electrical works, we deliver solutions designed for reliability, savings,
              and sustainability. Our goal is to help customers harness clean energy, lower
              electricity expenses, and build a brighter, energy-efficient future with confidence.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <button className="rounded-md bg-sun px-6 py-3 text-sm font-bold text-ink hover:brightness-95">
                Click for more Details
              </button>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-sun"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <Reveal variant="left" delay={200} className="relative">
            <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-sun/40 blur-3xl" />
            <div className="absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-brand-light/40 blur-3xl" />
            <div className="img-card shine relative ring-2 ring-white/40">
              <img src={aboutWorker} alt="Solar expert" className="w-full" loading="lazy" />
            </div>
            <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl bg-sun px-5 py-4 text-ink shadow-xl">
              <div className="text-2xl font-extrabold">10+</div>
              <div className="text-xs font-semibold">Years on Field</div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-8 px-6 text-center md:grid-cols-4">
          {[
            { n: 50, suffix: "+", l: "Years Experience" },
            { n: 1150, suffix: "+", l: "Projects Completed" },
            { n: 5000, suffix: "+", l: "Happy Customers" },
            { n: 30, suffix: "+", l: "Awards Milestones" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={(i * 100) as 0 | 100 | 200 | 300}>
              <div className="text-4xl font-extrabold text-white md:text-5xl">
                <CountUp end={s.n} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-sun">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES BANNER */}
      <section
        id="services"
        className="relative bg-white py-20 scroll-mt-24"
        style={{ clipPath: "polygon(0 4%, 50% 0, 100% 4%, 100% 96%, 50% 100%, 0 96%)" }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-10 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold text-ink md:text-5xl">
              We Provide The Best Services
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Transform your energy experience with KSR Solar Solutions. We specialize in solar
              installations, inverter systems, and electrical works that help homes and businesses
              achieve lower energy costs, greater reliability, and a cleaner, greener future.
            </p>
            <button className="mt-6 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark">
              For More Details
            </button>
          </div>
          <Reveal variant="right" delay={200} className="relative mx-auto w-full max-w-md">
            <div className="img-card shine">
              <img
                src={servicesWorker}
                alt="Wind turbine expert"
                className="w-full"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="-mt-12 bg-brand pb-20 pt-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-wider text-sun">Recent Projects</p>
          <h2 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">
            Our Latest Projects
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                img: projectSolar,
                title: "Solar Panels Installation",
                text: "Our solar panel projects are designed to provide clean, reliable, and cost-effective energy for homes and businesses. With expert installation and premium-quality components, we help customers reduce electricity costs while embracing a sustainable future.",
              },
              {
                img: projectInverter,
                title: "Inverters Installation",
                text: "Our inverter installation projects are designed to maximize solar system performance through efficient power conversion. We deliver high-quality solutions that ensure stable energy output and long-term savings for homes and businesses.",
              },
              {
                img: projectElectrical,
                title: "Electrical Works",
                text: "Our electrical projects deliver safe, efficient, and dependable power solutions for residential and commercial properties. From wiring and distribution systems to electrical upgrades and maintenance, we ensure every installation meets the highest standards of quality and safety.",
              },
            ].map((p, i) => (
              <Reveal
                key={p.title}
                variant="zoom"
                delay={(i === 0 ? 0 : i === 1 ? 200 : 400) as 0 | 200 | 400}
                className="group"
              >
                <div className="lift overflow-hidden rounded-2xl bg-white shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-sun px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow">
                      Project
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.text}</p>
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-all hover:text-brand hover:gap-3"
                    >
                      More Details <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-all hover:text-sun hover:gap-3"
            >
              View All <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="bg-brand pb-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-wider text-sun">Client Testimonials</p>
          <h2 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">
            What Our Clients Say About Us
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Jyothi Chebolu.",
                text: "I recently had an on-grid solar system installed and I am extremely satisfied with the entire experience. The team was professional knowledgeable and guided me through every step of the process..",
              },
              {
                name: "Udandarao Saisudha.",
                text: "Excellent customer service, professionalism, and quality of work, nothing aspects like technicians who are knowledgeable, These guys work is really perfect with a great quality efficient, and courteous..",
              },
              {
                name: "Harshavardhan Chandaka.",
                text: "Very happy with the quality of service and installation.The installation was neat, and the team ensured the site was clean before leaving. Great customer support and excellent after-sales service..",
              },
            ].map((t, i) => (
              <Reveal key={t.name} delay={(i === 0 ? 0 : i === 1 ? 200 : 400) as 0 | 200 | 400}>
                <div className="lift rounded-2xl border border-white/25 bg-white/[0.04] p-6 text-center text-white/90 backdrop-blur-sm hover:border-sun/60 hover:bg-white/[0.08]">
                  <Quote className="mx-auto h-7 w-7 fill-sun/80 text-sun/80" />
                  <p className="mt-4 text-sm italic leading-relaxed">{t.text}</p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sun to-brand-light ring-2 ring-white/30" />
                    <div className="text-left">
                      <div className="text-sm font-bold">— {t.name}</div>
                      <div className="flex gap-0.5 text-sun">
                        {[...Array(5)].map((_, k) => (
                          <Star key={k} className="h-3 w-3 fill-sun" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button className="text-white/70 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ink hover:brightness-95">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* CTA */}
          <div className="mt-20 grid items-center gap-8 md:grid-cols-2">
            <div className="text-white">
              <p className="text-lg font-semibold">We Are Here To Help You</p>
              <h3 className="mt-3 text-4xl font-extrabold md:text-5xl">
                Any Questions ? Let's Talk
              </h3>
              <button
                onClick={() => (window.location.href = "tel:+918074964919")}
                className="mt-7 rounded-md bg-sun px-7 py-3 text-sm font-bold text-ink hover:brightness-95"
              >
                Contact Us
              </button>
            </div>
            <Reveal variant="right" delay={200} className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-sun/40 to-brand-light/40 blur-2xl" />
              <div className="img-card shine">
                <img
                  src={ctaBuilding}
                  alt="Commercial building with rooftop solar panels"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <Brands />

      {/* ── LOCATION MAP ─────────────────────────────────────────────────────── */}
      <section id="location" className="bg-brand py-24 scroll-mt-24 relative overflow-hidden">
        {/* Decorative ambient glows — matches the rest of the page */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-sun/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-light/20 blur-3xl" />

        <div className="mx-auto max-w-6xl px-6 relative z-10">
          {/* Section heading — same pattern as About / Projects */}
          <Reveal variant="up">
            <p className="text-sm font-bold uppercase tracking-wider text-sun">Our Location</p>
            <h2 className="mt-2 text-4xl font-extrabold text-white md:text-5xl">
              Find Us On The Map
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70">
              Walk in anytime during business hours — our team is always ready to help you plan your
              solar journey.
            </p>
          </Reveal>

          {/* Main card: map + info panel */}
          <div
            className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl
                          grid grid-cols-1 md:grid-cols-[1fr_320px] backdrop-blur-sm"
          >
            {/* ── Google Map iframe ── */}
            <Reveal variant="left" className="relative min-h-[360px] md:min-h-[440px]">
              {/* subtle sun-glow behind the map card */}
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-sun/10 blur-2xl" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d60673.52485230051!2d83.41098249999999!3d18.11338965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a3be53bab73db9d%3A0x48390408503fe634!2sKSR%20INVERTER%20BATTERY%20AND%20SOLAR%20SOLUTIONS%2C%20Dasannapeta%20Dasannapeta%2C%20Ayya%20Koneru%20Area%2C%20Babametta%2C%20Vizianagaram%2C%20Andhra%20Pradesh%20535002!3m2!1d18.1095792!2d83.41992479999999!5e0!3m2!1sen!2sin!4v1782306706888!5m2!1sen!2sin"
                className="h-full w-full"
                style={{ border: 0, minHeight: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="KSR Solar Solutions — Dasannapeta, Vizianagaram"
              />
            </Reveal>

            {/* ── Info panel ── */}
            <Reveal variant="right" delay={200} className="flex flex-col gap-0 bg-black/30 p-7">
              <p className="mb-5 text-base font-extrabold text-white">Contact Details</p>

              {/* Info rows */}
              <div className="flex flex-col gap-4 flex-1">
                {MAP_INFO.map(({ icon, label, value }, i) => (
                  <Reveal
                    key={label}
                    delay={(i * 100) as 0 | 100 | 200 | 300}
                    className="flex items-start gap-3 group"
                  >
                    {/* yellow icon badge */}
                    <div
                      className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center
             rounded-full bg-sun text-black shadow-md
             ring-2 ring-white/10
             transition-all duration-300
             group-hover:scale-110 group-hover:shadow-lg"
                    >
                      {icon}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">
                        {label}
                      </p>

                      <p className="text-sm font-medium text-white whitespace-pre-line leading-relaxed">
                        {value}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Get Directions CTA — matches your sun-button style */}
              <Reveal delay={400} className="mt-7">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=KSR+INVERTER+BATTERY+AND+SOLAR+SOLUTIONS,+Dasannapeta,+Vizianagaram,+Andhra+Pradesh+535002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2
                             rounded-xl bg-sun py-3.5 text-sm font-bold text-ink
                             shadow-md transition-all duration-300
                             hover:brightness-95 hover:shadow-lg hover:gap-3"
                >
                  Get Directions
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </section>
      {/* ── END LOCATION MAP ─────────────────────────────────────────────────── */}

      {/* FOOTER */}
      <footer id="contact" className="bg-white py-16 scroll-mt-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              we're committed to helping you harness the limitless energy of the sun to reduce your
              carbon footprint.
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold text-ink">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand" />
                <span>(+91) 8074964919</span>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://www.google.com/maps?q=18.11109897282576,83.42054561478021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-brand transition-colors"
                  aria-label="Open KSR Solar Solutions location in Google Maps"
                >
                  <MapPin className="h-4 w-4 text-brand" />{" "}
                  <span>Vizianagaram, Andhra Pradesh</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                {" "}
                <Mail className="h-4 w-4 text-brand" />
                <a
                  href="mailto:KSRSolarSolutions@gmail.com"
                  className="hover:text-brand transition-colors"
                >
                  KSRSolarSolutions@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 text-brand" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand"
                >
                  WhatsApp {WHATSAPP_NUMBER}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold text-ink">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-brand">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold text-ink">Follow Us</h4>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-brand hover:text-brand-dark">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand hover:text-brand-dark">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand hover:text-brand-dark">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-border px-6 pt-6 text-sm text-muted-foreground">
          <div className="flex gap-6">
            {["Home", "About", "Projects", "Page", "Blogs", "Contacts"].map((l) => (
              <a key={l} href="#" className="hover:text-brand">
                {l}
              </a>
            ))}
          </div>
          <div>© 2026 KSR Solar Solutions. All Rights Reserved.</div>
        </div>
      </footer>
      <WhatsAppButton />
    </div>
  );
}
