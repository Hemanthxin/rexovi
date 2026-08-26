"use client";

import { useEffect, useState } from "react";
import { lumina as c } from "./content";
import s from "./lumina.module.css";

/** Hairline sticky header — the rule only appears once you have scrolled. */
export default function LuminaHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={s.header} data-stuck={stuck}>
      <div className={s.wrap}>
        <div className={s.headerInner}>
          <a href="#" className={s.brand}>
            {c.brand.name}
            <sup>{c.brand.suffix}</sup>
          </a>

          <nav className={s.navLinks} aria-label="Primary">
            {c.nav.links.map((l) => (
              <a key={l.href} href={l.href} className={s.navLink}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={`${s.btn} ${s.headerCta}`}>
            {c.nav.cta}
          </a>

          <button
            type="button"
            className={s.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 8h18M3 16h18" />}
            </svg>
          </button>
        </div>
      </div>

      <div className={s.mobileNav} data-open={open}>
        {c.nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className={s.btn} style={{ marginTop: 20 }} onClick={() => setOpen(false)}>
          {c.nav.cta}
        </a>
      </div>
    </header>
  );
}
