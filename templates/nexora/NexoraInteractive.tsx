"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { nexora as c } from "./content";
import s from "./nexora.module.css";

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                        */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
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
/* Install command: package-manager tabs + copy                         */
/* ------------------------------------------------------------------ */

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {done ? (
        <path d="m5 12.5 4.5 4.5L19 7" />
      ) : (
        <>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </>
      )}
    </svg>
  );
}

export function Install() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const active = c.hero.installs[i];

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(active.command);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). Select the
      // text instead so the visitor can copy it by hand.
      const el = document.getElementById("nexora-install-cmd");
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }

  return (
    <div className={s.install}>
      <div className={s.installTabs} role="tablist" aria-label="Package manager">
        {c.hero.installs.map((inst, idx) => (
          <button
            key={inst.manager}
            type="button"
            role="tab"
            aria-selected={idx === i}
            className={s.installTab}
            data-on={idx === i}
            onClick={() => setI(idx)}
          >
            {inst.manager}
          </button>
        ))}
      </div>
      <div className={s.installRow}>
        <code className={s.installCmd} id="nexora-install-cmd">
          <b>$</b>
          {active.command}
        </code>
        <button type="button" className={s.copy} onClick={copy} data-done={copied}>
          <CopyIcon done={copied} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Product tabs with code samples                                       */
/* ------------------------------------------------------------------ */

/** Very small highlighter — enough to make a demo snippet read as code. */
function line(text: string) {
  if (/^\s*(\/\/|#)/.test(text)) return <span className={s.cm}>{text}</span>;
  if (/^\s*[✓→]/.test(text) || /^\s+✓/.test(text)) return <span className={s.ok}>{text}</span>;
  const parts = text.split(/('[^']*')/g);
  return parts.map((p, i) =>
    p.startsWith("'") ? (
      <span className={s.st} key={i}>
        {p}
      </span>
    ) : (
      <span key={i}>
        {p.split(/\b(import|export|default|const|from|return)\b/g).map((w, j) =>
          ["import", "export", "default", "const", "from", "return"].includes(w) ? (
            <span className={s.kw} key={j}>
              {w}
            </span>
          ) : (
            w
          ),
        )}
      </span>
    ),
  );
}

export function ProductTabs() {
  const [key, setKey] = useState(c.product.tabs[0].key);
  const tab = c.product.tabs.find((t) => t.key === key) ?? c.product.tabs[0];

  return (
    <div className={s.productGrid}>
      <div className={s.tabRail} role="tablist" aria-label="How Nexora works">
        {c.product.tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === key}
            className={s.tabBtn}
            data-on={t.key === key}
            onClick={() => setKey(t.key)}
          >
            <span className={s.tabLabel}>{t.label}</span>
            <span className={s.tabTitle}>{t.title}</span>
            {t.key === key ? (
              <>
                <span className={s.tabBody}>{t.body}</span>
                <span className={s.tabBullets}>
                  {t.bullets.map((b) => (
                    <span className={s.tabChip} key={b}>
                      {b}
                    </span>
                  ))}
                </span>
              </>
            ) : null}
          </button>
        ))}
      </div>

      <div className={s.codeCard}>
        <div className={s.codeBar}>
          <span className={s.codeDots} aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className={s.codeFile}>{tab.file}</span>
        </div>
        <pre className={s.codeBody} key={tab.key}>
          {tab.code.map((l, i) => (
            <div key={i}>{l === "" ? " " : line(l)}</div>
          ))}
        </pre>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Integrations with category filter                                    */
/* ------------------------------------------------------------------ */

export function Integrations() {
  const [cat, setCat] = useState("All");
  const items = useMemo(
    () => (cat === "All" ? c.integrations.items : c.integrations.items.filter((i) => i.category === cat)),
    [cat],
  );

  return (
    <>
      <div className={s.intFilters} role="group" aria-label="Filter integrations">
        {c.integrations.categories.map((k) => (
          <button
            key={k}
            type="button"
            className={s.intFilter}
            data-on={k === cat}
            aria-pressed={k === cat}
            onClick={() => setCat(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <div className={s.intGrid}>
        {items.map((i, idx) => (
          <div className={s.intCard} key={i.name} style={{ animationDelay: `${Math.min(idx, 8) * 35}ms` }}>
            <span className={s.intGlyph} aria-hidden>
              {i.glyph}
            </span>
            <span className={s.intName}>{i.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing with a seat slider                                           */
/* ------------------------------------------------------------------ */

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={s.tick} aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Pricing() {
  const p = c.pricing;
  const [seats, setSeats] = useState<number>(p.defaultSeats);
  const total = seats * p.perSeat;

  return (
    <div className={s.priceGrid}>
      {p.tiers.map((tier) => {
        const usage = tier.price === "usage";
        return (
          <div className={`${s.priceCard}${tier.featured ? ` ${s.priceFeatured}` : ""}`} key={tier.name}>
            <div className={s.priceName}>{tier.name}</div>

            <div className={s.priceValue}>
              {usage ? (
                <>
                  ₹{total.toLocaleString("en-IN")}
                  <span className={s.priceUnit}>/month</span>
                </>
              ) : (
                tier.price
              )}
            </div>

            {usage ? (
              <div className={s.slider}>
                <div className={s.sliderTop}>
                  <b>{seats}</b>
                  {p.seatLabel}
                  <span style={{ marginLeft: "auto" }}>₹{p.perSeat.toLocaleString("en-IN")} each</span>
                </div>
                <input
                  className={s.range}
                  type="range"
                  min={p.minSeats}
                  max={p.maxSeats}
                  value={seats}
                  aria-label={`${p.seatLabel}: ${seats}`}
                  onChange={(e) => setSeats(Number(e.target.value))}
                />
                <span className={s.includedNote}>{p.includedNote}</span>
              </div>
            ) : (
              <p className={s.priceNote}>{tier.note}</p>
            )}

            <a href="#" className={`${s.btn} ${tier.featured ? s.btnPrimary : s.btnGhost} ${s.btnBlock}`}>
              {tier.cta}
            </a>

            {tier.featured ? (
              <ul className={s.priceList}>
                {p.teamFeatures.map((f) => (
                  <li key={f}>
                    <Tick />
                    {f}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
