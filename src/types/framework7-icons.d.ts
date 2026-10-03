// framework7-icons ships React components (SF Symbols-style glyphs on a 56 pt grid)
// without type declarations. Only the glyphs the site uses are declared here.
declare module "framework7-icons/react" {
  import type { FC, SVGProps } from "react";

  type F7Icon = FC<SVGProps<SVGSVGElement>>;

  export const AlarmFill: F7Icon;
  export const ArrowCounterclockwise: F7Icon;
  export const BellFill: F7Icon;
  export const BoltFill: F7Icon;
  export const CameraFill: F7Icon;
  export const Calendar: F7Icon;
  export const CapsuleFill: F7Icon;
  export const ChartBarFill: F7Icon;
  export const Checkmark: F7Icon;
  export const ChevronLeft: F7Icon;
  export const ChevronRight: F7Icon;
  export const Clock: F7Icon;
  export const ClockFill: F7Icon;
  export const CubeBoxFill: F7Icon;
  export const DropFill: F7Icon;
  export const ExclamationmarkCircleFill: F7Icon;
  export const FolderFill: F7Icon;
  export const GearAltFill: F7Icon;
  export const HouseFill: F7Icon;
  export const LockFill: F7Icon;
  export const LockShieldFill: F7Icon;
  export const MoonFill: F7Icon;
  export const Person2Fill: F7Icon;
  export const Plus: F7Icon;
  export const Search: F7Icon;
  export const SquareArrowUp: F7Icon;
  export const SunMaxFill: F7Icon;
  export const Timer: F7Icon;
  export const Xmark: F7Icon;
}
