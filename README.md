# Rexovi Technologies — Company Website

A production-ready marketing and product site for **Rexovi Technologies**: a digital
technology company that builds its own products (flagship: **Saafera**), delivers client
engineering, and publishes a library of premium website templates.

Built with **Next.js 16 (App Router) + React 19 + TypeScript** and hand-written CSS —
no UI framework, no component library, no stock imagery — the only raster assets are
Saafera's own.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
npm start        # serve the production build
npm run lint
```

---

## Design language

The visual concept is a **digital workshop** — a place where things are drafted, measured
and made — expressed through restraint rather than literal props.

| Token group | Decision |
|---|---|
| Base | Warm off-white `#F7F5F0` paper, deep `#0B0C0E` void for contrast sections |
| Ink | Charcoal `#111214`, never pure black for body text |
| Accent | **One** signal colour, taken from the Rexovi logo: `#F47B20`, with the gradient ends `#F9A340` / `#EA6316` for the mark, and `#B04E0C` reserved for small text so it clears contrast |
| Type | `Bricolage Grotesque` display · `Inter` body · `JetBrains Mono` labels · `Instrument Serif` italic for accent words |
| Structure | Blueprint grids, 1px rules, registration ticks, mono section indices (`Services / 02`) |
| Radii | Deliberately tight (3–24px) — nothing is over-rounded |
| Motion | Scroll reveals, mask-slide headlines, floating mockups, counters, a cursor halo — all fast, all disabled under `prefers-reduced-motion` |

All tokens live at the top of [`app/globals.css`](app/globals.css). Change the accent in
one place and the whole site follows.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — hero → Saafera → services → templates → work → why → about → stats → process → CTA |
| `/saafera` | Flagship product showcase (dark treatment, inverted nav) |
| `/templates` | Template marketplace with search, category filters and detail modal |
| `/work` | Selected work, editorial layout |
| `/about` | About Rexovi, principles, metrics, process |
| `/contact` | Start a Project brief |
| `/sitemap.xml`, `/robots.txt` | Generated from `app/sitemap.ts` and `app/robots.ts` |

Every route prerenders as static HTML.

---

## Architecture

```
app/
  layout.tsx          fonts, metadata, Organization JSON-LD, nav + footer shell
  globals.css         design tokens, base, shared primitives
  previews.css        browser/phone chrome + the miniature-site design system
  page.tsx            homepage composition
  saafera/  templates/  work/  about/  contact/   route segments
components/
  site/               Nav, Footer, Reveal, Tilt, Counter, CursorHalo, Icons
  mock/               BrowserFrame, PhoneFrame, SitePreview, SaaferaPreview
  sections/           Hero, SaaferaSpotlight, Services, TemplatesTeaser,
                      SelectedWork/WorkList, WhyRexovi, About, Stats, Process, CTA
  templates/          TemplateBrowser, TemplateCard, TemplateModal
lib/
  content.ts          all site copy: nav, services, principles, process, work, metrics, Saafera
  templates.ts        the template catalogue
```

### Brand identity

The logo is rebuilt as vector + live text in [`components/site/Logo.tsx`](components/site/Logo.tsx), not a bitmap:

- **The mark** — the R with its dissolving pixel fragments — is inline SVG filled from a single gradient defined once in the root layout (`<LogoGradient />`), so it is crisp at any size and costs no request.
- **The wordmark** is real text: `RE<span>X</span>OVI` with the X carrying the brand gradient. It stays selectable, searchable and screen-reader readable, and inverts automatically on dark sections.
- `variant="full"` adds the TECHNOLOGIES line; `tagline` adds the **Ideas · Design · Build** rule. The footer uses both.
- `app/icon.svg` is the favicon, built from the same mark.

The mark is a faithful reconstruction rather than the original artwork. **If you have the logo as vector, drop it at `public/brand/rexovi-mark.svg` and swap the `<svg>` body in `LogoMark`** — everything else (sizing, colour, placement) already works around it.

