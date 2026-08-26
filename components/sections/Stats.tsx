import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import { metrics } from "@/lib/content";
import s from "./Stats.module.css";

export default function Stats() {
  return (
    <section className={s.sec} aria-labelledby="stats-title">
      <div className="wrap">
        <h2 id="stats-title" className="sr-only">
          Rexovi Technologies at a glance
        </h2>

        <dl className={s.grid}>
          {metrics.map((m, i) => (
            <Reveal className={s.item} key={m.label} delay={i * 80}>
              <dd className={s.valueWrap}>
                <span className={s.value}>
                  <Counter value={m.value} />
                </span>
                <span className={s.note}>{m.note}</span>
              </dd>
              <dt className={s.label}>{m.label}</dt>
            </Reveal>
          ))}
        </dl>

        <Reveal className={s.caption}>
          <span className="dot-live" aria-hidden />
          Where we are today — the numbers that actually describe us
        </Reveal>
      </div>
    </section>
  );
}
