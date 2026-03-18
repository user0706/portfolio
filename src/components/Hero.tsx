"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button, IconLink } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-6">
            {t.hero.label}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          {t.hero.greeting}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
            {t.hero.name}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          {t.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Button href="#projects" variant="primary" size="md">
            {t.hero.viewWork}
          </Button>
          <Button href="#contact" variant="outline" size="md">
            {t.hero.getInTouch}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <IconLink href="https://github.com/user0706" icon={<Github size={22} />} label="GitHub" />
          <IconLink href="https://www.linkedin.com/in/marko-jovović/" icon={<Linkedin size={22} />} label="LinkedIn" />
          <IconLink href="mailto:jovovic.marko@yandex.com" icon={<Mail size={22} />} label="Email" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label="Scroll down">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-muted" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
