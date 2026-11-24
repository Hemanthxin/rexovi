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
}

export default function Logo({ height = 36, tone = "ink", priority = false, className = "" }: LogoProps) {
  const src = tone === "light" ? logoWhite : logoInk;
  return (
    <Image
      src={src}
      alt="Rexovi Technologies"
      height={height}
      width={Math.round((height * src.width) / src.height)}
      priority={priority}
      className={`${s.lockup}${className ? ` ${className}` : ""}`}
    />
  );
}
