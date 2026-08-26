"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import s from "./ScreenSlideshow.module.css";

export interface Shot {
  src: string;
  label: string;
}

interface Props {
  shots: Shot[];
  sizes: string;
  /** Eager-loads the first slide — use for above-the-fold mockups only. */
  priority?: boolean;
  intervalMs?: number;
  /** Keeps the dots permanently visible instead of on hover. */
  showDots?: boolean;
}

/**
 * Cross-fades between real product screenshots inside a device frame.
 *
 * Auto-advance only runs while the frame is on screen and the pointer is
 * elsewhere, so several mockups on one page stay calm and cheap. Reduced-motion
 * users get a static first slide plus working dots.
 */
export default function ScreenSlideshow({
  shots,
  sizes,
  priority = false,
  intervalMs = 4600,
  showDots = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (shots.length < 2 || !inView || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(
      () => setIndex((v) => (v + 1) % shots.length),
      intervalMs,
    );
    return () => window.clearInterval(t);
  }, [shots.length, inView, paused, intervalMs]);

  if (shots.length === 0) {
    return (
      <div className={s.wrap}>
        <div className={s.empty}>
          Add a screenshot to
          <br />
          public/saafera/
        </div>
      </div>
    );
  }

  return (
    <div
      className={s.wrap}
      ref={wrap}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      {shots.map((shot, i) => (
        <span key={shot.src} className={s.slide} data-on={i === index} aria-hidden={i !== index}>
          <Image
            src={shot.src}
            alt={i === index ? shot.label : ""}
            fill
            sizes={sizes}
            priority={priority && i === 0}
          />
        </span>
      ))}

      {shots.length > 1 ? (
        <div className={s.dots} data-always={showDots}>
          {shots.map((shot, i) => (
            <button
              key={shot.src}
              type="button"
              className={s.dot}
              data-on={i === index}
              aria-label={shot.label}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
