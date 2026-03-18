import { type ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
}

export default function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div>
      <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
