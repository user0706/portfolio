"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { SectionHeading, Badge } from "./ui";
import { useLanguage } from "./LanguageProvider";

const experienceData = [
  {
    company: "Endava",
    technologies: ["Python", "Django", "DRF", "React", "Angular", "AWS", "Next.js", "Figma"],
  },
  {
    company: "NORMA Group",
    technologies: ["Testing Standards", "Data Analysis", "IATF 16949", "Process Improvement"],
  },
  {
    company: "Continental R&D",
    technologies: ["Python", "Machine Learning", "YOLO", "Tkinter", "Computer Vision"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 md:py-32 bg-card/30">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label={t.experience.label} title={t.experience.title} />
        </motion.div>

        <div className="mt-12 space-y-0">
          {experienceData.map((exp, i) => {
            const item = t.experience.items[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.15 * i }}
                className="relative pl-8 pb-12 last:pb-0 border-l border-card-border"
              >
                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-background border-2 border-accent flex items-center justify-center">
                  <Briefcase size={10} className="text-accent" />
                </div>

                <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.role}
                  </h3>
                  <span className="text-sm text-muted">{item.period}</span>
                </div>

                <p className="text-accent text-sm font-medium mb-3">
                  {exp.company} &middot; {item.location}
                </p>

                <p className="text-muted leading-relaxed text-sm mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
