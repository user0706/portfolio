"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  AlarmFill,
  ArrowCounterclockwise,
  BoltFill,
  Calendar,
  CameraFill,
  Checkmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  ClockFill,
  DropFill,
  ExclamationmarkCircleFill,
  FaceID,
  GearAltFill,
  HouseFill,
  Person2Fill,
  Plus,
  Search,
  SquareArrowUp,
  Xmark,
} from "./SFIcon";
import type { SFIcon } from "./SFIcon";

/* --------------------------------------------------------------------------
   Tokens — the CSS variables from ziva-meds.css, mirroring ZColor.
   -------------------------------------------------------------------------- */

export const Z = {
  ink: "var(--z-ink)",
  secondary: "var(--z-secondary)",
  placeholder: "var(--z-placeholder)",
  tertiary: "var(--z-tertiary)",
  onInk: "var(--z-on-ink)",
  ground: "var(--z-ground)",
  card: "var(--z-card)",
  skyTint: "var(--z-sky-tint)",
  mintTint: "var(--z-mint-tint)",
  peachTint: "var(--z-peach-tint)",
  track: "var(--z-track)",
  divider: "var(--z-divider)",
  fillStrong: "var(--z-fill-strong)",
  pendingRing: "var(--z-pending-ring)",
  material: "var(--z-material)",
  tileOnTint: "var(--z-tile-on-tint)",
  skyInk: "var(--z-sky-ink)",
  mintInk: "var(--z-mint-ink)",
  peachInk: "var(--z-peach-ink)",
  chartInk: "var(--z-chart-ink)",
  chartMint: "var(--z-chart-mint)",
  sky: "var(--z-sky)",
  appointment: "var(--z-appointment)",
} as const;

/** ZMotion.reveal — the first fill of a bar or chart as it comes on screen. */
export const REVEAL = { type: "spring", duration: 0.9, bounce: 0.12, delay: 0.08 } as const;

/* --------------------------------------------------------------------------
   Device chrome
   -------------------------------------------------------------------------- */

export function PhoneFrame({
  children,
  size = "md",
  screenStyle,
  screenClassName = "",
  statusInk,
  className = "",
}: {
  children: ReactNode;
  size?: "md" | "sm";
  screenStyle?: CSSProperties;
  /** Extra class on the screen itself, e.g. a wallpaper that must run under the status bar. */
  screenClassName?: string;
  statusInk?: string;
  className?: string;
}) {
  return (
    <div className={`ziva-phone ${size === "sm" ? "ziva-phone--sm" : ""} ${className}`}>
      <div className="ziva-phone-bezel">
        <div className={`ziva-phone-screen ${screenClassName}`} style={screenStyle}>
          {/* Every screen is laid out at the full 252 × 544 size; a smaller
              frame scales that whole layout down, so nothing reflows. */}
          <div className={`ziva-phone-scale ${screenClassName}`} style={screenStyle}>
            <span className="ziva-island" />
            <StatusBar ink={statusInk ?? Z.ink} />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ ink }: { ink: string }) {
  return (
    <div className="ziva-statusbar" style={{ color: ink }}>
      <span className="text-[10px] font-semibold tracking-tight">12:55</span>
      <span className="flex items-center gap-[3px]">
        <svg width="14" height="9" viewBox="0 0 14 9" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={i * 3.6} y={6.5 - i * 2} width="2.4" height={2.5 + i * 2} rx="0.7" fill={ink} />
          ))}
        </svg>
        <svg width="11" height="9" viewBox="0 0 11 9" aria-hidden>
          <path
            d="M5.5 7.4 7.3 5.5a2.6 2.6 0 0 0-3.6 0L5.5 7.4Zm0-4.4a5 5 0 0 1 3.4 1.3l1.2-1.3a7 7 0 0 0-9.2 0l1.2 1.3A5 5 0 0 1 5.5 3Z"
            fill={ink}
          />
        </svg>
        <svg width="18" height="9" viewBox="0 0 18 9" aria-hidden>
          <rect x="0.5" y="0.5" width="14" height="8" rx="2.4" stroke={ink} strokeOpacity="0.4" fill="none" />
          <rect x="2" y="2" width="10" height="5" rx="1.4" fill={ink} />
          <path d="M16 3.2v2.6a1.6 1.6 0 0 0 0-2.6Z" fill={ink} fillOpacity="0.4" />
        </svg>
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Liquid Glass — the iOS 26 material, built from four layers: a refracted
   backdrop (SVG turbulence + displacement), a tint, a specular rim, content.
   -------------------------------------------------------------------------- */

