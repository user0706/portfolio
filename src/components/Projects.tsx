"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Building2, Lock, BookOpen } from "lucide-react";
import { SectionHeading, Card, Badge, IconLink } from "./ui";
import { useLanguage } from "./LanguageProvider";

const workProjectData = [
  { company: "Endava", tags: ["Python", "Django", "React", "AWS OpenSearch", "Figma"] },
  { company: "Endava", tags: ["Python", "DRF", "AWS DynamoDB", "AWS RDS", "AWS S3"] },
  { company: "Endava", tags: ["Next.js", "React Three Fiber", "Blender 3D", "TypeScript"] },
  { company: "Endava", tags: ["Angular", "PrimeNG", "TypeScript", "Data Migration"] },
  { company: "Endava", tags: ["Python", "Automation", "Scripting", "DevOps"] },
  { company: "Continental R&D", tags: ["Python", "YOLO", "Machine Learning", "Tkinter"] },
];

const personalProjectData = [
  {
    tags: ["Python", "PyQt6", "PyPI", "Open Source"],
    github: "https://github.com/user0706/pyqt6-multiselect-combobox",
    pypi: "https://pypi.org/project/pyqt6-multiselect-combobox/",
    docs: "https://pyqt6-multiselect-combobox.readthedocs.io/en/latest/",
  },
  {
    tags: ["Python", "PyQt", "Regex", "Desktop App"],
    github: "https://github.com/user0706/PyRex",
  },
  {
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "https://github.com/user0706/portfolio_website",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading label={t.projects.label} title={t.projects.title} />
        </motion.div>

        {/* --- Professional Work --- */}
        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-6"
          >
            <Building2 size={20} className="text-accent" />
            <h3 className="text-xl font-semibold">{t.projects.professionalWork}</h3>
            <Badge variant="subtle" size="xs">
              <Lock size={10} />
              {t.projects.proprietary}
            </Badge>
          </motion.div>

          <div className="grid gap-5">
            {workProjectData.map((project, i) => {
              const item = t.projects.workProjects[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + 0.1 * i }}
                >
                  <Card padding="lg" className="group">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                          {item.title}
                        </h4>
                        <Badge variant="accent" size="xs">
                          {project.company}
                        </Badge>
                      </div>
                      <p className="text-muted leading-relaxed text-sm max-w-2xl">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* --- Personal Projects --- */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <Github size={20} className="text-accent" />
            <h3 className="text-xl font-semibold">{t.projects.personalProjects}</h3>
            <Badge variant="subtle" size="xs">{t.projects.openSource}</Badge>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {personalProjectData.map((project, i) => {
              const item = t.projects.personal[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + 0.1 * i }}
                >
                  <Card padding="sm" className="group flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex gap-3">
                        <IconLink href={project.github} icon={<Github size={16} />} label="View source on GitHub" />
                        {"pypi" in project && project.pypi && (
                          <IconLink href={project.pypi} icon={<ExternalLink size={16} />} label="View on PyPI" />
                        )}
                        {"docs" in project && project.docs && (
                          <IconLink href={project.docs} icon={<BookOpen size={16} />} label="View documentation" />
                        )}
                      </div>
                    </div>
                    <p className="text-muted text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag) => (
                        <Badge key={tag} size="xs">{tag}</Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
