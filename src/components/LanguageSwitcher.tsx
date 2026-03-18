"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { type Locale } from "@/lib/translations";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "ru", label: "Русский", flag: "RU" },
  { code: "sr", label: "Srpski", flag: "SR" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === locale)!;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-lg text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-all duration-200 text-sm"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="text-xs font-medium">{current.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 py-1 rounded-lg bg-card border border-card-border shadow-lg min-w-[140px] z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 ${
                  locale === lang.code
                    ? "text-accent bg-accent/10"
                    : "text-muted hover:text-foreground hover:bg-card-hover"
                }`}
              >
                <span className="text-xs font-bold w-5">{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
