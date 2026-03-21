import jsPDF from "jspdf";
import type { Translations } from "./translations";
import { interRegular, interBold } from "./interFont";

// ── Color palette ──
type RGB = [number, number, number];
const SIDEBAR_BG: RGB = [22, 28, 45];
const SIDEBAR_TEXT: RGB = [210, 215, 230];
const SIDEBAR_HEADING: RGB = [255, 255, 255];
const SIDEBAR_ACCENT: RGB = [129, 140, 248]; // indigo-400
const SIDEBAR_MUTED: RGB = [148, 163, 184];
const SIDEBAR_PILL_BG: RGB = [38, 47, 70];

const MAIN_DARK: RGB = [15, 23, 42];
const MAIN_ACCENT: RGB = [99, 102, 241];
const MAIN_MUTED: RGB = [100, 116, 139];
const MAIN_LIGHT_BG: RGB = [241, 245, 249];

const FONT = "Inter";

// ── Layout constants ──
const PAGE_W = 210;
const PAGE_H = 297;
const SIDEBAR_W = 64;
const MAIN_X = SIDEBAR_W + 10;
const MAIN_W = PAGE_W - MAIN_X - 14;
const SIDEBAR_PAD = 10;
const SIDEBAR_INNER = SIDEBAR_W - SIDEBAR_PAD * 2;
const PAGE_BOTTOM = 284;

type HighlightKey = keyof Translations["about"]["highlights"];
const skillHighlightKeys: HighlightKey[] = ["backend", "frontend", "database", "cloud"];

// ── Helpers ──

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    drawSidebarBg(doc);
    return 16;
  }
  return y;
}

function ensureSidebarSpace(doc: jsPDF, sY: number, needed: number): number {
  if (sY + needed > PAGE_BOTTOM) {
    doc.addPage();
    drawSidebarBg(doc);
    return 16;
  }
  return sY;
}

function drawSidebarBg(doc: jsPDF) {
  doc.setFillColor(...SIDEBAR_BG);
  doc.rect(0, 0, SIDEBAR_W, PAGE_H, "F");
}

function drawWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number
): number {
  const lines = doc.splitTextToSize(text, maxW) as string[];
  for (const line of lines) {
    y = ensureSpace(doc, y, lh);
    doc.text(line, x, y);
    y += lh;
  }
  return y;
}

function sidebarHeading(doc: jsPDF, label: string, y: number): number {
  doc.setFont(FONT, "bold");
  doc.setFontSize(9);
  doc.setTextColor(...SIDEBAR_HEADING);
  doc.text(label.toUpperCase(), SIDEBAR_PAD, y);
  y += 2.5;
  doc.setDrawColor(...SIDEBAR_ACCENT);
  doc.setLineWidth(0.5);
  doc.line(SIDEBAR_PAD, y, SIDEBAR_PAD + 18, y);
  return y + 5;
}

function mainHeading(doc: jsPDF, label: string, y: number): number {
  y = ensureSpace(doc, y, 12);
  doc.setFont(FONT, "bold");
  doc.setFontSize(12);
  doc.setTextColor(...MAIN_ACCENT);
  doc.text(label.toUpperCase(), MAIN_X, y);
  y += 2;
  doc.setDrawColor(...MAIN_ACCENT);
  doc.setLineWidth(0.4);
  doc.line(MAIN_X, y, MAIN_X + MAIN_W, y);
  return y + 6;
}

function drawSkillPills(doc: jsPDF, skills: string[], startY: number): number {
  let x = SIDEBAR_PAD;
  let y = startY;
  const pillH = 5.2;
  const pillPadX = 3;
  const pillGapX = 2;
  const pillGapY = 2.5;
  const maxX = SIDEBAR_PAD + SIDEBAR_INNER;

  doc.setFont(FONT, "normal");
  doc.setFontSize(7);

  for (const skill of skills) {
    const tw = doc.getTextWidth(skill);
    const pw = tw + pillPadX * 2;

    if (x + pw > maxX && x > SIDEBAR_PAD) {
      x = SIDEBAR_PAD;
      y += pillH + pillGapY;
    }

    doc.setFillColor(...SIDEBAR_PILL_BG);
    doc.roundedRect(x, y - 3.6, pw, pillH, 1.2, 1.2, "F");
    doc.setTextColor(...SIDEBAR_ACCENT);
    doc.text(skill, x + pillPadX, y);

    x += pw + pillGapX;
  }

  return y + pillH + 2;
}

// ── Main export ──

