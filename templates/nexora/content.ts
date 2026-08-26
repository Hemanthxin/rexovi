/**
 * Nexora — demo content.
 *
 * Same contract as every template in `templates/`: all copy lives here, the
 * component is pure presentation. All figures are illustrative demo data for
 * a fictional company.
 */

export interface Install {
  manager: string;
  command: string;
}

export interface BentoCard {
  span: "wide" | "tall" | "std";
  kicker: string;
  title: string;
  body: string;
  visual: "deploy" | "regions" | "rollback" | "logs" | "team";
}

export interface ProductTab {
  key: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  file: string;
  code: string[];
}

export interface Integration {
  name: string;
  category: string;
  glyph: string;
}

export interface Tier {
  name: string;
  price: string;
  note: string;
  cta: string;
  featured?: boolean;
}

export interface Release {
  version: string;
  date: string;
  title: string;
  body: string;
  tag: "feature" | "fix" | "perf";
}

export const nexora = {
  brand: { name: "Nexora", mark: "N" },

  nav: {
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Product", href: "#product" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
    signIn: "Log in",
    cta: "Start building",
  },

  hero: {
    badge: "v4.0",
    badgeText: "Edge functions are out of beta",
    title: "Ship on Friday.\nSleep on Saturday.",
    body: "Nexora is the application platform your team deploys on. Preview every branch, roll back in one click, and watch what production is actually doing — without assembling it yourself.",
    primary: "Start building",
    secondary: "Read the docs",
    installs: [
      { manager: "npm", command: "npm i -g nexora && nexora init" },
      { manager: "pnpm", command: "pnpm add -g nexora && nexora init" },
      { manager: "yarn", command: "yarn global add nexora && nexora init" },
      { manager: "bun", command: "bun add -g nexora && nexora init" },
    ] as Install[],
    note: "Free for personal projects · No card required",
  },

  logos: ["Loopwire", "Castellan", "Nine Yards", "Piquant", "Halberd", "Verity"],

  stats: [
    { value: "180ms", label: "Median cold start" },
    { value: "34", label: "Edge regions" },
    { value: "99.99%", label: "Control plane uptime" },
    { value: "4.2M", label: "Deploys last quarter" },
  ],

  bento: {
    eyebrow: "The platform",
    title: "Everything between your last commit and production",
    body: "Opinionated where it saves you time, out of the way everywhere else.",
    cards: [
      {
        span: "wide",
        kicker: "Preview environments",
        title: "Every branch gets a real URL",
        body: "Push a branch and Nexora builds it, seeds it and hands back a shareable environment. Reviewers stop guessing what changed.",
        visual: "deploy",
      },
      {
        span: "tall",
        kicker: "Edge network",
        title: "34 regions, one deploy",
        body: "Static assets and edge functions land everywhere at once. No region config, no origin to keep warm.",
        visual: "regions",
      },
      {
        span: "std",
        kicker: "Instant rollback",
        title: "Undo a bad deploy in a click",
        body: "Every build stays addressable. Promote a previous one and traffic moves in seconds.",
        visual: "rollback",
      },
      {
        span: "std",
        kicker: "Observability",
        title: "Logs that answer the question",
        body: "Structured logs, traces and errors on one timeline, filtered by deploy.",
        visual: "logs",
      },
      {
        span: "wide",
        kicker: "Collaboration",
        title: "Roles your security team will sign off",
        body: "SSO, SCIM provisioning, per-project permissions and an audit trail you can export. Set it once and stop thinking about it.",
        visual: "team",
      },
    ] as BentoCard[],
  },

  product: {
    eyebrow: "How it works",
    title: "Three commands, then it is someone else's problem",
    tabs: [
      {
        key: "build",
        label: "Build",
        title: "Detected, not configured",
        body: "Nexora reads your project and picks the build. Override anything in one file when you need to.",
        bullets: ["Framework auto-detection", "Remote build cache", "Monorepo aware"],
        file: "nexora.config.ts",
        code: [
          "import { defineConfig } from 'nexora'",
          "",
          "export default defineConfig({",
          "  framework: 'auto',",
          "  build: { cache: 'remote' },",
          "  regions: ['bom1', 'fra1', 'iad1'],",
          "})",
        ],
      },
      {
        key: "ship",
        label: "Ship",
        title: "Preview, promote, done",
        body: "Every push produces an immutable build. Promote the one you trust; the rest stay available for rollback.",
        bullets: ["Immutable builds", "Atomic promotion", "One-click rollback"],
        file: "terminal",
        code: [
          "$ nexora deploy --preview",
          "",
          "  ✓ built in 12.4s  ·  cache hit 94%",
          "  ✓ uploaded 218 assets",
          "  → https://feat-checkout.nexora.app",
          "",
          "$ nexora promote feat-checkout",
          "  ✓ production updated in 1.8s",
        ],
      },
      {
        key: "observe",
        label: "Observe",
        title: "Know before your users tell you",
        body: "Logs, traces and errors arrive tagged with the deploy that produced them, so bisecting takes a query rather than an afternoon.",
        bullets: ["Per-deploy filtering", "Trace waterfalls", "Alerting webhooks"],
        file: "query.log",
        code: [
          "level:error deploy:v482 region:bom1",
          "",
          "12:04:11  TimeoutError  /api/checkout   1204ms",
          "12:04:12  TimeoutError  /api/checkout   1198ms",
          "12:06:40  ✓ rolled back to v481",
          "12:06:44  no errors in last 60s",
        ],
      },
    ] as ProductTab[],
  },

  integrations: {
    eyebrow: "Integrations",
    title: "Plugs into what you already run",
    body: "Connect a service and Nexora wires the credentials, env vars and webhooks for you.",
    categories: ["All", "Data", "Auth", "Observability", "Comms"],
    items: [
      { name: "Postgres", category: "Data", glyph: "Pg" },
      { name: "Redis", category: "Data", glyph: "Rd" },
      { name: "ClickHouse", category: "Data", glyph: "Ch" },
      { name: "S3", category: "Data", glyph: "S3" },
      { name: "Auth0", category: "Auth", glyph: "A0" },
      { name: "Clerk", category: "Auth", glyph: "Ck" },
      { name: "WorkOS", category: "Auth", glyph: "Wk" },
      { name: "Sentry", category: "Observability", glyph: "Sn" },
      { name: "Datadog", category: "Observability", glyph: "Dd" },
      { name: "Grafana", category: "Observability", glyph: "Gf" },
      { name: "Slack", category: "Comms", glyph: "Sl" },
      { name: "Linear", category: "Comms", glyph: "Ln" },
    ] as Integration[],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Pay for the team, not the traffic",
    body: "Bandwidth and builds are included. Drag to size your team.",
    seatLabel: "Developers",
    perSeat: 1400,
    minSeats: 1,
    maxSeats: 60,
    defaultSeats: 8,
    includedNote: "Includes unlimited previews, 1 TB bandwidth and 10,000 build minutes.",
    tiers: [
      { name: "Hobby", price: "Free", note: "Personal projects, one developer.", cta: "Start free" },
      { name: "Team", price: "usage", note: "Everything you need to ship together.", cta: "Start 14-day trial", featured: true },
      { name: "Enterprise", price: "Custom", note: "SSO, SLA, dedicated regions.", cta: "Talk to us" },
    ] as Tier[],
    teamFeatures: [
      "Unlimited preview environments",
      "Remote build cache",
      "34 edge regions",
      "SSO & SCIM",
      "Audit log export",
      "Priority support",
    ],
  },

  changelog: {
    eyebrow: "Changelog",
    title: "Shipped recently",
    releases: [
      {
        version: "v4.0",
        date: "12 Nov",
        title: "Edge functions out of beta",
        body: "Run request-time code in all 34 regions with a 180ms median cold start. Streaming responses supported.",
        tag: "feature",
      },
      {
        version: "v3.9",
        date: "28 Oct",
        title: "Remote cache now shared across branches",
        body: "Feature branches reuse main's cache where inputs match. Median build time down 41%.",
        tag: "perf",
      },
      {
        version: "v3.8",
        date: "14 Oct",
        title: "SCIM provisioning",
        body: "Sync groups from Okta, Entra ID and Google Workspace. Deprovisioning is immediate.",
        tag: "feature",
      },
      {
        version: "v3.7",
        date: "30 Sep",
        title: "Fixed env vars leaking between preview builds",
        body: "Preview environments now get an isolated secret scope. Existing projects were migrated automatically.",
        tag: "fix",
      },
    ] as Release[],
  },

  quote: {
    text: "We deleted about four thousand lines of deploy scripting the week we moved. Nothing about our release process is interesting any more, which is the highest compliment I can pay it.",
    name: "Devika Suresh",
    role: "Principal Engineer, Loopwire",
    initials: "DS",
  },

  cta: {
    title: "Your first deploy takes about ninety seconds.",
    body: "Free for personal projects. No card, no sales call, no migration weekend.",
    primary: "Start building",
    secondary: "Read the docs",
  },

  footer: {
    blurb: "The application platform for teams that would rather build the product than the pipeline.",
    columns: [
      { title: "Platform", links: ["Previews", "Edge network", "Observability", "Rollbacks", "CLI"] },
      { title: "Developers", links: ["Docs", "API reference", "Templates", "Status", "Changelog"] },
      { title: "Company", links: ["About", "Blog", "Careers", "Customers", "Security"] },
      { title: "Legal", links: ["Terms", "Privacy", "DPA", "Sub-processors"] },
    ],
    copyright: "© 2026 Nexora Inc. All rights reserved.",
    meta: "All systems operational",
  },
} as const;

export type NexoraContent = typeof nexora;
