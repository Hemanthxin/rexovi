import Link from "next/link";
import BrowserFrame from "@/components/mock/BrowserFrame";
import PhoneFrame from "@/components/mock/PhoneFrame";
import { SAAFERA_DESKTOP_RATIO, SaaferaDesktop, SaaferaMobile } from "@/components/mock/SaaferaPreview";
import Reveal from "@/components/site/Reveal";
import Tilt from "@/components/site/Tilt";
import { ArrowRight, ArrowUpRight } from "@/components/site/Icons";
import { saafera } from "@/lib/content";
import s from "./Saafera.module.css";

const uiCards = [
  { key: "u1", top: "Itineraries", value: "Smart", note: "Routes that make sense" },
  { key: "u2", top: "Budgets", value: "Real", note: "Costed before you go" },
  { key: "u3", top: "Surface", value: "Web · Mobile", note: "One product, two screens" },
] as const;

export default function SaaferaSpotlight() {
  return (
    <section className={s.wrapSec} id="saafera" aria-labelledby="saafera-title">
      <span className={s.glow} aria-hidden />
      <span className={s.glowB} aria-hidden />

      <div className={`wrap ${s.inner}`}>
        {/* ---------- Heading ---------- */}
        <div className={s.head}>
          <div>
            <Reveal>
              <span className={s.badge}>{saafera.label}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="saafera-title" className={s.wordmark}>
                {saafera.name}
                <span className={s.domain}>{saafera.domain}</span>
              </h2>
            </Reveal>
          </div>

          <div className={s.headRight}>
            <Reveal delay={140}>
              <p>
                <strong style={{ color: "#F4F2ED", fontWeight: 500 }}>{saafera.headline}</strong>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>{saafera.positioning}</p>
            </Reveal>
            <Reveal delay={260}>
              <Link href="/saafera" className="tlink">
                Explore Product
                <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>

        {/* ---------- Showcase ---------- */}
        <Reveal className={s.showcase} delay={120}>
          <Tilt className={s.stage}>
            <div className={s.stageInner}>
              <div className={s.desktop}>
                <BrowserFrame url={saafera.domain} tone="void" ratio={SAAFERA_DESKTOP_RATIO}>
                  <SaaferaDesktop />
                </BrowserFrame>
              </div>

              <PhoneFrame className={s.phone}>
                <SaaferaMobile />
              </PhoneFrame>

              {uiCards.map((c, i) => (
                <div key={c.key} className={`${s.uiCard} ${s[c.key]}`} style={{ ["--delay" as string]: `${i * 0.7}s` }}>
                  <span className={s.uiCardTop}>
                    <i aria-hidden />
                    {c.top}
                  </span>
                  <span className={s.uiCardValue}>{c.value}</span>
                  <span className={s.uiCardNote}>{c.note}</span>
                </div>
              ))}

            </div>
          </Tilt>
        </Reveal>

        {/* ---------- Pillars + facts ---------- */}
        <div className={s.grid}>
          <div className={s.pillars}>
            {saafera.pillars.map((p, i) => (
              <Reveal className={s.pillar} key={p.title} delay={i * 90}>
                <span className={s.pillarIdx}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.pillarTitle}>{p.title}</h3>
                <p className={s.pillarBody}>{p.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <dl className={s.facts}>
              {saafera.facts.map((f) => (
                <div className={s.fact} key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
              <div className={s.factsCta}>
                <Link href="/saafera" className="btn btn--accent" style={{ justifyContent: "center" }}>
                  Explore Product
                  <ArrowUpRight className="btn__arrow" />
                </Link>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
