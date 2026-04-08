import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-[calc(100vh-120px)] overflow-hidden bg-neutral-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpg"
          alt="HIVNK Fashion"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — left side for text readability, keeps model visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
      </div>

      {/* Content — positioned on the left */}
      <div className="relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-20">
        <div className="max-w-lg">
          {/* Season Tag */}
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-white/70 mb-5 border-b border-white/30 pb-1">
              New Arrivals — 2026
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] text-white mb-6 transition-all duration-1000 ease-out delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Redefine
            <br />
            Your <span className="italic font-normal">Style</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white/70 text-sm sm:text-base font-light leading-relaxed tracking-wide max-w-sm mb-10 transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Curated collections that blend timeless craftsmanship with
            contemporary elegance.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <button className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:shadow-white/10 active:scale-[0.98]">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-transparent text-white text-xs uppercase tracking-[0.2em] border border-white/50 hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]">
              View Lookbook
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 transition-all duration-1000 ease-out delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-white/50 animate-bounce" />
      </div>

      {/* Decorative Side Text */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10">
        <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 rotate-90 origin-center whitespace-nowrap">
          Luxury Fashion — Est. 2026
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