### The preview engine — why there are almost no images

Every "screenshot" on this site (template previews, service mockups, portfolio shots) is
**drawn in CSS**. The single exception is Saafera, which uses its own real photography —
see below. `components/mock/SitePreview.tsx` holds ten page skeletons
(`saas`, `finance`, `agency`, `health`, `estate`, `travel`, `education`, `shop`,
`portfolio`, `corporate`); each template supplies a six-colour palette, and the skeleton
renders through the miniature design system in `app/previews.css`.

Consequences worth keeping:

- **Near-zero image bytes.** Only the two Saafera assets are raster; everything else is markup.
- **Crisp at any size.** Previews are sized with container queries (`font-size: 2.35cqi`,
  everything else in `em`), so the same markup is sharp in a 300px card and a 900px modal.
- **A new template needs no artwork** — pick a skeleton, pick a palette, done.

### Saafera imagery

The Saafera mockups are **real screenshots of the live product**, cross-faded inside the
browser and phone frames by
[`ScreenSlideshow.tsx`](components/mock/ScreenSlideshow.tsx) — no drawn skeleton.

`public/saafera/` holds the sign-in and dashboard screens for both devices, re-encoded to
WebP (303 KB for all four). The sign-in screens were captured from saafera.com; the
signed-in dashboards were supplied, since every in-product route redirects to the login
gate.

**Adding screens.** Drop a file into `public/saafera/` using one of these base names
(`.png`, `.jpg`, `.jpeg`, `.webp` or `.avif` all work):

| Desktop | Mobile | Order | Status |
|---|---|---|---|
| `login-desktop` | `login-mobile` | 1st | ✅ present |
| `dashboard-desktop` | `dashboard-mobile` | 2nd | ✅ present |
| `planner-desktop` | `planner-mobile` | 3rd | optional |
| `signup-desktop` | `signup-mobile` | 4th | optional |

The lookup runs on the server at build time: a slot with no file is skipped, one file
renders as a still, two or more become a slideshow with dots. No code change, and it
applies everywhere the mock appears — homepage, product page, work index, services card.

**Match the capture aspect ratio.** The desktop shots are 2.086:1, and the browser frames
around them use exactly that via `SAAFERA_DESKTOP_RATIO` (exported from
`SaaferaPreview.tsx`) so nothing is cropped. If you swap in captures of a different shape,
update that constant. Slides are top-aligned and use `object-fit: cover`, so a mismatched
frame crops the bottom rather than the header — the mobile dashboard (319×823) loses its
tab bar this way inside the 9:19 phone frame.

**Capture at 2×.** The desktop mock renders up to ~1220 CSS px wide and the phone mock up
to ~260, so a retina display needs ~2440 and ~520 device pixels. A 1× screenshot gets
upscaled and looks soft. The sign-in shots are 2× (3804×1824 and 828×1792); the dashboards
are still 1×, so they are sharp at DPR 1 but soft on retina — re-capture at 2× to fix.

Two settings keep them sharp, and both matter:

- `sizes` on each `<Image>` must match the **widest** place the mock renders. Under-
  declaring makes the browser fetch a small variant and upscale it — that alone had the
  desktop mock fetching a 892px file for a 1218px slot.
- `quality={90}`, allow-listed in `next.config.ts`. The sources are already compressed
  WebP, and Next's default q75 re-encode visibly softens UI text and hairlines.

Auto-advance runs only while a frame is on screen and the pointer is elsewhere, so several
mockups on one page stay calm; reduced-motion users get a static first slide with working
dots. Everything goes through `next/image`.

### Adding a template

Append one object to `templates` in [`lib/templates.ts`](lib/templates.ts). The
marketplace grid, category counts, filters, search index, homepage rail and detail modal
all update from it.

