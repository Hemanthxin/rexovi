import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import TemplateBrowser from "@/components/templates/TemplateBrowser";
import CTA from "@/components/sections/CTA";
import { ArrowRight } from "@/components/site/Icons";
import { TEMPLATE_CATEGORIES, templates } from "@/lib/templates";
import s from "./templates.module.css";

export const metadata: Metadata = {
  title: "Website Templates",
  description:
    "Browse premium website templates designed and built by Rexovi Technologies — business, SaaS, finance, healthcare, e-commerce, travel, education, agency and portfolio designs.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Website Templates · Rexovi Technologies",
    description:
      "Premium website templates designed and built in-house by Rexovi Technologies. Preview a design, then launch it as-is or let us build on top of it.",
    url: "/templates",
  },
};

const steps = [
  { k: "01", t: "Preview", d: "Open any template and see the real design, not a thumbnail." },
  { k: "02", t: "Choose", d: "Pick the one closest to how your business actually works." },
  { k: "03", t: "Customise", d: "We adapt content, brand and structure around you." },
  { k: "04", t: "Launch", d: "You get a fast, responsive site — and a team behind it." },
];

export default function TemplatesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Rexovi Website Templates",
    description:
      "Premium website templates designed and built by Rexovi Technologies across nine categories.",
    hasPart: templates.map((t) => ({
      "@type": "CreativeWork",
      name: t.name,
      genre: t.category,
      abstract: t.tagline,
    })),
  };

  return (
    <>
      <header className={`page-head ${s.head}`}>
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div className={s.headMain}>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">Rexovi Templates</span>
              </Reveal>
              <h1 className="d-xl">
                <Reveal as="span" variant="mask">
                  Website templates,
                </Reveal>
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">built by us.</em>
                </Reveal>
              </h1>
            </div>

            <div className={s.headSide}>
              <Reveal delay={140}>
                <p className="lead">
                  A growing library of production-ready designs. Preview any template, then use it
                  as your starting point — on its own, or as the base for something we build with
                  you.
                </p>
              </Reveal>
              <Reveal className={s.headStats} delay={200}>
                <span>
                  <b>{String(templates.length).padStart(2, "0")}</b> Templates
                </span>
                <span>
                  <b>{TEMPLATE_CATEGORIES.length - 1}</b> Categories
                </span>
                <span>
                  <b>100%</b> Responsive
                </span>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      <section className={s.gallery} id="gallery" aria-labelledby="gallery-title">
        <div className="wrap">
          <h2 id="gallery-title" className="sr-only">
            Template gallery
          </h2>
          <TemplateBrowser items={templates} variant="gallery" />
        </div>
      </section>

      <section className={s.how} aria-labelledby="how-title">
        <div className="wrap">
          <div className="sec-head">
            <Reveal className="sec-head__top">
              <span className="label">How it works</span>
              <span className="label label--bare">Template → live site</span>
            </Reveal>
            <div className="sec-head__body">
              <Reveal>
                <h2 id="how-title" className="d-md">
                  A template is a starting point, not a shortcut.
                </h2>
              </Reveal>
              <Reveal delay={90}>
                <p className="lead">
                  Every template ships as a complete design system. What makes it yours is the part
                  we do together.
                </p>
              </Reveal>
            </div>
          </div>

          <ol className={s.steps}>
            {steps.map((step, i) => (
              <Reveal as="li" className={s.step} key={step.k} delay={i * 80}>
                <span className={s.stepK}>{step.k}</span>
                <h3 className={s.stepT}>{step.t}</h3>
                <p className={s.stepD}>{step.d}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className={s.howFoot} delay={120}>
            <p>
              Need something that is not in the library yet? We design new templates continuously —
              and custom ones on request.
            </p>
            <Link href="/contact" className="tlink">
              Request a template
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
    </>
  );
}
