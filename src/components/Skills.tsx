"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Card, SectionHeading } from "./ui";
import { useLanguage } from "./LanguageProvider";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 md:py-32 bg-card/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label={t.skills.label} title={t.skills.title} />
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {t.skills.items.map((category, catIdx) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * catIdx }}
            >
              <Card hover={false}>
                <h3 className="text-lg font-semibold mb-1 text-foreground">
                  {t.skills.categories[category.key]}
                </h3>
                {category.hasSubtitle && (
                  <p className="text-muted text-xs leading-relaxed mb-4">
                    {t.skills.categories.aiSubtitle}
                  </p>
                )}
                {!category.hasSubtitle && <div className="mb-4" />}
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-foreground/90">{skill.name}</span>
                        <span className="text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-card-border rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{
                            duration: 1,
                            delay: 0.3 + catIdx * 0.15,
                            ease: "easeOut",
                          }}
                          className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
