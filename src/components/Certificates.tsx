"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading, Card, Badge } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label={t.certificates.label} title={t.certificates.title} />
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.certificates.items.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 * i }}
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="group flex flex-col gap-3 cursor-pointer hover:shadow-lg hover:shadow-accent/5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Award size={18} className="text-accent" />
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-1"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground leading-snug">
                    {cert.name}
                  </h3>
                  <Badge variant="subtle" size="xs" className="self-start">
                    {cert.issuer}
                  </Badge>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
