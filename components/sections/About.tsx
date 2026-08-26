import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/Icons";
import { LogoMark } from "@/components/site/Logo";
import s from "./About.module.css";

const ingredients = [
  { idx: "01", name: "Technology", note: "The engineering that has to hold up after launch." },
  { idx: "02", name: "Design", note: "Interfaces people understand without being taught." },
  { idx: "03", name: "Product thinking", note: "Deciding what should exist, and what shouldn't." },
  { idx: "04", name: "Innovation", note: "Trying the version nobody has bothered to build." },
];

/** Inner orbit = what we own. Outer orbit = what we build for others. */
const innerOrbit = [
  { label: "Saafera", a: "-70deg" },
  { label: "Products", a: "50deg" },
  { label: "Templates", a: "180deg" },
];
const outerOrbit = [
  { label: "Websites", a: "-20deg" },
  { label: "Web Apps", a: "18deg" },
  { label: "Mobile", a: "92deg" },
  { label: "UI/UX", a: "160deg" },
  { label: "Strategy", a: "232deg" },
];

const timeline = ["Idea", "Design", "Build", "Launch", "Grow"];

export default function About() {
  return (
    <section className={`section ${s.sec}`} id="about" aria-labelledby="about-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="sec-head__top">
            <span className="label">About / 07</span>
            <span className="label label--bare">The workshop behind the work</span>
          </Reveal>
        </div>

        <div className={s.grid}>
          <div className={s.copy}>
            <Reveal>
              <h2 id="about-title" className={`d-lg ${s.statement}`}>
                About <em>Rexovi</em>
              </h2>
            </Reveal>

            <Reveal className={s.paras} delay={80}>
              <p>
                <strong style={{ fontWeight: 500, color: "var(--ink)" }}>
                  Rexovi Technologies is a digital technology company focused on building meaningful
                  digital experiences, products and platforms.
                </strong>
              </p>
              <p>
                We combine technology, design, product thinking and innovation — not as separate
                departments handing work to each other, but as four things every decision has to
                satisfy at once.
              </p>
              <p>
                We are building our own products while helping other businesses create their digital
                experiences. Saafera came out of that first track. The templates and client work come
                out of the second. Both make the other sharper.
              </p>
            </Reveal>

            <Reveal className={s.pillars} delay={140}>
              {ingredients.map((p) => (
                <div className={s.pillar} key={p.name}>
                  <span className={s.pillarIdx}>{p.idx}</span>
                  <span className={s.pillarName}>{p.name}</span>
                  <span className={s.pillarNote}>{p.note}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={200}>
              <Link href="/about" className="tlink">
                More about Rexovi
                <ArrowRight />
              </Link>
            </Reveal>
          </div>

          {/* Abstract ecosystem — no stock photography, no team shots. */}
          <Reveal delay={120}>
            <div className={s.orbitWrap} role="img" aria-label="Diagram: Rexovi at the centre, with its own products in the inner orbit and client services in the outer orbit">
              <span className={`${s.ring}`} aria-hidden />
              <span className={`${s.ring} ${s.ring2}`} aria-hidden />
              <span className={`${s.ring} ${s.ring3}`} aria-hidden />
              <span className={s.ringSpin} aria-hidden />

              {outerOrbit.map((n, i) => (
                <span
                  className={s.slot}
                  key={n.label}
                  aria-hidden
                  style={{ ["--a" as string]: n.a, ["--r" as string]: "43cqi" }}
                >
                  <span
                    className={s.orbitNode}
                    data-soft="true"
                    style={{ ["--delay" as string]: `${i * 0.6}s`, ["--dur" as string]: `${7 + i}s` }}
                  >
                    <i />
                    {n.label}
                  </span>
                </span>
              ))}

              {innerOrbit.map((n, i) => (
                <span
                  className={s.slot}
                  key={n.label}
                  aria-hidden
                  style={{ ["--a" as string]: n.a, ["--r" as string]: "34cqi" }}
                >
                  <span
                    className={s.orbitNode}
                    style={{ ["--delay" as string]: `${0.3 + i * 0.7}s`, ["--dur" as string]: `${8 + i}s` }}
                  >
                    <i />
                    {n.label}
                  </span>
                </span>
              ))}

              <div className={s.core}>
                <span className={s.corePulse} aria-hidden />
                <span className={s.coreInner}>
                  <LogoMark size={26} className={s.coreGlyph} />
                  <span className={s.coreMark}>REXOVI</span>
                  <span className={s.coreNote}>Technologies</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className={s.timeline} delay={60}>
          <h3 className={s.timelineHead}>How anything here gets made</h3>
          <div className={s.chips}>
            {timeline.map((t, i) => (
              <span key={t} style={{ display: "contents" }}>
                <span className={s.chipStep}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  {t}
                </span>
                {i < timeline.length - 1 ? <ArrowRight size={14} className={s.arrow} /> : null}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
