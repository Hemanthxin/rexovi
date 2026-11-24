import Reveal from "@/components/site/Reveal";
import { findCertificate, normaliseId } from "@/lib/certificates";
import { COMPANY } from "@/lib/site";
import s from "./verify.module.css";

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

export default function VerifyView({ id }: { id?: string }) {
  const query = id?.slice(0, 64) ?? "";
  const cert = query ? findCertificate(query) : undefined;
  const status = !query ? "idle" : !cert ? "missing" : cert.revoked ? "revoked" : "valid";

  return (
    <>
      <header className="page-head">
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">Certificate verification</span>
              </Reveal>
              <h1 className="d-xl" style={{ maxWidth: "12ch" }}>
                <Reveal as="span" variant="mask">
                  Is it
                </Reveal>
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">genuine?</em>
                </Reveal>
              </h1>
            </div>
            <Reveal delay={140}>
              <p className="lead">
                Every certificate issued by {COMPANY.name} carries a unique Certificate ID next to its
                QR code. Enter it below to confirm who it was issued to and when.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section aria-label="Verify a certificate">
        <div className="wrap">
          <div className={s.panel}>
            <form className={s.form} action="/verify" method="get" role="search">
              <label htmlFor="cert-id" className={s.label}>
                Certificate ID
              </label>
              <div className={s.row}>
                <input
                  id="cert-id"
                  name="id"
                  className={s.input}
                  defaultValue={query}
                  placeholder="RXV-CERT-2026-001"
                  autoComplete="off"
                  spellCheck={false}
                  required
                  maxLength={64}
                />
                <button type="submit" className="btn">
                  Verify
                </button>
              </div>
            </form>

            <div className={s.result} data-status={status} aria-live="polite">
              {status === "idle" && (
                <p className={s.hint}>The ID is printed at the top-right of the certificate, e.g. RXV-CERT-2026-001.</p>
              )}

              {status === "valid" && cert && (
                <>
                  <div className={s.badge}>
                    <span className={s.dot} aria-hidden /> Verified · issued by {COMPANY.legalName}
                  </div>
                  <dl className={s.grid}>
                    <div>
                      <dt>Certificate ID</dt>
                      <dd className={s.mono}>{normaliseId(cert.id)}</dd>
                    </div>
                    <div>
                      <dt>Issued to</dt>
                      <dd>{cert.recipient}</dd>
                    </div>
                    <div>
                      <dt>Certificate</dt>
                      <dd>{cert.type}</dd>
                    </div>
                    <div>
                      <dt>Date of issue</dt>
                      <dd>{fmt(cert.issued)}</dd>
                    </div>
                    <div className={s.wide}>
                      <dt>Details</dt>
                      <dd>{cert.detail}</dd>
                    </div>
                  </dl>
                </>
              )}

              {status === "revoked" && (
                <div className={s.badge}>
                  <span className={s.dot} aria-hidden /> Certificate {normaliseId(query)} has been revoked and is no longer valid.
                </div>
              )}

              {status === "missing" && (
                <>
                  <div className={s.badge}>
                    <span className={s.dot} aria-hidden /> No certificate found for {normaliseId(query)}
                  </div>
                  <p className={s.hint}>
                    Check the ID for typos. If it still does not verify, the certificate was not issued by{" "}
                    {COMPANY.name}.
                  </p>
                </>
              )}
            </div>

            <p className={s.legal}>
              {COMPANY.legalName} · CIN {COMPANY.cin}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
