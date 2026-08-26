"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import BrowserFrame from "@/components/mock/BrowserFrame";
import SitePreview from "@/components/mock/SitePreview";
import { ArrowUpRight, Close } from "@/components/site/Icons";
import type { TemplateItem } from "@/lib/templates";
import s from "./TemplateModal.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function TemplateModal({
  item,
  onClose,
}: {
  item: TemplateItem;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("no-scroll");

    // Move focus in, then keep it inside the dialog.
    const first = panel.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const nodes = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      restoreTo.current?.focus?.();
    };
  }, [onClose]);

  const dark = Boolean(item.palette.dark);

  return createPortal(
    <div
      className={s.backdrop}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={s.panel}
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tpl-modal-title"
      >
        <button type="button" className={s.close} onClick={onClose} aria-label="Close template preview">
          <Close size={16} />
        </button>

        <div className={s.stage} data-dark={dark ? "true" : "false"}>
          <BrowserFrame url={item.previewUrl} tone={dark ? "void" : "paper"} ratio="16 / 10">
            <SitePreview
              layout={item.layout}
              palette={item.palette}
              label={`${item.name} full template preview`}
            />
          </BrowserFrame>

          <div className={s.stageFoot}>
            <span>Rendered preview</span>
            <span>·</span>
            <span>{item.previewUrl}</span>
            <span className={s.swatches} aria-hidden>
              <i style={{ background: item.palette.acc }} />
              <i style={{ background: item.palette.ink }} />
              <i style={{ background: item.palette.soft }} />
            </span>
          </div>
        </div>

        <div className={s.info}>
          <div className={s.infoTop}>
            <div className={s.badgeRow}>
              <span className="chip chip--accent">{item.category}</span>
              <span className="label label--bare">Rexovi Template</span>
            </div>
            <h2 id="tpl-modal-title" className={s.title}>
              {item.name}
            </h2>
            <p className={s.tagline}>{item.tagline}</p>
          </div>

          <div className={s.infoBody}>
            <p className={s.desc}>{item.description}</p>

            <div>
              <h3 className={s.blockTitle}>Included sections</h3>
              <div className={s.sections}>
                {item.sections.map((sec, i) => (
                  <div className={s.sectionRow} key={sec}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {sec}
                  </div>
                ))}
              </div>
            </div>

            <div className={s.specs}>
              <div className={s.spec}>
                <span className={s.specKey}>Pages</span>
                <span className={s.specVal}>{item.pages}</span>
              </div>
              <div className={s.spec}>
                <span className={s.specKey}>Category</span>
                <span className={s.specVal}>{item.category}</span>
              </div>
              <div className={s.spec}>
                <span className={s.specKey}>Responsive</span>
                <span className={s.specVal}>Yes</span>
              </div>
              <div className={s.spec}>
                <span className={s.specKey}>Built by</span>
                <span className={s.specVal}>Rexovi</span>
              </div>
            </div>

            <div>
              <h3 className={s.blockTitle}>Tags</h3>
              <div className={s.tags}>
                {item.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={s.infoFoot}>
            <Link href={`/contact?template=${item.slug}`} className="btn btn--accent">
              Build With This
              <ArrowUpRight className="btn__arrow" />
            </Link>
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Keep Browsing
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
