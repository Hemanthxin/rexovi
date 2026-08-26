import type { Metadata } from "next";
import Reveal from "@/components/site/Reveal";
import WorkList from "@/components/sections/WorkList";
import CTA from "@/components/sections/CTA";
import { work } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Products and platforms built by Rexovi Technologies — including Saafera, fintech dashboards, travel platforms and multi-role SaaS applications.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Selected Work · Rexovi Technologies",
    description:
      "Digital products, web applications and platforms designed and built by Rexovi Technologies.",
    url: "/work",
  },
};

const disciplines = ["Product design", "Web applications", "Mobile", "Design systems", "Front-end", "Launch support"];

export default function WorkPage() {
  return (
    <>
      <header className="page-head">
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">Selected work</span>
              </Reveal>
              <h1 className="d-xl" style={{ maxWidth: "13ch" }}>
                <Reveal as="span" variant="mask">
                  Things we
                </Reveal>
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">actually built.</em>
                </Reveal>
              </h1>
            </div>

            <div style={{ display: "grid", gap: 22 }}>
              <Reveal delay={140}>
                <p className="lead">
                  Our own product sits alongside client platforms here on purpose — we hold both to
                  the same standard, and each one teaches us something the other needs.
                </p>
              </Reveal>
              <Reveal className="row" delay={200} style={{ ["--row-gap" as string]: "6px" }}>
                {disciplines.map((d) => (
                  <span className="chip" key={d}>
                    {d}
                  </span>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: "clamp(30px, 4vw, 60px)" }} aria-labelledby="index-title">
        <div className="wrap">
          <h2 id="index-title" className="sr-only">
            Project index
          </h2>
          <WorkList items={work} />
        </div>
      </section>

      <CTA />
    </>
  );
}
