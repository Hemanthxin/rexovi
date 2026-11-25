import type { ReactNode } from "react";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { COMPANY, LEGAL_EMAIL, LEGAL_UPDATED } from "@/lib/site";
import s from "@/app/(main)/legal.module.css";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

/** How to reach us about legal / privacy matters — email once configured, else the contact form. */
export function ContactRoute() {
  return LEGAL_EMAIL ? (
    <>
      by email at <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> or through our{" "}
      <Link href="/contact">contact page</Link>
    </>
  ) : (
    <>
      through our <Link href="/contact">contact page</Link>
    </>
  );
}

export default function LegalPage({
  label,
  title,
  accent,
  intro,
  sections,
}: {
  label: string;
  title: string;
  accent: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <header className="page-head">
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">{label}</span>
              </Reveal>
              <h1 className="d-xl" style={{ maxWidth: "12ch" }}>
                <Reveal as="span" variant="mask">
                  {title}
                </Reveal>{" "}
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">{accent}</em>
                </Reveal>
              </h1>
            </div>
            <Reveal delay={140}>
              <p className="lead">{intro}</p>
            </Reveal>
          </div>
        </div>
      </header>

      <section aria-label={`${title} ${accent}`}>
        <div className="wrap">
          <div className={s.layout}>
            <nav className={s.toc} aria-label="On this page">
              <span className={s.tocTitle}>On this page</span>
              {sections.map((sec, i) => (
                <a key={sec.id} href={`#${sec.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {sec.title}
                </a>
              ))}
            </nav>

            <article className={s.doc}>
              <div className={s.meta}>
                <span>
                  Last updated <b>{LEGAL_UPDATED}</b>
                </span>
                <span>{COMPANY.legalName}</span>
                <span>CIN {COMPANY.cin}</span>
              </div>
              {sections.map((sec, i) => (
                <section key={sec.id} id={sec.id} className={s.section}>
                  <h2>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {sec.title}
                  </h2>
                  {sec.body}
                </section>
              ))}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
