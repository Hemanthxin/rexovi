"use client";

import { useState } from "react";
import { finora as c } from "./content";
import s from "./finora.module.css";

/** The only interactive part of the template — everything else is static. */
export default function FinoraHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <div className={s.headerInner}>
          <a href="#" className={s.brand}>
            <span className={s.brandMark} aria-hidden>
              F
            </span>
            {c.brand.name}
          </a>

          <nav className={s.navLinks} aria-label="Primary">
            {c.nav.links.map((l) => (
              <a key={l.href} href={l.href} className={s.navLink}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={s.headerActions}>
            <a href="#" className={`${s.btn} ${s.btnQuiet}`}>
              {c.nav.signIn}
            </a>
            <a href="#pricing" className={`${s.btn} ${s.btnPrimary}`}>
              {c.nav.cta}
            </a>
            <button
              type="button"
              className={s.burger}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={s.mobileNav} data-open={open}>
        {c.nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className={s.mobileNavCta}>
          <a href="#" className={`${s.btn} ${s.btnGhost} ${s.btnBlock}`} onClick={() => setOpen(false)}>
            {c.nav.signIn}
          </a>
          <a href="#pricing" className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} onClick={() => setOpen(false)}>
            {c.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
