import { type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-accent hover:bg-accent-light text-white",
  outline:
    "border border-card-border hover:border-accent text-foreground",
  ghost:
    "text-muted hover:text-foreground hover:bg-card",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm font-medium",
  lg: "px-8 py-3.5 font-medium",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
