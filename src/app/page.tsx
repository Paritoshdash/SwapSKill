"use client";

import { useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';

import { QuoteTickerSection } from '@/components/home/QuoteTickerSection';
import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader';
import { FeatureBentoSection } from '@/components/home/FeatureBentoSection';
// import { ScatteredTestimonials } from '@/components/home/ScatteredTestimonials';
import { ReviewForm } from '@/components/home/ReviewForm';
import { HowItWorksSteps } from '@/components/home/HowItWorksSteps';
import { JoinCtaSection } from '@/components/home/JoinCtaSection';

export type ActiveHomeSection = 'hero' | 'ticker' | 'bento' | 'testimonials' | 'steps' | 'cta' | 'footer';

export default function Home() {

  const heroRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Placeholder for future scroll logic if needed
  useEffect(() => {
  }, []);

  return (
    <div className="min-h-screen bg-transparent selection:bg-primary/30 selection:text-primary font-sans relative flex flex-col gap-12 pb-0">

      {/* 1. Hero */}
      <main id="hero-section" ref={heroRef} className="relative z-10 w-full mb-20">
        <HeroSection
          title="Trade Skills,"
          highlightText="Grow Together."
          description="Swap your expertise for new skills. No cash required—just passionate individuals learning from each other in a powerful peer-to-peer ecosystem."
          buttonText="Start building free"
          colors={["#000000", "#1a1000", "#F5B21A", "#09090b", "#E58E00", "#000000"]}
          veilOpacity="bg-black/50"
          distortion={0.5}
          swirl={0.8}
          speed={0.42}
          onButtonClick={() => window.location.href = "/signup"}
        />
      </main>

      {/* 2. Ticker Quote */}
      <div id="ticker-section" ref={tickerRef} className="relative z-10 w-full">
        <QuoteTickerSection />
      </div>

      {/* 3. Feature Bento */}
      <div id="bento-section" ref={bentoRef} className="relative z-10 w-full">
        <FeatureBentoSection />
      </div>

      {/* 4. Scatter Testimonials */}
      <div id="testimonials-section" ref={testimonialsRef} className="relative z-10 w-full">
        {/* <ScatteredTestimonials /> */}
      </div>

      {/* 5. Review Form */}
      <div id="review-section" className="relative z-10 w-full">
        <ReviewForm />
      </div>

      {/* 6. Steps */}
      <div id="steps-section" ref={stepsRef} className="relative z-10 w-full">
        <HowItWorksSteps />
      </div>

      {/* 7. Final Join CTA */}
      <div id="cta-section" ref={ctaRef} className="relative z-10 w-full">
        <JoinCtaSection />
      </div>

      {/* 8. Footer */}
      <div id="footer-section" ref={footerRef} className="relative z-10 bg-transparent">
        <Footer />
      </div>
    </div>
  );
}
