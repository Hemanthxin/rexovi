import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./previews.css";
import { SITE_URL } from "@/lib/site";

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

const SITE = SITE_URL;

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body>
        {/* Runs before first paint: scroll-reveal styles are scoped to `.js`, so
            without JavaScript every section renders fully visible. Also flags
            whether the document is inside an iframe. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');" +
              // Card thumbnails embed template previews; the demo bar is chrome
              // a thumbnail should not show.
              "try{if(window.self!==window.top)d.classList.add('framed')}catch(e){d.classList.add('framed')}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
