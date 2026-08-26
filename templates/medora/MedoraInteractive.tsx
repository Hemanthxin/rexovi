"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { medora as c } from "./content";
import s from "./medora.module.css";

/* ------------------------------------------------------------------ */
/* Icons                                                                */
/* ------------------------------------------------------------------ */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function Ico({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    heart: <path d="M12 20s-7-4.6-7-9.4A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.6C19 15.4 12 20 12 20Z" />,
    brain: (
      <>
        <path d="M9 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 5 9v1.5A2.5 2.5 0 0 0 6.5 13 2.5 2.5 0 0 0 9 20V4Z" />
        <path d="M15 4a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 19 9v1.5a2.5 2.5 0 0 1-1.5 2.5A2.5 2.5 0 0 1 15 20V4Z" />
      </>
    ),
    bone: <path d="M7 17a2.4 2.4 0 1 1-2-3.7L13.3 5A2.4 2.4 0 1 1 17 7a2.4 2.4 0 1 1 2 3.7L10.7 19A2.4 2.4 0 1 1 7 17Z" />,
    child: (
      <>
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.6" />
      </>
    ),
    tooth: <path d="M8 3c-2 0-3.5 1.6-3.5 3.8 0 3 1.3 4 1.8 7.2.3 2 .5 5 2.2 5s1.4-4 3.5-4 1.8 4 3.5 4 1.9-3 2.2-5c.5-3.2 1.8-4.2 1.8-7.2C19.5 4.6 18 3 16 3c-1.6 0-2.6.9-4 .9S9.6 3 8 3Z" />,
    lungs: (
      <>
        <path d="M12 4v9" />
        <path d="M12 10c-1.4-2-3-2.6-4.4-2-1.6.6-2.6 3-2.6 6 0 2.4.6 4 2.6 4 1.6 0 2.4-1 2.4-3" />
        <path d="M12 10c1.4-2 3-2.6 4.4-2 1.6.6 2.6 3 2.6 6 0 2.4-.6 4-2.6 4-1.6 0-2.4-1-2.4-3" />
      </>
    ),
    skin: (
      <>
        <path d="M5 12a7 7 0 0 1 14 0v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" />
        <path d="M9 11h.01M13 14h.01M15 10h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="6.2" />
        <path d="m15.6 15.6 4 4" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
        <path d="M14 3v5h5M9 13h6M9 17h4" />
      </>
    ),
    pill: (
      <>
        <path d="M9.5 4.5a4.6 4.6 0 0 1 6.5 6.5l-5 5a4.6 4.6 0 1 1-6.5-6.5Z" />
        <path d="m7 7 6.5 6.5" />
      </>
    ),
    video: (
      <>
        <rect x="3" y="6" width="12" height="12" rx="2.5" />
        <path d="m15 10.5 5.5-3v9l-5.5-3Z" />
      </>
    ),
    clinic: (
      <>
        <path d="M4 20V9l8-5 8 5v11" />
        <path d="M9 20v-6h6v6M12 8v3M10.5 9.5h3" />
      </>
    ),
    phone: <path d="M6 3.5h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z" />,
    alert: (
      <>
        <path d="M12 4.5 2.8 20h18.4L12 4.5Z" />
        <path d="M12 10v4M12 17h.01" />
      </>
    ),
    check: <path d="m5 12.5 4.5 4.5L19 7" />,
    arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} focusable={false}>
      {paths[name] ?? paths.heart}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                        */
/* ------------------------------------------------------------------ */

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
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
/* Text-size control                                                    */
/* ------------------------------------------------------------------ */

/**
 * Healthcare sites are read by people who need larger type. Rather than
 * relying on browser zoom (which reflows the whole layout), this scales the
 * template's own root font size — every size in the stylesheet is relative
 * to it, so the layout holds together.
 */
export function TextSize({ onChange }: { onChange: (scale: number) => void }) {
  const [level, setLevel] = useState(1);
  const levels = [
    { v: 1, label: "A", cls: s.textBtnSm, title: "Normal text size" },
    { v: 1.12, label: "A", cls: s.textBtnMd, title: "Larger text" },
    { v: 1.26, label: "A", cls: s.textBtnLg, title: "Largest text" },
  ];

  return (
    <div className={s.textSize} role="group" aria-label={c.nav.textSizeLabel}>
      <span className={s.textSizeLabel}>{c.nav.textSizeLabel}</span>
      {levels.map((l) => (
        <button
          key={l.v}
          type="button"
          className={`${s.textBtn} ${l.cls}`}
          data-on={level === l.v}
          aria-pressed={level === l.v}
          title={l.title}
          onClick={() => {
            setLevel(l.v);
            onChange(l.v);
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Booking flow                                                         */
/* ------------------------------------------------------------------ */

export function Booking() {
  const b = c.booking;
  const [step, setStep] = useState(0);
  const [visitType, setVisitType] = useState<string>(b.visitTypes[0].id);
  const [speciality, setSpeciality] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const doctorsFor = useMemo(
    () => (speciality ? c.doctors.list.filter((d) => d.speciality === speciality) : c.doctors.list),
    [speciality],
  );
  const activeDay = b.days.find((d) => d.id === day) ?? null;
  const chosenDoctor = c.doctors.list.find((d) => d.id === doctor) ?? null;

  const canContinue =
    (step === 0 && Boolean(speciality)) ||
    (step === 1 && Boolean(doctor)) ||
    (step === 2 && Boolean(slot));

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className={s.bookCard}>
        <div className={s.confirm} role="status">
          <span className={s.confirmMark}>
            <Ico name="check" size={26} />
          </span>
          <h3 className={s.h2}>{b.confirmTitle}</h3>
          <p className={s.lead}>{b.confirmBody}</p>
          <div className={s.summary} style={{ width: "100%" }}>
            <div className={s.summaryRow}>
              <span className={s.summaryK}>Doctor</span>
              <span className={s.summaryV}>{chosenDoctor?.name}</span>
            </div>
            <div className={s.summaryRow}>
              <span className={s.summaryK}>When</span>
              <span className={s.summaryV}>
                {activeDay?.label} {activeDay?.date} · {slot}
              </span>
            </div>
            <div className={s.summaryRow}>
              <span className={s.summaryK}>Type</span>
              <span className={s.summaryV}>{b.visitTypes.find((v) => v.id === visitType)?.label}</span>
            </div>
          </div>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost}`}
            onClick={() => {
              setDone(false);
              setStep(0);
              setSpeciality(null);
              setDoctor(null);
              setDay(null);
              setSlot(null);
            }}
          >
            Book another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.bookCard}>
      <div className={s.bookSteps}>
        {b.steps.map((label, i) => (
          <span key={label} className={s.bookStep} data-state={i === step ? "current" : i < step ? "done" : "todo"}>
            <span className={s.bookStepNum}>{i < step ? <Ico name="check" size={12} /> : i + 1}</span>
            {label}
          </span>
        ))}
      </div>

      <div className={s.bookBody}>
        {step === 0 ? (
          <>
            <p className={s.bookPrompt}>What do you need to see someone about?</p>
            <div className={s.visitTypes}>
              {b.visitTypes.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className={s.opt}
                  data-on={visitType === v.id}
                  onClick={() => setVisitType(v.id)}
                  style={{ minHeight: 56 }}
                >
                  <span className={s.optIcon}>
                    <Ico name={v.id === "video" ? "video" : "clinic"} size={18} />
                  </span>
                  <span className={s.optText}>
                    <span className={s.optName}>{v.label}</span>
                    <span className={s.optNote}>{v.note}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className={s.optGrid}>
              {c.specialities.items.slice(0, 6).map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  className={s.opt}
                  data-on={speciality === sp.name}
                  onClick={() => {
                    setSpeciality(sp.name);
                    setDoctor(null);
                  }}
                >
                  <span className={s.optIcon}>
                    <Ico name={sp.icon} size={18} />
                  </span>
                  <span className={s.optText}>
                    <span className={s.optName}>{sp.name}</span>
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <p className={s.bookPrompt}>Who would you like to see?</p>
            <p className={s.bookHint}>
              {doctorsFor.length === c.doctors.list.length
                ? "Everyone currently taking new patients."
                : `Available for ${speciality}.`}
            </p>
            <div className={s.optGrid}>
              {doctorsFor.map((d) => (
                <button key={d.id} type="button" className={s.opt} data-on={doctor === d.id} onClick={() => setDoctor(d.id)}>
                  <span className={s.optAvatar}>
                    <Image src={d.photo} alt="" width={560} height={560} sizes="48px" />
                  </span>
                  <span className={s.optText}>
                    <span className={s.optName}>{d.name}</span>
                    <span className={s.optNote}>{d.speciality}</span>
                  </span>
                </button>
              ))}
              {doctorsFor.length === 0 ? (
                <p className={s.bookHint}>No one in that speciality has open slots this week. Try another.</p>
              ) : null}
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <p className={s.bookPrompt}>When suits you?</p>
            <div className={s.dayRow}>
              {b.days.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={s.day}
                  data-on={day === d.id}
                  disabled={d.slots.length === 0}
                  onClick={() => {
                    setDay(d.id);
                    setSlot(null);
                  }}
                >
                  <span className={s.dayLabel}>{d.label}</span>
                  <span className={s.dayDate}>{d.date}</span>
                  <span className={s.dayFree}>{d.slots.length === 0 ? "Full" : `${d.slots.length} free`}</span>
                </button>
              ))}
            </div>

            {activeDay && activeDay.slots.length > 0 ? (
              <div className={s.slotGrid}>
                {activeDay.slots.map((t) => (
                  <button key={t} type="button" className={s.slot} data-on={slot === t} onClick={() => setSlot(t)}>
                    {t}
                  </button>
                ))}
              </div>
            ) : null}

            {activeDay && activeDay.slots.length === 0 ? <p className={s.emptyDay}>{b.fullNote}</p> : null}
            {!activeDay ? <p className={s.bookHint}>Pick a day to see available times.</p> : null}
          </>
        ) : null}

        {step === 3 ? (
          <form onSubmit={submit} id="medora-book-form" style={{ display: "grid", gap: 16 }}>
            <p className={s.bookPrompt}>Last bit — who is coming in?</p>
            <div className={s.summary}>
              <div className={s.summaryRow}>
                <span className={s.summaryK}>Doctor</span>
                <span className={s.summaryV}>{chosenDoctor?.name}</span>
              </div>
              <div className={s.summaryRow}>
                <span className={s.summaryK}>When</span>
                <span className={s.summaryV}>
                  {activeDay?.label} {activeDay?.date} · {slot}
                </span>
              </div>
            </div>
            <div className={s.fieldRow}>
              <label className={s.field}>
                <span className={s.fieldLabel}>{b.fields.name}</span>
                <input className={s.input} name="name" required autoComplete="name" />
              </label>
              <label className={s.field}>
                <span className={s.fieldLabel}>{b.fields.phone}</span>
                <input className={s.input} name="phone" required inputMode="tel" autoComplete="tel" />
              </label>
            </div>
            <label className={s.field}>
              <span className={s.fieldLabel}>{b.fields.reason}</span>
              <textarea className={s.textarea} name="reason" />
            </label>
          </form>
        ) : null}
      </div>

      <div className={s.bookFoot}>
        {step > 0 ? (
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => setStep(step - 1)}>
            {b.back}
          </button>
        ) : null}
        {step < 3 ? (
          <button
            type="button"
            className={`${s.btn} ${s.btnPrimary}`}
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
          >
            Continue
            <Ico name="arrow" size={17} />
          </button>
        ) : (
          <button type="submit" form="medora-book-form" className={`${s.btn} ${s.btnPrimary}`}>
            {b.submit}
            <Ico name="check" size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doctor directory with filters                                        */
/* ------------------------------------------------------------------ */

export function Doctors() {
  const [spec, setSpec] = useState("all");
  const [lang, setLang] = useState("all");

  const specialities = useMemo(() => [...new Set(c.doctors.list.map((d) => d.speciality))], []);
  const languages = useMemo(() => [...new Set(c.doctors.list.flatMap((d) => d.languages))].sort(), []);

  const list = c.doctors.list.filter(
    (d) => (spec === "all" || d.speciality === spec) && (lang === "all" || d.languages.includes(lang)),
  );

  return (
    <>
      <div className={s.filters}>
        <select className={s.select} value={spec} onChange={(e) => setSpec(e.target.value)} aria-label="Filter by speciality">
          <option value="all">{c.doctors.filterAll}</option>
          {specialities.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <select className={s.select} value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Filter by language">
          <option value="all">{c.doctors.langAll}</option>
          {languages.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
      </div>

      <div className={s.docGrid}>
        {list.map((d, i) => (
          <article className={s.docCard} key={d.id} style={{ animationDelay: `${Math.min(i, 6) * 45}ms` }}>
            <div className={s.docPhoto}>
              <Image src={d.photo} alt={`Portrait of ${d.name}`} width={560} height={560} sizes="(max-width: 640px) 92vw, 280px" />
            </div>
            <div className={s.docBody}>
              <h3 className={s.docName}>{d.name}</h3>
              <p className={s.docTitle}>{d.title}</p>
              <div className={s.docTags}>
                <span className={s.docTag}>{d.experience}</span>
                {d.languages.map((l) => (
                  <span className={s.docTag} key={l}>
                    {l}
                  </span>
                ))}
              </div>
              <p className={s.docNext}>
                <i aria-hidden />
                Next free: {d.nextFree}
              </p>
            </div>
          </article>
        ))}
        {list.length === 0 ? <p className={s.docEmpty}>{c.doctors.empty}</p> : null}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Location switcher                                                    */
/* ------------------------------------------------------------------ */

export function Locations() {
  const [id, setId] = useState(c.locations.clinics[0].id);
  const clinic = c.locations.clinics.find((x) => x.id === id) ?? c.locations.clinics[0];

  return (
    <>
      <div className={s.locTabs} role="tablist" aria-label="Choose a clinic">
        {c.locations.clinics.map((cl) => (
          <button
            key={cl.id}
            type="button"
            role="tab"
            aria-selected={cl.id === id}
            className={s.locTab}
            data-on={cl.id === id}
            onClick={() => setId(cl.id)}
          >
            {cl.area}
          </button>
        ))}
      </div>

      <div className={s.locPanel} key={clinic.id}>
        <div>
          <h3 className={s.locName}>{clinic.name}</h3>
          <p className={s.locAddress}>{clinic.address}</p>
          <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className={s.locPhone}>
            <Ico name="phone" size={17} />
            {clinic.phone}
          </a>
        </div>
        <div>
          <p className={s.locSub}>Opening hours</p>
          {clinic.hours.map((h) => (
            <div className={s.hourRow} key={h.day}>
              <span>{h.day}</span>
              <b>{h.time}</b>
            </div>
          ))}
        </div>
        <div>
          <p className={s.locSub}>At this clinic</p>
          <div className={s.locServices}>
            {clinic.services.map((x) => (
              <span className={s.locService} key={x}>
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
