import { HeroSection } from '@/components/home/HeroSection';
import { SocialProof } from '@/components/home/SocialProof';
import { ProblemSolution } from '@/components/home/ProblemSolution';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { FinalCTA } from '@/components/home/FinalCTA';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-[#fcfaf8]">
        <HeroSection />
        <SocialProof />
        <ProblemSolution />
        <FeaturesGrid />
        <HowItWorks />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
