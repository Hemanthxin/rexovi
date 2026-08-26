"use client";

import Image from "next/image";
import { useState } from "react";
import { Booking, Doctors, Ico, Locations, Reveal, TextSize } from "./MedoraInteractive";
import { medora as c } from "./content";
import s from "./medora.module.css";

/**
 * Medora — a complete demo website rendered from `content.ts`.
 *
 * Healthcare: calm, roomy, large touch targets. Its signature interaction is
 * a four-step appointment booking flow; it also carries a text-size control,
 * because this is the kind of site people enlarge.
 *
 * The whole template is a client component so the text-size scale can be held
 * at the root and applied to every section at once.
 */
export default function Medora() {
  const [scale, setScale] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={s.site} style={{ ["--m-scale" as string]: scale }}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.wrap}>
          <div className={s.topBar}>
            <TextSize onChange={setScale} />
            <a href={`tel:${c.nav.call.replace(/\s/g, "")}`} className={s.topCall}>
              <Ico name="phone" size={16} />
              {c.nav.call}
            </a>
          </div>

          <div className={s.headerInner}>
            <a href="#" className={s.brand}>
              <span className={s.brandDot} aria-hidden />
              {c.brand.name}
              <span className={s.brandTag}>{c.brand.tagline}</span>
            </a>

            <nav className={s.navLinks} aria-label="Primary">
              {c.nav.links.map((l) => (
                <a key={l.href} href={l.href} className={s.navLink}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className={s.headerActions}>
              <a href="#doctors" className={`${s.btn} ${s.btnGhost}`}>
                Find a doctor
              </a>
              <a href="#book" className={`${s.btn} ${s.btnPrimary}`}>
                {c.nav.cta}
              </a>
              <button
                type="button"
                className={s.burger}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={s.mobileNav} data-open={menuOpen}>
          {c.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#book" className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} style={{ marginTop: 18 }} onClick={() => setMenuOpen(false)}>
            {c.nav.cta}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroGrid}>
            <div>
              <span className={s.heroBadge}>
                <i aria-hidden />
                {c.hero.badge}
              </span>
              <h1 className={s.h1}>{c.hero.title}</h1>
              <p className={s.heroBody}>{c.hero.body}</p>
              <div className={s.heroActions}>
                <a href="#book" className={`${s.btn} ${s.btnPrimary}`}>
                  {c.hero.primary}
                  <Ico name="arrow" size={17} />
                </a>
                <a href="#doctors" className={`${s.btn} ${s.btnGhost}`}>
                  {c.hero.secondary}
                </a>
              </div>
              <div className={s.assurances}>
                {c.hero.assurances.map((a) => (
                  <div className={s.assurance} key={a.k}>
                    <span className={s.assuranceV}>{a.v}</span>
                    <span className={s.assuranceK}>{a.k}</span>
                  </div>
                ))}
              </div>
              <p className={s.emergency}>
                <Ico name="alert" size={17} />
                {c.hero.emergency}
              </p>
            </div>

            <div className={`${s.quickGrid} ${s.quickGridHero}`}>
              {c.quickActions.map((q) => (
                <a href={q.href} className={s.quickCard} key={q.title}>
                  <span className={s.quickIcon}>
                    <Ico name={q.icon} size={21} />
                  </span>
                  <span className={s.quickTitle}>{q.title}</span>
                  <span className={s.quickBody}>{q.body}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialities */}
      <section className={s.section} id="specialities">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.specialities.eyebrow}</span>
            <h2 className={s.h2}>{c.specialities.title}</h2>
            <p className={s.lead}>{c.specialities.body}</p>
          </Reveal>
          <div className={s.specGrid}>
            {c.specialities.items.map((sp, i) => (
              <Reveal key={sp.id} delay={Math.min(i, 6) * 45}>
                <a href="#book" className={s.specCard}>
                  <span className={s.specIcon}>
                    <Ico name={sp.icon} size={21} />
                  </span>
                  <span className={s.specName}>{sp.name}</span>
                  <span className={s.specBlurb}>{sp.blurb}</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className={`${s.section} ${s.booking}`} id="book">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.booking.eyebrow}</span>
            <h2 className={s.h2}>{c.booking.title}</h2>
            <p className={s.lead}>{c.booking.body}</p>
          </Reveal>
          <Reveal>
            <Booking />
          </Reveal>
        </div>
      </section>

      {/* Doctors */}
      <section className={s.section} id="doctors">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.doctors.eyebrow}</span>
            <h2 className={s.h2}>{c.doctors.title}</h2>
            <p className={s.lead}>{c.doctors.body}</p>
          </Reveal>
          <Doctors />
        </div>
      </section>

      {/* Your visit */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.wrap}>
          <div className={s.splitGrid}>
            <Reveal>
              <span className={s.eyebrow}>{c.visit.eyebrow}</span>
              <h2 className={s.h2}>{c.visit.title}</h2>
              <p className={s.lead} style={{ marginTop: 14 }}>
                {c.visit.body}
              </p>
              <div className={s.visitSteps}>
                {c.visit.steps.map((v) => (
                  <div className={s.visitStep} key={v.n}>
                    <span className={s.visitN}>{v.n}</span>
                    <span>
                      <span className={s.visitT}>{v.t}</span>
                      <span className={s.visitB}>{v.b}</span>
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className={s.splitPhoto} delay={80}>
              <Image
                src={c.visit.image}
                alt="A doctor talking with a patient in a consulting room"
                width={1200}
                height={820}
                sizes="(max-width: 1040px) 92vw, 560px"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Diagnostics */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.splitGrid}>
            <Reveal className={s.splitPhoto}>
              <Image
                src={c.diagnostics.image}
                alt="Clinicians reviewing diagnostic scans on screen"
                width={1200}
                height={820}
                sizes="(max-width: 1040px) 92vw, 560px"
              />
            </Reveal>
            <Reveal delay={80}>
              <span className={s.eyebrow}>{c.diagnostics.eyebrow}</span>
              <h2 className={s.h2}>{c.diagnostics.title}</h2>
              <p className={s.lead} style={{ marginTop: 14 }}>
                {c.diagnostics.body}
              </p>
              <div className={s.chipRow}>
                {c.diagnostics.items.map((x) => (
                  <span className={s.chip} key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className={`${s.section} ${s.sectionAlt}`} id="locations">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.locations.eyebrow}</span>
            <h2 className={s.h2}>{c.locations.title}</h2>
            <p className={s.lead}>{c.locations.body}</p>
          </Reveal>
          <Locations />
        </div>
      </section>

      {/* Closing */}
      <section className={`${s.section} ${s.closing}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>{c.cta.title}</h2>
          <p className={s.closingBody}>{c.cta.body}</p>
          <div className={s.closingActions}>
            <a href="#book" className={`${s.btn} ${s.btnPrimary}`}>
              {c.cta.primary}
            </a>
            <a href={`tel:${c.nav.call.replace(/\s/g, "")}`} className={`${s.btn} ${s.btnGhost}`}>
              {c.cta.secondary}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerGrid}>
            <div className={s.footerBrandCol}>
              <span className={s.brand} style={{ color: "#fff" }}>
                <span className={s.brandDot} aria-hidden />
                {c.brand.name}
              </span>
              <p className={s.footerBlurb}>{c.footer.blurb}</p>
              <span className={s.footerEmergency}>
                <Ico name="alert" size={15} />
                {c.footer.emergency}
              </span>
            </div>
            {c.footer.columns.map((col) => (
              <div className={s.footerCol} key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={s.footerBase}>{c.footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
