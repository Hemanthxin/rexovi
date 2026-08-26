import Reveal from "@/components/site/Reveal";
import { principles } from "@/lib/content";
import s from "./Why.module.css";

export default function WhyRexovi() {
  return (
    <section className={s.sec} id="why" aria-labelledby="why-title">
      <div className={`wrap ${s.inner}`}>
        <div className={s.intro}>
          <div>
            <Reveal style={{ marginBottom: 22 }}>
              <span className="label label--void">Why Rexovi / 06</span>
            </Reveal>
            <h2 id="why-title" className={`d-lg ${s.statement}`}>
              <Reveal as="span" variant="mask" className={s.line1}>
                Technology is easy to talk about.
              </Reveal>
              <Reveal as="span" variant="mask" delay={110} className={s.line2}>
                Building something meaningful is harder.
              </Reveal>
            </h2>
          </div>

          <Reveal delay={160}>
            <p className={s.introBody}>
              Anyone can list frameworks. The difficult part is deciding what deserves to exist, then
              staying honest about it through every trade-off between the idea and the release. That
              decision-making is the actual work — and it is what we organise ourselves around.
            </p>
          </Reveal>
        </div>

        <ol className={s.track}>
          {principles.map((p, i) => (
            <Reveal as="li" className={s.node} key={p.index} delay={i * 90}>
              <span className={s.dot}>{p.index}</span>
              <h3 className={s.nodeTitle}>{p.title}</h3>
              <p className={s.nodeBody}>{p.body}</p>
              <span className={s.nodeBar} aria-hidden>
                <i />
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
