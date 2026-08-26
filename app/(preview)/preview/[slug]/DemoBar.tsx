"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./DemoBar.module.css";

/**
 * A slim floating bar over a template demo: says what you are looking at and
 * offers the way back. Dismissible, because sometimes you just want to see
 * the site clean.
 */
export default function DemoBar({
  name,
  tagline,
  slug,
}: {
  name: string;
  tagline: string;
  slug: string;
}) {
  const [hidden, setHidden] = useState(false);
  // Hidden inside an iframe (card thumbnails) via the `framed` class the root
  // layout sets before first paint — no state, and no flash of the bar.

  return (
    <div className={s.bar} data-hidden={hidden} role="complementary" aria-label="Template preview controls">
      <span className={s.label}>
        <span className={s.name}>{name}</span>
        <span className={s.meta}>Rexovi template · {tagline}</span>
      </span>

      <span className={s.actions}>
        <Link href="/templates" className={`${s.link} ${s.back}`}>
          All templates
        </Link>
        <Link href={`/contact?template=${slug}`} className={`${s.link} ${s.use}`}>
          Use this template
        </Link>
      </span>

      <button type="button" className={s.close} onClick={() => setHidden(true)} aria-label="Hide preview bar">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </div>
  );
}
