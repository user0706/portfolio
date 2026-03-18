"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { SectionHeading, Card, Button, IconLink } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 md:py-32">
      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label={t.contact.label} title={t.contact.title} />
          <p className="mt-4 text-muted max-w-lg mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          <Card>
            <Mail size={24} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-sm mb-1">{t.contact.email}</h3>
            <a
              href="mailto:jovovic.marko@yandex.com"
              className="text-muted text-sm hover:text-accent transition-colors"
            >
              jovovic.marko@yandex.com
            </a>
          </Card>

          <Card>
            <MapPin size={24} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-sm mb-1">{t.contact.location}</h3>
            <p className="text-muted text-sm">{t.contact.locationValue}</p>
          </Card>

          <Card>
            <Send size={24} className="text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-sm mb-1">{t.contact.socials}</h3>
            <div className="flex items-center justify-center gap-4 mt-1">
              <IconLink href="https://github.com/user0706" icon={<Github size={18} />} label="GitHub" className="hover:text-accent" />
              <IconLink href="https://www.linkedin.com/in/marko-jovović/" icon={<Linkedin size={18} />} label="LinkedIn" className="hover:text-accent" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10"
        >
          <Button href="mailto:jovovic.marko@yandex.com" variant="primary" size="lg">
            <Mail size={18} />
            {t.contact.sendEmail}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
