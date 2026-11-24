import Link from "next/link";
import { ArrowRight, Instagram, LinkedIn, XMark } from "./Icons";
import Logo from "./Logo";
import { COMPANY } from "@/lib/site";
import s from "./Footer.module.css";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/#services" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Products",
    links: [{ label: "Saafera", href: "/saafera", tag: "01" }],
  },
  {
    title: "Templates",
    links: [
      { label: "Website Templates", href: "/templates" },
      { label: "Browse Templates", href: "/templates#gallery" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedIn },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: Instagram },
  { label: "X", href: "https://x.com/", Icon: XMark },
];

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="wrap">
        <div className={s.grid}>
          <div className={s.brandCol}>
            <div className={s.brandRow}>
              <Logo height={64} tone="light" />
            </div>
            <p className={s.brandLine}>
              Digital products. Websites. Mobile experiences. We build the things we would want to
              use — then we build them for other people too.
            </p>
            <span className={s.status}>
              <span className="dot-live" aria-hidden />
              Open for new projects
            </span>
          </div>

          {columns.map((col) => (
            <div className={s.col} key={col.title}>
              <h2 className={s.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>
                      {l.label}
                      {"tag" in l && l.tag ? <span className={s.tagInline}>{l.tag}</span> : null}
                      <ArrowRight size={13} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={s.col}>
            <h2 className={s.colTitle}>Social</h2>
            <ul>
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                    <ArrowRight size={13} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={s.band} aria-hidden>
        <div className="wrap">
          <div className={s.bandMark}>REXOVI</div>
        </div>
      </div>

      <div className="wrap">
        <div className={s.bottom}>
          <span>
            © 2026 {COMPANY.legalName}. All rights reserved. · CIN {COMPANY.cin}
          </span>
          <div className={s.social}>
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
