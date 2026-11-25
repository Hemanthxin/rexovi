import type { CSSProperties } from "react";
import Image from "next/image";
import logoInk from "@/public/brand/rexovi-logo.png";
import logoWhite from "@/public/brand/rexovi-logo-white.png";
import mark from "@/public/brand/rexovi-mark.png";
import s from "./Logo.module.css";

/**
 * Rexovi Technologies identity — the official logo artwork.
 *
 * Files live in `public/brand/`:
 *   rexovi-logo.png        full lockup, dark wordmark (light backgrounds)
 *   rexovi-logo-white.png  full lockup, light wordmark (dark backgrounds)
 *   rexovi-mark.png        the R mark on its own
 * All three have transparent backgrounds.
 */

export function LogoMark({
  size = 22,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src={mark}
      alt=""
      aria-hidden
      height={size}
      width={Math.round((size * mark.width) / mark.height)}
      className={`${s.mark}${className ? ` ${className}` : ""}`}
      style={style}
    />
  );
}

interface LogoProps {
  /** Rendered height in px; width follows the artwork's aspect ratio. */
  height?: number;
  /** `light` = white wordmark for dark backgrounds. */
  tone?: "ink" | "light";
  priority?: boolean;
  className?: string;
  /** Adds the "(OPC) Private Limited" line under the lockup. */
  legal?: boolean;
}

export default function Logo({ height = 36, tone = "ink", priority = false, className = "", legal = false }: LogoProps) {
  const src = tone === "light" ? logoWhite : logoInk;
  const img = (
    <Image
      src={src}
      alt={legal ? "Rexovi Technologies (OPC) Private Limited" : "Rexovi Technologies"}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      priority={priority}
      className={`${s.lockup}${!legal && className ? ` ${className}` : ""}`}
    />
  );
  if (!legal) return img;
  return (
    <span
      className={`${s.withLegal}${className ? ` ${className}` : ""}`}
      style={{ ["--legal-size" as string]: `${Math.max(7, Math.round(height * 0.17 * 10) / 10)}px` }}
    >
      {img}
      <span className={s.legalLine} aria-hidden>
        (OPC) Private Limited
      </span>
    </span>
  );
}
