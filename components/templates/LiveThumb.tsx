"use client";

import { useEffect, useRef, useState } from "react";
import s from "./LiveThumb.module.css";

/**
 * Renders the actual template site inside the card, scaled down.
 *
 * An iframe rather than a screenshot: the thumbnail can never drift out of
 * sync with the template, and there is no asset to regenerate when the design
 * changes. It loads lazily and only once the card is near the viewport, and it
 * is inert — pointer events off, out of the tab order, hidden from assistive
 * tech (the card already carries a text description).
 *
 * The frame is laid out at a real desktop width so the site renders its
 * desktop layout, then scaled to fit. The factor has to come from JS: CSS
 * cannot divide a container width by a fixed pixel width to produce the
 * unitless number `scale()` needs.
 */

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900; // 16:10, matching the browser frame

export default function LiveThumb({ src, title }: { src: string; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) el.style.setProperty("--s", String(w / DESIGN_WIDTH));
    });
    ro.observe(el);

    // Do not load the site until the card is close to being seen.
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            setVisible(true);
            io?.disconnect();
          }
        },
        { rootMargin: "400px" },
      );
      io.observe(el);
    }

    // Very old browsers without IntersectionObserver just load it.
    const fallback = io ? 0 : requestAnimationFrame(() => setVisible(true));

    return () => {
      ro.disconnect();
      io?.disconnect();
      if (fallback) cancelAnimationFrame(fallback);
    };
  }, []);

  return (
    <div className={s.box} ref={box} data-loaded={loaded}>
      {visible ? (
        <iframe
          className={s.frame}
          src={src}
          title={title}
          width={DESIGN_WIDTH}
          height={DESIGN_HEIGHT}
          loading="lazy"
          tabIndex={-1}
          aria-hidden
          scrolling="no"
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </div>
  );
}
