"use client";

import { useDeferredValue, useMemo, useState } from "react";
import TemplateCard from "./TemplateCard";
import TemplateModal from "./TemplateModal";
import { Close, Layers, Search } from "@/components/site/Icons";
import {
  TEMPLATE_CATEGORIES,
  categoryCounts,
  type TemplateItem,
} from "@/lib/templates";
import s from "./TemplateBrowser.module.css";

interface Props {
  items: TemplateItem[];
  /** `gallery` shows search + category filters; `rail` is the homepage strip. */
  variant?: "gallery" | "rail";
}

export default function TemplateBrowser({ items, variant = "gallery" }: Props) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TemplateItem | null>(null);

  // Keeps typing responsive while the grid re-filters.
  const deferredQuery = useDeferredValue(query);
  const counts = useMemo(() => categoryCounts(), []);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return items.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      if (!q) return true;
      return [t.name, t.category, t.tagline, t.description, ...t.tags]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [items, category, deferredQuery]);

  const isGallery = variant === "gallery";

  return (
    <>
      {isGallery ? (
        <div className={s.controls}>
          <div className={s.searchRow}>
            <label className={s.search}>
              <Search />
              <span className="sr-only">Search templates</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates, categories or tags…"
                autoComplete="off"
              />
              {query ? (
                <button type="button" className={s.clear} onClick={() => setQuery("")} aria-label="Clear search">
                  <Close size={12} />
                </button>
              ) : null}
            </label>
            <p className={s.count} aria-live="polite">
              <b>{String(results.length).padStart(2, "0")}</b> / {String(items.length).padStart(2, "0")} templates
            </p>
          </div>

          <div className={s.cats} role="group" aria-label="Filter templates by category">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={s.cat}
                data-on={category === c}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
                <b>{String(counts[c] ?? 0).padStart(2, "0")}</b>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {results.length > 0 ? (
        <div className={isGallery ? s.grid : s.rail}>
          {results.map((item, i) => (
            <TemplateCard
              key={item.slug}
              item={item}
              index={items.indexOf(item)}
              onPreview={setActive}
              variant={variant === "rail" ? "rail" : "grid"}
              // Stagger only the first screenful; later cards appear instantly.
              style={{ ["--d" as string]: `${Math.min(i, 8) * 45}ms` }}
            />
          ))}
        </div>
      ) : (
        <div className={s.empty}>
          <span className={s.emptyMark} aria-hidden>
            <Layers size={18} />
          </span>
          <h3 className={s.emptyTitle}>No templates match that yet</h3>
          <p className={s.emptyBody}>
            We add templates as we build them. Clear the filters, or tell us what you need and we
            will design it for your project.
          </p>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {active ? <TemplateModal item={active} onClose={() => setActive(null)} /> : null}
    </>
  );
}
