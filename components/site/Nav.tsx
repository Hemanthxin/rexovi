"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import { ArrowRight, Close, Menu } from "./Icons";
import Logo from "./Logo";
import s from "./Nav.module.css";

export default function Nav() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  // The drawer is scoped to the route it was opened on, so a navigation
  // closes it without an effect reaching back into state.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = useCallback(
    (next: boolean) => setOpenFor(next ? pathname : null),
    [pathname],
  );
  const barRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  /** Dark pages get an inverted nav until it detaches into its pill. */
  const tone = pathname === "/saafera" ? "void" : "paper";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setStuck(y > 28);
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        barRef.current?.style.setProperty("--p", String(max > 0 ? Math.min(y / max, 1) : 0));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll + trap escape while the drawer is open.
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  const isActive = useCallback(
    (href: string) => {
      if (href.startsWith("/#")) return false;
      return href === "/" ? pathname === "/" : pathname.startsWith(href);
    },
    [pathname],
  );

  return (
    <>
      <header className={s.header} data-stuck={stuck} data-tone={tone}>
        <div className={s.inner} ref={barRef}>
          <Link href="/" className={s.logo} aria-label="Rexovi Technologies — home">
            <Logo height={32} tone={tone === "void" ? "light" : "ink"} priority legal />
          </Link>

          <nav className={s.links} aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={s.link} data-active={isActive(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className={s.right}>
            <Link href="/contact" className={s.cta}>
              Start a Project
              <ArrowRight size={14} />
            </Link>
            <button
              type="button"
              className={s.burger}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </button>
          </div>

          <span className={s.progress} aria-hidden />
        </div>
      </header>

      <div
        id="mobile-menu"
        className={s.drawer}
        data-open={open}
        ref={drawerRef}
        aria-hidden={!open}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        <div className={s.drawerTop}>
          <Link href="/" className={s.logo} aria-label="Rexovi Technologies — home">
            <Logo height={32} legal />
          </Link>
          <button type="button" className={s.drawerClose} aria-label="Close menu" onClick={() => setOpen(false)}>
            <Close size={18} />
          </button>
        </div>

        <nav className={s.drawerNav} aria-label="Mobile">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={s.drawerLink}
              style={{ transitionDelay: `${90 + i * 55}ms` }}
              onClick={() => setOpen(false)}
            >
              <span className={s.drawerIdx}>{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={s.drawerFoot}>
          <Link href="/contact" className="btn btn--accent" style={{ justifyContent: "center" }} onClick={() => setOpen(false)}>
            Start a Project
            <ArrowRight className="btn__arrow" />
          </Link>
          <div className={s.drawerMeta}>
            <span>Ideas · Design · Build</span>
            <span>Rexovi Technologies</span>
          </div>
        </div>
      </div>
    </>
  );
}
