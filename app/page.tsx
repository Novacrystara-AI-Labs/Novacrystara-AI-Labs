import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { DifferentiatorSection } from "@/components/sections/DifferentiatorSection";
import { SolutionsSection } from "@/components/sections/SolutionsSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { MethodologySection } from "@/components/sections/MethodologySection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { EngagementSection } from "@/components/sections/EngagementSection";
import { CTASection } from "@/components/sections/CTASection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { FAQSection } from "@/components/sections/FAQSection";

// Page composition follows the exact order in arch §10.
export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <ProblemSection />
      <DifferentiatorSection />
      <SolutionsSection />
      <UseCasesSection />
      <MethodologySection />
      <CapabilitiesSection />
      <EngagementSection />
      <CTASection />
      <AboutSection />
      <TrustSection />
      <FAQSection />
    </>
  );
}
