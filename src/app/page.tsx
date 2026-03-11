import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { getTests } from "@/services/tests.service";
import { getRecentArticles } from "@/services/articles.service";

import { HeroSection } from "@/features/home/components/HeroSection";
import { ServicesSection } from "@/features/home/components/ServicesSection";
import { PopularTestsSection } from "@/features/home/components/PopularTestsSection";
import { EducationalArticlesSection } from "@/features/home/components/EducationalArticlesSection";

export default async function Home() {
  const popularTests = await getTests({ limit: 4 });
  const latestArticles = await getRecentArticles(undefined, 3);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PopularTestsSection popularTests={popularTests} />
      <EducationalArticlesSection latestArticles={latestArticles} />
      <Footer />
    </div>
  );
}

