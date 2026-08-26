import fs from "node:fs";
import path from "node:path";
import ScreenSlideshow, { type Shot } from "./ScreenSlideshow";

/**
 * Saafera product mockups — real screenshots of the live product, cross-faded
 * inside the browser and phone frames.
 *
 * ── Adding or replacing screens ───────────────────────────────────────────
 * Drop files into `public/saafera/` using the base names below. Any of
 * .png / .jpg / .jpeg / .webp / .avif works, and the order here is the order
 * they appear in the slideshow:
 *
 *     Desktop            Mobile
 *     login-desktop      login-mobile
 *     dashboard-desktop  dashboard-mobile
 *     planner-desktop    planner-mobile
 *
 * The lookup runs on the server at build time, so a slot with no matching
 * file is simply skipped — one file renders as a still, two or more become a
 * slideshow. No code change needed.
 *
 * Capture desktop screens at 16:10 (e.g. 1600×1000) and mobile at roughly
 * 9:19.5 (e.g. 414×896) so nothing important lands outside the frame.
 */

/**
 * Aspect ratio of the desktop captures (1902x912). The browser frames around
 * these mocks use it so the screenshots fill edge to edge instead of being
 * cropped. Update this if you swap in captures of a different shape.
 */
export const SAAFERA_DESKTOP_RATIO = "1902 / 912";

const EXTS = ["png", "jpg", "jpeg", "webp", "avif"] as const;
const SHOT_DIR = path.join(process.cwd(), "public", "saafera");

function findShot(base: string): string | null {
  for (const ext of EXTS) {
    if (fs.existsSync(path.join(SHOT_DIR, `${base}.${ext}`))) {
      return `/saafera/${base}.${ext}`;
    }
  }
  return null;
}

function resolve(slots: { base: string; label: string }[]): Shot[] {
  const out: Shot[] = [];
  for (const slot of slots) {
    const src = findShot(slot.base);
    if (src) out.push({ src, label: slot.label });
  }
  return out;
}

/* Slide order: sign-in first, then the product actually doing something.
   `signup-*` sits last and ships empty — two near-identical auth screens
   back to back read as a mistake, so it only appears if a file is added. */
const DESKTOP_SLOTS = [
  { base: "login-desktop", label: "Saafera — sign-in screen" },
  { base: "dashboard-desktop", label: "Saafera — trip dashboard" },
  { base: "planner-desktop", label: "Saafera — trip planner" },
  { base: "signup-desktop", label: "Saafera — create account screen" },
];

const MOBILE_SLOTS = [
  { base: "login-mobile", label: "Saafera mobile — sign-in screen" },
  { base: "dashboard-mobile", label: "Saafera mobile — home screen" },
  { base: "planner-mobile", label: "Saafera mobile — trip planner" },
  { base: "signup-mobile", label: "Saafera mobile — create account screen" },
];

export function SaaferaDesktop({ priority = false }: { priority?: boolean }) {
  return (
    <ScreenSlideshow
      shots={resolve(DESKTOP_SLOTS)}
      sizes="(max-width: 900px) 92vw, min(1040px, 62vw)"
      priority={priority}
    />
  );
}

export function SaaferaMobile({ priority = false }: { priority?: boolean }) {
  return (
    <ScreenSlideshow
      shots={resolve(MOBILE_SLOTS)}
      sizes="(max-width: 900px) 45vw, 220px"
      priority={priority}
      intervalMs={5200}
    />
  );
}
