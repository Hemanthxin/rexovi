"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { finora as c } from "./content";
import s from "./finora.module.css";

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                        */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${s.reveal}${shown ? ` ${s.revealIn}` : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Metrics that count up                                                */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, run: boolean, decimals: number) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      // Reduced motion still gets the number, just without the count-up.
      if (calm) {
        setN(target);
        return;
      }
      const t = Math.min((now - start) / 1100, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setN(Number((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, decimals]);
  return n;
}

function Metric({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  // Split "₹840Cr" into prefix / number / suffix so any format animates.
  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  const raw = match ? match[2].replace(/,/g, "") : null;
  const target = raw ? Number(raw) : 0;
  const decimals = raw && raw.includes(".") ? raw.split(".")[1].length : 0;
  const grouped = Boolean(match && match[2].includes(","));

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [match]);

  const n = useCountUp(target, run, decimals);
  const shown = !match
    ? value
    : `${match[1]}${grouped ? n.toLocaleString("en-IN", { maximumFractionDigits: decimals }) : n.toFixed(decimals)}${match[3]}`;

  return (
    <div className={s.metric} ref={ref}>
      <div className={s.metricValue}>{shown}</div>
      <div className={s.metricLabel}>{label}</div>
    </div>
  );
}

export function Metrics() {
  return (
    <div className={s.metrics}>
      {c.metrics.map((m) => (
        <Metric key={m.label} value={m.value} label={m.label} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard with tabs                                                  */
/* ------------------------------------------------------------------ */

function ArrowUp() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function Dashboard() {
  const d = c.dashboard;
  const [tab, setTab] = useState(0);

  return (
    <div className={s.app}>
      <div className={s.appBar}>
        <span className={s.appDots} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <div className={s.appTabs} role="tablist" aria-label="Dashboard views">
          {d.tabs.map((t, i) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={i === tab}
              className={s.appTab}
              data-on={i === tab}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <span className={s.appLive}>
          <i aria-hidden />
          Live
        </span>
      </div>

      <div className={s.appBody}>
        {tab === 0 ? (
          <div className={s.balanceCard}>
            <div className={s.balanceLabel}>{d.balanceLabel}</div>
            <div className={s.balanceValue}>{d.balance}</div>
            <div className={s.balanceDelta}>
              <ArrowUp />
              {d.delta}
            </div>
            <div className={s.accounts}>
              {d.accounts.map((a) => (
                <div className={s.account} key={a.number}>
                  <span className={s.accountName}>{a.name}</span>
                  <span className={s.accountNo}>{a.number}</span>
                  <span className={s.accountAmt}>{a.amount}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === 0 || tab === 1 ? (
          <div className={s.panel}>
            <div className={s.panelTitle}>{d.spendTitle}</div>
            {d.spend.map((row, i) => (
              <div className={s.spendRow} key={row.label}>
                <div className={s.spendTop}>
                  <b>{row.label}</b>
                  <span>{row.amount}</span>
                </div>
                <div className={s.spendTrack}>
                  <span
                    className={s.spendFill}
                    style={{ width: `${row.pct}%`, transitionDelay: `${i * 70}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === 1 ? (
          <div className={s.panel}>
            <div className={s.panelTitle}>{d.chartLabel}</div>
            <div className={s.chart} aria-hidden>
              {d.chart.map((h, i) => (
                <i key={i} style={{ height: `${h}%`, transitionDelay: `${i * 35}ms` }} />
              ))}
            </div>
          </div>
        ) : null}

        {tab === 2 ? (
          <div className={s.panel}>
            <div className={s.panelTitle}>{d.activityTitle}</div>
            <div className={s.activity}>
              {d.activity.map((a) => (
                <div className={s.activityRow} key={a.what}>
                  <span className={s.avatar} aria-hidden>
                    {a.who
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className={s.activityText}>
                    <span className={s.activityWho}>{a.who}</span>
                    <span className={s.activityWhat}> · {a.what}</span>
                  </span>
                  <span className={s.activityAmt}>
                    <b>{a.amount}</b>
                    <span className={`${s.pill} ${a.state === "pending" ? s.pillPending : s.pillCleared}`}>
                      {a.state === "pending" ? "Awaiting" : "Cleared"}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing with a billing toggle                                        */
/* ------------------------------------------------------------------ */

function Tick() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);
  const t = c.pricing.toggle;

  return (
    <>
      <div className={s.billingWrap}>
      <div className={s.billing} role="group" aria-label="Billing period">
        <button
          type="button"
          className={s.billingBtn}
          data-on={!annual}
          aria-pressed={!annual}
          onClick={() => setAnnual(false)}
        >
          {t.monthly}
        </button>
        <button
          type="button"
          className={s.billingBtn}
          data-on={annual}
          aria-pressed={annual}
          onClick={() => setAnnual(true)}
        >
          {t.annual}
          <span className={s.billingSave}>{t.save}</span>
        </button>
      </div>
      </div>

      <div className={s.pricingGrid}>
        {c.pricing.tiers.map((tier) => (
          <div className={`${s.tier}${tier.featured ? ` ${s.tierFeatured}` : ""}`} key={tier.name}>
            {tier.featured ? <span className={s.tierTag}>Most popular</span> : null}
            <div>
              <div className={s.tierName}>{tier.name}</div>
              <div className={s.tierPrice}>
                <b key={annual ? "a" : "m"} className={s.tierPriceValue}>
                  {annual ? tier.priceAnnual : tier.price}
                </b>
                <span>{annual ? tier.cadenceAnnual : tier.cadence}</span>
              </div>
            </div>
            <p className={s.tierSummary}>{tier.summary}</p>
            <a href="#" className={`${s.btn} ${tier.featured ? s.btnPrimary : s.btnGhost} ${s.btnBlock}`}>
              {tier.cta}
            </a>
            <ul className={s.tierList}>
              {tier.features.map((f) => (
                <li key={f}>
                  <span className={s.check} aria-hidden>
                    <Tick />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonial carousel                                                 */
/* ------------------------------------------------------------------ */

export function Testimonials() {
  const [i, setI] = useState(0);
  const items = c.testimonials.items;

  return (
    <>
      <div className={s.quoteGrid}>
        {items.map((t, idx) => (
          <figure className={s.quote} key={t.name} data-active={idx === i}>
            <blockquote className={s.quoteText}>“{t.quote}”</blockquote>
            <figcaption className={s.quoteWho}>
              <span className={s.avatar} aria-hidden>
                {t.initials}
              </span>
              <span>
                <span className={s.quoteName}>{t.name}</span>
                <br />
                <span className={s.quoteRole}>{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Only surfaces below the grid breakpoint, where one quote shows at a time. */}
      <div className={s.quoteDots}>
        {items.map((t, idx) => (
          <button
            key={t.name}
            type="button"
            className={s.quoteDot}
            data-on={idx === i}
            aria-label={`Show quote from ${t.name}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </>
  );
}
