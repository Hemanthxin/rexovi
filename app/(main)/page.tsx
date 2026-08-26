import Hero from "@/components/sections/Hero";
import SaaferaSpotlight from "@/components/sections/SaaferaSpotlight";
import Services from "@/components/sections/Services";
import TemplatesTeaser from "@/components/sections/TemplatesTeaser";
import SelectedWork from "@/components/sections/SelectedWork";
import WhyRexovi from "@/components/sections/WhyRexovi";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";

/**
 * Homepage composition.
 *
 * Order encodes the hierarchy the company wants read:
 * Rexovi → Digital Products → Saafera → Services → Templates → Work → About.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SaaferaSpotlight />
      <Services />
      <TemplatesTeaser />
      <SelectedWork />
      <WhyRexovi />
      <About />
      <Stats />
      <Process />
      <CTA />
    </>
  );
}
