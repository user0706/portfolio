"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, Cloud } from "lucide-react";
import { Card, SectionHeading } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const highlights = [
    { icon: <Code2 size={24} />, title: t.about.highlights.frontend.title, description: t.about.highlights.frontend.description },
    { icon: <Server size={24} />, title: t.about.highlights.backend.title, description: t.about.highlights.backend.description },
    { icon: <Database size={24} />, title: t.about.highlights.database.title, description: t.about.highlights.database.description },
    { icon: <Cloud size={24} />, title: t.about.highlights.cloud.title, description: t.about.highlights.cloud.description },
  ];

  return (
    <section id="about" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            label={t.about.label}
            title={<>{t.about.titleStart}<span className="text-accent">{t.about.titleHighlight}</span></>}
          />
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-muted leading-relaxed">{t.about.p1}</p>
            <p className="text-muted leading-relaxed">{t.about.p2}</p>
            <p className="text-muted leading-relaxed">{t.about.p3}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <Card key={i} padding="sm">
                <div className="text-accent mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-muted text-xs leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
