import Link from "next/link";
import BrowserFrame from "@/components/mock/BrowserFrame";
import PhoneFrame from "@/components/mock/PhoneFrame";
import LiveFrame from "@/components/mock/LiveFrame";
import { SaaferaMobile } from "@/components/mock/SaaferaPreview";
import Reveal from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/Icons";
import { services, type ServiceVisual as VisualKind } from "@/lib/content";
import s from "./Services.module.css";

/* A phone frame is 9:18, so the embedded site lays out at a real phone width
   and renders its own mobile design rather than a squeezed desktop one. */
const PHONE_W = 400;
const PHONE_H = 800;

const AREA: Record<string, string> = {
  websites: "aWebsites",
  "web-applications": "aApp",
  "mobile-applications": "aMobile",
  "ui-ux-design": "aUx",
  "digital-products": "aProduct",
};

const flowNodes = ["Idea", "Design", "Build", "Launch", "Grow"];
const appBars = [42, 66, 88, 54, 72, 96, 60, 80, 48, 90];

function Visual({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "browser":
      return (
        <div className={`${s.vBrowser} pv-hover`}>
          <span className={s.vBrowserBack} aria-hidden />
          <div className={s.vBrowserFront}>
            <BrowserFrame url="lumina.studio" ratio="16 / 10" sheen>
              <LiveFrame fill src="/preview/lumina" title="Lumina, a marketing site we built" />
            </BrowserFrame>
          </div>
        </div>
      );

    case "app":
      return (
        <div className={s.vApp} role="img" aria-label="Web application dashboard preview">
          <div className={s.vAppSide} aria-hidden>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className={s.vAppMain} aria-hidden>
            <div className={s.vAppRow}>
              <span className={s.vAppTile} />
              <span className={s.vAppTile} />
              <span className={s.vAppTile} />
            </div>
            <div className={s.vAppChart}>
              {appBars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );

    case "mobile":
      return (
        <div className={s.vPhones}>
          <PhoneFrame className={s.vPhoneA} ratio="9 / 18">
            <LiveFrame
              fill
              src="/preview/medora"
              title="Medora on a phone"
              designWidth={PHONE_W}
              designHeight={PHONE_H}
            />
          </PhoneFrame>
          <PhoneFrame className={s.vPhoneB} ratio="9 / 18">
            <SaaferaMobile />
          </PhoneFrame>
        </div>
      );

    case "uiux":
      return (
        <div className={s.vUx} role="img" aria-label="Interface design artboards with spacing measurements">
          <span className={`${s.vUxBoard} ${s.vUxBoardA}`} aria-hidden />
          <span className={`${s.vUxBoard} ${s.vUxBoardB}`} aria-hidden />
          <span className={s.vUxMeasure} aria-hidden />
          <span className={s.vUxSwatches} aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </div>
      );

    case "product":
    default:
      return (
        <div className={s.vFlow} role="img" aria-label="Product path from idea to growth">
          <div className={s.vFlowTrack}>
            {flowNodes.map((n, i) => (
              <div className={s.vFlowNode} key={n}>
                <span className={s.vFlowDot}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.vFlowLabel}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      );
  }
}

export default function Services() {
  return (
    <section className={`section ${s.sec}`} id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="sec-head">
          <Reveal className="sec-head__top">
            <span className="label">Services / 02</span>
            <span className="label label--bare">Rexovi Workshop</span>
          </Reveal>
          <div className="sec-head__body">
            <Reveal>
              <h2 id="services-title" className="d-lg">
                What we <span className="serif-em accent-word">build</span>
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <p className="lead">
                Five disciplines, one team. We move between them constantly — most things worth
                building need more than one.
              </p>
            </Reveal>
          </div>
        </div>

        <div className={s.grid}>
          {services.map((service, i) => (
            <Reveal
              as="article"
              key={service.id}
              delay={i * 70}
              className={`${s.card} ${s[AREA[service.id]]}`}
            >
              <div className={s.head}>
                <div className={s.idxRow}>
                  <span className={s.idx}>{service.index}</span>
                  <span className={s.idxRule} aria-hidden />
                </div>
                <h3 className={s.title}>{service.title}</h3>
                <p className={s.body}>{service.description}</p>
                <div className={s.points}>
                  {service.points.map((p) => (
                    <span className={s.point} key={p}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.visual}>
                <Visual kind={service.visual} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} style={{ marginTop: "clamp(28px, 3.5vw, 48px)" }}>
          <Link href="/contact" className="tlink">
            Tell us what you want to build
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
