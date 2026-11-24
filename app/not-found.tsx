import Link from "next/link";
import { ArrowRight } from "@/components/site/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="page-head" style={{ paddingBottom: "clamp(80px, 12vw, 160px)" }}>
      <span className="blueprint" aria-hidden />
      <div className="wrap">
        <div className="page-head__grid">
          <div>
            <span className="label label--accent" style={{ marginBottom: 22, display: "flex" }}>
              Error 404
            </span>
            <h1 className="d-xl" style={{ maxWidth: "12ch" }}>
              This page isn&apos;t <span className="serif-em accent-word">built yet.</span>
            </h1>
          </div>
          <div style={{ display: "grid", gap: 24 }}>
            <p className="lead">
              The link you followed doesn&apos;t lead anywhere on this site. The workshop is still
              open, though — try one of these instead.
            </p>
            <div className="row">
              <Link href="/" className="btn">
                Back to home
                <ArrowRight className="btn__arrow" />
              </Link>
              <Link href="/templates" className="btn btn--ghost">
                Browse templates
                <ArrowRight className="btn__arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