```ts
{
  slug: "aurora",
  name: "Aurora",
  category: "SaaS",
  tagline: "Analytics product website",
  description: "…",
  tags: ["Analytics", "Dashboard"],
  sections: ["Hero", "Feature grid", "Pricing"],
  previewUrl: "aurora.rexovi.com",
  demoPath: null,          // set once a live demo is hosted
  pages: 9,
  layout: "saas",          // one of the ten skeletons
  palette: { bg: "#FFF", ink: "#12141A", acc: "#3B82F6",
             soft: "#EFF5FF", mut: "#C6D6EE", line: "#E3EDFA" },
  featured: true,          // optional — surfaces it on the homepage
}
```

---

## CMS mapping (WordPress-ready)

The site is componentised so it can be lifted onto a CMS without redesign. Every section
already reads its content from `lib/`, so the port is "swap the data source":

| Component | CMS equivalent |
|---|---|
| `Nav` / `Footer` | Theme header/footer partials + menu locations |
| `Hero`, `SaaferaSpotlight`, `Services`, `TemplatesTeaser`, `SelectedWork`, `WhyRexovi`, `About`, `Stats`, `Process`, `CTA` | Flexible-content layouts (ACF) or Gutenberg blocks |
| `lib/templates.ts` | `rexovi_template` custom post type — fields: name, category (taxonomy), tagline, description, tags, sections, preview URL, pages, layout, palette |
| `lib/content.ts` → `work` | `rexovi_project` custom post type |
| `lib/content.ts` → `services`, `principles`, `processSteps`, `metrics` | Repeater fields on an options page |
| `TemplateCard` | The template archive loop item |
| `TemplateModal` | Single-template view (as a modal or a `/templates/{slug}` page) |

`TemplateBrowser` filters and searches client-side over whatever array it is handed, so it
works unchanged against a REST/GraphQL response.

---

## Accessibility & performance

- Semantic landmarks throughout; one `h1` per page; headings in order.
- Skip link, visible focus rings, `aria-pressed` on filter and chip toggles.
- Modal: focus trap, Escape to close, focus restored to the trigger, `aria-modal`.
- Mobile drawer: scroll lock, Escape to close, `inert` while hidden.
- Every decorative mockup carries `role="img"` with a descriptive label; pure ornament is
  `aria-hidden`.
- Scroll-reveal styles are scoped to a `.js` class set before first paint — **with
  JavaScript disabled the whole site renders fully visible**, not blank.
- All animation collapses under `prefers-reduced-motion: reduce`.
- Self-hosted fonts via `next/font` (no render-blocking third-party CSS), no images, no
  client-side data fetching. Only the nav, template browser, contact form and small motion
  helpers ship JavaScript; every page is static HTML.
- Verified at 390px, 1440px and in between: no horizontal page scroll on any route.

---

## Before going live

A few values are placeholders that only the business can confirm:

1. **`hello@rexovi.com`** — used in the footer, contact page and the enquiry form.
   Appears in `app/contact/ContactForm.tsx` and `app/contact/page.tsx`.
2. **Contact form delivery.** There is no backend, so the form validates and then hands a
   fully composed brief to the visitor's mail client via `mailto:`. This works today, but
   swap it for a `POST` to an API route or form service when one exists — see the marked
   comment in `ContactForm.tsx`.
3. **Social URLs** in `components/site/Footer.tsx` currently point at the platform roots.
4. **`https://rexovi.com`** is set as the canonical origin in `app/layout.tsx`,
   `app/sitemap.ts` and `app/robots.ts`.
5. **The logo mark** in `LogoMark` is a reconstruction. Supply the original vector for
   pixel-exact fidelity (see **Brand identity** above).
6. **Template preview URLs** (`finora.rexovi.com` etc.) are shown in the mock browser
   chrome only — they are illustrative. Set `demoPath` when real demos are hosted.
7. **Open Graph images** are not included; add `app/opengraph-image.tsx` when brand
   artwork exists.

Metrics are intentionally limited to what is verifiable today (one product, five build
disciplines, ten templates) — no invented client counts, revenue or years in business.
