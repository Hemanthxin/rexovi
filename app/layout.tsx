import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import CursorHalo from "@/components/site/CursorHalo";
import { LogoGradient } from "@/components/site/Logo";
import "./globals.css";
import "./previews.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

const SITE = "https://rexovi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rexovi Technologies — We build digital products people remember",
    template: "%s · Rexovi Technologies",
  },
  description:
    "Rexovi Technologies creates websites, mobile applications and digital products that turn ambitious ideas into powerful experiences. Makers of Saafera and premium website templates.",
  keywords: [
    "Rexovi Technologies",
    "digital product company",
    "website development",
    "web application development",
    "mobile app development",
    "UI UX design",
    "website templates",
    "Saafera",
  ],
  authors: [{ name: "Rexovi Technologies" }],
  creator: "Rexovi Technologies",
  applicationName: "Rexovi Technologies",
  openGraph: {
    type: "website",
    siteName: "Rexovi Technologies",
    url: SITE,
    title: "Rexovi Technologies — We build digital products people remember",
    description:
      "Websites, web applications, mobile apps, UI/UX and digital products. Makers of Saafera and premium website templates.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rexovi Technologies",
    description:
      "We build websites, applications and digital products. Makers of Saafera and premium website templates.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "/" },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F5F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0E" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rexovi Technologies",
  url: SITE,
  description:
    "Rexovi Technologies is a digital technology company building websites, web applications, mobile applications, UI/UX and digital products.",
  makesOffer: [
    "Website development",
    "Web application development",
    "Mobile application development",
    "UI/UX design",
    "Custom digital products",
    "Website templates",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  owns: {
    "@type": "Product",
    name: "Saafera",
    url: "https://saafera.com",
    description:
      "Rexovi's first digital product: smart travel planning for India — discover places, build budget-friendly routes, compare stays and explore festivals and hidden gems.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        {/* Runs before first paint: scroll-reveal styles are scoped to `.js`,
            so without JavaScript every section renders fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <LogoGradient />
        <CursorHalo />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          // Structured data — improves how the company and Saafera are understood in search.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
