import type { CSSProperties } from "react";
import s from "./Logo.module.css";

/**
 * Rexovi Technologies identity.
 *
 * Rebuilt as vector + live text rather than a bitmap so it stays crisp at
 * any size, inverts cleanly on the dark sections, and costs no request.
 * The wordmark is real text (the orange X is a span), so it is selectable
 * and readable by screen readers and search engines.
 *
 * NOTE: the mark below is a faithful reconstruction. If the original vector
 * exists, drop it at `public/brand/rexovi-mark.svg` and swap the <svg> here.
 */

/** id of the shared gradient rendered once by <LogoGradient /> in the layout. */
const GRAD = "rexovi-mark-gradient";

/**
 * Rendered once per document (root layout). Every mark references it, so
 * there is no duplicated id and no per-instance state.
 */
export function LogoGradient() {
  return (
    <svg width="0" height="0" aria-hidden focusable={false} style={{ position: "absolute" }}>
      <defs>
        <linearGradient id={GRAD} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-2, #F9A340)" />
          <stop offset="55%" stopColor="var(--accent, #F47B20)" />
          <stop offset="100%" stopColor="var(--accent-deep, #EA6316)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoMark({
  size = 22,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const fill = `url(#${GRAD})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`${s.mark}${className ? ` ${className}` : ""}`}
      style={style}
      role="presentation"
      aria-hidden
      focusable={false}
    >
      {/* Pixel fragments dissolving off the stem */}
      <g fill={fill}>
        <rect x="20" y="40" width="11" height="11" rx="1.5" opacity=".92" />
        <rect x="6" y="52" width="8" height="8" rx="1.2" opacity=".68" />
        <rect x="18" y="64" width="6" height="6" rx="1" opacity=".46" />
        <rect x="2" y="74" width="4.5" height="4.5" rx=".8" opacity=".3" />
      </g>

      {/* The R: angular stem, cut bowl, diagonal leg */}
      <path
        fill={fill}
        fillRule="evenodd"
        d="M38 14h44c19.9 0 32 11.4 32 28.6 0 13.2-7.2 22.8-19.4 26.5L118 106H90.5L69.6 72.4H60.5V106H38V14Zm22.5 20.5v19.4h20.2c7.5 0 11.6-3.4 11.6-9.7 0-6.3-4.1-9.7-11.6-9.7H60.5Z"
      />
    </svg>
  );
}

interface LogoProps {
  /** `full` adds the TECHNOLOGIES line beneath the wordmark. */
  variant?: "wordmark" | "full";
  size?: number;
  className?: string;
  /** Renders the tagline rule: Ideas · Design · Build */
  tagline?: boolean;
}

export default function Logo({
  variant = "wordmark",
  size = 20,
  className = "",
  tagline = false,
}: LogoProps) {
  return (
    <span className={`${s.lockup}${className ? ` ${className}` : ""}`} data-variant={variant}>
      <LogoMark size={size} />
      <span className={s.text}>
        <span className={s.word}>
          RE<span className={s.x}>X</span>OVI
        </span>
        {variant === "full" ? <span className={s.sub}>Technologies</span> : null}
        {tagline ? (
          <span className={s.tagline}>
            <i />
            Ideas <b>·</b> Design <b>·</b> Build
            <i />
          </span>
        ) : null}
      </span>
    </span>
  );
}
