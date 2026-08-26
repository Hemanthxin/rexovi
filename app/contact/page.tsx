import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/site/Reveal";
import ContactForm from "./ContactForm";
import { processSteps } from "@/lib/content";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Tell Rexovi Technologies what you want to build — websites, web applications, mobile apps, UI/UX or a full digital product.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Start a Project · Rexovi Technologies",
    description: "Have an idea worth building? Let's turn it into something people can use.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <header className={`page-head ${s.head}`}>
        <span className="blueprint" aria-hidden />
        <div className="wrap">
          <div className="page-head__grid">
            <div>
              <Reveal style={{ marginBottom: 22 }}>
                <span className="label label--accent">Start a project</span>
              </Reveal>
              <h1 className="d-xl" style={{ maxWidth: "13ch" }}>
                <Reveal as="span" variant="mask">
                  Have an idea
                </Reveal>
                <Reveal as="span" variant="mask" delay={110}>
                  <em className="serif-em accent-word">worth building?</em>
                </Reveal>
              </h1>
            </div>
            <Reveal delay={140}>
              <p className="lead">
                Let&apos;s turn it into something people can use, remember and love. Tell us roughly
                what you have in mind — an idea in one paragraph is enough to start.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <section aria-label="Project enquiry">
        <div className="wrap">
          <div className={s.layout}>
            <Suspense
              fallback={
                <div className={s.form}>
                  <div className={s.formTop}>Loading brief…</div>
                  <div className={s.formBody} style={{ minHeight: 420 }} />
                </div>
              }
            >
              <ContactForm />
            </Suspense>

            <aside className={s.aside} id="talk">
              <div className={s.panel}>
                <h2 className={s.panelHead}>Talk to Rexovi</h2>
                <div className={s.panelBody}>
                  <div className={s.contactRow}>
                    <span className={s.contactKey}>Email</span>
                    <span className={s.contactVal}>
                      <a href="mailto:hello@rexovi.com">hello@rexovi.com</a>
                    </span>
                  </div>
                  <div className={s.contactRow}>
                    <span className={s.contactKey}>Product</span>
                    <span className={s.contactVal}>
                      <a href="https://saafera.com" target="_blank" rel="noopener noreferrer">
                        saafera.com
                      </a>
                    </span>
                  </div>
                  <div className={s.contactRow}>
                    <span className={s.contactKey}>Response time</span>
                    <span className={s.contactVal}>Within two working days</span>
                  </div>
                </div>
              </div>

              <div className={s.panel}>
                <h2 className={s.panelHead}>What happens next</h2>
                <div className={s.panelBody}>
                  <ol className={s.steps}>
                    {processSteps.map((step) => (
                      <li className={s.stepRow} key={step.index}>
                        <b>{step.index}</b>
                        <span>
                          <strong style={{ fontWeight: 500 }}>{step.title}</strong> — {step.body}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <p className={s.quiet}>
                Not ready for a full brief? Send a single line about the problem you are trying to
                solve. We would rather start there than with a specification.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
