/**
 * Template catalogue.
 *
 * This array is the single source of truth for the template marketplace.
 * It maps 1:1 onto a CMS collection (e.g. a WordPress `rexovi_template`
 * custom post type): every field below becomes a field / taxonomy term,
 * so adding a template later means adding one object — no layout work.
 */

export type TemplateCategory =
  | "Business"
  | "SaaS"
  | "Finance"
  | "Healthcare"
  | "E-commerce"
  | "Travel"
  | "Education"
  | "Agency"
  | "Portfolio";

/** Preview skeletons available to the CSS preview engine. */
export type PreviewLayout =
  | "saas"
  | "finance"
  | "agency"
  | "health"
  | "estate"
  | "travel"
  | "education"
  | "shop"
  | "portfolio"
  | "corporate";

export interface TemplatePalette {
  bg: string;
  ink: string;
  acc: string;
  soft: string;
  mut: string;
  line: string;
  /** Renders the browser chrome in dark mode for dark templates. */
  dark?: boolean;
}

export interface TemplateItem {
  slug: string;
  name: string;
  category: TemplateCategory;
  /** One-line positioning, shown on the card. */
  tagline: string;
  /** Longer copy, shown in the detail modal. */
  description: string;
  tags: string[];
  /** Sections shipped with the template — drives the modal spec list. */
  sections: string[];
  /** URL shown in the mock browser chrome. */
  previewUrl: string;
  /** Reserved for a hosted live demo once published. */
  demoPath: string | null;
  pages: number;
  layout: PreviewLayout;
  palette: TemplatePalette;
  featured?: boolean;
  /** A full demo site exists at /preview/<slug> (see templates/registry.ts). */
  livePreview?: boolean;
}

export const TEMPLATE_CATEGORIES: readonly ("All" | TemplateCategory)[] = [
  "All",
  "Business",
  "SaaS",
  "Finance",
  "Healthcare",
  "E-commerce",
  "Travel",
  "Education",
  "Agency",
  "Portfolio",
] as const;

