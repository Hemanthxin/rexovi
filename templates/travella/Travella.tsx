"use client";

import Image from "next/image";
import { useState } from "react";
import { Estimator, Finder, Guides, Ico, Itinerary, Reveal, Reviews } from "./TravellaInteractive";
import { travella as c } from "./content";
import s from "./travella.module.css";

/**
 * Travella — a complete demo website rendered from `content.ts`.
 *
 * Travel: photography-led and warm, with the trip itself as the interface.
 * Its signature piece is the day-by-day itinerary scrubber, which draws the
 * altitude profile of the journey underneath the timeline — the one piece of
 * information a Himalayan trip actually turns on.
 */
export default function Travella() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={s.site}>
      {/* Header */}
      <header className={s.header}>
        <div className={s.wrap}>
          <div className={s.headerInner}>
            <a href="#" className={s.brand}>
              <span className={s.brandMark} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                  <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
              </span>
              <span className={s.brandText}>
                {c.brand.name}
                <span className={s.brandTag}>{c.brand.tagline}</span>
              </span>
            </a>

            <nav className={s.navLinks} aria-label="Primary">
              {c.nav.links.map((l) => (
                <a key={l.href} href={l.href} className={s.navLink}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className={s.headerActions}>
              <a href={`tel:${c.nav.phone.replace(/\s/g, "")}`} className={s.headerPhone}>
                <Ico name="phone" size={15} />
                {c.nav.phone}
              </a>
              <a href="#cost" className={`${s.btn} ${s.btnPrimary}`}>
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
          <a href="#cost" className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} onClick={() => setMenuOpen(false)}>
            {c.nav.cta}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.heroImage}>
          <Image
            src={c.hero.image}
            alt={c.hero.imageAlt}
            width={1600}
            height={1067}
            priority
            quality={90}
            sizes="100vw"
          />
        </div>

        <div className={s.wrap}>
          <div className={s.heroInner}>
            <span className={s.heroKicker}>{c.hero.kicker}</span>
            <h1 className={s.h1}>{c.hero.title}</h1>
            <p className={s.heroBody}>{c.hero.body}</p>
            <div className={s.heroActions}>
              <a href="#trips" className={`${s.btn} ${s.btnPrimary}`}>
                {c.hero.primary}
                <Ico name="arrow" size={17} />
              </a>
              <a href="#itinerary" className={`${s.btn} ${s.btnGlass}`}>
                {c.hero.secondary}
              </a>
            </div>
          </div>
        </div>

        <div className={s.heroStats}>
          <div className={s.wrap}>
            <div className={s.statRow}>
              {c.hero.stats.map((st) => (
                <div className={s.stat} key={st.k}>
                  <span className={s.statV}>{st.v}</span>
                  <span className={s.statK}>{st.k}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className={s.marquee} aria-hidden>
        <div className={s.marqueeTrack}>
          {[0, 1].map((copy) => (
            <span className={s.marqueeSet} key={copy}>
              {c.hero.marquee.map((m) => (
                <span className={s.marqueeItem} key={m}>
                  {m}
                  <i />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Trips */}
      <section className={s.section} id="trips">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.finder.eyebrow}</span>
            <h2 className={s.h2}>{c.finder.title}</h2>
            <p className={s.lead}>{c.finder.body}</p>
          </Reveal>
          <Finder />
        </div>
      </section>

      {/* Itinerary */}
      <section className={`${s.section} ${s.dark}`} id="itinerary">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.itinerary.eyebrow}</span>
            <h2 className={s.h2}>{c.itinerary.title}</h2>
            <p className={s.lead}>{c.itinerary.body}</p>
            <p className={s.itinMeta}>{c.itinerary.tripMeta}</p>
          </Reveal>
          <Reveal>
            <Itinerary />
          </Reveal>
        </div>
      </section>

      {/* Promise */}
      <section className={s.section}>
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.promise.eyebrow}</span>
            <h2 className={s.h2}>{c.promise.title}</h2>
          </Reveal>
          <div className={s.promiseGrid}>
            {c.promise.items.map((p, i) => (
              <Reveal key={p.n} delay={Math.min(i, 6) * 45}>
                <div className={s.promise}>
                  <span className={s.promiseN}>{p.n}</span>
                  <h3 className={s.promiseT}>{p.t}</h3>
                  <p className={s.promiseB}>{p.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className={`${s.section} ${s.sand}`} id="guides">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.guides.eyebrow}</span>
            <h2 className={s.h2}>{c.guides.title}</h2>
            <p className={s.lead}>{c.guides.body}</p>
          </Reveal>
          <Reveal>
            <Guides />
          </Reveal>
        </div>
      </section>

      {/* Cost */}
      <section className={s.section} id="cost">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.cost.eyebrow}</span>
            <h2 className={s.h2}>{c.cost.title}</h2>
            <p className={s.lead}>{c.cost.body}</p>
          </Reveal>
          <Reveal>
            <Estimator />
          </Reveal>

          <div className={s.inclusions}>
            <Reveal className={s.incCol}>
              <h3>
                <Ico name="check" size={17} />
                {c.cost.included.title}
              </h3>
              <ul className={s.incYes}>
                {c.cost.included.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className={s.incCol} delay={70}>
              <h3>
                <Ico name="cross" size={17} />
                {c.cost.excluded.title}
              </h3>
              <ul className={s.incNo}>
                {c.cost.excluded.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={`${s.section} ${s.sand}`}>
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.reviews.eyebrow}</span>
            <h2 className={s.h2}>{c.reviews.title}</h2>
          </Reveal>
          <Reveal>
            <Reviews />
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className={`${s.section} ${s.closing}`}>
        <div className={s.wrap}>
          <h2 className={s.h2}>{c.cta.title}</h2>
          <p className={s.closingBody}>{c.cta.body}</p>
          <div className={s.closingActions}>
            <a href="#trips" className={`${s.btn} ${s.btnPrimary}`}>
              {c.cta.primary}
            </a>
            <a href={`tel:${c.nav.phone.replace(/\s/g, "")}`} className={`${s.btn} ${s.btnGhost}`}>
              {c.cta.secondary}
            </a>
          </div>
          <p className={s.closingNote}>{c.cta.note}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerGrid}>
            <div className={s.footerBrandCol}>
              <span className={s.brand} style={{ color: "#fff" }}>
                <span className={s.brandMark} aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                    <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span className={s.brandText}>{c.brand.name}</span>
              </span>
              <p className={s.footerBlurb}>{c.footer.blurb}</p>
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
          <div className={s.footerBase}>
            <span>{c.footer.copyright}</span>
            <span className={s.footerLegal}>
              {c.footer.legal.map((l) => (
                <a href="#" key={l}>
                  {l}
                </a>
              ))}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
