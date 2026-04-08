import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import {
  Heart, ShoppingBag, X, ChevronDown, ChevronRight,
  LayoutGrid, List, Maximize2, SlidersHorizontal, Star, ArrowRight, Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── All Products Data ────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  { id: 1,  name: 'Silk Evening Gown',        cat: 'Women',       sub: 'Dresses',    badge: 'New',         price: 18999, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80', sizes: ['XS','S','M','L'], color: 'Black', rating: 4.8, reviews: 124 },
  { id: 2,  name: 'Structured Wool Coat',     cat: 'Women',       sub: 'Outerwear',  badge: 'Best Seller', price: 14499, img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', sizes: ['S','M','L','XL'], color: 'Camel', rating: 4.9, reviews: 89 },
  { id: 3,  name: 'Tailored Linen Blazer',    cat: 'Men',         sub: 'Outerwear',  badge: 'New',         price: 8999,  img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', sizes: ['S','M','L','XL','XXL'], color: 'White', rating: 4.7, reviews: 56 },
  { id: 4,  name: 'Classic Cashmere Sweater', cat: 'Men',         sub: 'Tops',       badge: 'Sale',        price: 6299,  img: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&q=80', sizes: ['S','M','L'], color: 'Grey', rating: 4.6, reviews: 201 },
  { id: 5,  name: 'Leather Crossbody Bag',    cat: 'Accessories', sub: 'Bags',       badge: 'New Arrivals',price: 7499,  img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', sizes: ['One Size'], color: 'Tan', rating: 4.9, reviews: 77 },
  { id: 6,  name: 'Gold Hoop Earrings',       cat: 'Accessories', sub: 'Jewellery',  badge: 'Best Seller', price: 2999,  img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80', sizes: ['One Size'], color: 'Gold', rating: 4.8, reviews: 340 },
  { id: 7,  name: 'Asymmetric Midi Dress',    cat: 'Women',       sub: 'Dresses',    badge: 'New Arrivals',price: 9499,  img: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80', sizes: ['XS','S','M','L'], color: 'Black', rating: 4.5, reviews: 43 },
  { id: 8,  name: 'Slim Chino Pants',         cat: 'Men',         sub: 'Bottoms',    badge: 'Sale',        price: 3999,  img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80', sizes: ['28','30','32','34','36'], color: 'Khaki', rating: 4.4, reviews: 158 },
  { id: 9,  name: 'Suede Chelsea Boots',      cat: 'Accessories', sub: 'Shoes',      badge: 'New',         price: 11999, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', sizes: ['39','40','41','42','43'], color: 'Brown', rating: 4.7, reviews: 92 },
  { id: 10, name: 'Pleated Trousers',         cat: 'Women',       sub: 'Bottoms',    badge: 'Sale',        price: 4299,  img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', sizes: ['XS','S','M','L','XL'], color: 'White', rating: 4.3, reviews: 67 },
  { id: 11, name: 'Oxford Dress Shirt',       cat: 'Men',         sub: 'Tops',       badge: 'New Arrivals',price: 4799,  img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', sizes: ['S','M','L','XL'], color: 'White', rating: 4.6, reviews: 112 },
  { id: 12, name: 'Silk Scarf',               cat: 'Accessories', sub: 'Scarves',    badge: 'New',         price: 3499,  img: 'https://images.unsplash.com/photo-1601924921557-45e6dea0a157?w=600&q=80', sizes: ['One Size'], color: 'Multi', rating: 4.8, reviews: 55 },
  { id: 13, name: 'Wide-Leg Trousers',        cat: 'Women',       sub: 'Bottoms',    badge: 'New',         price: 5999,  img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80', sizes: ['XS','S','M','L'], color: 'Beige', rating: 4.7, reviews: 38 },
  { id: 14, name: 'Merino Turtleneck',        cat: 'Men',         sub: 'Tops',       badge: 'Best Seller', price: 5499,  img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', sizes: ['S','M','L','XL'], color: 'Black', rating: 4.9, reviews: 209 },
  { id: 15, name: 'Minimalist Watch',         cat: 'Accessories', sub: 'Watches',    badge: 'New Arrivals',price: 15999, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', sizes: ['One Size'], color: 'Silver', rating: 4.9, reviews: 187 },
  { id: 16, name: 'Oversized Trench',         cat: 'Women',       sub: 'Outerwear',  badge: 'New',         price: 19999, img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80', sizes: ['XS','S','M','L'], color: 'Beige', rating: 4.8, reviews: 61 },
];

const BADGE_STYLE = {
  'New': 'bg-black text-white',
  'Best Seller': 'bg-white text-black border border-black',
  'Sale': 'bg-stone-800 text-white',
  'New Arrivals': 'bg-stone-100 text-stone-700',
};

const SORT_OPTIONS = ['Featured', 'Newest', 'Price: Low → High', 'Price: High → Low', 'Top Rated'];

// ─── Quick View Modal ─────────────────────────────────────────────────────────
const QuickView = ({ product, onClose, onAdd }) => {
  const [size, setSize] = useState('');
  const [tab, setTab] = useState('details');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleAdd = () => {
    if (!size) return;
    setAdded(true);
    onAdd(product);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl animate-[fadeUp_.35s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-black hover:text-white transition-all duration-200">
          <X className="w-4 h-4" />
        </button>

        {/* Image */}
        <div className="relative overflow-hidden bg-stone-50 aspect-[3/4] md:aspect-auto">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover object-top" />
          <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-widest px-2.5 py-1 ${BADGE_STYLE[product.badge]}`}>
            {product.badge}
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col p-8 overflow-y-auto">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">{product.cat} · {product.sub}</p>
          <h2 className="font-serif text-3xl font-light text-black mb-3 leading-tight">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-200 fill-gray-200'}`} />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 tracking-wide">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-2xl font-medium text-black">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}</span>
            <span className="text-xs text-stone-600 bg-stone-100 px-2 py-0.5">30% OFF</span>
          </div>

          {/* Size */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-widest text-gray-500">Select Size</p>
              <button className="text-[10px] uppercase tracking-widest text-gray-400 underline underline-offset-2 hover:text-black transition-colors">Size Guide</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-2 text-[11px] uppercase tracking-widest border transition-all duration-150
                    ${size === s ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'}`}
                >
                  {s}
                </button>
              ))}
            </div>
            {!size && <p className="text-[10px] text-stone-400 mt-2 italic">Please select a size to continue</p>}
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-100 mb-5">
            <div className="flex gap-6">
              {['details', 'care', 'shipping'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`py-3 text-[10px] uppercase tracking-widest border-b-2 transition-all duration-200
                    ${tab === t ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="py-4 text-sm text-gray-500 leading-relaxed">
              {tab === 'details' && `Premium ${product.color.toLowerCase()} ${product.name.toLowerCase()} crafted from the finest materials. Designed for effortless sophistication.`}
              {tab === 'care' && 'Dry clean only. Keep away from direct sunlight. Store in provided dust bag. Do not tumble dry.'}
              {tab === 'shipping' && 'Free standard shipping on orders above ₹5,000. Express delivery available. Returns accepted within 30 days.'}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={!size}
            className={`w-full py-4 text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300
              ${size ? 'bg-black text-white hover:bg-stone-900 active:scale-[0.99]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
              ${added ? 'bg-stone-700' : ''}`}
          >
            {added ? <><Check className="w-4 h-4" /> Added to Bag</> : <><ShoppingBag className="w-4 h-4" /> Add to Bag</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Filter Sidebar ───────────────────────────────────────────────────────────

// ✅ Defined OUTSIDE FilterSidebar — prevents remount on every render
const FilterChip = ({ active, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 py-1.5 text-[11px] uppercase tracking-widest transition-all duration-150 text-left w-full ${active ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-700'}`}
  >
    <span className={`w-3.5 h-3.5 border flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-black border-black' : 'border-gray-300'}`}>
      {active && <Check className="w-2 h-2 text-white" />}
    </span>
    {label}
  </button>
);

const AccordionSection = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 py-5">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
      >
        {title}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64 mt-4' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
};

const FilterSidebar = ({ filters, setFilters, onClose, isMobile }) => {
  const cats = ['Women', 'Men', 'Accessories'];
  const badges = ['New', 'Best Seller', 'Sale', 'New Arrivals'];
  const priceRanges = [
    { label: 'Under ₹5,000' },
    { label: '₹5,000–₹10,000' },
    { label: '₹10,000–₹20,000' },
    { label: 'Above ₹20,000' },
  ];

  const toggle = (key, val) => {
    setFilters(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val]
    }));
  };

  return (
    <div className={isMobile ? 'p-6' : ''}>
      {isMobile && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-xl font-light">Filters</h3>
          <button type="button" onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
      )}

      <AccordionSection title="Category">
        <div className="space-y-2">
          {cats.map(c => (
            <FilterChip key={c} label={c} active={filters.cats.includes(c)} onClick={() => toggle('cats', c)} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Availability">
        <div className="space-y-2">
          {badges.map(b => (
            <FilterChip key={b} label={b} active={filters.badges.includes(b)} onClick={() => toggle('badges', b)} />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Price Range">
        <div className="space-y-2">
          {priceRanges.map(r => (
            <FilterChip key={r.label} label={r.label} active={filters.prices.includes(r.label)} onClick={() => toggle('prices', r.label)} />
          ))}
        </div>
      </AccordionSection>

      <div className="pt-5">
        <button
          type="button"
          onClick={() => setFilters({ cats: [], badges: [], prices: [] })}
          className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-2"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, index, view, onQuickView, onAdd, onWish, wished }) => {
  const [ref, inView] = useInView(0.08);
  const [addedLocal, setAddedLocal] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAddedLocal(true);
    onAdd(product);
    setTimeout(() => setAddedLocal(false), 1500);
  };

  const delay = `${(index % 4) * 70}ms`;

  if (view === 'list') {
    return (
      <div ref={ref} style={{ transitionDelay: delay }}
        className={`group flex gap-6 border-b border-gray-100 pb-8 transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
        <div className="relative w-36 h-44 flex-shrink-0 overflow-hidden bg-stone-50">
          <img src={product.img} alt={product.name} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
          <span className={`absolute top-2 left-2 text-[9px] uppercase tracking-widest px-2 py-0.5 ${BADGE_STYLE[product.badge]}`}>{product.badge}</span>
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.cat} · {product.sub}</p>
            <h3 className="font-serif text-xl font-light text-black mb-2">{product.name}</h3>
            <div className="flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`} />)}
              <span className="text-[10px] text-gray-400 ml-1">({product.reviews})</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">Premium {product.color.toLowerCase()} colorway with refined construction. A wardrobe essential.</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="font-serif text-xl font-light">₹{product.price.toLocaleString('en-IN')}</span>
            <div className="flex gap-3">
              <button onClick={() => onWish(product.id)} className={`w-9 h-9 flex items-center justify-center border transition-all duration-200 ${wished ? 'bg-black border-black' : 'border-gray-200 hover:border-black'}`}>
                <Heart className={`w-4 h-4 ${wished ? 'fill-white text-white' : 'text-gray-400'}`} />
              </button>
              <button onClick={() => onQuickView(product)} className="px-6 py-2 border border-gray-200 hover:border-black text-[11px] uppercase tracking-widest text-gray-600 hover:text-black transition-all duration-200 flex items-center gap-2">
                <Maximize2 className="w-3.5 h-3.5" /> Quick View
              </button>
              <button onClick={handleAdd} className="px-6 py-2 bg-black text-white text-[11px] uppercase tracking-widest hover:bg-stone-800 transition-colors flex items-center gap-2">
                <ShoppingBag className="w-3.5 h-3.5" />{addedLocal ? 'Added!' : 'Add to Bag'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ transitionDelay: delay }}
      className={`group flex flex-col transition-all duration-600 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="relative overflow-hidden bg-stone-50 aspect-[3/4]">
        <img src={product.img} alt={product.name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.07]" />

        <span className={`absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2.5 py-1 ${BADGE_STYLE[product.badge]}`}>{product.badge}</span>

        <button onClick={() => onWish(product.id)} className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${wished ? 'bg-black' : 'bg-white/80 hover:bg-white'}`}>
          <Heart className={`w-4 h-4 transition-all duration-300 ${wished ? 'fill-white text-white' : 'text-gray-400'}`} />
        </button>

        {/* Quick view on hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75"
        >
          <span className="bg-white/95 backdrop-blur-sm text-black text-[10px] uppercase tracking-widest px-5 py-2 flex items-center gap-2 shadow-sm hover:bg-black hover:text-white transition-colors duration-200">
            <Maximize2 className="w-3.5 h-3.5" /> Quick View
          </span>
        </button>

        {/* Add to bag */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button onClick={handleAdd} className="w-full py-3.5 bg-black text-white text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-900 transition-colors">
            <ShoppingBag className="w-3.5 h-3.5" />
            {addedLocal ? 'Added to Bag ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>

      <div className="pt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-gray-400">{product.cat} · {product.sub}</p>
        <h3 className="font-serif text-base text-black leading-snug group-hover:underline underline-offset-4 decoration-gray-200 transition cursor-pointer">{product.name}</h3>
        <div className="flex items-center gap-3 pt-1">
          <span className="text-sm font-medium text-black">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-xs text-gray-400 line-through">₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

// ─── Cinematic Hero ───────────────────────────────────────────────────────────
const ShopHero = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Parallax BG */}
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1800&q=90"
        alt="HIVNK Shop"
        style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1.6s] ${mounted ? 'opacity-50' : 'opacity-0'}`}
      />

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Decorative lines */}
      <div className={`absolute left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-all duration-700 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-24 bg-white/20" />
        <span className="text-white/30 text-[9px] uppercase tracking-[0.4em] rotate-90 whitespace-nowrap">Scroll</span>
        <div className="w-px h-24 bg-white/20" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-24 px-8 sm:px-16 lg:px-24">
        <p className={`text-[11px] uppercase tracking-[0.5em] text-white/50 mb-5 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          HIVNK · All Collections
        </p>
        <h1 className={`font-serif text-6xl sm:text-8xl lg:text-[10rem] font-light text-white leading-none tracking-tight mb-8 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Shop
        </h1>
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-sm text-white/50 max-w-sm leading-relaxed">
            {ALL_PRODUCTS.length} curated pieces. Refined materials. Timeless silhouettes.
          </p>
          <button
            onClick={() => document.getElementById('shop-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/70 hover:text-white transition-colors"
          >
            Browse All
            <span className="w-10 h-px bg-white/40 group-hover:w-16 transition-all duration-300 group-hover:bg-white" />
          </button>
        </div>
      </div>

    </div>
  );
};

// ─── Main Shop Page ───────────────────────────────────────────────────────────
const Shop = () => {
  const { addItem, openCart, totalItems } = useCart();
  const [view, setView]           = useState('grid');
  const [sort, setSort]           = useState('Featured');
  const [sortOpen, setSortOpen]   = useState(false);
  const [filters, setFilters]     = useState({ cats: [], badges: [], prices: [] });
  const [mobileFilter, setMobileFilter] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [wishlist, setWishlist]   = useState([]);
  const [animating, setAnimating] = useState(false);
  const [cartPing, setCartPing]   = useState(false);

  // ✅ Prevent scroll jump when filter changes shrink the grid height
  const savedScrollY = useRef(0);
  const isFilterChange = useRef(false);

  const setFiltersStable = useCallback((updater) => {
    savedScrollY.current = window.scrollY;
    isFilterChange.current = true;
    setFilters(updater);
  }, []);

  useLayoutEffect(() => {
    if (isFilterChange.current) {
      window.scrollTo({ top: savedScrollY.current, behavior: 'instant' });
      isFilterChange.current = false;
    }
  });

  // Filtering
  const PRICE_MAP = {
    'Under ₹5,000': p => p.price < 5000,
    '₹5,000–₹10,000': p => p.price >= 5000 && p.price <= 10000,
    '₹10,000–₹20,000': p => p.price >= 10000 && p.price <= 20000,
    'Above ₹20,000': p => p.price > 20000,
  };

  const filteredProducts = (() => {
    let result = [...ALL_PRODUCTS];
    if (filters.cats.length) result = result.filter(p => filters.cats.includes(p.cat));
    if (filters.badges.length) result = result.filter(p => filters.badges.includes(p.badge));
    if (filters.prices.length) result = result.filter(p => filters.prices.some(r => PRICE_MAP[r]?.(p)));

    switch (sort) {
      case 'Price: Low → High': return result.sort((a, b) => a.price - b.price);
      case 'Price: High → Low': return result.sort((a, b) => b.price - a.price);
      case 'Top Rated':         return result.sort((a, b) => b.rating - a.rating);
      case 'Newest':            return result.reverse();
      default:                  return result;
    }
  })();

  const activeFilterCount = filters.cats.length + filters.badges.length + filters.prices.length;

  const handleSort = (s) => {
    setAnimating(true);
    setTimeout(() => { setSort(s); setSortOpen(false); setAnimating(false); }, 220);
  };

  const handleAdd = useCallback((product) => {
    addItem(product);
    setCartPing(true);
    setTimeout(() => setCartPing(false), 600);
  }, [addItem]);

  const handleWish = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <ShopHero />

      {/* Sticky Top Bar */}
      <div id="shop-grid" className="sticky top-[80px] z-30 bg-white/96 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Left: filter toggle + count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFilter(true)}
              className="lg:hidden flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters {activeFilterCount > 0 && <span className="bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
            </button>
            <span className="text-[11px] text-gray-400 tracking-widest hidden sm:block">{filteredProducts.length} products</span>
          </div>

          {/* Right: sort + view */}
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <button onClick={() => setSortOpen(o => !o)} className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors">
                {sort} <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 shadow-2xl w-52 py-1 z-50">
                  {SORT_OPTIONS.map(s => (
                    <button key={s} onClick={() => handleSort(s)}
                      className={`w-full text-left px-4 py-2.5 text-[11px] uppercase tracking-widest transition-colors flex items-center gap-2
                        ${sort === s ? 'text-black bg-stone-50' : 'text-gray-400 hover:text-black hover:bg-stone-50'}`}>
                      {sort === s && <Check className="w-3 h-3" />} {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Toggles */}
            <div className="hidden sm:flex items-center gap-1 border border-gray-100 p-0.5">
              {[['grid', <LayoutGrid className="w-4 h-4" />], ['list', <List className="w-4 h-4" />]].map(([v, icon]) => (
                <button key={v} onClick={() => setView(v)}
                  className={`w-8 h-7 flex items-center justify-center transition-all duration-200 ${view === v ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}>
                  {icon}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <div className="sticky top-[145px]">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-1">Refine</p>
              <h3 className="font-serif text-2xl font-light text-black mb-6">Filters {activeFilterCount > 0 && <span className="text-sm font-sans text-gray-400">({activeFilterCount})</span>}</h3>
              <FilterSidebar filters={filters} setFilters={setFiltersStable} onClose={() => {}} isMobile={false} />
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1 min-w-0">
            {/* Active filter tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {[...filters.cats, ...filters.badges, ...filters.prices].map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-200 text-[10px] uppercase tracking-widest text-stone-600 px-3 py-1.5">
                    {f}
                    <button type="button" onClick={() => {
                      setFiltersStable(prev => ({
                        cats: prev.cats.filter(v => v !== f),
                        badges: prev.badges.filter(v => v !== f),
                        prices: prev.prices.filter(v => v !== f),
                      }));
                    }}>
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </span>
                ))}
                <button type="button" onClick={() => setFiltersStable({ cats: [], badges: [], prices: [] })} className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline underline-offset-2 px-2">
                  Clear All
                </button>
              </div>
            )}

            {/* Product grid / list — overflow-anchor:none prevents browser scroll compensation */}
            <div style={{ overflowAnchor: 'none' }} className={`transition-all duration-250 ease-out ${animating ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
              {filteredProducts.length === 0 ? (
                <div className="py-40 text-center">
                  <p className="font-serif text-4xl text-gray-200 font-light italic mb-4">No results found</p>
                  <p className="text-sm text-gray-400 mb-6">Try adjusting your filters</p>
                  <button onClick={() => setFilters({ cats: [], badges: [], prices: [] })} className="px-8 py-3 border border-black text-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200">
                    Clear Filters
                  </button>
                </div>
              ) : view === 'list' ? (
                <div className="space-y-8">
                  {filteredProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} view="list" onQuickView={setQuickView} onAdd={handleAdd} onWish={handleWish} wished={wishlist.includes(p.id)} />
                  ))}
                </div>
              ) : (
                <div className={`grid gap-x-5 gap-y-14 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {filteredProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} view={view} onQuickView={setQuickView} onAdd={handleAdd} onWish={handleWish} wished={wishlist.includes(p.id)} />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom CTA strip */}
            {filteredProducts.length > 0 && (
              <div className="mt-24 border-t border-gray-100 pt-16 flex flex-col sm:flex-row gap-8 items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Looking for something specific?</p>
                  <p className="font-serif text-2xl font-light text-black">Our stylists are here to help.</p>
                </div>
                <button className="group flex items-center gap-3 px-8 py-4 border border-black text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                  Book a Style Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <>
        <div className={`fixed inset-0 bg-black/50 z-[80] transition-opacity duration-300 ${mobileFilter ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileFilter(false)} />
        <div className={`fixed bottom-0 left-0 right-0 bg-white z-[85] max-h-[85vh] overflow-y-auto rounded-t-2xl transition-transform duration-400 ease-out ${mobileFilter ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mt-3 mb-1" />
          <FilterSidebar filters={filters} setFilters={setFiltersStable} onClose={() => setMobileFilter(false)} isMobile />
          <div className="px-6 pb-6">
            <button onClick={() => setMobileFilter(false)} className="w-full py-4 bg-black text-white text-[11px] uppercase tracking-widest">
              Show {filteredProducts.length} Results
            </button>
          </div>
        </div>
      </>

      {/* Quick View Modal */}
      {quickView && <QuickView product={quickView} onClose={() => setQuickView(null)} onAdd={handleAdd} />}
    </div>
  );
};

export default Shop;
