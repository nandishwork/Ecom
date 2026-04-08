import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';

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

// ─── HD Data ────────────────────────────────────────────────────────────────

const collectionsData = [
  {
    id: "01",
    title: "Le Noir Absolu",
    season: "Fall/Winter Capsule",
    description: "An exploration of texture within the void. Deep wools, lustrous silks, and structured leather come together to define the modern silhouette in absolute black.",
    coverImg: "https://images.unsplash.com/photo-1626115628574-b88a15b12d4f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lookbook: [
      "https://images.unsplash.com/photo-1620777888789-0ee95b57a277?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=100&auto=format",
      "https://images.unsplash.com/photo-1550614000-4b95dd244cb8?w=1600&q=100&auto=format"
    ]
  },
  {
    id: "02",
    title: "Structural Fluidity",
    season: "Spring Exhibition",
    description: "Where rigid tailoring meets soft drape. We balance architectural cuts with fabrics that breathe and move, creating tension and harmony in every look.",
    coverImg: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2400&q=100&auto=format",
    lookbook: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=100&auto=format",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1600&q=100&auto=format",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&q=100&auto=format"
    ]
  },
  {
    id: "03",
    title: "The Minimalist Archive",
    season: "Core Collection",
    description: "Building the foundation. Essential pieces stripped of excess, focusing purely on perfect proportions and unrelenting material quality.",
    coverImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2400&q=100&auto=format",
    lookbook: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=100&auto=format",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=1600&q=100&auto=format",
      "https://images.unsplash.com/photo-1434389674665-ed5242273413?w=1600&q=100&auto=format"
    ]
  }
];

// ─── Cinematic Hero ──────────────────────────────────────────────────────────
const HDHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div className="relative w-full h-[90vh] bg-black overflow-hidden perspective-1000">
      <img
        src="https://images.unsplash.com/photo-1492447166138-50c3889fccb1?w=2800&q=100&auto=format"
        alt="HIVNK Editorial"
        className={`absolute inset-0 w-full h-full object-cover object-[50%_40%] md:object-center opacity-80 mix-blend-luminosity
          transition-all duration-[2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${loaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
      
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-24 md:pb-32">
        <div className="max-w-4xl">
          <p className={`text-[10px] md:text-[12px] uppercase tracking-[0.5em] text-white/50 mb-6
            transition-all duration-1000 delay-500 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            High Definition Editorial
          </p>
          <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl text-white font-light tracking-tighter leading-[0.9]
            transition-all duration-1000 delay-700 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            Visual <br/><em className="font-serif italic text-white/90">Symphony.</em>
          </h1>
        </div>
      </div>
    </div>
  );
};

// ─── Editorial Section ───────────────────────────────────────────────────────
const EditorialSection = ({ data, index }) => {
  const [ref, inView] = useInView(0.15);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="py-16 md:py-24 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Title Area */}
        <div className={`mb-12 md:mb-16 transition-all duration-1000 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-6 mb-6">
            <span className="font-serif text-3xl md:text-5xl text-gray-300 font-light">{data.id}</span>
            <div className="h-px bg-gray-200 flex-1 max-w-[200px]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">{data.season}</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-tight">{data.title}</h2>
          <p className="mt-8 text-sm md:text-base text-gray-500 max-w-xl leading-relaxed tracking-wide">
            {data.description}
          </p>
        </div>

        {/* Asymmetrical Masonry/Bento Lookbook */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Main Large Image */}
          <div className={`md:col-span-7 group overflow-hidden relative ${isEven ? 'md:order-1' : 'md:order-2'}`}>
            <div className="aspect-[3/4] md:aspect-[3/4] bg-stone-100 w-full overflow-hidden">
              <img 
                src={data.coverImg} 
                alt={data.title} 
                loading="lazy"
                className="w-full h-full object-cover object-[50%_20%] md:object-[50%_15%] transition-transform duration-[1.5s] group-hover:scale-105"
              />
            </div>
            <button className="absolute bottom-6 left-6 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300">
              <Play className="w-5 h-5 pl-1" />
            </button>
          </div>

          {/* Side Stack Gallery */}
          <div className={`md:col-span-5 flex flex-col gap-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
            {data.lookbook.slice(0, 2).map((img, i) => (
              <div key={i} className="group overflow-hidden bg-stone-100 h-full w-full relative min-h-[300px]">
                <img 
                  src={img} 
                  alt="Look detail" 
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

// ─── Detail Strip ─────────────────────────────────────────────────────────────
const FullWidthStrip = () => {
  const [ref, inView] = useInView(0.2);
  
  return (
    <div ref={ref} className="w-full relative h-[60vh] md:h-[80vh] my-20 overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1631288280857-8e71526bfa5d?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        alt="Texture" 
        className={`absolute inset-0 w-full h-full object-cover object-[50%_35%] transition-all duration-[2s]
          ${inView ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
         <p className="text-[11px] uppercase tracking-[0.5em] text-white/70 mb-6">The Process</p>
         <h2 className="font-serif text-4xl sm:text-6xl text-white font-light max-w-3xl leading-tight">
           "True luxury requires no explanation. It is felt in the weight of the fabric and the precision of the seam."
         </h2>
      </div>
    </div>
  );
};

// ─── Main Collections Page ────────────────────────────────────────────────────
const Collections = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar offset filler */}
      <div className="h-[80px] bg-black w-full" />
      
      {/* Cinematic Hero */}
      <HDHero />

      {/* Editorials */}
      <div className="bg-white">
        {collectionsData.map((data, index) => (
          <React.Fragment key={data.id}>
            <EditorialSection data={data} index={index} />
            {index === 1 && <FullWidthStrip />}
          </React.Fragment>
        ))}
      </div>

      {/* Footer CTA */}
      <section className="py-24 md:py-32 bg-stone-50 text-center px-6 border-t border-gray-100">
        <p className="text-[11px] uppercase tracking-[0.5em] text-gray-500 mb-6">The Journey Continues</p>
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-black mb-10 tracking-tighter">
          Explore the <em>Pieces</em>.
        </h2>
        <a 
          href="/shop"
          className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-black text-white text-[12px] uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-[0.98]"
        >
          View Full Shop
          <ArrowRight className="w-4 h-4 text-white/50" />
        </a>
      </section>
    </div>
  );
};

export default Collections;