export const templates: TemplateItem[] = [
  {
    slug: "finora",
    name: "Finora",
    category: "Finance",
    tagline: "Financial technology website",
    description:
      "A composed, data-forward template for fintech products, lending platforms and investment tools. Built around trust signals, clear numbers and a calm reading rhythm.",
    tags: ["Fintech", "Dashboard", "Trust", "Data"],
    sections: ["Hero with live metrics", "Product dashboard", "Security block", "Pricing", "FAQ", "Contact"],
    previewUrl: "finora.rexovi.com",
    demoPath: null,
    pages: 9,
    layout: "finance",
    palette: { bg: "#FFFFFF", ink: "#0B1A33", acc: "#2563EB", soft: "#EEF3FC", mut: "#C3CEE0", line: "#E3EAF5" },
    featured: true,
    livePreview: true,
  },
  {
    slug: "nexora",
    name: "Nexora",
    category: "SaaS",
    tagline: "Modern technology company website",
    description:
      "A product-led template for SaaS and technology companies. Feature storytelling, integration grids and a pricing architecture that scales from one plan to five.",
    tags: ["SaaS", "Product", "Pricing", "Integrations"],
    sections: ["Split hero", "Feature grid", "Integrations", "Pricing table", "Changelog", "Docs entry"],
    previewUrl: "nexora.rexovi.com",
    demoPath: null,
    pages: 11,
    layout: "saas",
    palette: { bg: "#FFFFFF", ink: "#14121F", acc: "#6D5BFF", soft: "#F1EFFF", mut: "#C9C4E4", line: "#E7E4F6" },
    featured: true,
    livePreview: true,
  },
  {
    slug: "lumina",
    name: "Lumina",
    category: "Agency",
    tagline: "Creative agency website",
    description:
      "An editorial template for studios and creative agencies. Oversized type, case-study led layouts and generous whitespace that lets the work carry the page.",
    tags: ["Editorial", "Case studies", "Typography"],
    sections: ["Statement hero", "Case study index", "Services", "Studio", "Journal", "Enquiry"],
    previewUrl: "lumina.rexovi.com",
    demoPath: null,
    pages: 8,
    layout: "agency",
    palette: { bg: "#FBF7F0", ink: "#17150F", acc: "#E2552F", soft: "#F1EAE0", mut: "#CFC4B4", line: "#E7DFD2" },
    featured: true,
    livePreview: true,
  },
  {
    slug: "medora",
    name: "Medora",
    category: "Healthcare",
    tagline: "Healthcare website",
    description:
      "A reassuring, accessible template for clinics, health platforms and care providers. Appointment flows, service directories and legible typography throughout.",
    tags: ["Clinics", "Booking", "Accessible"],
    sections: ["Care hero", "Specialities", "Practitioners", "Booking flow", "Patient info", "Locations"],
    previewUrl: "medora.rexovi.com",
    demoPath: null,
    pages: 10,
    layout: "health",
    palette: { bg: "#FFFFFF", ink: "#0E2A28", acc: "#14A98F", soft: "#E9F6F3", mut: "#B8D6D0", line: "#DFEFEB" },
    livePreview: true,
  },
  {
    slug: "urbanly",
    name: "Urbanly",
    category: "Business",
    tagline: "Real estate website",
    description:
      "A property-first template with listing grids, filterable inventory and a warm architectural palette. Designed for developers, agencies and single-tower launches.",
    tags: ["Property", "Listings", "Filters"],
    sections: ["Listing hero", "Filter bar", "Property grid", "Neighbourhood", "Agent profiles", "Enquiry"],
    previewUrl: "urbanly.rexovi.com",
    demoPath: null,
    pages: 12,
    layout: "estate",
    palette: { bg: "#FFFDFB", ink: "#1A1A18", acc: "#8A6E4B", soft: "#F3EEE7", mut: "#D3C8B8", line: "#EBE3D7" },
  },
  {
    slug: "travella",
    name: "Travella",
    category: "Travel",
    tagline: "Travel website",
    description:
      "A vivid template for tour operators, destination brands and booking platforms. Immersive imagery slots, itinerary layouts and a search-forward hero.",
    tags: ["Booking", "Itineraries", "Destinations"],
    sections: ["Search hero", "Destination grid", "Itinerary detail", "Reviews", "Offers", "Checkout"],
    previewUrl: "travella.rexovi.com",
    demoPath: null,
    pages: 10,
    layout: "travel",
    palette: { bg: "#FFFFFF", ink: "#17232B", acc: "#FF8A3D", soft: "#FFF1E6", mut: "#E0C9B4", line: "#F2E5D9" },
    featured: true,
  },
  {
    slug: "eduvia",
    name: "Eduvia",
    category: "Education",
    tagline: "Education platform",
    description:
      "A structured template for course platforms, academies and institutions. Curriculum modules, instructor profiles and progress-aware learner surfaces.",
    tags: ["Courses", "LMS", "Curriculum"],
    sections: ["Course hero", "Catalogue", "Curriculum", "Instructors", "Enrolment", "Learner dashboard"],
    previewUrl: "eduvia.rexovi.com",
    demoPath: null,
    pages: 11,
    layout: "education",
    palette: { bg: "#FFFFFF", ink: "#10231A", acc: "#16A34A", soft: "#ECF8F0", mut: "#BEDCC8", line: "#DFF0E6" },
  },
  {
    slug: "shopora",
    name: "Shopora",
    category: "E-commerce",
    tagline: "Modern e-commerce website",
    description:
      "A quiet, product-respecting commerce template. Editorial merchandising, a fast collection grid and a checkout path that stays out of the way.",
    tags: ["Commerce", "Catalogue", "Checkout"],
    sections: ["Campaign hero", "Collection grid", "Product detail", "Cart drawer", "Lookbook", "Support"],
    previewUrl: "shopora.rexovi.com",
    demoPath: null,
    pages: 13,
    layout: "shop",
    palette: { bg: "#FAF8F5", ink: "#171512", acc: "#B4472E", soft: "#F0EBE4", mut: "#CFC7BC", line: "#E7E0D6" },
  },
  {
    slug: "kanvas",
    name: "Kanvas",
    category: "Portfolio",
    tagline: "Portfolio for designers and studios",
    description:
      "A dark, gallery-grade portfolio template. Project-first navigation, full-bleed media slots and a restrained interface that disappears behind the work.",
    tags: ["Dark", "Gallery", "Personal"],
    sections: ["Index hero", "Project grid", "Case detail", "About", "Recognition", "Contact"],
    previewUrl: "kanvas.rexovi.com",
    demoPath: null,
    pages: 7,
    layout: "portfolio",
    palette: { bg: "#101014", ink: "#F5F4F2", acc: "#D6FF4B", soft: "#1B1B21", mut: "#4A4A55", line: "#26262F", dark: true },
  },
  {
    slug: "ventra",
    name: "Ventra",
    category: "Business",
    tagline: "Corporate and consulting website",
    description:
      "A dependable corporate template for consultancies, services firms and multi-division businesses. Clear service architecture and a careers-ready structure.",
    tags: ["Corporate", "Consulting", "Careers"],
    sections: ["Statement hero", "Divisions", "Insights", "Leadership", "Careers", "Offices"],
    previewUrl: "ventra.rexovi.com",
    demoPath: null,
    pages: 12,
    layout: "corporate",
    palette: { bg: "#FFFFFF", ink: "#101820", acc: "#0EA5E9", soft: "#EDF6FB", mut: "#BFD3DE", line: "#E2EEF5" },
  },
];

export const featuredTemplates = templates.filter((t) => t.featured);

export function templateBySlug(slug: string): TemplateItem | undefined {
  return templates.find((t) => t.slug === slug);
}

/** Counts per category, used by the marketplace filter bar. */
export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: templates.length };
  for (const t of templates) counts[t.category] = (counts[t.category] ?? 0) + 1;
  return counts;
}
