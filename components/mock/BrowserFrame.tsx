import type { CSSProperties, ReactNode } from "react";
import { Lock } from "@/components/site/Icons";

interface Props {
  url: string;
  children: ReactNode;
  tone?: "paper" | "void";
  /** Aspect ratio of the viewport area, e.g. "16 / 10". */
  ratio?: string;
  className?: string;
  style?: CSSProperties;
  /** Adds the hover sheen layer (parent needs `.pv-hover`). */
  sheen?: boolean;
  flat?: boolean;
}

export default function BrowserFrame({
  url,
  children,
  tone = "paper",
  ratio = "16 / 10",
  className = "",
  style,
  sheen = false,
  flat = false,
}: Props) {
  return (
    <div
      className={`bw${tone === "void" ? " bw--void" : ""}${flat ? " bw--flat" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      <div className="bw__bar">
        <span className="bw__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="bw__url">
          <Lock className="bw__lock" />
          {url}
        </span>
      </div>
      <div className="bw__body pv-frame" style={{ aspectRatio: ratio }}>
        {children}
        {sheen ? <span className="bw__sheen" aria-hidden /> : null}
      </div>
    </div>
  );
}
