import { type ReactNode, type AnchorHTMLAttributes } from "react";

interface IconLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  icon: ReactNode;
  label: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: "",
  md: "",
  lg: "",
};

export default function IconLink({
  icon,
  label,
  size = "md",
  className = "",
  href,
  ...props
}: IconLinkProps) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      className={`text-muted hover:text-foreground transition-colors duration-200 ${sizeStyles[size]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {icon}
    </a>
  );
}
