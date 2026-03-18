import { type ReactNode, type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  className?: string;
}

const paddingStyles = {
  sm: "p-5",
  md: "p-6",
  lg: "p-6 md:p-8",
};

export default function Card({
  children,
  hover = true,
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`h-full rounded-xl bg-card border border-card-border ${
        hover ? "hover:border-accent/30" : ""
      } transition-all duration-300 ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
