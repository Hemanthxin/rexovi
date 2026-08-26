import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import CursorHalo from "@/components/site/CursorHalo";
import { LogoGradient } from "@/components/site/Logo";

/**
 * Chrome for the Rexovi site itself.
 *
 * Template previews live in the (preview) group and deliberately render
 * without any of this — a demo site must look like its own product, not like
 * a page inside rexovi.com.
 */

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rexovi Technologies",
  url: "https://rexovi.com",
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

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </>
  );
}
