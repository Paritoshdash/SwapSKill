import { HeroSection } from '@/components/home/HeroSection';
import { SocialProof } from '@/components/home/SocialProof';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';
import { BackgroundAnimation } from '@/components/home/BackgroundAnimation';

export default function Home() {
  return (
    <>
      {/* Fixed Background Animation Layer */}
      <BackgroundAnimation />

      {/* Main Foreground Layer */}
      <main className="relative z-10 min-h-screen">
        <HeroSection />

        {/* The sections that scroll over the background will have a semi-transparent blur effect */}
        <div className="border-t border-transparent">
          <SocialProof />
          <ProblemSolution />
          <FeaturesGrid />
          <HowItWorks />
          <Testimonials />
          <FinalCTA />
        </div>
      </main>
      <div className="relative z-10 bg-white">
        <Footer />
      </div>
    </>
  );
}
