/**
 * Site content model.
 *
 * Every section of the site reads from here rather than hard-coding copy,
 * so the whole site maps cleanly onto a CMS later: each export below is a
 * repeatable field group (ACF flexible content / Gutenberg block attrs).
 */

/* ---------------- Navigation ---------------- */

export const NAV_LINKS = [
  { label: "Products", href: "/saafera" },
  { label: "Services", href: "/#services" },
  { label: "Templates", href: "/templates" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

/* ---------------- Services ---------------- */

export type ServiceVisual = "browser" | "app" | "mobile" | "uiux" | "product";

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  points: string[];
  visual: ServiceVisual;
}

export const services: Service[] = [
  {
    id: "websites",
    index: "01",
    title: "Websites",
    description:
      "Modern, fast and conversion-focused websites designed around real business goals.",
    points: ["Marketing sites", "Landing systems", "CMS integration"],
    visual: "browser",
  },
  {
    id: "web-applications",
    index: "02",
    title: "Web Applications",
    description:
      "Scalable web applications with thoughtful user experiences and modern architecture.",
    points: ["Dashboards", "Portals", "Internal tools"],
    visual: "app",
  },
  {
    id: "mobile-applications",
    index: "03",
    title: "Mobile Applications",
    description:
      "Beautiful and practical mobile experiences for Android and iOS.",
    points: ["Android", "iOS", "Cross-platform"],
    visual: "mobile",
  },
  {
    id: "ui-ux-design",
    index: "04",
    title: "UI/UX Design",
    description:
      "Interfaces that balance aesthetics, usability and product thinking.",
    points: ["Design systems", "Prototypes", "Interaction design"],
    visual: "uiux",
  },
  {
    id: "digital-products",
    index: "05",
    title: "Custom Digital Products",
    description:
      "From early concept to launch, we help transform ideas into digital products.",
    points: ["Discovery", "MVP build", "Iteration"],
    visual: "product",
  },
];

/* ---------------- Principles ---------------- */

export interface Principle {
  index: string;
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    index: "01",
    title: "Think Product First",
    body: "We focus on the experience, not just the technology.",
  },
  {
    index: "02",
    title: "Design With Purpose",
    body: "Every interaction should have a reason.",
  },
  {
    index: "03",
    title: "Build For Scale",
    body: "Products should be prepared for tomorrow, not just today.",
  },
  {
    index: "04",
    title: "Move From Idea To Reality",
    body: "We help turn concepts into usable digital experiences.",
  },
];

/* ---------------- Process ---------------- */

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  detail: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discover",
    body: "Understand the problem.",
    detail: "Context, constraints and the people who will actually use the thing.",
  },
  {
    index: "02",
    title: "Define",
    body: "Shape the product strategy.",
    detail: "Scope, priorities and the shortest path to something real.",
  },
  {
    index: "03",
    title: "Design",
    body: "Create the user experience.",
    detail: "Structure first, interface second, polish last.",
  },
  {
    index: "04",
    title: "Develop",
    body: "Build the technology.",
    detail: "Clean architecture, sensible tooling, code written to be maintained.",
  },
  {
    index: "05",
    title: "Launch",
    body: "Release and improve.",
    detail: "Ship, measure, refine — launch is a starting point, not an ending.",
  },
];

/* ---------------- Selected work ---------------- */

export type WorkVisual = "saafera" | "finance" | "travel" | "platform";

export interface WorkItem {
  slug: string;
  index: string;
  title: string;
  kind: string;
  discipline: string;
  summary: string;
  tags: string[];
  visual: WorkVisual;
  /**
   * Slug of a built site under /preview. When present the portfolio card
   * embeds the real thing instead of a drawn placeholder.
   */
  previewSlug?: string;
  layout: "full" | "split" | "device";
  flagship?: boolean;
  href?: string;
}

export const work: WorkItem[] = [
  {
    slug: "saafera",
    index: "01",
    title: "Saafera",
    kind: "Digital product",
    discipline: "Technology / Travel",
    summary:
      "Rexovi's first product — a smart travel planner for India, taken from an internal idea through product definition, interface design and build.",
    tags: ["Product", "Web", "Design system"],
    visual: "saafera",
    layout: "full",
    flagship: true,
    href: "/saafera",
  },
  {
    slug: "rexovi-finance",
    index: "02",
    title: "Rexovi Finance",
    kind: "Fintech platform",
    discipline: "Web Application",
    summary:
      "A data-dense financial interface built around clarity: dense information presented without noise.",
    tags: ["Dashboard", "Data", "Web app"],
    visual: "finance",
    previewSlug: "finora",
    layout: "split",
  },
  {
    slug: "travel-experience",
    index: "03",
    title: "Travel Experience",
    kind: "Travel platform",
    discipline: "Web + Mobile",
    summary:
      "A booking and discovery experience designed once and carried consistently across web and mobile.",
    tags: ["Web", "Mobile", "Booking"],
    visual: "travel",
    previewSlug: "travella",
    layout: "device",
  },
  {
    slug: "business-platform",
    index: "04",
    title: "Business Platform",
    kind: "SaaS product",
    discipline: "Web Application",
    summary:
      "A multi-role SaaS platform structured to grow — modular surfaces, predictable patterns, room to scale.",
    tags: ["SaaS", "Multi-role", "Architecture"],
    visual: "platform",
    previewSlug: "nexora",
    layout: "split",
  },
];

/* ---------------- Metrics ---------------- */

export const metrics = [
  { value: "01", label: "Digital Product", note: "Saafera — live and evolving" },
  { value: "02+", label: "Core Services", note: "Products and client engineering" },
  { value: "05", label: "Build Disciplines", note: "Web · Apps · Mobile · Design" },
  { value: "∞", label: "Ideas to Build", note: "The list never gets shorter" },
] as const;

/* ---------------- Capability marquee ---------------- */

export const capabilities = [
  "Websites",
  "Web Applications",
  "Mobile Applications",
  "UI/UX Design",
  "Digital Products",
  "Design Systems",
  "Website Templates",
  "Product Strategy",
] as const;

/* ---------------- Saafera ---------------- */

export const saafera = {
  label: "Rexovi Product 01",
  name: "Saafera",
  domain: "saafera.com",
  /** Saafera's own brand line. */
  motto: "Explore More. Fulfill Soul.",
  headline: "Our first product. Built from an idea into a digital experience.",
  positioning:
    "Our first digital product: smart travel planning for India. Saafera helps people discover places, build budget-friendly routes, compare stays, and find the festivals and hidden gems worth planning a trip around.",
  body: [
    "Saafera started inside Rexovi as a question rather than a brief: why is planning a trip across India still the hardest part of taking one? Inspiration is everywhere; a route you can actually afford and follow is not.",
    "We treated it the way we treat client work — research, product definition, interface design, engineering — with one difference: we were also the client. That changed how carefully every decision had to be argued.",
  ],
  pillars: [
    { title: "Discover", body: "Surface places worth going, including the ones guidebooks skip." },
    { title: "Plan", body: "Turn a rough idea into a real itinerary with a budget that holds." },
    { title: "Experience", body: "Stays, routes and festivals lined up so the trip actually happens." },
  ],
  facts: [
    { k: "Status", v: "Live product" },
    { k: "Built by", v: "Rexovi Technologies" },
    { k: "Domain", v: "saafera.com" },
    { k: "Surfaces", v: "Web · Mobile" },
  ],
} as const;
