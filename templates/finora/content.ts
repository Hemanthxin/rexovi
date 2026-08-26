/**
 * Finora — demo content.
 *
 * Every string the template renders lives here, so the site is a pure
 * presentation layer. Swapping this file (or feeding it from a CMS) produces a
 * different business on the same design. Each template in `templates/` follows
 * the same shape: `content.ts` + a component + a scoped stylesheet.
 *
 * All figures are illustrative demo data for a fictional company.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Feature {
  icon: "flow" | "cards" | "insight" | "approve" | "sync" | "shield";
  title: string;
  body: string;
}

export interface PricingTier {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface Faq {
  q: string;
  a: string;
}

export const finora = {
  brand: {
    name: "Finora",
    tagline: "Business banking, minus the busywork",
  },

  nav: {
    links: [
      { label: "Product", href: "#product" },
      { label: "Why Finora", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customers", href: "#customers" },
      { label: "FAQ", href: "#faq" },
    ] as NavLink[],
    signIn: "Sign in",
    cta: "Open an account",
  },

  hero: {
    badge: "Now live for private limited companies",
    title: "Every rupee your business moves, in one place.",
    body: "Finora brings your accounts, cards, approvals and books together. See what you are actually spending, close the month in an afternoon, and stop chasing receipts on WhatsApp.",
    primary: "Open an account",
    secondary: "Book a walkthrough",
    note: "No minimum balance · No setup fee · 10 minute onboarding",
  },

  /** Illustrative demo figures for a fictional company. */
  metrics: [
    { value: "₹840Cr", label: "Processed last year" },
    { value: "12,400", label: "Businesses on Finora" },
    { value: "4 days", label: "Average month-end close" },
    { value: "99.98%", label: "Platform uptime" },
  ] as Metric[],

  logos: ["Kellworth", "Ardent Labs", "Northbay", "Meridian", "Voltaire", "Sundara Co."],

  dashboard: {
    eyebrow: "One dashboard",
    title: "The number you actually need, without a spreadsheet",
    body: "Balances, burn, upcoming bills and every card in the business — reconciled continuously rather than at month end.",
    balanceLabel: "Total balance",
    balance: "₹1,42,86,400",
    delta: "+8.4% vs last month",
    accounts: [
      { name: "Operating", number: "•••• 4402", amount: "₹92,10,800", tone: "primary" as const },
      { name: "Payroll", number: "•••• 7781", amount: "₹38,40,200", tone: "muted" as const },
      { name: "Reserve", number: "•••• 1130", amount: "₹12,35,400", tone: "muted" as const },
    ],
    spendTitle: "Spend by category",
    spend: [
      { label: "Payroll", pct: 42, amount: "₹18,40,000" },
      { label: "Cloud & tools", pct: 23, amount: "₹10,06,000" },
      { label: "Marketing", pct: 18, amount: "₹7,88,000" },
      { label: "Travel", pct: 11, amount: "₹4,81,000" },
      { label: "Other", pct: 6, amount: "₹2,62,000" },
    ],
    activityTitle: "Needs your approval",
    activity: [
      { who: "Priya Nair", what: "AWS — November", amount: "₹4,12,000", when: "2h ago", state: "pending" as const },
      { who: "Rohit Menon", what: "Client dinner, Bengaluru", amount: "₹18,400", when: "5h ago", state: "pending" as const },
      { who: "Finance bot", what: "Vendor payout · Meridian", amount: "₹2,40,000", when: "Yesterday", state: "cleared" as const },
      { who: "Aditi Rao", what: "Figma — annual", amount: "₹1,08,000", when: "Yesterday", state: "cleared" as const },
    ],
    chart: [38, 52, 44, 61, 48, 72, 58, 80, 66, 74, 62, 88],
    chartLabel: "Net cash, last 12 months",
  },

  features: {
    eyebrow: "Why teams switch",
    title: "Built for the finance work nobody enjoys",
    body: "The parts of running money that eat a week every month — automated, then kept out of your way.",
    items: [
      {
        icon: "cards",
        title: "Cards with real limits",
        body: "Issue a virtual card per vendor or per person in seconds. Set the cap, set the category, and it simply cannot be exceeded.",
      },
      {
        icon: "approve",
        title: "Approvals that end in a decision",
        body: "Route by amount, team or vendor. Approvers get one notification with everything they need, not a thread to scroll.",
      },
      {
        icon: "insight",
        title: "Spend you can explain",
        body: "Every transaction lands categorised and matched to its receipt, so a question about last quarter takes a minute.",
      },
      {
        icon: "sync",
        title: "Books that stay closed",
        body: "Two-way sync with Tally, Zoho and QuickBooks. Reconciliation happens as money moves, not in a scramble.",
      },
      {
        icon: "flow",
        title: "Payouts without the portal",
        body: "Schedule vendor payments, salaries and GST from one place. Batch them, approve once, done.",
      },
      {
        icon: "shield",
        title: "Controls you can prove",
        body: "Every action carries an immutable audit trail. Export a clean log for your auditor without opening a ticket.",
      },
    ] as Feature[],
  },

  security: {
    eyebrow: "Trust",
    title: "Regulated, audited, and boring in the right ways",
    body: "Deposits are held with partner banks and covered under DICGC. Nothing about your money should be a surprise.",
    points: [
      { title: "Partner-bank held", body: "Balances sit with RBI-licensed partner banks, never on our balance sheet." },
      { title: "SOC 2 Type II", body: "Independently audited controls, renewed annually." },
      { title: "AES-256 at rest", body: "Encrypted in transit and at rest, with keys rotated on a schedule." },
      { title: "Granular roles", body: "Decide exactly who can view, initiate, approve and export." },
    ],
    badges: ["SOC 2 Type II", "ISO 27001", "PCI DSS", "DICGC covered"],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Priced per company, not per seat",
    body: "Invite your whole team, your accountant and your auditor. We do not charge for people who need to look.",
    tiers: [
      {
        name: "Starter",
        price: "₹0",
        cadence: "forever",
        summary: "For founders getting the first accounts in order.",
        features: ["1 operating account", "5 virtual cards", "Unlimited team members", "Tally & Zoho sync", "Email support"],
        cta: "Open an account",
      },
      {
        name: "Growth",
        price: "₹4,999",
        cadence: "per month",
        summary: "For teams where more than one person spends.",
        features: [
          "Everything in Starter",
          "Unlimited accounts & cards",
          "Approval workflows",
          "Receipt capture & matching",
          "Spend policies by team",
          "Priority support",
        ],
        cta: "Start 30-day trial",
        featured: true,
      },
      {
        name: "Scale",
        price: "Custom",
        cadence: "annual",
        summary: "For finance teams with auditors to satisfy.",
        features: [
          "Everything in Growth",
          "Multi-entity consolidation",
          "Custom approval matrices",
          "SSO & SCIM provisioning",
          "Dedicated success manager",
          "99.99% uptime SLA",
        ],
        cta: "Talk to sales",
      },
    ] as PricingTier[],
  },

  testimonials: {
    eyebrow: "Customers",
    title: "What changed after the switch",
    items: [
      {
        quote:
          "We closed October in three days. It used to take the better part of two weeks and a lot of apologising to our accountant.",
        name: "Meera Krishnan",
        role: "Finance Lead, Kellworth",
        initials: "MK",
      },
      {
        quote:
          "Every vendor has its own card with its own cap. I stopped finding surprises in the statement, which is the whole job really.",
        name: "Arjun Desai",
        role: "Co-founder, Ardent Labs",
        initials: "AD",
      },
      {
        quote:
          "Our auditor asked for eighteen months of approvals. I exported it while still on the call.",
        name: "Sanjana Iyer",
        role: "Controller, Northbay",
        initials: "SI",
      },
    ] as Testimonial[],
  },

  faq: {
    eyebrow: "FAQ",
    title: "The questions we actually get",
    items: [
      {
        q: "Is Finora a bank?",
        a: "No. Finora is a financial technology company. Accounts and deposits are provided by our RBI-licensed partner banks, and eligible balances are covered under DICGC up to the applicable limit.",
      },
      {
        q: "How long does onboarding take?",
        a: "Most private limited companies finish in about ten minutes with a CIN, PAN and director KYC. Accounts are usually live the same working day.",
      },
      {
        q: "Can I keep my existing bank?",
        a: "Yes. Plenty of teams run Finora alongside an existing banking relationship and move spend across gradually. You can connect external accounts read-only from day one.",
      },
      {
        q: "Does it work with my accounting software?",
        a: "Two-way sync ships for Tally, Zoho Books and QuickBooks. Anything else can use the API or a scheduled CSV export.",
      },
      {
        q: "What happens when the free plan is not enough?",
        a: "You will see it coming — we flag the limit before you hit it and never stop a payment mid-flight. Upgrading is one click and prorated.",
      },
      {
        q: "Who can see what?",
        a: "Roles are granular: view, initiate, approve and export are separate permissions. Accountants and auditors can be given read-only access at no cost.",
      },
    ] as Faq[],
  },

  cta: {
    title: "Close your next month in an afternoon.",
    body: "Open an account in ten minutes. Bring your team, your accountant and your auditor — we do not charge per seat.",
    primary: "Open an account",
    secondary: "Book a walkthrough",
  },

  footer: {
    blurb:
      "Finora is a financial technology company, not a bank. Banking services are provided by RBI-licensed partner banks.",
    columns: [
      {
        title: "Product",
        links: ["Accounts", "Cards", "Approvals", "Payouts", "Integrations", "API"],
      },
      {
        title: "Company",
        links: ["About", "Careers", "Press", "Security", "Status"],
      },
      {
        title: "Resources",
        links: ["Help centre", "Guides", "Month-end checklist", "Changelog"],
      },
      {
        title: "Legal",
        links: ["Terms", "Privacy", "Grievance redressal", "Fair practice code"],
      },
    ],
    address: "Finora Technologies Pvt Ltd · Indiranagar, Bengaluru 560038",
    copyright: "© 2026 Finora Technologies Pvt Ltd. All rights reserved.",
  },
} as const;

export type FinoraContent = typeof finora;
