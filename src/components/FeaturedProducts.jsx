import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Oversized Linen Blazer',
    category: 'Women · Outerwear',
    price: '₹8,499',
    originalPrice: '₹12,000',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
  },
  {
    id: 2,
    name: 'Structured Midi Dress',
    category: 'Women · Dresses',
    price: '₹6,299',
    originalPrice: '₹9,500',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&q=80',
  },
  {
    id: 3,
    name: 'Slim Fit Turtleneck',
    category: 'Men · Tops',
    price: '₹3,199',
    originalPrice: '₹4,800',
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
  {
    id: 4,
    name: 'Wide-Leg Trousers',
    category: 'Women · Bottoms',
    price: '₹4,999',
    originalPrice: '₹7,200',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
  },
  {
    id: 5,
    name: 'Classic Wool Coat',
    category: 'Men · Outerwear',
    price: '₹14,999',
    originalPrice: '₹20,000',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=600&q=80',
  },
  {
    id: 6,
    name: 'Leather Belt Bag',
    category: 'Accessories',
    price: '₹5,499',
    originalPrice: '₹8,000',
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
  },
];

const tagStyles = {
  'New': 'bg-black text-white',
  'Best Seller': 'bg-white text-black border border-black',
  'Sale': 'bg-gray-900 text-white',
};

const ProductCard = ({ product }) => {
  const [wished, setWished] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1500);
  };

  return (
    <div className="group relative flex flex-col">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag */}
        <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 ${tagStyles[product.tag]}`}>
          {product.tag}
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

        {/* Hover Overlay — Add to Bag */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAddToBag}
            className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {addedToBag ? 'Added!' : 'Add to Bag'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{product.category}</p>
            <h3 className="font-serif text-base text-black leading-tight group-hover:underline underline-offset-4 decoration-gray-300 transition-all cursor-pointer">
              {product.name}
            </h3>
          </div>
          <button className="mt-1 text-gray-400 hover:text-black transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-medium text-black">{product.price}</span>
          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
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
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-16 text-center">
          <button className="px-14 py-4 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]">
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
