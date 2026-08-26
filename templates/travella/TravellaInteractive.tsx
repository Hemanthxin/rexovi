"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { travella as c, type Trip } from "./content";
import s from "./travella.module.css";

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Ico({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    left: <path d="M20 12H5m6-6-6 6 6 6" />,
    moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
    pin: (
      <>
        <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
    bus: (
      <>
        <rect x="4" y="4" width="16" height="13" rx="2.4" />
        <path d="M4 11h16M7 21v-2M17 21v-2M8 15h.01M16 15h.01" />
      </>
    ),
    bed: (
      <>
        <path d="M3 18V7M3 12h18v6M21 18v-4a2 2 0 0 0-2-2" />
        <circle cx="8" cy="10" r="2" />
      </>
    ),
    bowl: (
      <>
        <path d="M3 11h18a9 9 0 0 1-9 9 9 9 0 0 1-9-9Z" />
        <path d="M9 7c0-1.5 1-2 1.5-3M14 7c0-1.5 1-2 1.5-3" />
      </>
    ),
    check: <path d="m5 12.5 4.5 4.5L19 7" />,
    cross: <path d="M6 6l12 12M18 6 6 18" />,
    star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8Z" />,
    phone: <path d="M6.5 3.5h3l1.5 4-2 1.4a12 12 0 0 0 6.1 6.1l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
      {paths[name] ?? null}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Reveal                                                               */
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
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
/* Trip finder                                                          */
/* ------------------------------------------------------------------ */

/**
 * Three filters over the trip list, plus a nights ceiling.
 *
 * The count is announced politely rather than assertively: it changes on
 * every keystroke of the slider, and an assertive region would interrupt a
 * screen reader mid-sentence each time.
 */
export function Finder() {
  const [region, setRegion] = useState("all");
  const [style, setStyle] = useState("all");
  const [month, setMonth] = useState("Any month");
  const [maxNights, setMaxNights] = useState(14);

  const dirty = region !== "all" || style !== "all" || month !== "Any month" || maxNights !== 14;

  const results = useMemo(
    () =>
      c.trips.filter(
        (t) =>
          (region === "all" || t.region === region) &&
          (style === "all" || t.style === style) &&
          (month === "Any month" || (t.months as readonly string[]).includes(month)) &&
          t.nights <= maxNights,
      ),
    [region, style, month, maxNights],
  );

  const reset = () => {
    setRegion("all");
    setStyle("all");
    setMonth("Any month");
    setMaxNights(14);
  };

  return (
    <div className={s.finder}>
      <div className={s.finderBar}>
        <div className={s.fGroup}>
          <span className={s.fLabel}>Region</span>
          <div className={s.pills} role="group" aria-label="Region">
            {c.finder.regions.map((r) => (
              <button
                key={r.id}
                type="button"
                className={s.pill}
                data-on={region === r.id}
                aria-pressed={region === r.id}
                onClick={() => setRegion(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className={s.fGroup}>
          <span className={s.fLabel}>Pace</span>
          <div className={s.pills} role="group" aria-label="Pace">
            {c.finder.styles.map((r) => (
              <button
                key={r.id}
                type="button"
                className={s.pill}
                data-on={style === r.id}
                aria-pressed={style === r.id}
                onClick={() => setStyle(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className={s.fGroup}>
          <label className={s.fLabel} htmlFor="tv-month">
            Month
          </label>
          <select id="tv-month" className={s.select} value={month} onChange={(e) => setMonth(e.target.value)}>
            {c.finder.months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className={s.fGroup}>
          <label className={s.fLabel} htmlFor="tv-nights">
            {c.finder.nightsLabel} <b>{maxNights}</b> nights
          </label>
          <input
            id="tv-nights"
            type="range"
            className={s.range}
            min={8}
            max={14}
            step={1}
            value={maxNights}
            onChange={(e) => setMaxNights(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={s.finderMeta}>
        <p className={s.count} aria-live="polite">
          {results.length === 1 ? c.finder.countOne : `${results.length} ${c.finder.countMany}`}
        </p>
        {dirty ? (
          <button type="button" className={s.clear} onClick={reset}>
            <Ico name="cross" size={14} />
            {c.finder.reset}
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <p className={s.empty}>{c.finder.empty}</p>
      ) : (
        <div className={s.tripGrid}>
          {results.map((t, i) => (
            <TripCard key={t.id} trip={t} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The card tilts very slightly towards the cursor. It is two custom
 * properties updated on pointermove, so nothing re-renders — a React state
 * update per mouse event would be visibly janky in a grid this size.
 */
function TripCard({ trip, index }: { trip: Trip; index: number }) {
  const ref = useRef<HTMLElement>(null);

  const track = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", String((e.clientX - r.left) / r.width - 0.5));
    el.style.setProperty("--py", String((e.clientY - r.top) / r.height - 0.5));
  };

  const clear = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <article
      ref={ref}
      className={s.trip}
      onPointerMove={track}
      onPointerLeave={clear}
      style={{ transitionDelay: `${Math.min(index, 8) * 35}ms` }}
    >
      <div className={s.tripImg}>
        <Image
          src={trip.image}
          alt=""
          width={1200}
          height={860}
          sizes="(max-width: 640px) 92vw, (max-width: 1080px) 46vw, 30vw"
        />
        <span className={s.tripPrice}>
          from <b>€{trip.from.toLocaleString("en-GB")}</b>
        </span>
      </div>
      <div className={s.tripBody}>
        <div className={s.tripTags}>
          <span className={s.tag}>{trip.regionLabel}</span>
          <span className={s.tag}>{trip.styleLabel}</span>
          <span className={s.tagQuiet}>
            <Ico name="moon" size={13} />
            {trip.nights} nights
          </span>
        </div>
        <h3 className={s.tripName}>{trip.name}</h3>
        <p className={s.tripBlurb}>{trip.blurb}</p>
        <ul className={s.tripHigh}>
          {trip.highlights.map((h) => (
            <li key={h}>
              <Ico name="check" size={13} />
              {h}
            </li>
          ))}
        </ul>
        <div className={s.tripFoot}>
          <span className={s.tripMonths}>{trip.months.join(" · ")}</span>
          <span className={s.tripGo}>
            See dates
            <Ico name="arrow" size={15} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Itinerary scrubber                                                   */
/* ------------------------------------------------------------------ */

const days = c.itinerary.days;
const MIN_ALT = 2500;
const MAX_ALT = 5600;

/** Altitude → 0–100, inverted so that higher is nearer the top of the box. */
function altY(m: number) {
  return 100 - ((m - MIN_ALT) / (MAX_ALT - MIN_ALT)) * 100;
}

/**
 * The signature interaction: a day-by-day timeline with the trip's altitude
 * profile drawn underneath it.
 *
 * The track is a real `input[type=range]`, laid transparently over the
 * drawing. That is what buys keyboard support, drag, touch and the correct
 * ARIA semantics for free — reimplementing all of it on a div is where most
 * custom sliders go wrong.
 */
export function Itinerary() {
  const [i, setI] = useState(0);
  const day = days[i];

  /* The polyline through every day's altitude, in the 0–100 viewBox. */
  const points = useMemo(
    () =>
      days
        .map((d, n) => `${(n / (days.length - 1)) * 100},${altY(d.altitude)}`)
        .join(" "),
    [],
  );

  const area = `0,100 ${points} 100,100`;
  const pct = (i / (days.length - 1)) * 100;

  const step = useCallback((delta: number) => {
    setI((v) => Math.min(days.length - 1, Math.max(0, v + delta)));
  }, []);

  return (
    <div className={s.itin}>
      {/* Profile + track */}
      <div className={s.profile} style={{ ["--pct" as string]: `${pct}%` }}>
        <svg className={s.profileSvg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="tv-alt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--tv-acc)" stopOpacity="0.30" />
              <stop offset="100%" stopColor="var(--tv-acc)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={area} fill="url(#tv-alt)" />
          <polyline points={points} fill="none" stroke="var(--tv-acc)" strokeWidth="0.7" vectorEffect="non-scaling-stroke" />
        </svg>

        <span className={s.profileHead} aria-hidden>
          <span className={s.profileAlt}>{day.altitude.toLocaleString("en-GB")} m</span>
        </span>

        <span className={s.altMax} aria-hidden>5,600 m</span>
        <span className={s.altMin} aria-hidden>2,500 m</span>

        <input
          className={s.scrub}
          type="range"
          min={0}
          max={days.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label={`${c.itinerary.dayLabel}, 1 to ${days.length}`}
          aria-valuetext={`${c.itinerary.dayLabel} ${day.n}, ${day.place}, ${day.altitude} metres`}
        />
      </div>

      {/* Day chips */}
      <div className={s.chips} role="tablist" aria-label={c.itinerary.dayLabel}>
        {days.map((d, n) => (
          <button
            key={d.n}
            type="button"
            role="tab"
            aria-selected={n === i}
            tabIndex={n === i ? 0 : -1}
            className={s.chip}
            data-on={n === i}
            data-done={n < i}
            onClick={() => setI(n)}
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
              if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
            }}
          >
            <span className={s.chipN}>{d.n}</span>
            <span className={s.chipPlace}>{d.place}</span>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className={s.dayCard}>
        <div className={s.dayMain} key={day.n}>
          <span className={s.dayKicker}>
            <Ico name="pin" size={15} />
            {c.itinerary.dayLabel} {day.n} · {day.place}
          </span>
          <h3 className={s.dayTitle}>{day.title}</h3>
          <p className={s.dayBody}>{day.body}</p>
        </div>

        <dl className={s.dayFacts}>
          <div>
            <dt>
              <Ico name="bus" size={16} /> Getting there
            </dt>
            <dd>{day.move}</dd>
          </div>
          <div>
            <dt>
              <Ico name="bed" size={16} /> Tonight
            </dt>
            <dd>{day.stay}</dd>
          </div>
          <div>
            <dt>
              <Ico name="bowl" size={16} /> Eating
            </dt>
            <dd>{day.eat}</dd>
          </div>
        </dl>

        <div className={s.dayNav}>
          <button type="button" className={s.navBtn} onClick={() => step(-1)} disabled={i === 0}>
            <Ico name="left" size={16} />
            {c.itinerary.prev}
          </button>
          <span className={s.dayOf}>
            {day.n} / {days.length}
          </span>
          <button type="button" className={s.navBtn} onClick={() => step(1)} disabled={i === days.length - 1}>
            {c.itinerary.next}
            <Ico name="arrow" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cost estimator                                                       */
/* ------------------------------------------------------------------ */

/**
 * Everything visible recomputes from four inputs, which is the whole point:
 * the section's claim is "no supplement appears later", and a number that
 * moves while you change the options is the demonstration of it.
 */
export function Estimator() {
  const [tripId, setTripId] = useState("ladakh");
  const [people, setPeople] = useState(2);
  const [room, setRoom] = useState("shared");
  const [extras, setExtras] = useState<string[]>([]);

  const trip = c.trips.find((t) => t.id === tripId) ?? c.trips[0];
  const roomOpt = c.cost.rooms.find((r) => r.id === room) ?? c.cost.rooms[0];

  const extrasTotal = c.cost.extras
    .filter((x) => extras.includes(x.id))
    .reduce((a, x) => a + x.price, 0);

  const perPerson = trip.from + roomOpt.delta + extrasTotal;
  const total = perPerson * people;

  const toggle = (id: string) =>
    setExtras((v) => (v.includes(id) ? v.filter((x) => x !== id) : [...v, id]));

  const money = (n: number) => "€" + n.toLocaleString("en-GB");

  return (
    <div className={s.cost}>
      <div className={s.costControls}>
        <div className={s.costRow}>
          <label className={s.fLabel} htmlFor="tv-trip">
            {c.cost.tripLabel}
          </label>
          <select id="tv-trip" className={s.select} value={tripId} onChange={(e) => setTripId(e.target.value)}>
            {c.trips.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.nights} nights
              </option>
            ))}
          </select>
        </div>

        <div className={s.costRow}>
          <span className={s.fLabel}>{c.cost.travellersLabel}</span>
          <div className={s.stepper}>
            <button type="button" onClick={() => setPeople((v) => Math.max(1, v - 1))} disabled={people === 1} aria-label="One fewer traveller">
              −
            </button>
            <span aria-live="polite">{people}</span>
            <button type="button" onClick={() => setPeople((v) => Math.min(12, v + 1))} disabled={people === 12} aria-label="One more traveller">
              +
            </button>
          </div>
        </div>

        <div className={s.costRow}>
          <span className={s.fLabel}>{c.cost.roomLabel}</span>
          <div className={s.rooms} role="radiogroup" aria-label={c.cost.roomLabel}>
            {c.cost.rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={room === r.id}
                className={s.room}
                data-on={room === r.id}
                onClick={() => setRoom(r.id)}
              >
                <span className={s.roomTop}>
                  <b>{r.label}</b>
                  <span>{r.delta ? `+${money(r.delta)}` : "included"}</span>
                </span>
                <span className={s.roomNote}>{r.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={s.costRow}>
          <span className={s.fLabel}>Add to it</span>
          <div className={s.extras}>
            {c.cost.extras.map((x) => {
              const on = extras.includes(x.id);
              return (
                <label key={x.id} className={s.extra} data-on={on}>
                  <input type="checkbox" checked={on} onChange={() => toggle(x.id)} />
                  <span className={s.extraBox} aria-hidden>
                    <Ico name="check" size={13} />
                  </span>
                  <span className={s.extraText}>
                    <b>{x.label}</b>
                    <span>{x.note}</span>
                  </span>
                  <span className={s.extraPrice}>+{money(x.price)}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* A boarding-pass shaped summary, notched on both sides. */}
      <aside className={s.pass}>
        <div className={s.passTop}>
          <span className={s.passBrand}>{c.brand.name}</span>
          <span className={s.passNights}>
            {trip.nights} <span>nights</span>
          </span>
        </div>

        <p className={s.passTrip}>{trip.name}</p>

        <dl className={s.passLines}>
          <div>
            <dt>Trip</dt>
            <dd>{money(trip.from)}</dd>
          </div>
          <div>
            <dt>{roomOpt.label}</dt>
            <dd>{roomOpt.delta ? "+" + money(roomOpt.delta) : "—"}</dd>
          </div>
          {c.cost.extras
            .filter((x) => extras.includes(x.id))
            .map((x) => (
              <div key={x.id}>
                <dt>{x.label}</dt>
                <dd>+{money(x.price)}</dd>
              </div>
            ))}
        </dl>

        <div className={s.passPerf} aria-hidden />

        <div className={s.passSum}>
          <div className={s.passPP}>
            <span>{c.cost.perPerson}</span>
            <b>{money(perPerson)}</b>
          </div>
          <div className={s.passTotal}>
            <span>
              {c.cost.totalLabel} ({people})
            </span>
            <b aria-live="polite">{money(total)}</b>
          </div>
        </div>

        <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`}>
          {c.cost.cta}
        </button>
        <p className={s.passNote}>{c.cost.holdNote}</p>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                              */
/* ------------------------------------------------------------------ */

export function Reviews() {
  const [i, setI] = useState(0);
  const r = c.reviews.list[i];

  return (
    <div className={s.reviews}>
      <figure className={s.review} key={r.id}>
        <div className={s.stars} aria-label="Five out of five">
          {[0, 1, 2, 3, 4].map((n) => (
            <Ico key={n} name="star" size={17} />
          ))}
        </div>
        <blockquote>{r.quote}</blockquote>
        <figcaption>
          <Image src={r.photo} alt="" width={112} height={112} sizes="56px" />
          <span>
            <b>{r.name}</b>
            <span>{r.trip}</span>
          </span>
        </figcaption>
      </figure>

      <div className={s.dots} role="tablist" aria-label="Reviews">
        {c.reviews.list.map((x, n) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Review from ${x.name}`}
            className={s.dot}
            data-on={n === i}
            onClick={() => setI(n)}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Guides                                                               */
/* ------------------------------------------------------------------ */

export function Guides() {
  const [id, setId] = useState(c.guides.list[0].id);
  const g = c.guides.list.find((x) => x.id === id) ?? c.guides.list[0];

  return (
    <div className={s.guides}>
      <div className={s.guidePhoto}>
        <Image
          src={c.guides.image}
          alt={c.guides.imageAlt}
          width={760}
          height={760}
          sizes="(max-width: 900px) 92vw, 440px"
        />
        <span className={s.guideBadge} key={g.id}>
          <b>{g.name}</b>
          <span>{g.base}</span>
        </span>
      </div>

      <div className={s.guideList}>
        {c.guides.list.map((x) => (
          <button
            key={x.id}
            type="button"
            className={s.guideRow}
            data-on={x.id === id}
            aria-pressed={x.id === id}
            onClick={() => setId(x.id)}
          >
            <span className={s.guideName}>{x.name}</span>
            <span className={s.guideMeta}>
              {x.base} · {x.years} · {x.languages.join(", ")}
            </span>
            <span className={s.guideLine}>{x.line}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
