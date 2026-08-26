import Link from "next/link";
import Reveal from "@/components/site/Reveal";
import WorkList from "./WorkList";
import { ArrowRight } from "@/components/site/Icons";
import { work } from "@/lib/content";

export default function SelectedWork() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="sec-head__top">
            <span className="label">Work / 05</span>
            <span className="label label--bare">Products &amp; platforms</span>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="work-title" className="d-lg">
                Selected <span className="serif-em accent-word">work</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                A look at what comes out of the workshop — our own product alongside platforms we
                have designed and built for other people.
              </p>
            </Reveal>
          </div>
        </div>

        <WorkList items={work} />

        <Reveal style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
          <Link href="/work" className="btn btn--ghost">
            See all work
            <ArrowRight className="btn__arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
