"use client";

import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Airplane,
  ArrowUpRight,
  BellFill,
  ChartBarFill,
  ChevronLeft,
  ChevronRight,
  CubeBoxFill,
  FaceID,
  FolderFill,
  LockFill,
  LockShieldFill,
  MoonFill,
  Person2Fill,
  Qrcode,
  SunMaxFill,
  Timer,
} from "./SFIcon";
import { TestFlightQR } from "./TestFlightQR";
import { TESTFLIGHT_URL } from "./testflight";

import { useTheme } from "@/components/ThemeProvider";
import {
  AlarmRingingScreen,
  AppLockScreen,
  Bar,
  CalendarScreen,
  HomeFan,
  HomeScreen,
  IslandCompact,
  IslandExpanded,
  LiquidGlassDefs,
  LockScreenActivity,
  PatientsScreen,
  PhoneFrame,
  ReportScreen,
  SummaryCardLarge,
  Z,
} from "./DeviceMockups";

/* --------------------------------------------------------------------------
   Motion helpers — springs, not timed curves. Everything that moves on this
   page is critically damped (no overshoot): nothing here was flicked, so
   nothing should bounce. `bounce: 0` + `duration` is Motion's damping +
   response pair. Under Reduce Motion, MotionConfig drops the travel and keeps
   the cross-fade.
   -------------------------------------------------------------------------- */

/** Critically damped, 0.6 s response: section content settling into place. */
const SETTLE = { type: "spring", bounce: 0, duration: 0.6 } as const;
/** Snappier (0.35 s) for small controls. */
const SNAP = { type: "spring", bounce: 0, duration: 0.35 } as const;

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ ...SETTLE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="ziva-eyebrow">{children}</p>;
}

