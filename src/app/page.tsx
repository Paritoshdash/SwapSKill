import { HeroSection } from '@/components/home/HeroSection';
import { BentoContent } from '@/components/home/BentoContent';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)] selection:bg-primary/30 selection:text-primary pb-20 font-sans">
      <main className="px-4 md:px-8 max-w-[1700px] mx-auto pt-24">
        <HeroSection />
      </main>
      <BentoContent />
      <div className="relative z-10 bg-[var(--bg-footer)]">
        <Footer />
      </div>
    </div>
  );
}
