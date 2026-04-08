import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Compass, ShieldCheck, Heart } from 'lucide-react';

// ─── Utility ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ─── Cinematic Hero ──────────────────────────────────────────────────────────
const AboutHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div className="relative w-full h-[90vh] bg-black overflow-hidden perspective-1000">
      <img
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2800&q=100&auto=format"
        alt="HIVNK Studio"
        className={`absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-luminosity
          transition-all duration-[2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${loaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
      
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <p className={`text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-white/50 mb-6
            transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            Our Narrative
          </p>
          <h1 className={`font-serif text-5xl md:text-7xl lg:text-9xl text-white font-light tracking-tighter leading-[0.9] mb-8
            transition-all duration-1000 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            Defining <em className="font-serif italic text-white/90">Luxury</em> <br />
            Through Minimalism
          </h1>
          <p className={`text-sm md:text-base text-white/60 tracking-wide leading-relaxed max-w-lg
            transition-all duration-1000 delay-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            HIVNK was born from a desire to reclaim the essence of luxury—not as excess, but as the perfect balance of form, function, and enduring quality.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Legacy & Craftsmanship ──────────────────────────────────────────────────
const LegacySection = () => {
  const [ref, inView] = useInView(0.15);

  return (
    <div ref={ref} className="py-24 md:py-40 relative bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Text Content */}
          <div className="md:col-span-5 flex flex-col justify-center order-2 md:order-1">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-black mb-10 leading-tight tracking-tight">
              A Legacy of <br />
              <em className="font-serif italic text-gray-500">Craftsmanship</em>
            </h2>
            <div className="space-y-6 text-gray-500 text-sm md:text-base font-light tracking-wide leading-relaxed">
              <p>
                Founded in 2026, HIVNK emerged as a quiet revolution against the disposable culture of modern fashion. Our name, a derivation of the Hindi word for 'unique' or 'distinctive', reflects our commitment to creating pieces that are as singular as the individuals who wear them.
              </p>
              <p>
                Every stitch, every seam, and every silhouette is considered with painstaking detail. We collaborate exclusively with master artisans who have spent decades perfecting their trade, ensuring that each HIVNK garment is not just seen, but felt.
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-16 flex gap-10 border-t border-gray-100 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-serif font-light text-black">100+</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Artisans</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-serif font-light text-black">Excl.</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Materials</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl font-serif font-light text-black">Ltd.</span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400">Editions</span>
              </div>
            </div>
          </div>

          {/* Large Image */}
          <div className="md:col-span-7 group overflow-hidden relative order-1 md:order-2">
            <div className="aspect-[3/4] md:h-[85vh] bg-stone-100 w-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1673279495269-bc0d925c0612?q=80&w=1600&auto=format&fit=crop" 
                alt="Craftsmanship" 
                loading="lazy"
                className="w-full h-full object-cover object-center grayscale transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Philosophy Strip ────────────────────────────────────────────────────────
const PhilosophySection = () => {
  const [ref, inView] = useInView(0.2);
  
  return (
    <div ref={ref} className="w-full relative py-32 bg-black text-white group overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544077676-aab838575001?w=1600&q=80')" }} />
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className={`text-center mb-24 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h2 className="font-serif text-5xl md:text-7xl font-light mb-8">Our <em className="italic text-white/70">Philosophy</em></h2>
          <div className="w-16 h-px bg-white/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
          <div className={`flex flex-col items-center text-center transition-all duration-1000 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Compass className="w-8 h-8 text-white/50 font-light mb-8" />
            <h3 className="text-[11px] uppercase tracking-[0.4em] mb-6">Curation</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed tracking-wide max-w-sm">
              We believe in the power of 'less but better'. Our collections are curated with a focus on versatile, timeless essentials over fleeting trends.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <ShieldCheck className="w-8 h-8 text-white/50 font-light mb-8" />
            <h3 className="text-[11px] uppercase tracking-[0.4em] mb-6">Integrity</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed tracking-wide max-w-sm">
              Ethical sourcing and radical transparency are at our core. We know the origins of every fiber and the hands behind every product.
            </p>
          </div>
          <div className={`flex flex-col items-center text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <Heart className="w-8 h-8 text-white/50 font-light mb-8" />
            <h3 className="text-[11px] uppercase tracking-[0.4em] mb-6">Longevity</h3>
            <p className="text-sm font-light text-white/50 leading-relaxed tracking-wide max-w-sm">
              Our design ethos centers around durability. We create garments that improve with age, designed to be passed down through generations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Studio Highlight ────────────────────────────────────────────────────────
const StudioSection = () => {
  const [ref, inView] = useInView(0.15);

  return (
    <div ref={ref} className="py-24 md:py-40 relative bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20 transition-all duration-1000 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Large Image */}
          <div className="md:col-span-8 group overflow-hidden relative">
            <div className="aspect-[4/3] md:aspect-[16/9] bg-stone-100 w-full overflow-hidden shadow-2xl shadow-black/5">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=2000&q=100&auto=format" 
                alt="Artisan Highlight" 
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="md:col-span-4 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-5xl font-light text-black mb-8 leading-tight">
              Designed In <br />
              <em className="font-serif italic text-gray-500">Studio</em>
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-light tracking-wide leading-relaxed mb-10">
              Based in the heart of Mumbai, our design studio serves as an incubator for creativity. We combine traditional Indian textile heritage with global modernist perspectives to create something truly HIVNK.
            </p>
            <button className="group inline-flex items-center self-start gap-4 px-10 py-5 bg-black text-white text-[11px] uppercase tracking-widest hover:bg-gray-900 transition-all active:scale-[0.98]">
              Discover the Studio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Quote Footer ────────────────────────────────────────────────────────────
const QuoteFooter = () => {
  const [ref, inView] = useInView(0.3);
  return (
    <div
      ref={ref}
      className={`py-32 md:py-48 px-6 text-center border-t border-gray-100 bg-stone-50
        transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <p className="font-serif italic text-3xl md:text-5xl text-black font-light leading-snug tracking-tight max-w-4xl mx-auto">
        "Style is a way to say who you are <br className="hidden md:block" /> without having to speak."
      </p>
    </div>
  );
};

// ─── Main About Page ─────────────────────────────────────────────────────────
const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar offset filler */}
      <div className="h-[80px] bg-black w-full" />
      
      <AboutHero />
      <LegacySection />
      <PhilosophySection />
      <StudioSection />
      <QuoteFooter />
      
    </div>
  );
};

export default About;
