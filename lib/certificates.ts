/**
 * Register of certificates issued by Rexovi Technologies.
 *
 * Every certificate carries a QR code that opens /verify, where anyone can
 * enter the Certificate ID printed on it. Only IDs listed here verify.
 *
 * To issue a certificate: add an entry below, put the same ID on the
 * certificate, commit and deploy.
 *
 * ID format: RXV-CERT-<YYYY>-<NNN>, e.g. RXV-CERT-2026-001.
 */

export interface IssuedCertificate {
  id: string;
  recipient: string;
  /** e.g. "Internship Completion", "Appreciation" */
  type: string;
  /** What it was awarded for — role, project, period. */
  detail: string;
  /** ISO date, YYYY-MM-DD */
  issued: string;
  revoked?: boolean;
}

export const certificates: IssuedCertificate[] = [
  // {
  //   id: "RXV-CERT-2026-001",
  //   recipient: "Full Name",
  //   type: "Internship Completion",
  //   detail: "Frontend Development Intern · 01 Jun 2026 – 31 Aug 2026",
  //   issued: "2026-09-01",
  // },
];

export const normaliseId = (raw: string) => raw.trim().toUpperCase().replace(/[\s/_]+/g, "-");

export function findCertificate(raw: string): IssuedCertificate | undefined {
  const id = normaliseId(raw);
  return certificates.find((c) => normaliseId(c.id) === id);
}
