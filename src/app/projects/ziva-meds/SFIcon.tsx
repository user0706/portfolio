"use client";

import type { CSSProperties, FC, SVGProps } from "react";
import * as F7 from "framework7-icons/react";

/* --------------------------------------------------------------------------
   SF Symbols-style glyphs for the page.

   Apple's SF Symbols can't be shipped on the web, so these come from
   Framework7 Icons (MIT), which are drawn to match SF Symbols one for one on
   the same 56 pt grid: filled, rounded, optically weighted. Each export takes
   the same props the page already uses (`size`, `color`, `style`, `className`).
   -------------------------------------------------------------------------- */

export interface SFProps {
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  /** Accepted for call-site compatibility; SF glyphs carry their own weight. */
  strokeWidth?: number;
}

export type SFIcon = FC<SFProps>;

function sf(Glyph: FC<SVGProps<SVGSVGElement>>): SFIcon {
  const Icon: SFIcon = ({ size = 16, color, className, style }) => (
    <Glyph
      width={size}
      height={size}
      className={className}
      style={{ color, flexShrink: 0, ...style }}
      aria-hidden
      focusable={false}
    />
  );
  return Icon;
}

export const Airplane = sf(F7.Airplane);
export const AlarmFill = sf(F7.AlarmFill);
export const ArrowCounterclockwise = sf(F7.ArrowCounterclockwise);
export const ArrowUpRight = sf(F7.ArrowUpRight);
export const BellFill = sf(F7.BellFill);
export const BoltFill = sf(F7.BoltFill);
export const CameraFill = sf(F7.CameraFill);
export const Calendar = sf(F7.Calendar);
export const CapsuleFill = sf(F7.CapsuleFill);
export const ChartBarFill = sf(F7.ChartBarFill);
export const Checkmark = sf(F7.Checkmark);
export const ChevronLeft = sf(F7.ChevronLeft);
export const ChevronRight = sf(F7.ChevronRight);
export const Clock = sf(F7.Clock);
export const ClockFill = sf(F7.ClockFill);
export const CubeBoxFill = sf(F7.CubeBoxFill);
export const DropFill = sf(F7.DropFill);
export const ExclamationmarkCircleFill = sf(F7.ExclamationmarkCircleFill);
export const FolderFill = sf(F7.FolderFill);
export const GearAltFill = sf(F7.GearAltFill);
export const HouseFill = sf(F7.HouseFill);
export const LockFill = sf(F7.LockFill);
export const LockShieldFill = sf(F7.LockShieldFill);
export const MoonFill = sf(F7.MoonFill);
export const Person2Fill = sf(F7.Person2Fill);
export const Plus = sf(F7.Plus);
export const Qrcode = sf(F7.Qrcode);
export const Search = sf(F7.Search);
export const SquareArrowUp = sf(F7.SquareArrowUp);
export const SunMaxFill = sf(F7.SunMaxFill);
export const Timer = sf(F7.Timer);
export const Xmark = sf(F7.Xmark);

/** `faceid` is not in the set, so it is drawn here on the same 56 pt grid. */
export const FaceID: SFIcon = ({ size = 16, color, className, style }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 56 56"
    fill="none"
    stroke="currentColor"
    strokeWidth="4.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ color, flexShrink: 0, ...style }}
    aria-hidden
    focusable={false}
  >
    <path d="M4 18V10a6 6 0 0 1 6-6h8" />
    <path d="M38 4h8a6 6 0 0 1 6 6v8" />
    <path d="M52 38v8a6 6 0 0 1-6 6h-8" />
    <path d="M18 52h-8a6 6 0 0 1-6-6v-8" />
    <path d="M19 20v5" />
    <path d="M37 20v5" />
    <path d="M29 20v11h-4" />
    <path d="M19.5 37.5c2.4 2.6 5.3 3.9 8.5 3.9s6.1-1.3 8.5-3.9" />
  </svg>
);
