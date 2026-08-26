import Image from "next/image";
import NexoraHeader from "./NexoraHeader";
import { Install, Integrations, Pricing, ProductTabs, Reveal } from "./NexoraInteractive";
import { nexora as c } from "./content";
import s from "./nexora.module.css";

/**
 * Nexora — a complete demo website rendered from `content.ts`.
 *
 * Deliberately a different shape from Finora: dark bookends, an asymmetric
 * bento grid, code surfaces and photography.
 */

/* ---------- Bento visuals ---------- */

function BentoVisual({ kind }: { kind: string }) {
  switch (kind) {
    case "deploy":
      return (
        <div className={s.vDeploy} aria-hidden>
          <span className={s.vBranch}>
            <i />
            main
            <span>deployed · 2m</span>
          </span>
          <span className={s.vBranch}>
            <i />
            feat/checkout
            <span>building · 12s</span>
          </span>
        </div>
      );

    case "regions":
      return (
        <div className={s.vRegions} aria-hidden>
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      );

    case "rollback":
      return (
        <div className={s.vRollback} aria-hidden>
          <span className={s.vRollbackRow} data-live="true">
            <b>v482</b> · live
          </span>
          <span className={s.vRollbackRow}>
            <b>v481</b> · 4h ago
          </span>
          <span className={s.vRollbackRow}>
            <b>v480</b> · yesterday
          </span>
        </div>
      );

    case "logs":
      return (
        <div className={s.vLogs} aria-hidden>
          <span>
            <b className={s.err}>ERR</b> /api/checkout 1204ms
          </span>
          <span>
            <b className={s.err}>ERR</b> /api/checkout 1198ms
          </span>
          <span>
            <b className={s.ok}>OK</b> rolled back to v481
          </span>
        </div>
      );

    case "team":
    default:
      return (
        <div className={s.vTeamPhoto}>
          <Image
            src="/templates/nexora/team.webp"
            alt="A product team reviewing work together around a table"
            width={900}
            height={600}
            sizes="(max-width: 1000px) 90vw, 560px"
          />
          <div className={s.vTeamOverlay} aria-hidden>
            {["DS", "AK", "MR", "JT"].map((i) => (
              <span className={s.vAvatar} key={i}>
                {i}
              </span>
            ))}
            <span className={s.vTeamMore}>+12 with access</span>
          </div>
        </div>
      );
  }
}

const spanClass: Record<string, string> = {
  wide: s.bentoWide,
  tall: s.bentoTall,
  std: s.bentoStd,
};

/* ---------- Page ---------- */

