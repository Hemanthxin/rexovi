import Link from "next/link";
import BrowserFrame from "@/components/mock/BrowserFrame";
import PhoneFrame from "@/components/mock/PhoneFrame";
import SitePreview from "@/components/mock/SitePreview";
import { SAAFERA_DESKTOP_RATIO, SaaferaDesktop, SaaferaMobile } from "@/components/mock/SaaferaPreview";
import Reveal from "@/components/site/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/site/Icons";
import type { WorkItem } from "@/lib/content";
import type { PreviewLayout, TemplatePalette } from "@/lib/templates";
import s from "./Work.module.css";

/** Each project renders in its own visual language rather than a shared card. */
const visuals: Record<
  string,
  { url: string; layout: PreviewLayout; palette: TemplatePalette; tone?: "paper" | "void" }
> = {
  finance: {
    url: "rexovi-finance.app",
    layout: "finance",
    palette: { bg: "#0F1218", ink: "#EDF1F7", acc: "#4C7DFF", soft: "#1A1F29", mut: "#39414F", line: "#242B36", dark: true },
    tone: "void",
  },
  travel: {
    url: "travel-experience.com",
    layout: "travel",
    palette: { bg: "#FFFFFF", ink: "#16232B", acc: "#F1793C", soft: "#FFF2E8", mut: "#DFC9B6", line: "#F2E6DA" },
  },
  platform: {
    url: "business-platform.io",
    layout: "saas",
    palette: { bg: "#FFFFFF", ink: "#14161C", acc: "#2F9E7E", soft: "#EDF6F2", mut: "#C4D8D0", line: "#E2EFE9" },
  },
};

function Visual({ item }: { item: WorkItem }) {
  if (item.visual === "saafera") {
    return (
      <div className={s.plinth}>
        <div className={s.plinthInner}>
          <div className={`${s.frameWrap} pv-hover`}>
            <BrowserFrame url="saafera.com" ratio={SAAFERA_DESKTOP_RATIO} sheen>
              <SaaferaDesktop />
            </BrowserFrame>
          </div>
        </div>
      </div>
    );
  }

  const v = visuals[item.visual];

  if (item.layout === "device") {
    return (
      <div className={s.devicePair}>
        <div className={`${s.frameWrap} pv-hover`}>
          <BrowserFrame url={v.url} ratio="16 / 10" tone={v.tone ?? "paper"} sheen>
            <SitePreview layout={v.layout} palette={v.palette} label={`${item.title} web interface preview`} />
          </BrowserFrame>
        </div>
        <PhoneFrame className={s.devicePhone}>
          <SaaferaMobile />
        </PhoneFrame>
      </div>
    );
  }

  return (
    <div className={`${s.frameWrap} pv-hover`}>
      <BrowserFrame url={v.url} ratio="16 / 10" tone={v.tone ?? "paper"} sheen>
        <SitePreview layout={v.layout} palette={v.palette} label={`${item.title} interface preview`} />
      </BrowserFrame>
    </div>
  );
}

export default function WorkList({ items }: { items: WorkItem[] }) {
  return (
    <div className={s.list}>
      {items.map((item, i) => (
        <Reveal
          as="article"
          key={item.slug}
          className={`${s.item} ${s[item.layout]}`}
          data-flip={item.layout === "split" && i % 2 === 1 ? "true" : "false"}
        >
          {item.layout === "full" ? (
            <>
              <div className={s.info}>
                <div className={s.topRow}>
                  <span className={s.idx}>{item.index}</span>
                  <span className={s.discipline}>{item.kind}</span>
                  <span className={s.kind}>{item.discipline}</span>
                </div>
                <div className={s.titleRow}>
                  <h3 className={s.title}>{item.title}</h3>
                  {item.flagship ? <span className={s.flagTag}>Rexovi Product 01</span> : null}
                </div>
                <p className={s.summary}>{item.summary}</p>
                <div className={s.tags}>
                  {item.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                {item.href ? (
                  <Link href={item.href} className={`tlink ${s.cta}`}>
                    View product
                    <ArrowUpRight />
                  </Link>
                ) : null}
              </div>
              <div className={s.visual}>
                <Visual item={item} />
              </div>
            </>
          ) : (
            <>
              <div className={s.info}>
                <div className={s.topRow}>
                  <span className={s.idx}>{item.index}</span>
                  <span className={s.discipline}>{item.kind}</span>
                  <span className={s.kind}>{item.discipline}</span>
                </div>
                <div className={s.titleRow}>
                  <h3 className={s.title}>{item.title}</h3>
                </div>
                <p className={s.summary}>{item.summary}</p>
                <div className={s.tags}>
                  {item.tags.map((t) => (
                    <span className="chip" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link href={item.href ?? "/contact"} className={`tlink ${s.cta}`}>
                  {item.href ? "View product" : "Discuss a project like this"}
                  <ArrowRight />
                </Link>
              </div>
              <div className={s.visual}>
                <Visual item={item} />
              </div>
            </>
          )}
        </Reveal>
      ))}
    </div>
  );
}
