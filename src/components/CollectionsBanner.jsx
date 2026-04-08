import React from 'react';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Women',
    subtitle: 'New Season',
    description: '120+ styles',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85',
    span: 'lg:col-span-2 lg:row-span-2',
    textPosition: 'bottom-left',
  },
  {
    id: 2,
    title: 'Men',
    subtitle: 'Refined Essentials',
    description: '80+ styles',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=85',
    span: 'lg:col-span-1 lg:row-span-1',
    textPosition: 'bottom-left',
  },
  {
    id: 3,
    title: 'Accessories',
    subtitle: 'Complete the Look',
    description: '60+ pieces',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=85',
    span: 'lg:col-span-1 lg:row-span-1',
    textPosition: 'bottom-left',
  },
];

const CollectionCard = ({ item }) => (
  <div className={`relative overflow-hidden group cursor-pointer ${item.span}`}>
    {/* Image */}
    <div className="w-full h-full min-h-[280px]">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>

    {/* Dark gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

    {/* Hover shine effect */}
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Content */}
    <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-1.5">{item.subtitle}</p>
      <h3 className="font-serif text-3xl sm:text-4xl text-white font-light leading-tight mb-1">{item.title}</h3>
      <p className="text-xs text-white/50 tracking-widest mb-5">{item.description}</p>
      <div className="flex items-center gap-2 text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <span>Shop Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>

    {/* Top-right corner accent */}
    <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

const CollectionsBanner = () => {
  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-3">Explore Our World</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-black leading-tight">
              Shop by <span className="italic">Collection</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            View All Collections
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-3 h-auto lg:h-[600px]">
          {collections.map(item => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>

        {/* Bottom Quote Strip */}
        <div className="mt-16 py-10 border-y border-gray-100 flex items-center justify-center">
          <p className="font-serif text-xl md:text-2xl text-center text-gray-800 font-light italic leading-relaxed max-w-2xl">
            "Dress how you want to be addressed — with quiet confidence and effortless grace."
          </p>
        </div>
      </div>
    </section>
  );
};

export default CollectionsBanner;
