import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import TemplateBrowser from "@/components/templates/TemplateBrowser";
import { ArrowRight } from "@/components/site/Icons";
import { templates } from "@/lib/templates";
import s from "./TemplatesTeaser.module.css";

export default function TemplatesTeaser() {
  const shown = templates.slice(0, 6);

  return (
    <section className={`section ${s.sec}`} id="templates" aria-labelledby="templates-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="sec-head__top">
            <span className="label">Templates / 04</span>
            <span className="label label--bare">{templates.length} designs · 9 categories</span>
          </Reveal>
          <div className="sec-head__body">
            <div>
              <Reveal>
                <h2 id="templates-title" className="d-lg">
                  Explore our <span className="serif-em accent-word">templates</span>
                </h2>
              </Reveal>
              <Reveal className={s.headExtras} delay={80}>
                <span className="chip">Ready to launch</span>
                <span className="chip">Fully responsive</span>
                <span className="chip">Built by Rexovi</span>
              </Reveal>
            </div>
            <Reveal delay={110}>
              <p className="lead">
                Website templates we design and build in-house — a finished starting point when you
                need a site fast, and a foundation we can customise around your business.
              </p>
            </Reveal>
          </div>
        </div>

        <div className={s.railWrap}>
          <TemplateBrowser items={shown} variant="rail" />
        </div>

        <div className={s.swipeHint} aria-hidden>
          <i />
          Swipe to browse
        </div>

        <div className={s.foot}>
          <p className={s.footNote}>
            <b>Every template is a real design, not a mockup.</b> Preview one, then use it as-is or
            let us build on top of it.
          </p>
          <Link href="/templates" className="btn">
            Browse All Templates
            <ArrowRight className="btn__arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
