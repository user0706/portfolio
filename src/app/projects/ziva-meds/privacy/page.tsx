import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Z } from "../DeviceMockups";
import { parsePolicyBody, policyAnchor, privacyPolicy } from "./privacy-policy";

const title = "Ziva Meds — Privacy Policy";
const description =
  "How Ziva Meds handles information: everything you enter stays on your device, nothing is sent to the developer, and you control backups, exports and sharing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects/ziva-meds/privacy" },
  openGraph: {
    title,
    description,
    type: "article",
    url: "/projects/ziva-meds/privacy",
    images: [{ url: "/projects/ziva/og-image.png", width: 2400, height: 1260, alt: "Ziva Meds app icon" }],
  },
  robots: { index: true, follow: true },
};

export default function ZivaMedsPrivacyPage() {
  const { appName, lastUpdated, intro, sections } = privacyPolicy;

  return (
    <>
      <header
        className="sticky top-0 z-40"
        style={{ background: Z.material, backdropFilter: "blur(20px)", borderBottom: `1px solid ${Z.divider}` }}
      >
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-5">
          <Link href="/projects/ziva-meds" className="flex items-center gap-2.5" style={{ color: Z.ink }}>
            <Image src="/projects/ziva/AppLogo.svg" alt="" width={20} height={20} aria-hidden />
            <span className="text-[0.8125rem] font-semibold tracking-tight">{appName}</span>
          </Link>
          <Link
            href="/projects/ziva-meds"
            className="ziva-navlink inline-flex items-center gap-1 text-[0.75rem] font-medium"
          >
            <span aria-hidden>‹</span> Back to {appName}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-14 md:pt-20">
        <p className="ziva-eyebrow">Legal</p>
        <h1 className="ziva-headline mt-3 text-[2.25rem] md:text-[2.75rem]" style={{ color: Z.ink }}>
          Privacy Policy
        </h1>
        <p className="mt-3 text-[0.9375rem]" style={{ color: Z.placeholder }}>
          Last updated: {lastUpdated}
        </p>

        <article className="mt-10">
          <Blocks body={intro} lead />

          <nav aria-label="Sections" className="ziva-card mt-10 rounded-[28px] p-6 md:p-8">
            <p className="text-[0.8125rem] font-semibold uppercase tracking-wide" style={{ color: Z.placeholder }}>
              Contents
            </p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
              {sections.map((section) => (
                <li key={section.title}>
                  <a href={`#${policyAnchor(section.title)}`} className="ziva-navlink">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((section) => (
            <section
              key={section.title}
              id={policyAnchor(section.title)}
              className="scroll-mt-20 pt-12"
            >
              <h2 className="ziva-headline text-[1.375rem] md:text-[1.5rem]" style={{ color: Z.ink }}>
                {section.title}
              </h2>
              <div className="mt-4">
                <Blocks body={section.body} />
              </div>
            </section>
          ))}
        </article>
      </main>

      <footer className="py-9" style={{ borderTop: `1px solid ${Z.divider}` }}>
        <div
          className="ziva-small mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-[0.75rem] sm:flex-row"
          style={{ color: Z.placeholder }}
        >
          <div className="flex items-center gap-2.5">
            <Image src="/projects/ziva/AppLogo.svg" alt="" width={18} height={18} aria-hidden />
            <span>{appName} · Privacy Policy</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/projects/ziva-meds" className="ziva-navlink">
              About the app
            </Link>
            <a href={`mailto:${privacyPolicy.contactEmail}`} className="ziva-navlink">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

/** Renders a policy body as paragraphs and bullet lists. */
function Blocks({ body, lead = false }: { body: string; lead?: boolean }) {
  const blocks = parsePolicyBody(body);
  const textClass = lead ? "text-[1.0625rem] leading-relaxed" : "text-[1rem] leading-relaxed";

  return (
    <div className="space-y-4">
      {blocks.map((block, index) =>
        block.kind === "list" ? (
          <ul key={index} className={`${textClass} list-disc space-y-1.5 pl-6`} style={{ color: Z.secondary }}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index} className={textClass} style={{ color: lead ? Z.ink : Z.secondary }}>
            {block.text}
          </p>
        ),
      )}
    </div>
  );
}
