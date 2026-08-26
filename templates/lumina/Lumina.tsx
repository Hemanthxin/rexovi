import Image from "next/image";
import LuminaHeader from "./LuminaHeader";
import { GradeSlider, Reveal, Rotator, Services, WorkIndex } from "./LuminaInteractive";
import { lumina as c } from "./content";
import s from "./lumina.module.css";

/**
 * Lumina — a complete demo website rendered from `content.ts`.
 *
 * Editorial studio: warm paper, oversized type, hairline rules and almost no
 * rounding. Its signature interaction is a work index whose preview image
 * follows the cursor.
 */

function Arrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={s.btnArrow} aria-hidden>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export default function Lumina() {
  return (
    <div className={s.site}>
      <LuminaHeader />

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroTop}>
            <h1 className={s.display}>
              {c.hero.line1}
              <span className={s.heroLine2}>
                <Rotator />
              </span>
            </h1>
          </div>

          <div className={s.heroFoot}>
            <div>
              <p className={s.lead}>{c.hero.body}</p>
              <div className={s.heroActions}>
                <a href="#work" className={s.btn}>
                  {c.hero.cta}
                  <Arrow />
                </a>
                <a href="#studio" className={`${s.btn} ${s.btnGhost}`}>
                  {c.hero.secondary}
                </a>
              </div>
            </div>
            <div className={s.heroMeta}>
              {c.hero.meta.map((m) => (
                <div className={s.heroMetaItem} key={m.k}>
                  <span className={s.heroMetaK}>{m.k}</span>
                  <span className={s.heroMetaV}>{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discipline marquee */}
      <div className={s.marquee} aria-hidden>
        <div className={s.marqueeTrack}>
          {[...c.marquee, ...c.marquee].map((m, i) => (
            <span className={s.marqueeItem} key={i}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Work index */}
      <section className={s.section} id="work">
        <div className={s.wrap}>
          <Reveal className={s.secHead}>
            <div>
              <span className={s.label}>{c.work.eyebrow}</span>
              <h2 className={s.h2}>{c.work.title}</h2>
            </div>
            <p className={s.lead}>{c.work.body}</p>
          </Reveal>
          <WorkIndex />
        </div>
      </section>

      {/* Grade comparison */}
      <section className={s.section} style={{ background: "var(--l-paper-2)" }}>
        <div className={s.wrap}>
          <div className={s.gradeWrap}>
            <Reveal>
              <span className={s.label}>{c.grade.eyebrow}</span>
              <h2 className={s.h2} style={{ marginTop: 18 }}>
                {c.grade.title}
              </h2>
              <p className={s.lead} style={{ marginTop: 18 }}>
                {c.grade.body}
              </p>
            </Reveal>
            <Reveal delay={90}>
              <GradeSlider />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className={s.section} id="studio">
        <div className={s.wrap}>
          <div className={s.studioGrid}>
            <Reveal className={s.studioPhoto}>
              <Image
                src={c.studio.image}
                alt="The Lumina studio: a bright room with work tables and chairs"
                width={1400}
                height={900}
                sizes="(max-width: 1000px) 92vw, 620px"
              />
            </Reveal>
            <Reveal className={s.studioBody} delay={80}>
              <span className={s.label}>{c.studio.eyebrow}</span>
              <h2 className={s.h2}>{c.studio.title}</h2>
              {c.studio.body.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
              <div className={s.studioStats}>
                {c.studio.stats.map((st) => (
                  <div className={s.studioStat} key={st.k}>
                    <span className={s.studioStatV}>{st.v}</span>
                    <span className={s.studioStatK}>{st.k}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={s.section} id="services" style={{ background: "var(--l-paper-2)" }}>
        <div className={s.wrap}>
          <Reveal className={s.secHead}>
            <div>
              <span className={s.label}>{c.services.eyebrow}</span>
              <h2 className={s.h2}>{c.services.title}</h2>
            </div>
          </Reveal>
          <Services />
        </div>
      </section>

      {/* Recognition */}
      <section className={s.section} id="recognition">
        <div className={s.wrap}>
          <Reveal className={s.secHead}>
            <div>
              <span className={s.label}>{c.recognition.eyebrow}</span>
              <h2 className={s.h2}>{c.recognition.title}</h2>
            </div>
          </Reveal>
          <div className={s.awards}>
            {c.recognition.awards.map((a) => (
              <div className={s.award} key={a.title}>
                <span className={s.awardYear}>{a.year}</span>
                <span className={s.awardTitle}>{a.title}</span>
                <span className={s.awardOrg}>{a.org}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={`${s.section} ${s.contact}`} id="contact">
        <div className={s.wrap}>
          <div className={s.contactGrid}>
            <div>
              <span className={s.label}>{c.contact.eyebrow}</span>
              <h2 className={s.h2} style={{ marginTop: 18 }}>
                {c.contact.title}
              </h2>
              <p className={s.contactBody}>{c.contact.body}</p>
              <a href={`mailto:${c.contact.email}`} className={s.btn}>
                {c.contact.cta}
                <Arrow />
              </a>
            </div>

            <div className={s.contactDetails}>
              <div className={s.contactRow}>
                <span className={s.contactK}>Email</span>
                <span className={s.contactV}>
                  <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
                </span>
              </div>
              <div className={s.contactRow}>
                <span className={s.contactK}>Telephone</span>
                <span className={s.contactV}>{c.contact.phone}</span>
              </div>
              <div className={s.contactRow}>
                <span className={s.contactK}>Studio</span>
                <span className={s.contactV}>{c.contact.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footerInner}>
            <div className={s.footerBrandCol}>
              <div className={s.footerBrand}>{c.brand.name}</div>
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
            <span>{c.footer.note}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
