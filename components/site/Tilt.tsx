"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `--mx` / `--my` (-1 → 1) from pointer position within the element,
 * letting children respond with pure CSS. Skipped on coarse pointers and
 * for reduced-motion users.
 */
export default function Tilt({
  children,
  className = "",
  strength = 1,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength;
        const my = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength;
        el.style.setProperty("--mx", mx.toFixed(3));
        el.style.setProperty("--my", my.toFixed(3));
        raf = 0;
      });
    };
    const reset = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
