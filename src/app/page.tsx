"use client";

import { useEffect, useRef, useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { HomeIllustrations } from '@/components/home/HomeIllustrations';

// New Architecture Components
import { ImageHeroSection } from '@/components/home/ImageHeroSection';
import { QuoteTickerSection } from '@/components/home/QuoteTickerSection';
import { FeatureBentoSection } from '@/components/home/FeatureBentoSection';
import { ScatteredTestimonials } from '@/components/home/ScatteredTestimonials';
import { ReviewForm } from '@/components/home/ReviewForm';
import { HowItWorksSteps } from '@/components/home/HowItWorksSteps';
import { JoinCtaSection } from '@/components/home/JoinCtaSection';
import { BackgroundAnimation } from '@/components/home/BackgroundAnimation';

export type ActiveHomeSection = 'hero' | 'ticker' | 'bento' | 'testimonials' | 'steps' | 'cta' | 'footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveHomeSection>('hero');

  const heroRef = useRef<HTMLElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We want the section to trigger before it reaches the exact center, so it transitions early enough
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id.replace('-section', '') as ActiveHomeSection);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    [heroRef, tickerRef, bentoRef, testimonialsRef, stepsRef, ctaRef, footerRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-transparent selection:bg-primary/30 selection:text-primary font-sans relative">
      <BackgroundAnimation />
      <HomeIllustrations activeSection={activeSection} />

      {/* 1. Hero */}
      <main id="hero-section" ref={heroRef} className="relative z-10 w-full overflow-hidden">
        <ImageHeroSection />
      </main>

      {/* 2. Ticker Quote */}
      <div id="ticker-section" ref={tickerRef} className="relative z-10 w-full">
        <QuoteTickerSection />
      </div>

      {/* 3. Feature Bento */}
      <div id="bento-section" ref={bentoRef} className="relative z-10 w-full mt-20">
        <FeatureBentoSection />
      </div>

      {/* 4. Scatter Testimonials */}
      <div id="testimonials-section" ref={testimonialsRef} className="relative z-10 w-full">
        <ScatteredTestimonials />
        <ReviewForm />
      </div>

      {/* 6. Steps */}
      <div id="steps-section" ref={stepsRef} className="relative z-10 w-full mt-24">
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
