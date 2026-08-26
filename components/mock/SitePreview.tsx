import type { CSSProperties } from "react";
import type { PreviewLayout, TemplatePalette } from "@/lib/templates";

/**
 * Draws a miniature website entirely in CSS.
 *
 * Every template in the marketplace picks one skeleton and one palette;
 * the result reads as a real site inside a browser frame while shipping
 * zero image bytes and staying crisp at any size (container-query sized).
 */

const bars = (n: number, seed: number) =>
  Array.from({ length: n }, (_, i) => {
    // Deterministic pseudo-random heights — stable across server/client render.
    const h = 32 + ((Math.sin(seed + i * 1.7) + 1) / 2) * 62;
    return <i key={i} style={{ height: `${h}%` }} />;
  });

function MiniNav({ links = 3, cta = true }: { links?: number; cta?: boolean }) {
  return (
    <div className="pv-bar">
      <span className="pv-brand">
        <i />
        Aa
      </span>
      <span className="pv-links">
        {Array.from({ length: links }, (_, i) => (
          <b key={i} />
        ))}
      </span>
      {cta ? <span className="pv-btn sm pill" /> : null}
    </div>
  );
}

function Skeleton({ layout }: { layout: PreviewLayout }) {
  switch (layout) {
    /* ---------------- SaaS ---------------- */
    case "saas":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-hero">
            <div className="pv-stack">
              <span className="pv-tag" />
              <span className="pv-h pv-w90" />
              <span className="pv-h pv-w60" />
              <span className="pv-t pv-w80" />
              <span className="pv-t pv-w60" />
              <span className="pv-row" style={{ marginTop: ".3em" }}>
                <span className="pv-btn" />
                <span className="pv-btn ghost" />
              </span>
            </div>
            <div className="pv-card fill">
              <span className="pv-row">
                <span className="pv-h xs pv-w40" />
                <span className="pv-btn sm" style={{ marginLeft: "auto" }} />
              </span>
              <span className="pv-chart">{bars(9, 1)}</span>
              <span className="pv-t pv-w70" />
              <span className="pv-t pv-w50" />
            </div>
          </div>
          <div className="pv-sec soft grow">
            <span className="pv-grid" style={{ ["--n" as string]: 3 }}>
              {[0, 1, 2].map((i) => (
                <span className="pv-card" key={i}>
                  <span className="pv-circle acc" style={{ width: "1.5em" }} />
                  <span className="pv-h xs pv-w70" />
                  <span className="pv-t" />
                  <span className="pv-t s" />
                </span>
              ))}
            </span>
          </div>
        </>
      );

    /* ---------------- Finance ---------------- */
    case "finance":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-hero">
            <div className="pv-stack">
              <span className="pv-h pv-w90" />
              <span className="pv-h pv-w50" />
              <span className="pv-t pv-w80" />
              <span className="pv-row" style={{ marginTop: ".3em" }}>
                <span className="pv-btn" />
                <span className="pv-t pv-w30" />
              </span>
            </div>
            <div className="pv-card">
              <span className="pv-row">
                <span className="pv-donut" />
                <span className="pv-col">
                  <span className="pv-h xs pv-w70" />
                  <span className="pv-t" />
                  <span className="pv-t s" />
                  <span className="pv-t m" />
                </span>
              </span>
            </div>
          </div>
          <div className="pv-sec tight soft grow">
            <span className="pv-grid" style={{ ["--n" as string]: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <span className="pv-card" key={i}>
                  <span className="pv-h sm pv-w60" />
                  <span className="pv-t s" />
                </span>
              ))}
            </span>
            <span className="pv-line" />
          </div>
        </>
      );

    /* ---------------- Agency ---------------- */
    case "agency":
      return (
        <>
          <MiniNav links={3} cta={false} />
          <div className="pv-sec" style={{ paddingBlock: "2.2em 1.2em" }}>
            <span className="pv-h" style={{ height: "1.5em", width: "92%" }} />
            <span className="pv-h" style={{ height: "1.5em", width: "62%" }} />
            <span className="pv-row" style={{ marginTop: ".5em" }}>
              <span className="pv-t pv-w30" />
              <span className="pv-btn ghost pill" style={{ marginLeft: "auto" }} />
            </span>
          </div>
          <div className="pv-sec tight grow">
            <span className="pv-grid" style={{ ["--n" as string]: 3, height: "100%" }}>
              <span className="pv-img grow" />
              <span className="pv-img grow" style={{ marginTop: "1.1em" }} />
              <span className="pv-img grow" />
            </span>
          </div>
          <div className="pv-foot">
            <span className="pv-t pv-w30" />
            <span className="pv-t pv-w30" style={{ marginLeft: "auto" }} />
          </div>
        </>
      );

    /* ---------------- Healthcare ---------------- */
    case "health":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-hero">
            <div className="pv-stack">
              <span className="pv-tag" />
              <span className="pv-h pv-w90" />
              <span className="pv-h pv-w60" />
              <span className="pv-t pv-w80" />
              <span className="pv-row" style={{ marginTop: ".3em" }}>
                <span className="pv-btn pill" />
                <span className="pv-btn ghost pill" />
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <span className="pv-img hero" style={{ borderRadius: "1em" }} />
              <span
                className="pv-card"
                style={{ position: "absolute", right: "-.4em", bottom: "-.8em", width: "62%", boxShadow: "0 .6em 1.4em rgba(0,0,0,.08)" }}
              >
                <span className="pv-row">
                  <span className="pv-avatar" />
                  <span className="pv-col">
                    <span className="pv-h xs pv-w80" />
                    <span className="pv-t s" />
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className="pv-sec soft grow">
            <span className="pv-grid" style={{ ["--n" as string]: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <span className="pv-card" key={i} style={{ alignItems: "center", textAlign: "center" }}>
                  <span className="pv-circle acc" style={{ width: "1.6em" }} />
                  <span className="pv-t m" />
                </span>
              ))}
            </span>
          </div>
        </>
      );

    /* ---------------- Real estate ---------------- */
    case "estate":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-sec tight">
            <span className="pv-h pv-w60" style={{ height: "1.1em" }} />
            <span className="pv-row" style={{ marginTop: ".2em" }}>
              <span className="pv-btn ghost pill sm" />
              <span className="pv-btn ghost pill sm" />
              <span className="pv-btn ghost pill sm" />
              <span className="pv-btn sm pill" style={{ marginLeft: "auto" }} />
            </span>
          </div>
          <div className="pv-sec tight grow">
            <span className="pv-grid" style={{ ["--n" as string]: 3 }}>
              {[0, 1, 2].map((i) => (
                <span className="pv-card" key={i} style={{ padding: ".5em" }}>
                  <span className="pv-img wide" />
                  <span className="pv-h xs pv-w80" />
                  <span className="pv-row">
                    <span className="pv-t pv-w50" />
                    <span className="pv-h xs acc pv-w30" style={{ marginLeft: "auto" }} />
                  </span>
                </span>
              ))}
            </span>
          </div>
          <div className="pv-strip">
            <span className="pv-h xs pv-w30" />
            <span className="pv-t pv-w30" style={{ marginLeft: "auto" }} />
          </div>
        </>
      );

    /* ---------------- Travel ---------------- */
    case "travel":
      return (
        <>
          <MiniNav links={4} />
          <div style={{ position: "relative", padding: "0 1.5em 1.6em" }}>
            <span className="pv-img hero" style={{ borderRadius: ".6em" }} />
            <span
              className="pv-card"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "0",
                transform: "translateX(-50%)",
                width: "82%",
                flexDirection: "row",
                alignItems: "center",
                gap: ".6em",
                boxShadow: "0 .5em 1.4em rgba(0,0,0,.1)",
              }}
            >
              <span className="pv-t pv-w30" />
              <span className="pv-t pv-w30" />
              <span className="pv-t pv-w30" />
              <span className="pv-btn sm pill" style={{ marginLeft: "auto" }} />
            </span>
          </div>
          <div className="pv-sec tight soft grow">
            <span className="pv-grid" style={{ ["--n" as string]: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <span className="pv-col" key={i} style={{ gap: ".4em" }}>
                  <span className="pv-img sq" style={{ borderRadius: ".5em" }} />
                  <span className="pv-t m" />
                  <span className="pv-t s" />
                </span>
              ))}
            </span>
          </div>
        </>
      );

    /* ---------------- Education ---------------- */
    case "education":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-hero">
            <div className="pv-stack">
              <span className="pv-tag" />
              <span className="pv-h pv-w90" />
              <span className="pv-h pv-w50" />
              <span className="pv-t pv-w80" />
              <span className="pv-btn" style={{ marginTop: ".3em" }} />
            </div>
            <div className="pv-card fill">
              <span className="pv-row">
                <span className="pv-circle acc" style={{ width: "1.5em" }} />
                <span className="pv-col">
                  <span className="pv-h xs pv-w80" />
                  <span className="pv-t s" />
                </span>
              </span>
              {[70, 46, 88].map((w, i) => (
                <span key={i} className="pv-t" style={{ width: `${w}%`, background: "var(--pv-acc)", opacity: 0.55 }} />
              ))}
            </div>
          </div>
          <div className="pv-sec tight grow">
            <span className="pv-grid" style={{ ["--n" as string]: 3 }}>
              {[0, 1, 2].map((i) => (
                <span className="pv-card" key={i} style={{ padding: ".5em" }}>
                  <span className="pv-img wide" />
                  <span className="pv-h xs pv-w70" />
                  <span className="pv-t s" />
                </span>
              ))}
            </span>
          </div>
        </>
      );

    /* ---------------- E-commerce ---------------- */
    case "shop":
      return (
        <>
          <MiniNav links={4} />
          <div className="pv-sec tight">
            <span className="pv-img wide" style={{ borderRadius: ".5em", aspectRatio: "21 / 7" }} />
          </div>
          <div className="pv-sec tight grow" style={{ paddingTop: 0 }}>
            <span className="pv-row">
              <span className="pv-h xs pv-w30" />
              <span className="pv-t pv-w30" style={{ marginLeft: "auto" }} />
            </span>
            <span className="pv-grid" style={{ ["--n" as string]: 4 }}>
              {[0, 1, 2, 3].map((i) => (
                <span className="pv-col" key={i} style={{ gap: ".38em" }}>
                  <span className="pv-img tall" style={{ borderRadius: ".35em" }} />
                  <span className="pv-t m" />
                  <span className="pv-t" style={{ width: "34%" }} />
                </span>
              ))}
            </span>
          </div>
        </>
      );

    /* ---------------- Portfolio (dark) ---------------- */
    case "portfolio":
      return (
        <>
          <MiniNav links={3} cta={false} />
          <div className="pv-sec" style={{ paddingBlock: "1.8em 1em" }}>
            <span className="pv-h" style={{ height: "1.6em", width: "72%" }} />
            <span className="pv-row">
              <span className="pv-t pv-w40" />
              <span className="pv-tag" style={{ marginLeft: "auto" }} />
            </span>
          </div>
          <div className="pv-sec tight grow" style={{ paddingTop: 0 }}>
            <span className="pv-grid" style={{ ["--n" as string]: 2, height: "100%" }}>
              <span className="pv-img grow" style={{ borderRadius: ".4em" }} />
              <span className="pv-col" style={{ gap: ".5em" }}>
                <span className="pv-img grow" style={{ borderRadius: ".4em" }} />
                <span className="pv-row">
                  <span className="pv-t pv-w40" />
                  <span className="pv-h xs acc" style={{ width: "18%", marginLeft: "auto" }} />
                </span>
              </span>
            </span>
          </div>
        </>
      );

    /* ---------------- Corporate ---------------- */
    case "corporate":
    default:
      return (
        <>
          <MiniNav links={5} />
          <div className="pv-hero center" style={{ paddingBlock: "1.9em 1.2em" }}>
            <span className="pv-h" style={{ width: "76%", height: "1.15em" }} />
            <span className="pv-t" style={{ width: "56%" }} />
            <span className="pv-row" style={{ justifyContent: "center", marginTop: ".4em" }}>
              <span className="pv-btn" />
              <span className="pv-btn ghost" />
            </span>
          </div>
          <div className="pv-sec tight soft grow">
            <span className="pv-grid" style={{ ["--n" as string]: 3 }}>
              {[0, 1, 2].map((i) => (
                <span className="pv-card" key={i}>
                  <span className="pv-h xs pv-w60" />
                  <span className="pv-t" />
                  <span className="pv-t s" />
                </span>
              ))}
            </span>
          </div>
          <div className="pv-strip">
            {[0, 1, 2, 3].map((i) => (
              <span className="pv-col" key={i} style={{ gap: ".3em" }}>
                <span className="pv-h xs pv-w60" />
                <span className="pv-t s" />
              </span>
            ))}
          </div>
        </>
      );
  }
}

interface Props {
  layout: PreviewLayout;
  palette: TemplatePalette;
  /** Accessible description of what the preview depicts. */
  label: string;
  className?: string;
  style?: CSSProperties;
}

export default function SitePreview({ layout, palette, label, className = "", style }: Props) {
  const vars: CSSProperties = {
    ["--pv-bg" as string]: palette.bg,
    ["--pv-ink" as string]: palette.ink,
    ["--pv-acc" as string]: palette.acc,
    ["--pv-soft" as string]: palette.soft,
    ["--pv-mut" as string]: palette.mut,
    ["--pv-line" as string]: palette.line,
    ...style,
  };

  return (
    <div className={`pv${className ? ` ${className}` : ""}`} style={vars} role="img" aria-label={label}>
      <Skeleton layout={layout} />
    </div>
  );
}
