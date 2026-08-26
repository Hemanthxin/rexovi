"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric metric up once it scrolls into view.
 * Non-numeric values (like "∞") render as-is, and reduced-motion users
 * get the final value immediately.
 */
export default function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const pad = match ? match[1].length : 0;
  const suffix = match ? match[2] : "";

  const [n, setN] = useState<number | null>(target === null ? null : 0);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const run = () => {
      // Reduced motion still gets the number, just without the count-up.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setN(target);
        return;
      }
      const start = performance.now();
      const dur = 900;
      const step = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        // easeOutExpo
        const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        setN(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : `${String(n ?? 0).padStart(pad, "0")}${suffix}`}
    </span>
  );
}