function Headline({
  children,
  sub,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  sub?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizing = size === "lg" ? "text-[clamp(2.1rem,5.2vw,3.6rem)]" : "text-[clamp(1.9rem,4.4vw,3.1rem)]";
  return (
    <h2 className={`ziva-headline mt-3 ${sizing} ${className}`} style={{ color: Z.ink }}>
      {children}
      {sub && (
        <>
          <br />
          <span style={{ color: Z.secondary }}>{sub}</span>
        </>
      )}
    </h2>
  );
}

/* --------------------------------------------------------------------------
   Nav
   -------------------------------------------------------------------------- */

const navLinks = [
  { href: "#highlights", label: "Overview" },
  { href: "#today", label: "Today" },
  { href: "#alarms", label: "Alarms" },
  { href: "#care", label: "Care" },
  { href: "#privacy", label: "Privacy" },
  { href: "#design", label: "Design" },
  { href: "#specs", label: "Specs" },
  { href: "#beta", label: "Beta" },
];

/** External link to the TestFlight invite; opens in a new tab. */
function TestFlightLink({
  className = "ziva-pill",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={TESTFLIGHT_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${dark ? "light" : "dark"} appearance`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors"
      style={{ color: Z.secondary, background: "color-mix(in srgb, var(--z-ink) 6%, transparent)" }}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={SNAP}
        className="inline-flex"
      >
        {dark ? <SunMaxFill size={15} strokeWidth={2.2} /> : <MoonFill size={15} strokeWidth={2.2} />}
      </motion.span>
    </button>
  );
}

function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  // The bar's edge only appears once content is actually underneath it.
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <header className="fixed top-0 inset-x-0 z-50 ziva-nav" data-scrolled={scrolled}>
      <div className="mx-auto max-w-6xl px-5 h-12 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <Image src="/projects/ziva/AppLogo.svg" alt="" width={20} height={20} aria-hidden />
          <span className="text-[0.8125rem] font-semibold tracking-tight" style={{ color: Z.ink }}>
            Ziva Meds
          </span>
          <span className="ziva-badge ziva-tint-sky hidden sm:inline-flex" style={{ height: 20, fontSize: 10.5 }}>
            BETA
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="ziva-navlink ziva-small text-[0.75rem] font-medium">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeSwitch />
          <Link href="/#projects" className="ziva-navlink inline-flex items-center gap-1 text-[0.75rem] font-medium">
            <ChevronLeft size={13} />
            Portfolio
          </Link>
          <TestFlightLink className="ziva-pill ziva-pill--sm">
            <Airplane size={14} />
            Join the beta
          </TestFlightLink>
        </div>
      </div>
      <motion.div className="h-[2px] ziva-progressbar" style={{ scaleX }} />
    </header>
  );
}

/* --------------------------------------------------------------------------
   Hero
   -------------------------------------------------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Scroll-linked parallax is vestibular; it is switched off under Reduce Motion.
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const ySide = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { ...SETTLE, duration: 0.8, delay },
  });

  return (
    <section ref={ref} className="ziva-hero relative overflow-hidden pt-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-5 text-center">
        {/* The logo materialises — blur and scale resolve together — rather than just fading. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 12, filter: "blur(14px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ ...SETTLE, duration: 0.9 }}
          className="inline-block"
        >
          <Image
            src="/projects/ziva/AppLogo.svg"
            alt="Ziva Meds logo"
            width={100}
            height={100}
            priority
            className="drop-shadow-[0_12px_30px_rgba(102,181,224,0.35)]"
          />
        </motion.div>

        <motion.div {...fade(0.1)} className="mt-6 flex items-center justify-center gap-3">
          <h1 className="ziva-display text-[clamp(2.75rem,9vw,6rem)]" style={{ color: Z.ink }}>
            Ziva Meds
          </h1>
          <span className="ziva-badge ziva-tint-sky mt-2 md:mt-4" style={{ height: 28, fontSize: 13 }}>
            BETA
          </span>
        </motion.div>

        <motion.p
          {...fade(0.2)}
          className="ziva-headline mt-3 text-[clamp(1.35rem,3.4vw,2.25rem)]"
          style={{ color: Z.chartInk }}
        >
          Every dose. Everyone you care for.
        </motion.p>

        <motion.p {...fade(0.3)} className="mx-auto mt-6 max-w-[36rem] text-[1.0625rem] md:text-[1.1875rem] leading-relaxed" style={{ color: Z.secondary }}>
          A native iOS medication manager for caregivers. Schedules, inventory,
          appointments and adherence for every person in your care, with alarms
          that ring through Focus, a Live Activity that counts down to the dose,
          and a database that never leaves the phone.
        </motion.p>

        <motion.div {...fade(0.4)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TestFlightLink>
            <Airplane size={17} />
            Join the beta on TestFlight
          </TestFlightLink>
          <a href="#highlights" className="ziva-pill ziva-pill--secondary">
            See what&rsquo;s inside
            <ChevronRight size={16} />
          </a>
        </motion.div>

        <motion.p {...fade(0.5)} className="mt-6 text-[0.75rem] font-medium uppercase tracking-[0.14em]" style={{ color: Z.placeholder }}>
          Free public beta · Version 1.3 · iOS 26.1 or later · iPhone and iPad
        </motion.p>

        <div className="relative mt-12 md:mt-16 flex items-end justify-center gap-5 md:gap-8">
          <motion.div
            style={{ y: ySide }}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SETTLE, duration: 0.9, delay: 0.5 }}
            className="hidden md:block translate-y-12 -rotate-[4deg]"
          >
            <PhoneFrame size="sm">
              <PatientsScreen />
            </PhoneFrame>
          </motion.div>

          <motion.div
            style={{ y, scale }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SETTLE, duration: 0.9, delay: 0.35 }}
            className="ziva-device-glow relative isolate z-10"
          >
            <PhoneFrame>
              <HomeScreen />
            </PhoneFrame>
          </motion.div>

          <motion.div
            style={{ y: ySide }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...SETTLE, duration: 0.9, delay: 0.5 }}
            className="hidden md:block translate-y-12 rotate-[4deg]"
          >
            <PhoneFrame size="sm">
              <ReportScreen />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
      <div className="h-16 md:h-24" />
    </section>
  );
}

/* --------------------------------------------------------------------------
   Highlights
   -------------------------------------------------------------------------- */

const highlights = [
  {
    icon: BellFill,
    tint: "ziva-tint-sky",
    title: "AlarmKit alarms",
    body: "Full-screen system alarms that ring through silent mode and Focus. Medications due at the same time ring once, as a group.",
  },
  {
    icon: Timer,
    tint: "ziva-tint-mint",
    title: "Live Activity & Dynamic Island",
    body: "A countdown before every dose, five minutes by default, with Take Now, Later and Skip on the Lock Screen and in the Dynamic Island.",
  },
  {
    icon: Person2Fill,
    tint: "ziva-tint-sky",
    title: "Everyone in your care",
    body: "A card for each person: portrait, relationship, today's doses and last week's adherence. Including yourself.",
  },
  {
    icon: CubeBoxFill,
    tint: "ziva-tint-peach",
    title: "Inventory that counts down",
    body: "Every logged dose decrements the pack. A refill card appears on Home before it runs out, with a one-tap Refill.",
  },
  {
    icon: ChartBarFill,
    tint: "ziva-tint-mint",
    title: "Reports a doctor can read",
    body: "A Swift Charts trend over the previous period, a per-medication breakdown and an A4 PDF to share.",
  },
  {
    icon: LockFill,
    tint: "ziva-tint-sky",
    title: "Private by design",
    body: "On-device SwiftData, App Lock with Face ID, names hidden in alerts by default, a privacy shield in the app switcher and passphrase-encrypted backups.",
  },
];

function Highlights() {
  return (
    <section id="highlights" className="py-24 md:py-32 scroll-mt-14">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>Get the highlights</Eyebrow>
          <Headline size="lg" sub="the pill box.">
            Built for the person holding
          </Headline>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={(i % 3) * 0.08}>
              <div className="ziva-card ziva-card--lift h-full p-7">
                <span className={`ziva-tile ${h.tint} mb-5`}>
                  <h.icon size={22} strokeWidth={2.1} />
                </span>
                <h3 className="text-[1.0625rem] font-semibold tracking-tight" style={{ color: Z.ink }}>
                  {h.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed" style={{ color: Z.secondary }}>
                  {h.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Feature section — copy beside a device
   -------------------------------------------------------------------------- */

function FeatureSection({
  id,
  eyebrow,
  title,
  subtitle,
  body,
  points,
  device,
  flip = false,
  band = false,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  body: ReactNode;
  points: string[];
  device: ReactNode;
  flip?: boolean;
  band?: boolean;
}) {
  return (
    <section
      id={id}
      className="py-24 md:py-32 scroll-mt-14"
      style={band ? { background: Z.card } : undefined}
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <Reveal className={flip ? "md:order-2" : ""}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline sub={subtitle}>{title}</Headline>
            <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
              {body}
            </p>
            <ul className="mt-7 space-y-3.5">
              {points.map((p) => (
                <li key={p} className="flex gap-3 text-[0.96875rem]" style={{ color: Z.ink }}>
                  <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: Z.chartMint }} />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className={flip ? "md:order-1" : ""}>
            <div className="flex justify-center">{device}</div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Alarms — Live Activity, the ring, the Dynamic Island, the timings
   -------------------------------------------------------------------------- */

const timings = [
  {
    k: "5 min",
    t: "Pre-alert",
    d: "A Live Activity counts down to the dose on the Lock Screen, with Take Now, Later and Skip before anything rings. Five minutes by default; Off, 10 or 15 in Settings.",
  },
  {
    k: "30 s",
    t: "Ring",
    d: "An unanswered alarm stops after thirty seconds instead of running forever.",
  },
  {
    k: "60 s × 5",
    t: "Auto-snooze",
    d: "A watchdog re-arms the dose as a countdown, after a minute and up to five times by default, then leaves it overdue on Home. Both are settings.",
  },
  {
    k: "5 min",
    t: "Snooze",
    d: "Snooze on the alarm parks the dose for five minutes. The weekly alarm itself stays armed.",
  },
];

function Alarms() {
  return (
    <section id="alarms" className="py-24 md:py-32 scroll-mt-14" style={{ background: Z.card }}>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>Alarms, not notifications</Eyebrow>
          <Headline size="lg" sub="An alarm isn’t.">
            A notification is easy to miss.
          </Headline>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
            Every schedule is registered with AlarmKit, so iOS rings it like a
            clock alarm: full screen, full volume, through silent mode and
            Focus. Five minutes before, by default, a Live Activity starts counting down, so
            a dose can be logged from the Lock Screen or the Dynamic Island
            without ever opening the app. Every button is an App Intent
            attached to the alarm itself.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-12 md:grid-cols-[1fr_auto_auto_1fr] md:gap-8">
          <div className="hidden md:block" />
          <Reveal className="flex flex-col items-center gap-5">
            <PhoneFrame statusInk="#ffffff" screenClassName="ziva-lock">
              <LockScreenActivity />
            </PhoneFrame>
            <p className="text-[0.8125rem] font-medium" style={{ color: Z.secondary }}>
              Lock Screen · pre-alert · names shown
            </p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col items-center gap-5">
            <PhoneFrame statusInk="#ffffff" screenStyle={{ background: "#15171a" }}>
              <AlarmRingingScreen />
            </PhoneFrame>
            <p className="text-[0.8125rem] font-medium" style={{ color: Z.secondary }}>
              Ringing with the app open
            </p>
          </Reveal>
          <div className="hidden md:block" />
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-20 max-w-4xl rounded-[28px] p-8 md:p-10" style={{ background: Z.ground }}>
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <Eyebrow>Dynamic Island</Eyebrow>
                <h3 className="ziva-headline mt-3 text-[clamp(1.5rem,3vw,2rem)]" style={{ color: Z.ink }}>
                  The countdown follows you
                  <br />
                  <span style={{ color: Z.secondary }}>out of the app.</span>
                </h3>
                <p className="mt-4 max-w-[30rem] text-[0.96875rem] leading-relaxed" style={{ color: Z.secondary }}>
                  Compact, it shows the logo and the time left. Expanded, it
                  carries the same buttons as the Lock Screen. A snooze adds
                  pause, resume and cancel, and the ring that ends it is drawn
                  by the system, so the app never has to be running.
                </p>
              </div>
              <div className="flex flex-col items-center gap-5">
                <IslandCompact />
                <IslandExpanded />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timings.map((s) => (
              <div key={s.t} className="rounded-[24px] p-6" style={{ background: Z.ground }}>
                <p className="ziva-headline text-[2rem] tabular-nums" style={{ color: Z.chartInk }}>
                  {s.k}
                </p>
                <p className="mt-1 text-[0.9375rem] font-semibold" style={{ color: Z.ink }}>
                  {s.t}
                </p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed" style={{ color: Z.secondary }}>
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-[42rem] text-center text-[0.875rem] leading-relaxed" style={{ color: Z.placeholder }}>
            Alarms are re-armed at every launch, so a schedule that failed to
            register heals itself instead of staying silent. Decisions made
            from the Lock Screen are parked by the intent and drained into
            SwiftData the next time the app comes forward. Snooze on Home gives
            fifteen minutes and falls back to a notification with Take, Snooze
            and Skip if AlarmKit refuses. With Hide names in alerts, the
            default, everything shown here outside the app reads
            &ldquo;Medication&rdquo; instead.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Privacy — the app's dark mode, as a band
   -------------------------------------------------------------------------- */

const privacyPoints = [
  {
    icon: FaceID,
    title: "App Lock",
    body: "Face ID, Touch ID or the passcode whenever the app comes back from the background. A shield window always covers the app-switcher snapshot, locked or not, and alarms keep ringing while locked.",
  },
  {
    icon: BellFill,
    title: "Discreet alerts",
    body: "Hide names in alerts is on by default: notifications, the system alarm, the Live Activity and a paired watch say “Medication” and never name the patient. The mockups above show it turned off.",
  },
  {
    icon: LockShieldFill,
    title: "Encrypted backups",
    body: "An optional passphrase is stretched with PBKDF2-HMAC-SHA256 at 600,000 iterations and seals the backup with AES-GCM, fresh nonce per file. There is no recovery, by design.",
  },
  {
    icon: FolderFill,
    title: "Exports that don’t linger",
    body: "CSV and PDF exports are written with complete file protection and purged as soon as the share sheet or report preview closes. Logs redact every name outside a debugger.",
  },
];

function Privacy() {
  return (
    <section id="privacy" className="ziva-dark py-28 md:py-36 scroll-mt-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <span className="ziva-tile ziva-tint-mint mb-7" style={{ width: 56, height: 56, borderRadius: 18 }}>
              <LockFill size={24} strokeWidth={2.1} />
            </span>
            <Headline size="lg" sub="stays on the phone.">
              Health data this personal
            </Headline>
            <p className="mt-7 max-w-[36rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
              No account, no backend, no analytics SDK. Patients, medications,
              dose logs and appointments live in a local SwiftData store under
              iOS Data Protection. Nothing is uploaded, because there is
              nowhere to upload it to.
            </p>

            <div className="mt-10 space-y-3">
              {privacyPoints.map((p) => (
                <div key={p.title} className="flex gap-4 rounded-[24px] p-5" style={{ background: Z.card }}>
                  <span className="ziva-tile ziva-tint-sky" style={{ width: 44, height: 44, borderRadius: 14 }}>
                    <p.icon size={20} strokeWidth={2.1} />
                  </span>
                  <div>
                    <p className="text-[1rem] font-semibold" style={{ color: Z.ink }}>
                      {p.title}
                    </p>
                    <p className="mt-1 text-[0.90625rem] leading-relaxed" style={{ color: Z.secondary }}>
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center">
            <div className="ziva-device-glow relative isolate">
              <PhoneFrame>
                <AppLockScreen />
              </PhoneFrame>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] sm:grid-cols-3" style={{ background: Z.divider }}>
            {[
              { k: "0", l: "Servers contacted" },
              { k: "600k", l: "Key-derivation iterations" },
              { k: "100%", l: "Stored on device" },
            ].map((s) => (
              <div key={s.l} className="px-6 py-9" style={{ background: Z.ground }}>
                <p className="ziva-headline text-[2.6rem] tabular-nums" style={{ color: Z.chartInk }}>
                  {s.k}
                </p>
                <p className="mt-1 text-[0.875rem]" style={{ color: Z.secondary }}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Design — tokens, both appearances, four icons
   -------------------------------------------------------------------------- */

const swatches = [
  { name: "Sky", tint: Z.skyTint, ink: Z.skyInk, note: "medication tiles" },
  { name: "Mint", tint: Z.mintTint, ink: Z.mintInk, note: "you, wellness" },
  { name: "Peach", tint: Z.peachTint, ink: Z.peachInk, note: "needs attention" },
];

const icons = [
  { file: "AppIcon.png", name: "Default" },
  { file: "AppIcon-Mint.png", name: "Mint" },
  { file: "AppIcon-Dark.png", name: "Dark" },
  { file: "AppIcon-Mono.png", name: "Mono" },
];

function Design() {
  return (
    <section id="design" className="py-24 md:py-32 scroll-mt-14">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-3xl">
          <Eyebrow>Design</Eyebrow>
          <Headline size="lg" sub="on native Liquid Glass.">
            Rebuilt for iOS 26,
          </Headline>
          <p className="mt-6 max-w-[40rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
            Version 1.3 is a ground-up redesign: the system tab bar, navigation
            bars and sheet chrome, over a token set where every text colour
            clears WCAG AA on the surface it is meant for. A tint always pairs
            with its ink, and one colour means one thing: mint for taken, peach
            for attention, sky for what is still ahead.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="ziva-light rounded-[28px] p-5 md:p-6">
              <p className="mb-4 text-[0.8125rem] font-semibold" style={{ color: Z.secondary }}>
                Light
              </p>
              <SummaryCardLarge />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="ziva-dark rounded-[28px] p-5 md:p-6">
              <p className="mb-4 text-[0.8125rem] font-semibold" style={{ color: Z.secondary }}>
                Dark
              </p>
              <SummaryCardLarge />
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="ziva-card h-full p-7">
              <p className="text-[1.0625rem] font-semibold" style={{ color: Z.ink }}>
                Tint and ink
              </p>
              <p className="mt-1.5 text-[0.90625rem] leading-relaxed" style={{ color: Z.secondary }}>
                Three surface tints, each with the one text colour allowed on it. The same
                tokens darken in Dark Mode without a single view changing.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {swatches.map((s) => (
                  <div key={s.name} className="rounded-[20px] p-4" style={{ background: s.tint, color: s.ink }}>
                    <p className="text-[0.9375rem] font-semibold">{s.name}</p>
                    <p className="mt-0.5 text-[0.75rem] opacity-80">{s.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { name: "Chart mint", c: Z.chartMint, note: "taken, adherence" },
                  { name: "Sky", c: Z.sky, note: "doses today, toggles" },
                  { name: "Ink", c: Z.ink, note: "one prominent button" },
                ].map((m) => (
                  <div key={m.name} className="flex items-center gap-3">
                    <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: m.c }} />
                    <div className="min-w-0">
                      <p className="text-[0.8125rem] font-semibold truncate" style={{ color: Z.ink }}>
                        {m.name}
                      </p>
                      <p className="text-[0.71875rem] truncate" style={{ color: Z.secondary }}>
                        {m.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[0.8125rem] font-medium" style={{ color: Z.secondary }}>
                  Adherence · hatched, grows in once
                </p>
                <div className="mt-2">
                  <Bar value={0.94} height={26} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="ziva-card h-full p-7">
              <p className="text-[1.0625rem] font-semibold" style={{ color: Z.ink }}>
                Four icons, one mark
              </p>
              <p className="mt-1.5 text-[0.90625rem] leading-relaxed" style={{ color: Z.secondary }}>
                Chosen in Settings › Appearance, next to Light, Dark or System and
                a Dynamic Type size from Extra Small to XXL.
              </p>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {icons.map((ic) => (
                  <div key={ic.name} className="flex flex-col items-center gap-2">
                    <Image
                      src={`/projects/ziva/${ic.file}`}
                      alt={`${ic.name} app icon`}
                      width={80}
                      height={80}
                      className="w-full max-w-[80px] rounded-[22%] shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]"
                    />
                    <span className="text-[0.75rem] font-medium" style={{ color: Z.secondary }}>
                      {ic.name}
                    </span>
                  </div>
                ))}
              </div>
              <ul className="mt-7 space-y-3">
                {[
                  "Bars and charts grow in with one spring and snap to new values; every dose decision has a haptic.",
                  "Zoom transition from a patient's card into their detail, a sliding capsule between report periods.",
                  "Everything honours Reduce Motion: fills appear in place, the alarm icon stops pulsing.",
                ].map((p) => (
                  <li key={p} className="flex gap-3 text-[0.90625rem]" style={{ color: Z.ink }}>
                    <span className="mt-[9px] h-[6px] w-[6px] shrink-0 rounded-full" style={{ background: Z.chartMint }} />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Numbers strip
   -------------------------------------------------------------------------- */

function Numbers() {
  const stats = [
    { k: "28", l: "Alarm tones" },
    { k: "9", l: "Medication forms" },
    { k: "6", l: "SwiftData model types" },
    { k: "90", l: "Days of adherence history" },
  ];
  return (
    <section className="py-20 md:py-24" style={{ background: Z.card }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.06}>
              <div className="pt-6" style={{ borderTop: `1px solid ${Z.divider}` }}>
                <p className="ziva-display text-[clamp(2.5rem,6vw,3.5rem)] tabular-nums" style={{ color: Z.chartInk }}>
                  {s.k}
                </p>
                <p className="mt-1 text-[0.9375rem]" style={{ color: Z.secondary }}>
                  {s.l}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Tech specs
   -------------------------------------------------------------------------- */

const specs: { label: string; value: ReactNode }[] = [
  { label: "Platform", value: "iOS 26.1 or later · iPhone and iPad · Swift 6, SwiftUI" },
  {
    label: "Persistence",
    value:
      "SwiftData with six @Model types — Patient, Medication, MedicationSchedule, Inventory, DoseLog, Appointment — with cascade deletes. A store that can't be opened is moved aside and the user told, never deleted.",
  },
  {
    label: "Alarms",
    value:
      "AlarmKit weekly schedules with a derived companion id per schedule, so a pending snooze can be found and cancelled from any process. Co-timed schedules share one alarm; an auto-snooze watchdog re-rings after a pause and up to a count set in Settings (one minute, five times by default), as is the heads-up countdown; everything is re-armed at launch.",
  },
  {
    label: "Live Activities",
    value:
      "ActivityKit alarm attributes drawn by a WidgetKit extension in countdown, paused and alerting states, on the Lock Screen and in all three Dynamic Island sizes. Take Now, Later, Skip, pause, resume and cancel are App Intents shared between the app and the extension.",
  },
  {
    label: "Notifications",
    value:
      "UserNotifications categories for dose, pre-dose, appointment and refill reminders, with Take, Snooze and Skip actions on dose reminders, used as the fallback when AlarmKit is denied. Every alert hides patient and medication names unless the setting is turned off.",
  },
  {
    label: "Charts & reports",
    value:
      "Swift Charts line marks with Catmull-Rom interpolation, this period over the last; day, week and month buckets for 7, 30 and 90 days; an A4 PDF rendered from the same SwiftUI views; CSV export of everything.",
  },
  {
    label: "Security",
    value:
      "LocalAuthentication App Lock behind a shield window above every scene, CryptoKit AES-GCM with CommonCrypto PBKDF2 for backups, complete file protection on exports, a privacy manifest, and os.log with private redaction.",
  },
  {
    label: "Interface",
    value:
      "Sidebar-adaptable Liquid Glass TabView with a search tab and minimising toolbar, zoom navigation transitions, matched-geometry period chips, a five-step onboarding flow, 28 alarm tones, four alternate icons and Dynamic Type.",
  },
  {
    label: "Architecture",
    value:
      "SwiftUI views over @Observable view models. AlarmService, NotificationService, DoseLogService, InventoryService and MedicationAlarmCoordinator form the service layer; alarm metadata and intents live in a target shared with the widget extension.",
  },
  { label: "Privacy", value: "No account, no network calls, no third-party SDKs, and a privacy manifest that declares no collected data." },
];

function TechSpecs() {
  return (
    <section id="specs" className="py-24 md:py-32 scroll-mt-14">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <Eyebrow>Tech specs</Eyebrow>
          <Headline>What it’s made of.</Headline>
        </Reveal>

        <div className="mt-12">
          {specs.map((s, i) => (
            <Reveal key={s.label} delay={Math.min(i, 4) * 0.04}>
              <div className="ziva-spec-row">
                <p className="text-[0.9375rem] font-semibold" style={{ color: Z.ink }}>
                  {s.label}
                </p>
                <p className="text-[0.9375rem] leading-relaxed" style={{ color: Z.secondary }}>
                  {s.value}
                </p>
              </div>
            </Reveal>
          ))}
          <div className="ziva-rule" />
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap justify-center gap-2.5">
            {[
              "Swift 6",
              "SwiftUI",
              "SwiftData",
              "AlarmKit",
              "ActivityKit",
              "WidgetKit",
              "App Intents",
              "Swift Charts",
              "CryptoKit",
              "LocalAuthentication",
              "UserNotifications",
              "Observation",
            ].map((t) => (
              <span key={t} className="ziva-chip">
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Beta — the TestFlight invite
   -------------------------------------------------------------------------- */

const betaSteps = [
  {
    t: "Install TestFlight",
    d: "Apple's free beta app, from the App Store, on an iPhone or iPad running iOS 26.1 or later.",
  },
  {
    t: "Open the invite",
    d: "Tap the link on the device, or scan the code with the Camera app. It opens straight in TestFlight.",
  },
  {
    t: "Accept and install",
    d: "Ziva Meds installs like any app, with an orange dot by its name. Updates arrive through TestFlight.",
  },
];

function Beta() {
  return (
    <section id="beta" className="py-24 md:py-32 scroll-mt-14" style={{ background: Z.card }}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>Public beta</Eyebrow>
            <Headline size="lg" sub="before it ships.">
              Try Ziva Meds
            </Headline>
            <p className="mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
              The beta is open to anyone with an iPhone or iPad through
              TestFlight, Apple&rsquo;s beta programme. No account with me, no
              sign-up form: the invite link is the whole thing. Your data stays
              on your device, exactly as it will in the release.
            </p>

            <ol className="mt-9 space-y-5">
              {betaSteps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="ziva-step mt-0.5">{i + 1}</span>
                  <div>
                    <p className="text-[1rem] font-semibold" style={{ color: Z.ink }}>
                      {s.t}
                    </p>
                    <p className="mt-1 text-[0.90625rem] leading-relaxed" style={{ color: Z.secondary }}>
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <TestFlightLink>
                <Airplane size={17} />
                Join the beta on TestFlight
              </TestFlightLink>
              <a
                href={TESTFLIGHT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ziva-link ziva-small inline-flex items-center gap-1 text-[0.875rem]"
              >
                testflight.apple.com/join/5pGQhfQq
                <ArrowUpRight size={13} />
              </a>
            </div>

            <p className="mt-6 max-w-[34rem] text-[0.8125rem] leading-relaxed" style={{ color: Z.placeholder }}>
              Beta builds expire 90 days after they are uploaded; a newer build
              replaces each one before then. To send feedback, take a
              screenshot inside the app and choose Share Beta Feedback, use
              the Send Beta Feedback button in TestFlight, or tap Report a Bug
              in Settings inside Ziva Meds.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex justify-center">
            <div className="ziva-device-glow relative isolate flex flex-col items-center gap-5">
              <a
                href={TESTFLIGHT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="ziva-qr"
                aria-label="Open the Ziva Meds TestFlight invite"
              >
                <TestFlightQR size={200} />
              </a>
              <p className="inline-flex items-center gap-2 text-[0.8125rem] font-medium" style={{ color: Z.secondary }}>
                <Qrcode size={15} />
                Scan with the Camera app
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Closing
   -------------------------------------------------------------------------- */

function Closing() {
  return (
    <section className="ziva-hero py-28 md:py-36">
      <div className="mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <Image
            src="/projects/ziva/AppIcon.png"
            alt="Ziva Meds app icon"
            width={112}
            height={112}
            className="mx-auto rounded-[26px] shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)]"
          />
          <Headline size="lg" sub="Remembering shouldn’t be." className="!mt-9">
            Caring is hard enough.
          </Headline>
          <p className="mx-auto mt-6 max-w-[32rem] text-[1.0625rem] leading-relaxed" style={{ color: Z.secondary }}>
            Ziva Meds is a personal project, designed, built and shipped solo:
            the SwiftData schema, the alarm watchdog, the Live Activity, the
            token system and the icon.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <TestFlightLink>
              <Airplane size={17} />
              Join the beta
            </TestFlightLink>
            <Link href="/#projects" className="ziva-pill ziva-pill--secondary">
              Back to portfolio
              <ChevronRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-9" style={{ borderTop: `1px solid ${Z.divider}` }}>
      <div className="ziva-small mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-[0.75rem] sm:flex-row" style={{ color: Z.placeholder }}>
        <div className="flex items-center gap-2.5">
          <Image src="/projects/ziva/AppLogo.svg" alt="" width={18} height={18} aria-hidden />
          <span>Ziva Meds · 1.3 Beta · iOS 26.1 or later</span>
        </div>
        <div className="flex items-center gap-4">
          <TestFlightLink className="ziva-navlink">TestFlight</TestFlightLink>
          <Link href="/projects/ziva-meds/privacy" className="ziva-navlink">
            Privacy Policy
          </Link>
          <span>Designed and built by Marko Jovović</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function ZivaMedsContent() {
  return (
    <MotionConfig reducedMotion="user">
      <LiquidGlassDefs />
      <Nav />
      <main>
        <Hero />
        <Highlights />

        <FeatureSection
          id="today"
          band
          eyebrow="Home"
          title="The whole day,"
          subtitle="on one screen."
          body="Home opens with a greeting and a summary card: doses taken, weekly adherence and who is on the schedule. Below it, every dose grouped by time slot. The slot that is due right now carries its own Skip, Snooze and Take tray."
          points={[
            "Summary card with weekly adherence and today's progress, animated in as the screen appears",
            "Refill card in the attention tint when a pack is low or empty, with a one-tap Refill",
            "Due-now tray: Skip, Snooze and Take, plus Take Late and Mark Missed for anything overdue",
            "Long-press any row for Taken at…, Undo and the rest of the dose menu, with a haptic on every decision",
          ]}
          device={
            <div className="ziva-device-glow relative isolate w-full">
              <HomeFan />
            </div>
          }
        />

        <Alarms />

        <FeatureSection
          id="care"
          eyebrow="Patients"
          title="One app for the whole"
          subtitle="household."
          body="Each person gets a card: relationship, age, a cut-out portrait on a pastel tint, today's doses and last week's adherence. It zooms open into their medications, schedules, appointments and history."
          points={[
            "Nine medication forms, a colour and photo per medication, weekday schedules with their own alarm tone",
            "Pause a medication until a date or indefinitely, end it, or read through its dose history",
            "Six photo backgrounds, with initials inked for contrast on each one",
            "A Myself relationship, so the caregiver's own medications live alongside everyone else's",
          ]}
          device={
            <PhoneFrame>
              <PatientsScreen />
            </PhoneFrame>
          }
        />

        <FeatureSection
          band
          flip
          eyebrow="Calendar & inventory"
          title="Doses and appointments,"
          subtitle="on the same grid."
          body="A month with a dot per day, mint when the day went to plan and peach when something was skipped or missed, and the day's timeline beneath it with clinic visits in between the doses."
          points={[
            "Appointments with reminders from 15 minutes to two days ahead",
            "Pack size and refill threshold per medication; daily usage derived from the schedules themselves",
            "Days-until-empty projection that understands a Monday-Wednesday-Friday tablet",
            "Missed doses settle automatically once a later dose comes due, so history stays honest",
          ]}
          device={
            <PhoneFrame>
              <CalendarScreen />
            </PhoneFrame>
          }
        />

        <FeatureSection
          id="insight"
          eyebrow="Reports"
          title="Adherence, in a form"
          subtitle="a doctor can read."
          body="Swift Charts turns the dose log into a trend for the last seven days, four weeks or three months, drawn over the previous period for comparison, with the time of day that slips called out in a sentence."
          points={[
            "Adherence rate with a period-over-period delta",
            "Taken, skipped and missed counts, and a per-medication breakdown",
            "A Missed & Skipped list that links straight into dose history",
            "A4 PDF export, and a Share with a Doctor flow for one patient and one period",
          ]}
          device={
            <div className="ziva-device-glow relative isolate">
              <PhoneFrame>
                <ReportScreen />
              </PhoneFrame>
            </div>
          }
        />

        <Privacy />
        <Design />
        <Numbers />
        <TechSpecs />
        <Beta />
        <Closing />
        <Footer />
      </main>
    </MotionConfig>
  );
}
