import Reveal from "@/components/site/Reveal";
import { processSteps } from "@/lib/content";
import s from "./Process.module.css";

/** A gentle wave connecting the five markers on desktop. */
const CURVE = "M 4 46 C 130 6, 240 86, 366 46 S 610 6, 736 46 S 980 86, 1096 46";

export default function Process() {
  return (
    <section className={`section ${s.sec}`} id="process" aria-labelledby="process-title">
      <span className="blueprint" aria-hidden />

      <div className="wrap">
        <div className="sec-head">
          <Reveal className="sec-head__top">
            <span className="label">Process / 08</span>
            <span className="label label--bare">Five stages, one direction</span>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="process-title" className="d-lg">
                From idea to <span className="serif-em accent-word">impact</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                The same path whether we are building our own product or yours. It is deliberately
                short — every stage has to earn its place.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className={s.track}>
          <svg className={s.path} viewBox="0 0 1100 92" preserveAspectRatio="none" aria-hidden>
            <path d={CURVE} />
            <path className={s.live} d={CURVE} />
          </svg>

          <ol className={s.steps}>
            {processSteps.map((step, i) => (
              <Reveal as="li" className={s.step} key={step.index} delay={i * 90}>
                <span className={s.marker}>{step.index}</span>
                <h3 className={s.title}>{step.title}</h3>
                <p className={s.body}>{step.body}</p>
                <p className={s.detail}>{step.detail}</p>
                <span className={s.stepRule} aria-hidden>
                  <i />
                </span>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
