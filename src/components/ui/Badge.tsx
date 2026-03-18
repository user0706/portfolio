import { type ReactNode } from "react";

type BadgeVariant = "tech" | "accent" | "subtle";
type BadgeSize = "xs" | "sm";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  tech: "bg-accent/10 text-accent-light",
  accent: "bg-accent/10 text-accent font-medium",
  subtle: "bg-card border border-card-border text-muted",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "text-[10px] px-2 py-0.5",
  sm: "text-xs px-3 py-1",
};

export default function Badge({
  children,
  variant = "tech",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
