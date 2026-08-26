import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/site/Icons";
import s from "./CTA.module.css";

const brief = [
  { k: "Type", v: "Website · App · Product" },
  { k: "Stage", v: "Idea or in progress" },
  { k: "Start", v: "A short conversation" },
];

export default function CTA() {
  return (
    <section className={s.sec} id="start" aria-labelledby="cta-title">
      <div className="wrap">
        <Reveal className={s.plate}>
          <span className={`${s.corner} ${s.c1}`} aria-hidden />
          <span className={`${s.corner} ${s.c2}`} aria-hidden />
          <span className={`${s.corner} ${s.c3}`} aria-hidden />
          <span className={`${s.corner} ${s.c4}`} aria-hidden />

          <div className={s.inner}>
            <div className={s.copy}>
              <span className="label label--accent">Start here / 09</span>

              <h2 id="cta-title" className={`d-lg ${s.title}`}>
                Have an idea <em>worth building?</em>
              </h2>

              <p className={s.body}>
                Let&apos;s turn it into something people can use, remember and love.
              </p>

              <div className={s.actions}>
                <Link href="/contact" className="btn btn--accent">
                  Start a Project
                  <ArrowRight className="btn__arrow" />
                </Link>
                <Link href="/contact#talk" className="btn btn--ghost">
                  Talk to Rexovi
                  <ArrowUpRight className="btn__arrow" />
                </Link>
              </div>

              <div className={s.meta}>
                <span>
                  <span className="dot-live" aria-hidden />
                  Open for new projects
                </span>
                <span>Replies within two working days</span>
              </div>
            </div>

            <div className={s.brief}>
              <div className={s.briefTop}>
                <span className="dot-live" aria-hidden />
                New brief · Draft
              </div>
              <div className={s.briefBody}>
                {brief.map((row) => (
                  <div className={s.briefRow} key={row.k}>
                    <span className={s.briefKey}>{row.k}</span>
                    <span className={s.briefVal}>{row.v}</span>
                  </div>
                ))}
              </div>
              <div className={s.briefFoot}>
                Step 01 / 05
                <span className={s.briefBar} aria-hidden>
                  <i />
                </span>
                Discover
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
