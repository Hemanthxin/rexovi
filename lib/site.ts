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

/**
 * Public contact / grievance email for the legal pages. Set NEXT_PUBLIC_CONTACT_EMAIL
 * once a mailbox exists; until then the pages point people to the contact form.
 */
export const LEGAL_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;

/** Date the privacy policy and terms were last revised. */
export const LEGAL_UPDATED = "25 November 2026";
