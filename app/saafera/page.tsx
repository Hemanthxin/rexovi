import type { Metadata } from "next";
import Link from "next/link";
import BrowserFrame from "@/components/mock/BrowserFrame";
import PhoneFrame from "@/components/mock/PhoneFrame";
import { SAAFERA_DESKTOP_RATIO, SaaferaDesktop, SaaferaMobile } from "@/components/mock/SaaferaPreview";
import Reveal from "@/components/site/Reveal";
import Tilt from "@/components/site/Tilt";
import CTA from "@/components/sections/CTA";
import { ArrowRight, ArrowUpRight } from "@/components/site/Icons";
import { saafera } from "@/lib/content";
import s from "./saafera.module.css";

export const metadata: Metadata = {
  title: "Saafera — Rexovi Product 01",
  description:
    "Saafera is Rexovi Technologies' first digital product — smart travel planning for India. Discover places, build budget-friendly routes, compare stays and explore festivals and hidden gems.",
  alternates: { canonical: "/saafera" },
  openGraph: {
    title: "Saafera · Rexovi Product 01",
    description:
      "Smart travel planning for India — Rexovi's first digital product.",
    url: "/saafera",
  },
};

const surfaces = [
  { k: "Web", v: "A full desktop experience for researching and building an itinerary." },
  { k: "Mobile", v: "The same product, rebuilt for the screen people travel with." },
  { k: "Design system", v: "One shared language so both surfaces stay in step." },
];

export default function SaaferaPage() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Saafera",
    url: "https://saafera.com",
    description: saafera.positioning,
    brand: { "@type": "Brand", name: "Saafera" },
    manufacturer: { "@type": "Organization", name: "Rexovi Technologies" },
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <header className={s.hero}>
        <span className={s.plum} aria-hidden />
        <span className={s.ember} aria-hidden />

        <div className={`wrap ${s.heroInner}`}>
          <div className={s.heroGrid}>
            <div>
              <Reveal>
                <span className={s.badge}>{saafera.label}</span>
              </Reveal>

              <h1 className={s.title}>
                <Reveal as="span" variant="mask" delay={60}>
                  Saafera
                </Reveal>
              </h1>

              <Reveal delay={110}>
                <p className={s.motto}>{saafera.motto}</p>
              </Reveal>

              <Reveal delay={140}>
                <p className={s.tagline}>{saafera.headline}</p>
              </Reveal>
              <Reveal delay={200}>
                <p className={s.sub}>{saafera.positioning}</p>
              </Reveal>

              <Reveal className={s.actions} delay={260}>
                <a
                  href="https://saafera.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--accent"
                >
                  Visit saafera.com
                  <ArrowUpRight className="btn__arrow" />
                </a>
                <Link href="/contact" className="btn btn--void">
                  Build something like this
                  <ArrowRight className="btn__arrow" />
                </Link>
              </Reveal>

              <Reveal className={s.factStrip} delay={320}>
                {saafera.facts.map((f) => (
                  <span key={f.k}>
                    {f.k}
                    <b>{f.v}</b>
                  </span>
                ))}
              </Reveal>
            </div>

            <Reveal delay={200}>
              <Tilt className={s.devices}>
                <div className={s.devicesInner}>
                  <PhoneFrame className={s.heroPhone}>
                    <SaaferaMobile priority />
                  </PhoneFrame>
                  <span className={`${s.heroChip} ${s.hc1}`}>
                    <i aria-hidden />
                    Discover
                  </span>
                  <span className={`${s.heroChip} ${s.hc2}`}>
                    <i aria-hidden />
                    Plan
                  </span>
                  <span className={`${s.heroChip} ${s.hc3}`}>
                    <i aria-hidden />
                    Experience
                  </span>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </header>

      {/* ---------- Showcase ---------- */}
      <section className={s.showcase} aria-label="Saafera product showcase">
        <div className={`wrap ${s.showcaseInner}`}>
          <Reveal>
            <Tilt className={s.stage}>
              <div className={s.stageInner}>
                <div className={s.desktop}>
                  <BrowserFrame url={saafera.domain} tone="void" ratio={SAAFERA_DESKTOP_RATIO}>
                    <SaaferaDesktop />
                  </BrowserFrame>
                </div>
                <PhoneFrame className={s.sidePhone}>
                  <SaaferaMobile />
                </PhoneFrame>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className={`section ${s.story}`} aria-labelledby="story-title">
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="sec-head__top">
              <span className="label">The story</span>
              <span className="label label--bare">Idea → Product</span>
            </Reveal>
          </div>

          <div className={s.storyGrid}>
            <Reveal>
              <h2 id="story-title" className="d-md">
                We were also <span className="serif-em accent-word">the client.</span>
              </h2>
            </Reveal>
            <Reveal className={s.storyBody} delay={90}>
              {saafera.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <p>
                It is the clearest example of how we work: define the problem properly, design for
                the person on the other side, then build something that can keep changing after
                launch.
              </p>
            </Reveal>
          </div>

          <div className={s.pillarGrid}>
            {saafera.pillars.map((p, i) => (
              <Reveal className={s.pillarCell} key={p.title} delay={i * 90}>
                <span className={s.pillarIdx}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.pillarName}>{p.title}</h3>
                <p className={s.pillarBody}>{p.body}</p>
              </Reveal>
            ))}
          </div>

          <div className={s.pillarGrid}>
            {surfaces.map((p, i) => (
              <Reveal className={s.pillarCell} key={p.k} delay={i * 90}>
                <span className={s.pillarIdx}>Surface</span>
                <h3 className={s.pillarName}>{p.k}</h3>
                <p className={s.pillarBody}>{p.v}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Built by band ---------- */}
      <section className={s.band}>
        <div className="wrap">
          <div className={s.bandInner}>
            <div className={s.bandCopy}>
              <span className="label label--accent">Rexovi Product 01</span>
              <h2 className={s.bandTitle}>Designed, built and maintained by Rexovi Technologies.</h2>
              <p className={s.bandNote}>
                The same team is available for your product — from first sketch through to launch.
              </p>
            </div>
            <Link href="/work" className="btn btn--ghost">
              See more work
              <ArrowRight className="btn__arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