export default function Nexora() {
  return (
    <div className={s.site}>
      <NexoraHeader />

      {/* Hero */}
      <section className={s.hero}>
        <span className={s.heroMesh} aria-hidden />
        <span className={s.heroGrid} aria-hidden />
        <div className={`${s.wrap} ${s.heroInner}`}>
          <span className={s.heroBadge}>
            <span className={s.heroBadgeTag}>{c.hero.badge}</span>
            {c.hero.badgeText}
          </span>
          <h1 className={s.h1}>{c.hero.title}</h1>
          <p className={s.heroBody}>{c.hero.body}</p>
          <Install />
          <div className={s.heroActions}>
            <a href="#pricing" className={`${s.btn} ${s.btnPrimary}`}>
              {c.hero.primary}
            </a>
            <a href="#product" className={`${s.btn} ${s.btnVoid}`}>
              {c.hero.secondary}
            </a>
          </div>
          <p className={s.heroNote}>{c.hero.note}</p>

          <div className={s.stats}>
            {c.stats.map((st) => (
              <div className={s.stat} key={st.label}>
                <div className={s.statValue}>{st.value}</div>
                <div className={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>

          <div className={s.logoStrip}>
            <span className={s.logoLabel}>Deploying on Nexora</span>
            {c.logos.map((l) => (
              <span className={s.logoName} key={l}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bento platform grid */}
      <section className={s.section} id="platform">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.bento.eyebrow}</span>
            <h2 className={s.h2}>{c.bento.title}</h2>
            <p className={s.lead}>{c.bento.body}</p>
          </Reveal>

          <div className={s.bento}>
            {c.bento.cards.map((card, i) => (
              <Reveal key={card.title} className={`${s.bentoCard} ${spanClass[card.span]}`} delay={i * 60}>
                <span className={s.bentoKicker}>{card.kicker}</span>
                <h3 className={s.h3}>{card.title}</h3>
                <p>{card.body}</p>
                <div className={s.bentoVisual}>
                  <BentoVisual kind={card.visual} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product tabs */}
      <section className={`${s.section} ${s.sectionAlt}`} id="product">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.product.eyebrow}</span>
            <h2 className={s.h2}>{c.product.title}</h2>
          </Reveal>
          <ProductTabs />
        </div>
      </section>

      {/* Integrations */}
      <section className={s.section} id="integrations">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.integrations.eyebrow}</span>
            <h2 className={s.h2}>{c.integrations.title}</h2>
            <p className={s.lead}>{c.integrations.body}</p>
          </Reveal>
          <Integrations />
        </div>
      </section>

      {/* Customer story */}
      <section className={`${s.section} ${s.story}`}>
        <div className={s.wrap}>
          <div className={s.storyGrid}>
            <div className={s.storyPhoto}>
              <Image
                src="/templates/nexora/story.webp"
                alt="Two engineers pair programming at a desk of monitors"
                width={1400}
                height={933}
                sizes="(max-width: 1000px) 92vw, 560px"
              />
            </div>
            <div className={s.storyBody}>
              <span className={`${s.eyebrow} ${s.eyebrowVoid}`}>Customer story</span>
              <p className={s.quoteText}>“{c.quote.text}”</p>
              <div className={s.quoteWho}>
                <span className={s.quoteAvatar} aria-hidden>
                  {c.quote.initials}
                </span>
                <span>
                  <span className={s.quoteName}>{c.quote.name}</span>
                  <br />
                  <span className={s.quoteRole}>{c.quote.role}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`${s.section} ${s.sectionAlt}`} id="pricing">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.pricing.eyebrow}</span>
            <h2 className={s.h2}>{c.pricing.title}</h2>
            <p className={s.lead}>{c.pricing.body}</p>
          </Reveal>
          <Pricing />
        </div>
      </section>

      {/* Changelog */}
      <section className={s.section} id="changelog">
        <div className={s.wrap}>
          <Reveal className={s.head}>
            <span className={s.eyebrow}>{c.changelog.eyebrow}</span>
            <h2 className={s.h2}>{c.changelog.title}</h2>
          </Reveal>
          <div className={s.releases}>
            {c.changelog.releases.map((r) => (
              <article className={s.release} key={r.version}>
                <div className={s.releaseMeta}>
                  <span className={s.releaseVersion}>{r.version}</span>
                  <span className={s.releaseDate}>{r.date}</span>
                  <span
                    className={`${s.releaseTag} ${
                      r.tag === "feature" ? s.tagFeature : r.tag === "perf" ? s.tagPerf : s.tagFix
                    }`}
                  >
                    {r.tag}
                  </span>
                </div>
                <div>
                  <h3 className={s.releaseTitle}>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA over photography */}
      <section className={`${s.section} ${s.closing}`}>
        <Image
          className={s.closingPhoto}
          src="/templates/nexora/workshop.webp"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
        />
        <span className={s.closingScrim} aria-hidden />
        <div className={`${s.wrap} ${s.closingInner}`}>
          <h2 className={s.h2}>{c.cta.title}</h2>
          <p className={s.closingBody}>{c.cta.body}</p>
          <div className={s.closingActions}>
            <a href="#pricing" className={`${s.btn} ${s.btnPrimary}`}>
              {c.cta.primary}
            </a>
            <a href="#product" className={`${s.btn} ${s.btnVoid}`}>
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
              <span className={s.brand}>
                <span className={s.brandMark} aria-hidden>
                  {c.brand.mark}
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
            <span className={s.footerStatus}>
              <i aria-hidden />
              {c.footer.meta}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
