import FinoraHeader from "./FinoraHeader";
import { Dashboard, Metrics, Pricing, Reveal, Testimonials } from "./FinoraInteractive";
import { finora as c } from "./content";
import s from "./finora.module.css";

/**
 * Finora — a complete demo website rendered entirely from `content.ts`.
 *
 * Server-rendered apart from the mobile menu. The FAQ uses native <details>,
 * so it works with JavaScript disabled and needs no accordion logic.
 */

/* ---------- Inline icons (no dependency, no request) ---------- */

const ico = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function FeatureIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    flow: (
      <>
        <path d="M4 7h9a4 4 0 0 1 0 8H7" />
        <path d="m10 12-3 3 3 3" />
        <circle cx="18" cy="7" r="2" />
      </>
    ),
    cards: (
      <>
        <rect x="2.5" y="6" width="15" height="10" rx="2" />
        <path d="M2.5 9.5h15" />
        <path d="M6.5 20h11a3 3 0 0 0 3-3v-7" />
      </>
    ),
    insight: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-6" />
        <path d="M2.5 19h19" />
      </>
    ),
    approve: (
      <>
        <path d="m4 12 4.5 4.5L20 5.5" />
        <path d="M4 19h16" />
      </>
    ),
    sync: (
      <>
        <path d="M4 10a8 8 0 0 1 13.6-4.6L20 8" />
        <path d="M20 4v4h-4" />
        <path d="M20 14a8 8 0 0 1-13.6 4.6L4 16" />
        <path d="M4 20v-4h4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3.5 5 6.5v5c0 4.4 2.9 8.3 7 9.5 4.1-1.2 7-5.1 7-9.5v-5Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  };
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" {...ico} aria-hidden focusable={false}>
      {paths[name] ?? paths.flow}
    </svg>
  );
}

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...ico} strokeWidth={2.2} aria-hidden focusable={false}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

/* ---------- Page ---------- */

export default function Finora() {
  return (
    <div className={s.site}>
      <FinoraHeader />

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <span className={s.badge}>
                <span className={s.badgeDot} aria-hidden>
                  ✦
                </span>
                {c.hero.badge}
              </span>
              <h1 className={s.h1}>{c.hero.title}</h1>
              <p className={s.heroBody}>{c.hero.body}</p>
              <div className={s.heroActions}>
                <a href="#pricing" className={`${s.btn} ${s.btnPrimary}`}>
                  {c.hero.primary}
                </a>
                <a href="#product" className={`${s.btn} ${s.btnGhost}`}>
                  {c.hero.secondary}
                </a>
              </div>
              <p className={s.heroNote}>{c.hero.note}</p>
            </div>
            <Dashboard />
          </div>

          <div className={s.logoRow}>
            <span className={s.logoLabel}>Trusted by finance teams at</span>
            {c.logos.map((l) => (
              <span className={s.logoName} key={l}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className={s.section} style={{ paddingBlock: "clamp(30px, 4vw, 52px)" }}>
        <div className={s.wrap}>
          <Metrics />
        </div>
      </section>

      {/* Product split */}
      <section className={`${s.section} ${s.sectionAlt}`} id="product">
        <div className={s.wrap}>
          <div className={s.split}>
            <div>
              <span className={s.eyebrow}>{c.dashboard.eyebrow}</span>
              <h2 className={s.h2}>{c.dashboard.title}</h2>
              <p className={s.lead} style={{ marginTop: 16 }}>
                {c.dashboard.body}
              </p>
              <ul className={s.checkList}>
                {[
                  "Live balances across every account and card",
                  "Receipts matched automatically as spend lands",
                  "Approvals routed by amount, team or vendor",
                  "Exports your accountant will not send back",
                ].map((t) => (
                  <li className={s.checkItem} key={t}>
                    <span className={s.check} aria-hidden>
                      <Tick />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.panel} style={{ background: "#fff" }}>
              <div className={s.panelTitle}>{c.dashboard.chartLabel}</div>
              <div className={s.chart} aria-hidden>
                {c.dashboard.chart.map((h, i) => (
                  <i key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className={s.chartLabel}>
                Twelve months of net cash, updated as transactions settle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={s.section} id="features">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.features.eyebrow}</span>
            <h2 className={s.h2}>{c.features.title}</h2>
            <p className={s.lead}>{c.features.body}</p>
          </Reveal>
          <div className={s.featureGrid}>
            {c.features.items.map((f) => (
              <article className={s.featureCard} key={f.title}>
                <span className={s.featureIcon}>
                  <FeatureIcon name={f.icon} />
                </span>
                <h3 className={s.h3}>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className={`${s.section} ${s.security}`}>
        <div className={s.wrap}>
          <div className={s.securityGrid}>
            <div>
              <span className={s.eyebrow}>{c.security.eyebrow}</span>
              <h2 className={s.h2}>{c.security.title}</h2>
              <p className={s.lead} style={{ marginTop: 16, color: "#9DB3D6" }}>
                {c.security.body}
              </p>
              <div className={s.badgeRow}>
                {c.security.badges.map((b) => (
                  <span className={s.badgeChip} key={b}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.securityPoints}>
              {c.security.points.map((p) => (
                <div className={s.securityPoint} key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`${s.section} ${s.sectionAlt}`} id="pricing">
        <div className={s.wrap}>
          <Reveal className={`${s.head} ${s.headCenter}`}>
            <span className={s.eyebrow}>{c.pricing.eyebrow}</span>
            <h2 className={s.h2}>{c.pricing.title}</h2>
            <p className={s.lead}>{c.pricing.body}</p>
          </Reveal>
          <Pricing />
        </div>
      </section>

      {/* Testimonials */}
      <section className={s.section} id="customers">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.testimonials.eyebrow}</span>
            <h2 className={s.h2}>{c.testimonials.title}</h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className={`${s.section} ${s.sectionAlt}`} id="faq">
        <div className={s.wrap}>
          <Reveal className={`${s.head} ${s.headCenter}`}>
            <span className={s.eyebrow}>{c.faq.eyebrow}</span>
            <h2 className={s.h2}>{c.faq.title}</h2>
          </Reveal>
          <div className={s.faqList}>
            {c.faq.items.map((f) => (
              <details className={s.faqItem} key={f.q}>
                <summary className={s.faqQ}>{f.q}</summary>
                <p className={s.faqA}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className={s.section}>
        <div className={s.wrap}>
          <div className={s.closing}>
            <h2 className={s.h2}>{c.cta.title}</h2>
            <p className={s.closingBody}>{c.cta.body}</p>
            <div className={s.closingActions}>
              <a href="#pricing" className={`${s.btn} ${s.btnLight}`}>
                {c.cta.primary}
              </a>
              <a href="#product" className={`${s.btn} ${s.btnOutlineLight}`}>
                {c.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerGrid}>
            <div className={s.footerBrandCol}>
              <span className={s.brand}>
                <span className={s.brandMark} aria-hidden>
                  F
                </span>
                {c.brand.name}
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
            <span>{c.footer.address}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