/** The displacement filter the glass refracts through. Render once per page. */
export function LiquidGlassDefs() {
  return (
    <svg style={{ display: "none" }} aria-hidden>
      <filter id="ziva-lg-dist" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.022 0.022" numOctaves="2" seed="92" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="1.4" result="blurred" />
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale="12" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export function LiquidGlass({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`ziva-lg ${className}`} style={style}>
      <div className="ziva-lg-filter" />
      <div className="ziva-lg-overlay" />
      <div className="ziva-lg-specular" />
      <div className="ziva-lg-content">{children}</div>
    </div>
  );
}

/** iOS 26 Liquid Glass tab bar: Home, Patients, Calendar, Settings, plus Search as its own glass button. */
function GlassTabBar({ active }: { active: "home" | "patients" | "calendar" }) {
  const tabs = [
    { id: "home", label: "Home", Icon: HouseFill },
    { id: "patients", label: "Patients", Icon: Person2Fill },
    { id: "calendar", label: "Calendar", Icon: Calendar },
    { id: "settings", label: "Settings", Icon: GearAltFill },
  ] as const;
  return (
    <>
      <div className="ziva-tabbar-fade" />
      <LiquidGlass className="ziva-glassbar">
        {tabs.map((t) => (
          <div key={t.id} className={`ziva-tab ${t.id === active ? "is-on" : ""}`}>
            <t.Icon size={16} />
            <span>{t.label}</span>
          </div>
        ))}
      </LiquidGlass>
      <LiquidGlass className="ziva-glasscircle">
        <Search size={15} style={{ color: Z.ink }} />
      </LiquidGlass>
    </>
  );
}

/** Tab root, as the system draws it: a toolbar row of glass controls (kept
    even when empty, so titles line up across tabs), then the large title
    and its subtitle. */
function NavLarge({
  title,
  subtitle,
  leading,
  trailing,
}: {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <div className="px-1">
      <div className="flex items-center justify-between" style={{ height: 28 }}>
        <div>{leading}</div>
        <div>{trailing}</div>
      </div>
      <div className="pt-2 pb-2">
        <p className="text-[22px] font-bold leading-none" style={{ color: Z.ink, letterSpacing: "-0.04em" }}>
          {title}
        </p>
        {subtitle && (
          <p className="mt-[4px] text-[9.5px] leading-snug" style={{ color: Z.secondary }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/** Navigation-bar control: a glass circle (icon) or capsule (text / grouped icons). */
function GlassButton({
  children,
  pill = false,
  size = 28,
}: {
  children: ReactNode;
  pill?: boolean;
  size?: number;
}) {
  return (
    <LiquidGlass
      className="shrink-0 text-[10px] font-semibold"
      style={{ height: size, minWidth: size, color: Z.ink }}
    >
      <span className="inline-flex items-center justify-center w-full h-full" style={{ padding: pill ? "0 10px" : 0 }}>
        {children}
      </span>
    </LiquidGlass>
  );
}

/* --------------------------------------------------------------------------
   Shared pieces (ZCard, ZAvatar, ZStatusDot, ZProgressBar, ZDisplayNumber)
   -------------------------------------------------------------------------- */

function MockCard({
  children,
  tint,
  className = "",
  style,
}: {
  children: ReactNode;
  tint?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-[18px] p-3 ${className}`}
      style={{ background: tint ?? Z.card, ...style }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <p className="text-[9px] font-medium leading-none" style={{ color: color ?? Z.secondary }}>
      {children}
    </p>
  );
}

/** Cut-out portraits, keyed by patient. Others fall back to an initial on their tint. */
const PHOTOS: Record<string, string> = {
  Robert: "/projects/ziva/robert.png",
};

export function Avatar({
  name,
  tint = "sky",
  size = 28,
}: {
  name: string;
  tint?: "sky" | "mint";
  size?: number;
}) {
  const bg = tint === "sky" ? Z.skyTint : Z.mintTint;
  const ink = tint === "sky" ? Z.skyInk : Z.mintInk;
  const photo = PHOTOS[name];
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden font-bold"
      style={{ width: size, height: size, background: bg, color: ink, fontSize: size * 0.44 }}
      aria-hidden
    >
      {photo ? (
        // Framed like ZAvatar's scaledToFill: the face fills the circle, cropped from the top.
        <Image
          src={photo}
          alt=""
          width={size}
          height={size}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "50% 8%", transform: "scale(1.15)", transformOrigin: "50% 20%" }}
        />
      ) : (
        name.charAt(0)
      )}
    </span>
  );
}

function AvatarStack() {
  return (
    <span className="flex items-center" aria-hidden>
      <Avatar name="Marko" tint="mint" size={26} />
      <span className="-ml-2 inline-flex rounded-full" style={{ boxShadow: `0 0 0 2px ${Z.card}` }}>
        <Avatar name="Robert" tint="sky" size={26} />
      </span>
    </span>
  );
}

type MarkKind = "taken" | "skipped" | "missed" | "overdue" | "snoozed" | "pending";

export function Mark({ kind, size = 18 }: { kind: MarkKind; size?: number }) {
  const base: CSSProperties = {
    width: size,
    height: size,
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };
  const glyph = Math.round(size * 0.5);
  switch (kind) {
    case "taken":
      return (
        <span style={{ ...base, background: Z.chartMint }}>
          <Checkmark size={glyph} strokeWidth={3.5} color="#fff" />
        </span>
      );
    case "skipped":
      return (
        <span style={{ ...base, background: Z.fillStrong }}>
          <Xmark size={glyph} strokeWidth={3} style={{ color: Z.placeholder }} />
        </span>
      );
    case "missed":
      return (
        <span style={{ ...base, background: Z.peachTint }}>
          <Xmark size={glyph} strokeWidth={3} style={{ color: Z.peachInk }} />
        </span>
      );
    case "overdue":
      return (
        <span style={{ ...base, background: Z.peachTint }}>
          <ExclamationmarkCircleFill size={glyph + 3} strokeWidth={2.6} style={{ color: Z.peachInk }} />
        </span>
      );
    case "snoozed":
      return (
        <span style={{ ...base, background: Z.skyTint }}>
          <ClockFill size={glyph + 1} style={{ color: Z.skyInk }} />
        </span>
      );
    default:
      return (
        <span style={{ ...base, boxShadow: `inset 0 0 0 1.5px ${Z.pendingRing}` }}>
          <Clock size={glyph + 1} strokeWidth={2.2} style={{ color: Z.tertiary }} />
        </span>
      );
  }
}

/** Capsule progress bar: hatched mint by default, or a solid colour. Grows in once, like ZProgressBar. */
export function Bar({
  value,
  height = 15,
  solid,
  label,
  labelSize = 8,
  className = "",
}: {
  value: number;
  height?: number;
  solid?: string;
  label?: string;
  labelSize?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);
  const open = `inset(0% ${100 - pct}% 0% 0% round 999px)`;
  const closed = `inset(0% 100% 0% 0% round 999px)`;
  const fillClass = `ziva-bar-fill ${solid ? "" : "ziva-hatch"}`;
  const labelStyle: CSSProperties = {
    right: `${100 - pct}%`,
    paddingRight: height * 0.45,
    fontSize: labelSize,
    color: Z.ink,
  };

  if (reduce) {
    return (
      <div className={`ziva-bar ${className}`} style={{ height }}>
        <div className={fillClass} style={{ background: solid, clipPath: open }} />
        {label && (
          <span className="absolute inset-y-0 flex items-center font-bold tabular-nums" style={labelStyle}>
            {label}
          </span>
        )}
      </div>
    );
  }

  // The observer sits on the track, not the fill: Chrome treats an element's own
  // clip-path as part of its visible area, so a fully clipped fill never "enters" view.
  return (
    <motion.div
      className={`ziva-bar ${className}`}
      style={{ height }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div
        className={fillClass}
        style={{ background: solid }}
        variants={{ hidden: { clipPath: closed }, shown: { clipPath: open } }}
        transition={REVEAL}
      />
      {label && (
        <motion.span
          className="absolute inset-y-0 flex items-center font-bold tabular-nums"
          style={labelStyle}
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
          transition={{ delay: 0.55, duration: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

export function DisplayNumber({
  value,
  suffix,
  size = 26,
  color,
}: {
  value: string;
  suffix?: string;
  size?: number;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-baseline gap-[1px] tabular-nums leading-none"
      style={{ color: color ?? Z.ink }}
    >
      <span style={{ fontSize: size, fontWeight: 600, letterSpacing: -size * 0.04 }}>{value}</span>
      {suffix && (
        <span style={{ fontSize: Math.round(size * 0.39), fontWeight: 500, letterSpacing: -0.3 }}>{suffix}</span>
      )}
    </span>
  );
}

function MedTile({
  Icon,
  size = 24,
  tint,
  ink,
}: {
  Icon: SFIcon;
  size?: number;
  tint?: string;
  ink?: string;
}) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        background: tint ?? Z.skyTint,
        color: ink ?? Z.skyInk,
      }}
      aria-hidden
    >
      <Icon size={Math.round(size * 0.46)} strokeWidth={2.4} />
    </span>
  );
}

function Divider({ inset = 0 }: { inset?: number }) {
  return <div style={{ height: 1, background: Z.divider, marginLeft: inset }} />;
}

/* --------------------------------------------------------------------------
   Home — Today
   -------------------------------------------------------------------------- */

function DoseRow({
  avatar,
  title,
  caption,
  mark,
}: {
  avatar?: { name: string; tint: "sky" | "mint" };
  title: string;
  caption: string;
  mark?: MarkKind;
}) {
  return (
    <div className="flex items-center gap-2 py-[5px]">
      {avatar && <Avatar name={avatar.name} tint={avatar.tint} size={28} />}
      <div className="min-w-0 flex-1">
        <p className="text-[10.5px] font-semibold truncate leading-tight" style={{ color: Z.ink }}>
          {title}
        </p>
        <p className="text-[8.5px] truncate leading-tight mt-[1px]" style={{ color: Z.secondary }}>
          {caption}
        </p>
      </div>
      {mark && <Mark kind={mark} />}
    </div>
  );
}

function Slot({
  time,
  detail,
  emphasis,
  lifted = false,
  children,
}: {
  time: string;
  detail: string;
  emphasis?: "due" | "missed";
  /** Long-pressed: the card rises above the dimmed screen with the context menu over it. */
  lifted?: boolean;
  children: ReactNode;
}) {
  const color = emphasis === "due" ? Z.chartInk : emphasis === "missed" ? Z.peachInk : Z.secondary;
  return (
    <div className="mt-1">
      <div className="flex items-baseline gap-1.5 px-1 mb-1">
        <span className="text-[11px] font-bold tabular-nums" style={{ color: Z.ink }}>
          {time}
        </span>
        <span className="text-[9.5px]" style={{ color, fontWeight: emphasis ? 600 : 400 }}>
          {detail}
        </span>
      </div>
      <div
        className="relative rounded-[18px] px-3 py-[2px]"
        style={{
          background: Z.card,
          zIndex: lifted ? 30 : undefined,
          boxShadow: lifted ? "0 18px 40px -16px rgba(0,0,0,0.35)" : undefined,
        }}
      >
        {children}
        {lifted && <DoseContextMenu />}
      </div>
    </div>
  );
}

/** The native context menu a long press on a dose row opens: "Herbal Tea · Robert · 13:00"
    over Take Now, Taken at…, Skip This Dose. */
function DoseContextMenu() {
  const items = [
    { Icon: Checkmark, label: "Take Now" },
    { Icon: ArrowCounterclockwise, label: "Taken at…" },
    { Icon: Xmark, label: "Skip This Dose" },
  ];
  return (
    <div
      className="absolute rounded-[16px] overflow-hidden"
      style={{
        left: 12,
        bottom: "calc(100% + 10px)",
        width: 158,
        background: "color-mix(in srgb, var(--z-card) 84%, transparent)",
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        boxShadow: "0 16px 40px -14px rgba(0,0,0,0.4), inset 0 0 0 0.5px var(--z-divider)",
      }}
    >
      <p className="px-3 pt-2 pb-1.5 text-[8px]" style={{ color: Z.secondary }}>
        Herbal Tea · Robert · 13:00
      </p>
      {items.map((it, i) => (
        <div key={it.label}>
          <div style={{ height: 0.5, background: Z.divider, opacity: i === 0 ? 1 : 0.7 }} />
          <div className="flex items-center gap-2.5 px-3" style={{ height: 27 }}>
            <it.Icon size={11} style={{ color: Z.ink }} />
            <span className="text-[10.5px]" style={{ color: Z.ink }}>
              {it.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomeScreen({ showMenu = false }: { showMenu?: boolean }) {
  return (
    <>
      {showMenu && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 25,
            background: "color-mix(in srgb, var(--z-ink) 24%, transparent)",
            backdropFilter: "blur(1.5px)",
            WebkitBackdropFilter: "blur(1.5px)",
          }}
          aria-hidden
        />
      )}
      <div className="ziva-screen-scroll">
        <NavLarge title="Good Afternoon" subtitle="Here's how everyone is doing today." />

        <MockCard className="!p-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Eyebrow>Today</Eyebrow>
              <p className="mt-[3px] text-[14.5px] font-semibold leading-tight" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
                3 of 8 Doses Taken
              </p>
              <p className="mt-[2px] text-[9px]" style={{ color: Z.secondary }}>
                Across 2 patients
              </p>
            </div>
            <AvatarStack />
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div>
              <Eyebrow>Avg. adherence</Eyebrow>
              <div className="mt-0.5 mb-1">
                <DisplayNumber value="94" suffix="%" size={20} color={Z.chartInk} />
              </div>
              <Bar value={0.94} height={11} />
            </div>
            <div>
              <Eyebrow>Doses today</Eyebrow>
              <div className="mt-0.5 mb-1">
                <DisplayNumber value="3" suffix="/8" size={20} />
              </div>
              <Bar value={3 / 8} height={11} solid={Z.sky} label="38%" />
            </div>
          </div>
        </MockCard>

        <MockCard tint={Z.peachTint} className="mt-1.5 !py-1.5">
          <div className="flex items-start justify-between">
            <div>
              <Eyebrow color={Z.peachInk}>Medication</Eyebrow>
              <p className="mt-[3px] text-[14.5px] font-semibold leading-tight" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
                Needs Refill
              </p>
            </div>
            <ExclamationmarkCircleFill size={17} strokeWidth={2.4} style={{ color: Z.peachInk }} />
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <MedTile Icon={DropFill} size={26} tint={Z.tileOnTint} ink={Z.peachInk} />
            <div className="min-w-0 flex-1">
              <p className="text-[10.5px] font-semibold leading-tight truncate" style={{ color: Z.ink }}>
                Herbal Tea 50 g
              </p>
              <p className="text-[8.5px] leading-tight mt-[1px]" style={{ color: Z.peachInk }}>
                0 left · out of stock
              </p>
            </div>
            <span
              className="rounded-full px-2.5 text-[9px] font-semibold inline-flex items-center"
              style={{ height: 22, background: Z.card, color: Z.ink }}
            >
              Refill
            </span>
          </div>
        </MockCard>

        <div className="flex items-baseline justify-between px-1 mt-1.5">
          <p className="text-[14.5px] font-semibold" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
            Schedule
          </p>
          <p className="text-[9px]" style={{ color: Z.secondary }}>
            8 doses · 5 left
          </p>
        </div>

        <Slot time="08:00" detail="Done">
          <DoseRow avatar={{ name: "Robert", tint: "sky" }} title="Robert" caption="3 medications" mark="taken" />
        </Slot>

        <Slot time="13:00" detail="Due now" emphasis="due" lifted={showMenu}>
          <DoseRow avatar={{ name: "Robert", tint: "sky" }} title="Herbal Tea 50 g" caption="Robert · 1 ml" mark="pending" />
        </Slot>

        <Slot time="20:00" detail="3 medications">
          <DoseRow avatar={{ name: "Robert", tint: "sky" }} title="Robert" caption="2 medications" mark="pending" />
          <Divider inset={36} />
          <DoseRow avatar={{ name: "Marko", tint: "mint" }} title="Vitamin D3 2000 IU" caption="Marko · 1 tablet" mark="pending" />
        </Slot>
      </div>
      <GlassTabBar active="home" />
    </>
  );
}

/** Two Home phones fanned out: the plain screen behind, the long-press state in front. */
export function HomeFan() {
  return (
    // Rotation origins sit on the container's outer corners, so neither phone
    // swings past its edge on a narrow screen.
    <div className="relative mx-auto" style={{ width: "min(100%, 420px)", height: 548 }}>
      <div
        className="absolute left-0"
        style={{ top: 28, transform: "rotate(-7deg)", transformOrigin: "top left" }}
      >
        <PhoneFrame size="sm">
          <HomeScreen />
        </PhoneFrame>
      </div>
      <div
        className="absolute right-0 z-10"
        style={{ top: 72, transform: "rotate(6deg)", transformOrigin: "top right" }}
      >
        <PhoneFrame size="sm">
          <HomeScreen showMenu />
        </PhoneFrame>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Patients
   -------------------------------------------------------------------------- */

function PatientCard({
  relationship,
  name,
  description,
  today,
  todayDone,
  tint,
  adherence,
  medications,
}: {
  relationship: string;
  name: string;
  description: string;
  today: string;
  todayDone: boolean;
  tint: "sky" | "mint";
  adherence: number;
  medications: number;
}) {
  const blob = tint === "sky" ? Z.skyTint : Z.mintTint;
  const photo = PHOTOS[name];
  return (
    <div className="relative overflow-hidden rounded-[18px]" style={{ background: Z.card }}>
      <div
        className="absolute rounded-full"
        style={{
          width: 128,
          height: 128,
          right: -6,
          top: -6,
          background: `radial-gradient(circle at 50% 40%, ${blob} 0%, transparent 62%)`,
        }}
        aria-hidden
      />
      {photo ? (
        // Cut-out portrait standing over the tint (PatientsCard: 211 × 212 at right 8 / top 9),
        // its lower edge hazing into the frosted panel below.
        <div className="absolute overflow-hidden" style={{ top: 6, right: 5, width: 135, height: 136 }} aria-hidden>
          <Image
            src={photo}
            alt=""
            width={135}
            height={136}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 0%" }}
          />
        </div>
      ) : (
        <div className="absolute" style={{ top: 14, right: 14 }}>
          <Avatar name={name} tint={tint} size={76} />
        </div>
      )}

      <div className="relative" style={{ padding: "14px 0 0 13px", width: 140 }}>
        <Eyebrow>{relationship}</Eyebrow>
        <p className="mt-[3px] text-[19px] font-semibold leading-none" style={{ color: Z.ink, letterSpacing: "-0.04em" }}>
          {name}
        </p>
        <p className="mt-[4px] text-[9.5px]" style={{ color: Z.secondary }}>
          {description}
        </p>
        <span
          className="mt-2 inline-flex items-center gap-1.5 rounded-full pl-[4px] pr-2"
          style={{ height: 23, background: Z.ground }}
        >
          <Mark kind={todayDone ? "taken" : "pending"} size={15} />
          <span className="text-[9.5px] font-semibold tabular-nums" style={{ color: Z.ink }}>
            {today}
          </span>
        </span>
      </div>

      <div
        className="relative m-1 mt-3 rounded-[15px] p-2.5"
        style={{
          // Lighter tint over a cut-out so more of the photo reads through the blur.
          background: photo ? "color-mix(in srgb, var(--z-ground) 58%, transparent)" : Z.material,
          backdropFilter: "blur(12px) saturate(140%)",
          WebkitBackdropFilter: "blur(12px) saturate(140%)",
        }}
      >
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <Eyebrow>Avg. adherence</Eyebrow>
            <div className="mt-1 mb-1">
              <DisplayNumber value={`${Math.round(adherence * 100)}`} suffix="%" size={21} color={Z.chartInk} />
            </div>
            <Bar value={adherence} height={13} />
          </div>
          <div>
            <Eyebrow>Medications</Eyebrow>
            <div className="mt-1">
              <DisplayNumber value={`${medications}`} size={21} />
            </div>
            <p className="text-[8px] mt-[2px]" style={{ color: Z.secondary }}>
              active this week
            </p>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <span
            className="inline-flex items-center justify-center rounded-full text-[9.5px] font-semibold"
            style={{ height: 27, background: Z.ink, color: Z.onInk }}
          >
            Details
          </span>
          <span
            className="inline-flex items-center justify-center rounded-full text-[9.5px] font-semibold"
            style={{ height: 27, background: Z.card, color: Z.ink }}
          >
            Add Med
          </span>
        </div>
      </div>
    </div>
  );
}

export function PatientsScreen() {
  return (
    <>
      <div className="ziva-screen-scroll">
        <NavLarge
          title="Patients"
          subtitle="2 people you look after"
          trailing={
            <GlassButton>
              <Plus size={14} />
            </GlassButton>
          }
        />
        <div className="space-y-2.5">
          <PatientCard
            relationship="Parent"
            name="Robert"
            description="Male · 65"
            today="3 of 7 today"
            todayDone={false}
            tint="sky"
            adherence={0.94}
            medications={3}
          />
          <PatientCard
            relationship="Myself"
            name="Marko"
            description="Male · 34"
            today="0 of 1 today"
            todayDone={false}
            tint="mint"
            adherence={0.97}
            medications={1}
          />
        </div>
      </div>
      <GlassTabBar active="patients" />
    </>
  );
}

/* --------------------------------------------------------------------------
   Full Report — Swift Charts
   -------------------------------------------------------------------------- */

const CURRENT = [0.86, 1, 0.75, 1, 1, 0.9, 1];
const PREVIOUS = [0.7, 0.8, 0.6, 0.9, 0.75, 0.85, 0.8];
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Catmull-Rom through the points, as Swift Charts' `.catmullRom` interpolation. */
function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x},${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x},${p2.y}`;
  }
  return d;
}

export function TrendChart({ width = 200, height = 72 }: { width?: number; height?: number }) {
  const reduce = useReducedMotion();
  const padX = 8;
  const top = 8;
  const bottom = height - 14;
  const toPoint = (v: number, i: number, n: number) => ({
    x: Math.round(padX + (i * (width - padX * 2)) / (n - 1)),
    y: Math.round(bottom - v * (bottom - top)),
  });
  const cur = CURRENT.map((v, i) => toPoint(v, i, CURRENT.length));
  const prev = PREVIOUS.map((v, i) => toPoint(v, i, PREVIOUS.length));
  const last = cur[cur.length - 1];

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.svg
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        aria-hidden
        variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
        transition={REVEAL}
      >
        <path d={smoothPath(prev)} fill="none" stroke={Z.chartMint} strokeOpacity="0.18" strokeWidth="3.4" strokeLinecap="round" />
        <path d={smoothPath(cur)} fill="none" stroke={Z.chartMint} strokeWidth="3.4" strokeLinecap="round" />
        <circle cx={last.x} cy={last.y} r="5" fill="#fff" />
        <circle cx={last.x} cy={last.y} r="3.2" fill={Z.chartMint} />
        {DAY_LABELS.map((l, i) => (
          <text
            key={l}
            x={cur[i].x}
            y={height - 2}
            textAnchor="middle"
            fontSize="7"
            fill={Z.secondary}
            style={{ fontFamily: "inherit" }}
          >
            {l}
          </text>
        ))}
      </motion.svg>
    </motion.div>
  );
}

function RateBar({ value, delta }: { value: number; delta: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      <Bar value={value} height={23} />
      <motion.span
        className="absolute top-1/2 inline-flex items-center rounded-full px-2 text-[8px] font-bold tabular-nums"
        style={{
          right: `calc(${100 - Math.round(value * 100)}% + 3px)`,
          height: 17,
          background: Z.ink,
          color: Z.onInk,
          translateY: "-50%",
        }}
        initial={reduce ? false : { opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ ...REVEAL, delay: 0.5 }}
      >
        {delta}
      </motion.span>
    </div>
  );
}

export function ReportScreen() {
  return (
    <>
      <div className="ziva-screen-scroll">
        <div className="flex items-center justify-between pt-1 pb-2">
          <GlassButton>
            <ChevronLeft size={13} strokeWidth={2.6} />
          </GlassButton>
          <GlassButton>
            <SquareArrowUp size={12} strokeWidth={2.4} />
          </GlassButton>
        </div>
        <div className="px-1 mb-2">
          <p className="text-[20px] font-semibold leading-tight" style={{ color: Z.ink, letterSpacing: "-0.04em" }}>
            Full Report
          </p>
          <p className="text-[9.5px] mt-[2px]" style={{ color: Z.secondary }}>
            Robert · all medications
          </p>
        </div>

        <div className="flex gap-1 mb-2.5">
          {["7 days", "30 days", "90 days"].map((p, i) => (
            <span
              key={p}
              className="inline-flex items-center rounded-full px-2.5 text-[9px] font-semibold"
              style={{ height: 24, background: i === 0 ? Z.ink : Z.card, color: i === 0 ? Z.onInk : Z.ink }}
            >
              {p}
            </span>
          ))}
        </div>

        <MockCard>
          <div className="flex items-start justify-between gap-2">
            <DisplayNumber value="94" suffix="%" size={33} color={Z.chartInk} />
            <p className="text-right text-[9px] leading-snug" style={{ color: Z.secondary }}>
              Adherence rate,
              <br />
              this period
            </p>
          </div>
          <div className="flex justify-between px-[2px] mt-2 mb-1 text-[7.5px] tabular-nums" style={{ color: Z.secondary }}>
            <span>0</span>
            <span>100</span>
          </div>
          <RateBar value={0.94} delta="+6%" />
        </MockCard>

        <MockCard className="mt-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-tight" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
                Avg. Adherence
              </p>
              <p className="text-[8.5px] mt-[2px] truncate" style={{ color: Z.secondary }}>
                Morning doses are missed most often.
              </p>
            </div>
            <DisplayNumber value="94" suffix="%" size={24} color={Z.chartInk} />
          </div>
          <div className="mt-1.5 -mx-1">
            <TrendChart />
          </div>
        </MockCard>

        <MockCard className="mt-2.5 !py-2.5">
          <div className="flex">
            {[
              { v: "37", l: "Taken", c: Z.chartInk },
              { v: "4", l: "Skipped", c: Z.peachInk },
              { v: "2", l: "Missed", c: Z.ink },
            ].map((s, i) => (
              <div
                key={s.l}
                className="flex-1 flex flex-col items-center gap-[2px]"
                style={{ borderLeft: i > 0 ? `1px solid ${Z.divider}` : undefined }}
              >
                <DisplayNumber value={s.v} size={21} color={s.c} />
                <span className="text-[8.5px]" style={{ color: Z.secondary }}>
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </MockCard>

        <MockCard className="mt-2.5">
          <p className="text-[13px] font-semibold" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
            By Medication
          </p>
          {[
            { n: "Tamsulosin", p: 0.98 },
            { n: "Finasteride", p: 0.93 },
          ].map((m, i) => (
            <div key={m.n}>
              {i > 0 && <Divider />}
              <div className="py-2">
                <div className="flex justify-between text-[9.5px] font-semibold mb-1" style={{ color: Z.ink }}>
                  <span>{m.n}</span>
                  <span className="tabular-nums">{Math.round(m.p * 100)}%</span>
                </div>
                <Bar value={m.p} height={9} />
              </div>
            </div>
          ))}
        </MockCard>
      </div>
      <GlassTabBar active="patients" />
    </>
  );
}

/* --------------------------------------------------------------------------
   Calendar — doses and appointments on one grid
   -------------------------------------------------------------------------- */

export function CalendarScreen() {
  // October 2026 starts on a Thursday; today is Saturday the 3rd, selected is Tuesday the 6th.
  const lead = 4;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = 3;
  const selected = 6;
  const dot = (d: number) => {
    if (d < today) return Z.chartMint;
    if (d === today) return Z.peachInk; // the 09:00 dose was skipped
    return Z.pendingRing;
  };

  return (
    <>
      <div className="ziva-screen-scroll">
        <NavLarge
          title="October 2026"
          subtitle="Tuesday 6 · 4 events · in 3 days"
          leading={
            <GlassButton pill>
              <span className="inline-flex items-center gap-4 px-0.5">
                <ChevronLeft size={11} />
                <ChevronRight size={11} />
              </span>
            </GlassButton>
          }
          trailing={<GlassButton pill>Today</GlassButton>}
        />

        <MockCard className="!px-2 !py-2.5">
          <div className="grid grid-cols-7 mb-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span key={i} className="text-center text-[7.5px] font-semibold" style={{ color: Z.secondary }}>
                {d}
              </span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-[1px]">
            {Array.from({ length: lead }).map((_, i) => (
              <span key={`b${i}`} />
            ))}
            {days.map((d) => {
              const sel = d === selected;
              return (
                <div key={d} className="flex flex-col items-center gap-[1px]">
                  <span
                    className="inline-flex items-center justify-center rounded-full text-[8.5px] tabular-nums"
                    style={{
                      width: 19,
                      height: 19,
                      background: sel ? Z.ink : "transparent",
                      color: sel ? Z.onInk : d === today ? Z.chartInk : Z.ink,
                      fontWeight: sel || d === today ? 700 : 500,
                    }}
                  >
                    {d}
                  </span>
                  <span className="rounded-full" style={{ width: 3.5, height: 3.5, background: dot(d) }} />
                </div>
              );
            })}
          </div>
        </MockCard>

        <p className="px-1 mt-3 mb-1.5 text-[13px] font-semibold" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
          Tuesday, 6 October
        </p>
        {/* Day rows as the app draws them: time, a bar in the status colour
            (sky = scheduled, mint = taken, orange = appointment), title, caption, chevron. */}
        <div className="rounded-[18px] px-3 py-[2px]" style={{ background: Z.card }}>
          {[
            { t: "08:00", n: "Herbal Tea · 1 ml", s: "Robert · scheduled", c: Z.sky },
            { t: "08:00", n: "Finasteride · 1 tablet", s: "Robert · scheduled", c: Z.sky },
            { t: "09:00", n: "Dermatology check-up", s: "Appointment · Robert", c: Z.appointment },
            { t: "13:00", n: "Herbal Tea · 1 ml", s: "Robert · scheduled", c: Z.sky },
          ].map((row, i) => (
            <div key={i}>
              {i > 0 && <Divider inset={30} />}
              <div className="flex items-center gap-2.5 py-[7px]">
                <span className="w-[26px] text-[9px] tabular-nums" style={{ color: Z.secondary }}>
                  {row.t}
                </span>
                <span className="shrink-0 rounded-full" style={{ width: 3, height: 22, background: row.c }} />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold truncate leading-tight" style={{ color: Z.ink }}>
                    {row.n}
                  </p>
                  <p className="text-[8px] truncate leading-tight mt-[1px]" style={{ color: Z.secondary }}>
                    {row.s}
                  </p>
                </div>
                <ChevronRight size={9} style={{ color: Z.tertiary }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <GlassTabBar active="calendar" />
    </>
  );
}

/* --------------------------------------------------------------------------
   Lock Screen — the pre-alert Live Activity
   -------------------------------------------------------------------------- */

const LA = {
  bg: "#0c2132",
  countdown: "#66b5e0",
  take: "#7ee6d2",
  takeInk: "#0b2e29",
  alert: "#f0a07e",
  secondary: "rgba(255,255,255,0.62)",
  control: "rgba(255,255,255,0.14)",
};

function AppMark({ size }: { size: number }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 bg-white"
      style={{ width: size, height: size, borderRadius: size * 0.26 }}
      aria-hidden
    >
      <Image src="/projects/ziva/AppLogo.svg" alt="" width={Math.round(size * 0.66)} height={Math.round(size * 0.66)} />
    </span>
  );
}

function ActivityActions({ height = 28 }: { height?: number }) {
  const pill = (label: string, primary = false) => (
    <span
      key={label}
      className="inline-flex items-center justify-center rounded-full text-[9.5px] font-semibold"
      style={{
        height,
        flex: primary ? 1 : undefined,
        padding: primary ? 0 : "0 12px",
        background: primary ? LA.take : LA.control,
        color: primary ? LA.takeInk : "#fff",
      }}
    >
      {label}
    </span>
  );
  return <div className="flex gap-1.5">{[pill("Take Now", true), pill("Later"), pill("Skip")]}</div>;
}

function ActivityCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-[18px] p-3" style={{ background: "rgba(12, 33, 50, 0.92)", backdropFilter: "blur(14px)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <AppMark size={compact ? 26 : 30} />
          <div className="min-w-0">
            <p className="text-[8.5px] font-medium truncate" style={{ color: LA.secondary }}>
              Due soon · Robert
            </p>
            <p className="text-[12px] font-semibold truncate text-white leading-tight">Herbal Tea</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[24px] font-semibold leading-none tabular-nums" style={{ color: LA.countdown, letterSpacing: "-0.03em" }}>
            4:52
          </p>
          <p className="text-[7.5px] mt-[2px]" style={{ color: LA.secondary }}>
            at 13:00
          </p>
        </div>
      </div>
      <div className="mt-2.5 h-[4px] rounded-full overflow-hidden" style={{ background: LA.control }}>
        <div className="h-full rounded-full" style={{ width: "97%", background: LA.countdown }} />
      </div>
      <div className="mt-2.5">
        <ActivityActions />
      </div>
    </div>
  );
}

/** The iOS Lock Screen: date and the tall clock over the wallpaper, the Live
    Activity docked above the flashlight and camera controls. */
export function LockScreenActivity() {
  return (
    <div className="flex-1 flex flex-col px-3 pt-3 text-white">
      <p className="text-center text-[11px] font-semibold text-white/90">Sat 3 Oct</p>
      <p
        className="text-center font-semibold leading-none mt-1"
        style={{
          fontSize: 74,
          letterSpacing: "-0.06em",
          fontStretch: "condensed",
          background: "linear-gradient(180deg, #ffffff 0%, #e8daf0 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 24px rgba(255,255,255,0.18)",
        }}
      >
        12:55
      </p>
      <div className="flex-1" />
      <ActivityCard />
      <div className="mt-3 mb-2 flex items-center justify-between px-5">
        {[BoltFill, CameraFill].map((Icon, i) => (
          <span
            key={i}
            className="inline-flex items-center justify-center rounded-full"
            style={{
              width: 36,
              height: 36,
              background: "rgba(255,255,255,0.16)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 0.5px 0 rgba(255,255,255,0.35)",
            }}
          >
            <Icon size={15} color="#fff" />
          </span>
        ))}
      </div>
      <span className="mx-auto mb-2 h-[4px] w-[86px] rounded-full bg-white/85" />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Dynamic Island — compact and expanded
   -------------------------------------------------------------------------- */

export function IslandCompact() {
  return (
    <div className="ziva-di flex items-center justify-between rounded-full pl-2 pr-3" style={{ width: 150, height: 34 }}>
      <Image src="/projects/ziva/AppLogo.svg" alt="" width={18} height={18} aria-hidden />
      <span className="text-[12px] font-semibold tabular-nums" style={{ color: LA.countdown }}>
        4:52
      </span>
    </div>
  );
}

export function IslandExpanded() {
  return (
    <div className="ziva-di rounded-[32px] p-4" style={{ width: 262 }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <AppMark size={34} />
          <div className="min-w-0">
            <p className="text-[10px] font-medium truncate" style={{ color: LA.secondary }}>
              Due soon · Robert
            </p>
            <p className="text-[14px] font-semibold truncate text-white leading-tight">Herbal Tea</p>
          </div>
        </div>
        <p className="text-[30px] font-semibold leading-none tabular-nums" style={{ color: LA.countdown, letterSpacing: "-0.03em" }}>
          4:52
        </p>
      </div>
      <div className="mt-3 h-[4px] rounded-full overflow-hidden" style={{ background: LA.control }}>
        <div className="h-full rounded-full" style={{ width: "97%", background: LA.countdown }} />
      </div>
      <p className="mt-2 text-[10px]" style={{ color: LA.secondary }}>
        Rings at 13:00 · 1 ml
      </p>
      <div className="mt-2.5">
        <ActivityActions height={32} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Alarm ringing inside the app
   -------------------------------------------------------------------------- */

/** The system's own AlarmKit alert, expanded out of the Dynamic Island: the app's
    name and the dose in alarm green, with the Taken (secondary intent) and Stop buttons. */
function AlarmKitBanner() {
  const green = "#30d158";
  return (
    <div
      className="absolute flex items-center gap-2 rounded-full pl-2.5 pr-2"
      style={{ top: 6, left: 8, right: 8, height: 46, background: "#000", zIndex: 25, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)" }}
    >
      <AlarmFill size={22} color={green} />
      <div className="min-w-0 flex-1">
        <p className="text-[7.5px] truncate" style={{ color: `${green}99` }}>
          Ziva Meds
        </p>
        <p className="text-[8.5px] font-semibold truncate" style={{ color: green }}>
          Herbal Tea · 1 ml — Robert
        </p>
      </div>
      <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: 28, height: 28, background: "#0f3d22" }}>
        <Checkmark size={11} color={green} />
      </span>
      <span className="inline-flex items-center justify-center rounded-full shrink-0" style={{ width: 28, height: 28, background: "#3a3a3c" }}>
        <Xmark size={11} color="#fff" />
      </span>
    </div>
  );
}

export function AlarmRingingScreen() {
  return (
    <div className="flex-1 flex flex-col items-center px-4 pt-6 pb-3 text-center" style={{ background: "#15171a" }}>
      <AlarmKitBanner />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <span className="ziva-alarm-pulse mb-4">
          <AlarmFill size={54} strokeWidth={1.7} style={{ color: Z.chartMint }} />
        </span>
        <div className="w-full rounded-[15px] px-3 py-3.5" style={{ background: "rgba(255,255,255,0.12)" }}>
          <p className="text-[21px] font-semibold text-white leading-tight" style={{ letterSpacing: "-0.04em" }}>
            Herbal Tea
          </p>
          <p className="mt-1.5 text-[14px] font-semibold tabular-nums" style={{ color: Z.chartMint }}>
            1 ml
          </p>
          <p className="mt-1 text-[10.5px] text-white/65">Robert</p>
        </div>
      </div>
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-center rounded-full text-[11px] font-semibold" style={{ height: 36, background: "#fff", color: "#15171a" }}>
          Taken
        </div>
        <div className="flex gap-1.5">
          {["Snooze · 5 min", "Skip"].map((l) => (
            <div
              key={l}
              className="flex-1 flex items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
              style={{ height: 33, background: "rgba(255,255,255,0.12)" }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   App Lock — the privacy shield
   -------------------------------------------------------------------------- */

export function AppLockScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
      <Image src="/projects/ziva/AppLogo.svg" alt="" width={46} height={46} aria-hidden />
      <p className="mt-4 text-[15px] font-semibold" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
        Ziva Meds is locked
      </p>
      <p className="mt-1 text-[9.5px]" style={{ color: Z.secondary }}>
        Unlock to see patients and medications.
      </p>
      <span
        className="mt-4 inline-flex items-center gap-1.5 rounded-full px-4 text-[10px] font-semibold"
        style={{ height: 30, background: Z.ink, color: Z.onInk }}
      >
        <FaceID size={12} strokeWidth={2.4} />
        Unlock with Face ID
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Larger summary card for the design section (same tokens, bigger type)
   -------------------------------------------------------------------------- */

export function SummaryCardLarge() {
  return (
    <div className="rounded-[28px] p-5" style={{ background: Z.card }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-medium" style={{ color: Z.secondary }}>
            Today
          </p>
          <p className="mt-1 text-[24px] font-semibold leading-tight" style={{ color: Z.ink, letterSpacing: "-0.03em" }}>
            3 of 8 Doses Taken
          </p>
          <p className="mt-1 text-[15px]" style={{ color: Z.secondary }}>
            5 to go · next at 13:00
          </p>
        </div>
        <span className="flex items-center">
          <Avatar name="Marko" tint="mint" size={40} />
          <span className="-ml-3 inline-flex rounded-full" style={{ boxShadow: `0 0 0 3px ${Z.card}` }}>
            <Avatar name="Robert" tint="sky" size={40} />
          </span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div>
          <p className="text-[14px] font-medium" style={{ color: Z.secondary }}>
            Avg. adherence
          </p>
          <div className="mt-2 mb-2">
            <DisplayNumber value="94" suffix="%" size={44} color={Z.chartInk} />
          </div>
          <Bar value={0.94} height={26} />
        </div>
        <div>
          <p className="text-[14px] font-medium" style={{ color: Z.secondary }}>
            Doses today
          </p>
          <div className="mt-2 mb-2">
            <DisplayNumber value="3" suffix="/8" size={44} />
          </div>
          <Bar value={3 / 8} height={26} solid={Z.sky} label="38%" labelSize={12} />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-[20px] p-3" style={{ background: Z.peachTint }}>
        <span className="ziva-tile" style={{ width: 40, height: 40, borderRadius: 12, background: Z.tileOnTint, color: Z.peachInk }}>
          <DropFill size={18} strokeWidth={2.4} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold truncate" style={{ color: Z.ink }}>
            Herbal Tea 50 g
          </p>
          <p className="text-[13px]" style={{ color: Z.peachInk }}>
            0 left · out of stock
          </p>
        </div>
        <span className="inline-flex items-center rounded-full px-4 text-[13px] font-semibold" style={{ height: 34, background: Z.card, color: Z.ink }}>
          Refill
        </span>
      </div>
    </div>
  );
}