export function generateResume(t: Translations) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  // Register custom Inter font for full Unicode support
  doc.addFileToVFS("Inter-Regular.ttf", interRegular);
  doc.addFont("Inter-Regular.ttf", FONT, "normal");
  doc.addFileToVFS("Inter-Bold.ttf", interBold);
  doc.addFont("Inter-Bold.ttf", FONT, "bold");

  // ════════════════════════════════════
  //  PAGE 1 — Sidebar background
  // ════════════════════════════════════
  drawSidebarBg(doc);

  // ── Sidebar: Name & title ──
  let sY = 20;
  const nameParts = t.resume.name.split(" ");
  doc.setFont(FONT, "bold");
  doc.setFontSize(18);
  doc.setTextColor(...SIDEBAR_HEADING);
  doc.text(nameParts[0] || "", SIDEBAR_PAD, sY);
  sY += 7;
  const lastName = nameParts.slice(1).join(" ");
  if (lastName) {
    doc.text(lastName, SIDEBAR_PAD, sY);
    sY += 6;
  }

  doc.setFont(FONT, "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...SIDEBAR_ACCENT);
  doc.text(t.hero.label, SIDEBAR_PAD, sY);
  sY += 10;

  // ── Sidebar: Contact ──
  sY = ensureSidebarSpace(doc, sY, 20);
  sY = sidebarHeading(doc, t.contact.label, sY);

  doc.setFont(FONT, "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...SIDEBAR_TEXT);

  const contactItems: { text: string; url: string }[] = [
    { text: t.resume.email, url: `mailto:${t.resume.email}` },
    { text: t.resume.linkedin, url: t.resume.linkedinUrl },
    { text: t.resume.website, url: `https://${t.resume.website}` },
  ];
  for (const item of contactItems) {
    doc.setTextColor(...SIDEBAR_ACCENT);
    doc.textWithLink(item.text, SIDEBAR_PAD, sY, { url: item.url });
    doc.setTextColor(...SIDEBAR_TEXT);
    sY += 4.2;
  }
  sY += 4;

  // ── Sidebar: Skills ──
  sY = ensureSidebarSpace(doc, sY, 20);
  sY = sidebarHeading(doc, t.skills.label, sY);

  for (const key of skillHighlightKeys) {
    const highlight = t.about.highlights[key];
    doc.setFont(FONT, "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...SIDEBAR_MUTED);
    doc.text(highlight.title, SIDEBAR_PAD, sY);
    sY += 6;
    const skills = highlight.description.split(", ").map((s) => s.trim());
    sY = drawSkillPills(doc, skills, sY);
    sY += 2;
  }
  sY += 2;

  // ── Sidebar: Education ──
  sY = ensureSidebarSpace(doc, sY, 30);
  sY = sidebarHeading(doc, t.education.label, sY);
  doc.setFont(FONT, "bold");
  doc.setFontSize(8);
  doc.setTextColor(...SIDEBAR_TEXT);
  doc.text(t.education.degree, SIDEBAR_PAD, sY);
  sY += 4;
  doc.setFont(FONT, "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...SIDEBAR_ACCENT);
  doc.text(t.education.field, SIDEBAR_PAD, sY);
  sY += 4.5;
  doc.setTextColor(...SIDEBAR_MUTED);
  doc.setFontSize(7);
  const uniLines = doc.splitTextToSize(t.education.university, SIDEBAR_INNER) as string[];
  for (const line of uniLines) {
    doc.text(line, SIDEBAR_PAD, sY);
    sY += 3.5;
  }
  sY += 1;
  doc.setTextColor(...SIDEBAR_TEXT);
  doc.setFontSize(7);
  doc.text(t.education.period, SIDEBAR_PAD, sY);

  // ════════════════════════════════════
  //  MAIN COLUMN
  // ════════════════════════════════════
  let y = 20;

  // ── Summary ──
  y = mainHeading(doc, t.about.label, y);
  doc.setFont(FONT, "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MAIN_DARK);
  y = drawWrapped(doc, t.hero.description, MAIN_X, y, MAIN_W, 4.3);
  y += 5;

  // ── Experience ──
  y = mainHeading(doc, t.experience.label, y);

  for (let i = 0; i < t.experience.items.length; i++) {
    const item = t.experience.items[i];
    y = ensureSpace(doc, y, 24);

    // Role
    doc.setFont(FONT, "bold");
    doc.setFontSize(10);
    doc.setTextColor(...MAIN_DARK);
    doc.text(item.role, MAIN_X, y);

    // Period (right-aligned)
    doc.setFont(FONT, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MAIN_MUTED);
    doc.text(item.period, MAIN_X + MAIN_W, y, { align: "right" });
    y += 4.5;

    // Company pill
    doc.setFont(FONT, "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MAIN_ACCENT);
    doc.text(item.company, MAIN_X, y);
    const compW = doc.getTextWidth(item.company);
    doc.setFont(FONT, "normal");
    doc.setTextColor(...MAIN_MUTED);
    doc.text(`  ·  ${item.location}`, MAIN_X + compW, y);
    y += 5;

    // Description as bullet points
    doc.setFont(FONT, "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...MAIN_DARK);
    const sentences = item.description
      .split(". ")
      .map((s) => s.replace(/\.$/, "").trim())
      .filter((s) => s.length > 0);

    for (const sentence of sentences) {
      y = ensureSpace(doc, y, 8);
      doc.setTextColor(...MAIN_MUTED);
      doc.text("▸", MAIN_X + 1, y);
      doc.setTextColor(...MAIN_DARK);
      y = drawWrapped(doc, sentence, MAIN_X + 5, y, MAIN_W - 5, 3.8);
      y += 0.8;
    }
    y += 3;
  }

  // ── Projects ──
  y = mainHeading(doc, t.projects.label, y);

  // Professional sub-heading
  y = ensureSpace(doc, y, 8);
  doc.setFont(FONT, "bold");
  doc.setFontSize(9);
  doc.setTextColor(...MAIN_DARK);
  doc.text(t.projects.professionalWork, MAIN_X, y);
  y += 5;

  for (const proj of t.projects.workProjects) {
    y = ensureSpace(doc, y, 10);
    doc.setFont(FONT, "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...MAIN_DARK);
    doc.text(`▸  ${proj.title}`, MAIN_X + 1, y);
    y += 3.8;
    doc.setFont(FONT, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MAIN_MUTED);
    y = drawWrapped(doc, proj.description, MAIN_X + 5, y, MAIN_W - 5, 3.6);
    y += 2;
  }

  y += 3;

  // Personal sub-heading
  y = ensureSpace(doc, y, 8);
  doc.setFont(FONT, "bold");
  doc.setFontSize(9);
  doc.setTextColor(...MAIN_DARK);
  doc.text(t.projects.personalProjects, MAIN_X, y);
  y += 5;

  for (const proj of t.projects.personal) {
    y = ensureSpace(doc, y, 10);
    doc.setFont(FONT, "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...MAIN_DARK);
    doc.text("▸  ", MAIN_X + 1, y);
    const bulletW = doc.getTextWidth("▸  ");
    const projUrl = proj.docs || `${t.resume.githubUrl}/${proj.repo}`;
    doc.setTextColor(...MAIN_ACCENT);
    doc.textWithLink(proj.title, MAIN_X + 1 + bulletW, y, { url: projUrl });
    doc.setTextColor(...MAIN_DARK);
    y += 3.8;
    doc.setFont(FONT, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MAIN_MUTED);
    y = drawWrapped(doc, proj.description, MAIN_X + 5, y, MAIN_W - 5, 3.6);
    y += 2;
  }

  // ── Certificates ──
  y = mainHeading(doc, t.certificates.label, y);

  for (const cert of t.certificates.items) {
    y = ensureSpace(doc, y, 8);
    doc.setFont(FONT, "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...MAIN_DARK);
    doc.text("▸  ", MAIN_X + 1, y);
    const certBulletW = doc.getTextWidth("▸  ");
    doc.setTextColor(...MAIN_ACCENT);
    doc.textWithLink(cert.name, MAIN_X + 1 + certBulletW, y, { url: cert.url });
    doc.setTextColor(...MAIN_DARK);
    y += 3.8;
    doc.setFont(FONT, "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MAIN_MUTED);
    doc.text(cert.issuer, MAIN_X + 5, y);
    y += 5;
  }

  // ── Footer on every page ──
  const pageCount = doc.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);

    // Sidebar footer accent bar
    doc.setFillColor(...SIDEBAR_ACCENT);
    doc.rect(0, PAGE_H - 4, SIDEBAR_W, 4, "F");

    // Main column footer
    doc.setDrawColor(...MAIN_LIGHT_BG);
    doc.setLineWidth(0.3);
    doc.line(MAIN_X, PAGE_H - 8, MAIN_X + MAIN_W, PAGE_H - 8);
    doc.setFont(FONT, "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MAIN_MUTED);
    doc.text(
      `${t.resume.name}  ·  ${t.resume.email}  ·  ${t.resume.website}  ·  ${t.resume.github}`,
      MAIN_X,
      PAGE_H - 5
    );
    if (pageCount > 1) {
      doc.text(`${p} / ${pageCount}`, MAIN_X + MAIN_W, PAGE_H - 5, {
        align: "right",
      });
    }
  }

  const safeName = t.resume.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .trim()
    .replace(/\s+/g, "_") || "Resume";
  doc.save(`${safeName}_Resume.pdf`);
}
