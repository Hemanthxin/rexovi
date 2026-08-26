/**
 * Lumina — demo content.
 *
 * Same contract as every template in `templates/`: all copy lives here.
 * All names and figures are for a fictional studio.
 */

export interface Project {
  index: string;
  name: string;
  client: string;
  discipline: string;
  year: string;
  image: string;
  tint: string;
}

export interface Service {
  index: string;
  title: string;
  body: string;
  items: string[];
}

export interface Award {
  year: string;
  title: string;
  org: string;
}

export const lumina = {
  brand: { name: "Lumina", suffix: "Studio" },

  nav: {
    links: [
      { label: "Work", href: "#work" },
      { label: "Studio", href: "#studio" },
      { label: "Services", href: "#services" },
      { label: "Recognition", href: "#recognition" },
    ],
    cta: "Start a project",
  },

  hero: {
    line1: "We make brands",
    rotating: ["worth looking at.", "worth talking about.", "worth remembering."],
    body: "Lumina is a nine-person design studio in Bengaluru. We work on identity, packaging and the digital surfaces in between — usually for people launching something they care about.",
    cta: "See the work",
    secondary: "About the studio",
    meta: [
      { k: "Est.", v: "2016" },
      { k: "Studio", v: "Bengaluru" },
      { k: "Team", v: "Nine" },
    ],
  },

  marquee: [
    "Brand identity",
    "Packaging",
    "Art direction",
    "Digital design",
    "Editorial",
    "Motion",
    "Naming",
    "Photography",
  ],

  work: {
    eyebrow: "Selected work",
    title: "Six we are still pleased with",
    body: "A studio is only as good as what it lets out of the door. These left recently.",
    projects: [
      {
        index: "01",
        name: "Aurel",
        client: "Aurel Audio",
        discipline: "Identity · Packaging",
        year: "2026",
        image: "/templates/lumina/work-aurel.webp",
        tint: "#F2C230",
      },
      {
        index: "02",
        name: "Mellow",
        client: "Mellow Foods",
        discipline: "Art direction · Packaging",
        year: "2025",
        image: "/templates/lumina/work-mellow.webp",
        tint: "#A8CF6B",
      },
      {
        index: "03",
        name: "Fennel",
        client: "Fennel & Co.",
        discipline: "Identity · Interior graphics",
        year: "2025",
        image: "/templates/lumina/work-fennel.webp",
        tint: "#C4855B",
      },
      {
        index: "04",
        name: "Halden",
        client: "Halden Supply",
        discipline: "Retail identity · Signage",
        year: "2025",
        image: "/templates/lumina/work-halden.webp",
        tint: "#8FA3B8",
      },
      {
        index: "05",
        name: "Glyph",
        client: "Glyph Systems",
        discipline: "Design system · Iconography",
        year: "2024",
        image: "/templates/lumina/work-glyph.webp",
        tint: "#5F8F7A",
      },
      {
        index: "06",
        name: "Orrery",
        client: "Orrery Watches",
        discipline: "Identity · Product photography",
        year: "2024",
        image: "/templates/lumina/work-orrery.webp",
        tint: "#7E8794",
      },
    ] as Project[],
  },

  grade: {
    eyebrow: "In the studio",
    title: "The bit clients never see",
    body: "Every campaign frame is shot flat, then graded to the palette we built for the brand. Drag to watch a raw Aurel frame become the one that shipped.",
    before: "/templates/lumina/grade-before.webp",
    after: "/templates/lumina/work-aurel.webp",
    beforeLabel: "Raw capture",
    afterLabel: "Graded",
    note: "Aurel Audio · campaign frame 04 of 26",
  },

  studio: {
    eyebrow: "The studio",
    title: "Nine people, one room, no account managers.",
    body: [
      "Lumina started in 2016 with two people and a rented desk above a bakery. We are nine now, in a room in Indiranagar with better light and roughly the same amount of coffee.",
      "You work with the people doing the work. There is no layer between you and the person drawing the thing — which is slower to scale and much better for the result.",
    ],
    image: "/templates/lumina/studio.webp",
    stats: [
      { v: "9", k: "People" },
      { v: "48", k: "Projects shipped" },
      { v: "10", k: "Years running" },
    ],
  },

  services: {
    eyebrow: "What we do",
    title: "Four things, properly",
    items: [
      {
        index: "01",
        title: "Brand identity",
        body: "Naming, marks, type, colour and the rules that keep it coherent once we hand it over. Delivered as a system your team can actually run.",
        items: ["Naming & narrative", "Logotype & marks", "Type and colour systems", "Guidelines"],
      },
      {
        index: "02",
        title: "Packaging",
        body: "Structure, artwork and production. We work with your printer from the first sketch, so what arrives on shelf is what we drew.",
        items: ["Structural design", "Artwork & dielines", "Print supervision", "Shelf testing"],
      },
      {
        index: "03",
        title: "Art direction",
        body: "Campaign concepts, shoot direction, grading and the image library that keeps everything on-brand for the next two years.",
        items: ["Campaign concepts", "Shoot direction", "Retouching & grade", "Asset libraries"],
      },
      {
        index: "04",
        title: "Digital",
        body: "Sites and product surfaces designed and built in-house. Small, fast, and handed over with the code that runs them.",
        items: ["Websites", "Design systems", "Front-end build", "Motion"],
      },
    ] as Service[],
  },

  recognition: {
    eyebrow: "Recognition",
    title: "Occasionally someone notices",
    awards: [
      { year: "2026", title: "Packaging of the Year — Aurel", org: "Kyoorius Design Awards" },
      { year: "2025", title: "Identity, Gold — Fennel & Co.", org: "D&AD" },
      { year: "2025", title: "Art Direction, Shortlist — Mellow", org: "The One Show" },
      { year: "2024", title: "Studio of the Year, Finalist", org: "India Design Forum" },
      { year: "2024", title: "Digital Craft, Merit — Glyph", org: "Awwwards" },
    ] as Award[],
  },

  contact: {
    eyebrow: "Say hello",
    title: "Tell us what you are making.",
    body: "We take on roughly eight projects a year and we are booking from March. A paragraph about the thing is plenty to start.",
    email: "studio@lumina.design",
    phone: "+91 80 4123 8890",
    address: "4th Floor, Doddanna Building\n12th Main, Indiranagar\nBengaluru 560038",
    cta: "Write to the studio",
  },

  footer: {
    columns: [
      { title: "Studio", links: ["Work", "About", "Services", "Recognition", "Journal"] },
      { title: "Elsewhere", links: ["Instagram", "Behance", "LinkedIn", "Are.na"] },
    ],
    copyright: "© 2026 Lumina Studio Pvt Ltd",
    note: "Bengaluru, India",
  },
} as const;

export type LuminaContent = typeof lumina;
