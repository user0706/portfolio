"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { IconLink } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          &copy; {new Date().getFullYear()} {t.hero.name}. {t.footer.rights}
        </p>
        <div className="flex items-center gap-5">
          <IconLink href="https://github.com/user0706" icon={<Github size={18} />} label="GitHub" />
          <IconLink href="https://www.linkedin.com/in/marko-jovović/" icon={<Linkedin size={18} />} label="LinkedIn" />
          <IconLink href="mailto:jovovic.marko@yandex.com" icon={<Mail size={18} />} label="Email" />
        </div>
      </div>
    </footer>
  );
}
