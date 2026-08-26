"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import BrowserFrame from "@/components/mock/BrowserFrame";
import SitePreview from "@/components/mock/SitePreview";
import LiveFrame from "@/components/mock/LiveFrame";
import { ArrowUpRight, Eye } from "@/components/site/Icons";
import type { TemplateItem } from "@/lib/templates";
import s from "./TemplateCard.module.css";

interface Props {
  item: TemplateItem;
  index: number;
  onPreview: (item: TemplateItem) => void;
  variant?: "grid" | "rail";
  style?: CSSProperties;
}

export default function TemplateCard({ item, index, onPreview, variant = "grid", style }: Props) {
  const stamp = `RX-${String(index + 1).padStart(2, "0")}`;

  return (
    <article className={`${s.card} pv-hover`} data-variant={variant} id={`template-${item.slug}`} style={style}>
      <div className={s.shot} data-dark={item.palette.dark ? "true" : "false"}>
        <span className={s.stamp}>{stamp}</span>

        <div className={`${s.frame} pv-zoom`}>
          <BrowserFrame url={item.previewUrl} tone={item.palette.dark ? "void" : "paper"} ratio="16 / 10" sheen>
            {item.livePreview ? (
              /* The built site itself, scaled down — never a stale screenshot. */
              <LiveFrame src={`/preview/${item.slug}`} title={`${item.name} template preview`} />
            ) : (
              <SitePreview
                layout={item.layout}
                palette={item.palette}
                label={`${item.name} — ${item.tagline} template preview`}
              />
            )}
          </BrowserFrame>
        </div>

        <div className={s.overlay}>
          {item.livePreview ? (
            <Link
              href={`/preview/${item.slug}`}
              className={s.act}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Eye size={14} />
              Preview site
            </Link>
          ) : (
            <button type="button" className={s.act} onClick={() => onPreview(item)}>
              <Eye size={14} />
              Preview
            </button>
          )}
          <Link href={`/contact?template=${item.slug}`} className={`${s.act} ${s.actSolid}`}>
            Use Template
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      <div className={s.meta}>
        <div className={s.metaTop}>
          <h3 className={s.name}>{item.name}</h3>
          <span className={s.cat}>{item.category}</span>
        </div>
        <p className={s.tagline}>{item.tagline}</p>
        <div className={s.foot}>
          <span className={s.swatch} style={{ background: item.palette.acc }} aria-hidden />
          <span>{item.tags[0]}</span>
          <span className={s.pages}>{item.pages} pages</span>
        </div>
      </div>
    </article>
  );
}
