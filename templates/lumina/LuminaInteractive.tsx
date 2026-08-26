"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { lumina as c } from "./content";
import s from "./lumina.module.css";

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
/* Hero: rotating closing phrase                                        */
/* ------------------------------------------------------------------ */

export function Rotator() {
  const words = c.hero.rotating;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => window.clearInterval(t);
  }, [words.length]);

  return (
    <span className={s.rotator}>
      {/* All phrases are stacked so the line never reflows as they swap. */}
      {words.map((w, idx) => (
        <span key={w} className={`${s.rotWord} ${s.serif}`} data-on={idx === i} aria-hidden={idx !== i}>
          {w}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Work index with a cursor-following preview                           */
/* ------------------------------------------------------------------ */

/** Subscribes to a media query without a setState-in-effect. */
function useMatchMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function WorkIndex() {
  const [active, setActive] = useState<number | null>(null);
  // Below this width there is no cursor for the preview to follow, so each row
  // carries its own image. Mounting them only here means desktop never
  // downloads six pictures it will not show.
  const compact = useMatchMedia("(max-width: 680px)");
  const peek = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Fine pointers only: a phone has no cursor for the preview to follow,
    // so those get a thumbnail inside each row instead (see the stylesheet).
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = peek.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      // Trails slightly behind the cursor — the lag is what makes it feel
      // like an object rather than an attachment.
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      el.style.translate = `${pos.current.x}px ${pos.current.y}px`;
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const shown = active !== null ? c.work.projects[active] : null;

  return (
    <>
      <div
        className={s.workIndex}
        data-hovering={active !== null}
        onPointerLeave={() => setActive(null)}
      >
        {c.work.projects.map((p, i) => (
          <a
            key={p.name}
            href="#"
            className={s.workRow}
            data-active={active === i}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className={s.workIdx}>{p.index}</span>
            <span className={s.workNameCol}>
              <span className={s.workName}>{p.name}</span>
              <span className={s.workClient}>{p.client}</span>
            </span>
            <span className={s.workDiscipline}>{p.discipline}</span>
            <span className={s.workYear}>{p.year}</span>
            {compact ? (
              <span className={s.workThumb}>
                {/* Eager: these are the section's main visual on a phone, they
                    total ~80 KB at this width, and they only exist here. */}
                <Image
                  src={p.image}
                  alt={`${p.name} for ${p.client}`}
                  width={1100}
                  height={760}
                  sizes="92vw"
                  loading="eager"
                />
              </span>
            ) : null}
          </a>
        ))}
      </div>

      {/* Sits outside the list so it can be fixed to the viewport. */}
      <div className={s.workPeek} ref={peek} data-on={shown !== null} aria-hidden>
        {shown ? (
          <>
            <Image
              src={shown.image}
              alt=""
              width={1100}
              height={760}
              sizes="380px"
              priority={false}
            />
            <span className={s.workPeekTint} style={{ background: shown.tint }} />
          </>
        ) : null}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after grade comparison                                      */
/* ------------------------------------------------------------------ */

export function GradeSlider() {
  const [x, setX] = useState(50);
  const id = useId();
  const g = c.grade;

  return (
    <div>
      <div className={s.grade} style={{ ["--x" as string]: `${x}%` }}>
        <span className={s.gradeImg}>
          <Image src={g.before} alt={`${g.beforeLabel}: an unretouched campaign frame`} width={1100} height={760} sizes="(max-width: 1000px) 92vw, 640px" />
        </span>
        <span className={`${s.gradeImg} ${s.gradeTop}`}>
          <Image src={g.after} alt={`${g.afterLabel}: the same frame after colour grading`} width={1100} height={760} sizes="(max-width: 1000px) 92vw, 640px" />
        </span>

        <span className={`${s.gradeTag} ${s.gradeTagL}`}>{g.beforeLabel}</span>
        <span className={`${s.gradeTag} ${s.gradeTagR}`}>{g.afterLabel}</span>

        <span className={s.gradeHandle} aria-hidden>
          <span className={s.gradeKnob}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </span>

        {/* A range input does the work: drag, click, and arrow keys all come
            free, and it is reachable by keyboard and screen readers. */}
        <input
          id={id}
          className={s.gradeRange}
          type="range"
          min={0}
          max={100}
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          aria-label={`Reveal the ${g.afterLabel.toLowerCase()} version`}
        />
      </div>
      <p className={s.gradeNote}>{g.note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services accordion                                                   */
/* ------------------------------------------------------------------ */

export function Services() {
  const [open, setOpen] = useState(0);

  return (
    <div className={s.services}>
      {c.services.items.map((item, i) => (
        <div className={s.service} key={item.title} data-open={open === i}>
          <button
            type="button"
            className={s.serviceBtn}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span className={s.serviceIdx}>{item.index}</span>
            <span className={s.serviceTitle}>{item.title}</span>
            <span className={s.servicePlus} aria-hidden />
          </button>
          <div className={s.servicePanel}>
            <div className={s.servicePanelInner}>
              <div className={s.servicePanelBody}>
                <p>{item.body}</p>
                <div className={s.serviceItems}>
                  {item.items.map((t) => (
                    <span className={s.serviceChip} key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
