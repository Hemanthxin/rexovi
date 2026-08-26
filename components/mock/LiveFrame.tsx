"use client";

import { useEffect, useRef, useState } from "react";
import s from "./LiveFrame.module.css";

/**
 * Renders an actual built site inside a frame, scaled down.
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

interface Props {
  src: string;
  title: string;
  /**
   * Viewport the embedded site lays out at. Keep it a real desktop width for
   * browser frames; drop it to phone width and the site renders its own
   * mobile layout inside a device frame.
   */
  designWidth?: number;
  designHeight?: number;
  /** Fill the parent instead of declaring an aspect ratio of its own. */
  fill?: boolean;
}

export default function LiveFrame({
  src,
  title,
  designWidth = 1440,
  designHeight = 900,
  fill = false,
}: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) el.style.setProperty("--s", String(w / designWidth));
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
  }, [designWidth]);

  return (
    <div
      className={fill ? `${s.box} ${s.fill}` : s.box}
      ref={box}
      data-loaded={loaded}
      style={fill ? undefined : { aspectRatio: `${designWidth} / ${designHeight}` }}
    >
      {visible ? (
        <iframe
          className={s.frame}
          src={src}
          title={title}
          width={designWidth}
          height={designHeight}
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
