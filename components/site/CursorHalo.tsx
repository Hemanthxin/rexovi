"use client";

import { useEffect, useRef } from "react";

/**
 * A restrained cursor companion: a thin ring that trails the pointer and
 * reacts to interactive targets. Desktop + fine-pointer only, transform-only
 * (no layout work), and completely disabled for reduced-motion users.
 */
export default function CursorHalo() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ring.current;
    if (!fine || calm || !el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.dataset.on = "true";
      }
      const target = e.target as Element | null;
      const hot = target?.closest("a, button, [data-cursor='hot'], input, textarea, select");
      el.dataset.hot = hot ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      el.dataset.on = "false";
    };

    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ring} className="cursor-halo" data-on="false" aria-hidden />;
}
