import type { Metadata } from "next";
import Reveal from "@/components/site/Reveal";
import About from "@/components/sections/About";
import WhyRexovi from "@/components/sections/WhyRexovi";
import Process from "@/components/sections/Process";
import Stats from "@/components/sections/Stats";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About Rexovi",
  description:
    "Rexovi Technologies is a digital technology company focused on building meaningful digital experiences, products and platforms — combining technology, design, product thinking and innovation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Rexovi Technologies",
    description:
      "A digital technology company building its own products while helping businesses create digital experiences.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <header className="page-head">
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">About Rexovi</span>
              </Reveal>
              <h1 className="d-xl" style={{ maxWidth: "14ch" }}>
                <Reveal as="span" variant="mask">
                  A company that
                </Reveal>
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">ships its own ideas.</em>
                </Reveal>
              </h1>
            </div>

            <div style={{ display: "grid", gap: 20 }}>
              <Reveal delay={140}>
                <p className="lead">
                  Rexovi Technologies builds digital products, websites and mobile experiences. We
                  run two tracks at once: our own products, and the platforms we build for other
                  businesses.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="lead muted" style={{ fontSize: "1rem" }}>
                  The first track produced Saafera. The second produces the client work and the
                  template library. Neither would be as good without the other.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      <About />
      <WhyRexovi />
      <Stats />
      <Process />
      <CTA />
    </>
  );
}
