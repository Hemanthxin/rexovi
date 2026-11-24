import Link from "next/link";
import BrowserFrame from "@/components/mock/BrowserFrame";
import Reveal from "@/components/site/Reveal";
import Tilt from "@/components/site/Tilt";
import { ArrowRight, ArrowUpRight, Layers } from "@/components/site/Icons";
import { capabilities } from "@/lib/content";
import { SITE_HOST } from "@/lib/site";
import s from "./Hero.module.css";

/* Floating ecosystem nodes orbiting the console. */
interface EcosystemNode {
  key: "f1" | "f2" | "f3" | "f4" | "f5";
  name: string;
  meta: string;
  glyph: string;
  flagship?: boolean;
}

const nodes: EcosystemNode[] = [
  { key: "f1", name: "Saafera.com", meta: "Product 01", glyph: "S", flagship: true },
  { key: "f2", name: "Web Development", meta: "Service", glyph: "W" },
  { key: "f3", name: "Mobile Apps", meta: "iOS · Android", glyph: "M" },
  { key: "f4", name: "UI/UX", meta: "Design", glyph: "U" },
  { key: "f5", name: "Digital Products", meta: "Build", glyph: "D" },
];

const barHeights = [38, 62, 44, 88, 52, 70, 46, 94, 58, 76, 50, 84];

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title">
      <span className="blueprint" aria-hidden />

      <div className="wrap">
        <div className={s.grid}>
          {/* ---------- Copy ---------- */}
          <div className={s.copy}>
            <Reveal className={s.eyebrow} delay={40}>
              <span className="chip chip--accent">
                <span className="dot-live" aria-hidden />
                Rexovi Technologies
              </span>
              <span className={s.eyebrowRule} aria-hidden />
              <span className="label label--bare">Digital Product Company</span>
            </Reveal>

            <h1 id="hero-title" className={`d-xl ${s.title}`}>
              <Reveal as="span" variant="mask" delay={60}>
                We build digital
              </Reveal>
              <Reveal as="span" variant="mask" delay={150}>
                products people
              </Reveal>
              <Reveal as="span" variant="mask" delay={240}>
                <em>remember.</em>
              </Reveal>
            </h1>

            <Reveal delay={340}>
              <p className="lead">
                Rexovi Technologies creates websites, mobile applications and digital products that
                turn ambitious ideas into powerful experiences.
              </p>
            </Reveal>

            <Reveal className={s.actions} delay={420}>
              <Link href="/contact" className="btn">
                Start a Project
                <ArrowRight className="btn__arrow" />
              </Link>
              <Link href="/work" className="btn btn--ghost">
                Explore Our Work
                <ArrowUpRight className="btn__arrow" />
              </Link>
            </Reveal>

            <Reveal className={s.trust} delay={500}>
              <span>
                <b>Product 01</b> Saafera
              </span>
              <span>
                <b>05</b> Build disciplines
              </span>
              <span>
                <b>10</b> Website templates
              </span>
            </Reveal>
          </div>

          {/* ---------- Ecosystem stage ---------- */}
          <Reveal className={s.stage} delay={260}>
            <Tilt className={s.stageInner}>
              <BrowserFrame url={`${SITE_HOST}/console`} ratio="16 / 11" className={s.console}>
                <div className={s.cs}>
                  <div className={s.csTop}>
                    <span className={s.csTitle}>Rexovi Console</span>
                    <span className={s.csLive}>
                      <span className="dot-live" aria-hidden />
                      Building
                    </span>
                  </div>

                  <div className={s.csBody}>
                    <div className={s.mod}>
                      <span className={s.modHead}>
                        <i aria-hidden />
                        Products
                      </span>
                      <span className={s.modValue}>01</span>
                      <span className={s.modLines} aria-hidden>
                        <i />
                        <i />
                      </span>
                    </div>

                    <div className={s.mod}>
                      <span className={s.modHead}>
                        <i aria-hidden />
                        Velocity
                      </span>
                      <span className={s.modBar} aria-hidden>
                        {barHeights.map((h, i) => (
                          <i key={i} style={{ height: `${h}%` }} />
                        ))}
                      </span>
                    </div>

                    <div className={s.mod}>
                      <span className={s.modHead}>
                        <i aria-hidden />
                        Templates
                      </span>
                      <span className={s.modValue}>10</span>
                      <span className={s.modLines} aria-hidden>
                        <i />
                        <i />
                        <i />
                      </span>
                    </div>

                    <div className={s.mod}>
                      <span className={s.modHead}>
                        <i aria-hidden />
                        Surfaces
                      </span>
                      <span className={s.modLines} aria-hidden>
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className={s.modBar} aria-hidden>
                        {barHeights.slice(0, 8).map((h, i) => (
                          <i key={i} style={{ height: `${100 - h}%` }} />
                        ))}
                      </span>
                    </div>
                  </div>

                  <div className={s.csFoot}>
                    <span className={s.csPill} data-hot="true">
                      Saafera
                    </span>
                    <span className={s.csPill}>Web</span>
                    <span className={s.csPill}>Mobile</span>
                    <span className={s.csPill}>Design</span>
                  </div>
                </div>
              </BrowserFrame>

              {nodes.map((n, i) => (
                <div
                  key={n.key}
                  className={`${s.float} ${s[n.key]}`}
                  data-flag={n.flagship ? "true" : "false"}
                  style={{ ["--delay" as string]: `${i * 0.45}s` }}
                >
                  <span className={s.floatGlyph} aria-hidden>
                    {n.flagship ? <Layers size={14} /> : <span style={{ fontSize: 12, fontWeight: 700 }}>{n.glyph}</span>}
                  </span>
                  <span className={s.floatText}>
                    <span className={s.floatName}>{n.name}</span>
                    <span className={s.floatMeta}>{n.meta}</span>
                  </span>
                </div>
              ))}
            </Tilt>
          </Reveal>
        </div>

        {/* ---------- Capability marquee ---------- */}
        <div className={s.marquee} aria-hidden>
          <div className={s.marqueeTrack}>
            {[...capabilities, ...capabilities].map((c, i) => (
              <span className={s.marqueeItem} key={i}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
