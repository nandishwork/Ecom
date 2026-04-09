import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/products';

const tagStyles = {
  'New': 'bg-black text-white',
  'Best Seller': 'bg-white text-black border border-black',
  'Sale': 'bg-gray-900 text-white',
  'New Arrivals': 'bg-stone-100 text-stone-700',
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wished, setWished] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = (e) => {
    e.stopPropagation();
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1500);
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
          loading="lazy"
          onClick={() => navigate(`/product/${product.id}`)}
        />

        {/* Tag */}
        <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 ${tagStyles[product.badge] || 'bg-stone-100'}`}>
          {product.badge}
        </span>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-all duration-300 ${wished ? 'fill-black text-black' : 'text-gray-400'}`}
          />
        </button>

        {/* Hover buttons removed to focus on Product Detail navigation */}
      </div>

      {/* View Product Button - Visible on all screens below image */}
      <button 
        onClick={() => navigate(`/product/${product.id}`)}
        className="mt-3 w-full py-3 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all"
      >
        <Eye className="w-4 h-4" /> View Product
      </button>

      {/* Product Info */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <div onClick={() => navigate(`/product/${product.id}`)} className="cursor-pointer">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.cat} · {product.sub}</p>
            <h3 className="font-serif text-base text-black leading-tight group-hover:underline underline-offset-4 decoration-gray-300 transition-all">
              {product.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-medium text-black">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  const navigate = useNavigate();
  // Get first 6 products for featured section
  const featured = ALL_PRODUCTS.slice(0, 6);

  return (
    <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-3">Curated For You</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-black leading-tight">
            Featured <span className="italic">Products</span>
          </h2>
          <div className="mt-5 w-10 h-px bg-black"></div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => navigate('/shop')}
            className="px-14 py-4 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]"
          >
            View All Products
          </button>
        </div>

        {/* Divider */}
        <div className="mt-24 border-t border-gray-100"></div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

