/**
 * Canonical origin of the site. Set NEXT_PUBLIC_SITE_URL when a custom domain
 * goes live; until then the Vercel deployment is the public address.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rexovi.vercel.app").replace(/\/$/, "");
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export const COMPANY = {
  name: "Rexovi Technologies",
  legalName: "Rexovi Technologies (OPC) Private Limited",
  cin: "U58201KA2026OPC231735",
  founded: "2026",
  region: "Karnataka",
  country: "IN",
} as const;
