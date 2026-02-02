import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { FeatureShowcase } from "@/components/sections/feature-showcase";
import { AdditionalFeatures } from "@/components/sections/additional-features";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureShowcase />
      <AdditionalFeatures />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
