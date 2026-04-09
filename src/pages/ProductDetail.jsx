import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, ShoppingBag, ArrowLeft, Star, Share2, 
  Ruler, Truck, ShieldCheck, Check 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ALL_PRODUCTS } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const found = ALL_PRODUCTS.find(p => p.id === parseInt(id));
    if (found) {
      setProduct(found);
      window.scrollTo(0, 0);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null;

  const handleAddToBag = () => {
    if (!selectedSize) return;
    setAdded(true);
    addItem({
      ...product,
      selectedSize,
      selectedColor: product.color
    });
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const BADGE_STYLE = {
    'New': 'bg-black text-white',
    'Best Seller': 'bg-white text-black border border-black',
    'Sale': 'bg-stone-800 text-white',
    'New Arrivals': 'bg-stone-100 text-stone-700',
  };

  return (
    <div className="min-h-screen bg-white pt-[100px] pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs / Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          
          {/* Left: Image Gallery (Simplified for now) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 group">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <span className={`absolute top-6 left-6 text-[10px] uppercase tracking-widest px-3 py-1.5 ${BADGE_STYLE[product.badge]}`}>
                {product.badge}
              </span>
            </div>
            {/* Minimalist secondary images placeholder */}
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-stone-50 overflow-hidden">
                <img src={product.img} alt="detail 1" className="w-full h-full object-cover object-center opacity-80" />
              </div>
              <div className="aspect-[3/4] bg-stone-50 overflow-hidden">
                <img src={product.img} alt="detail 2" className="w-full h-full object-cover object-bottom opacity-80" />
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-[120px]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 mb-2">
                    {product.cat} · {product.sub}
                  </p>
                  <h1 className="font-serif text-4xl sm:text-5xl font-light text-black leading-tight mb-4">
                    {product.name}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setWishlisted(!wishlisted)} className="w-10 h-10 flex items-center justify-center border border-stone-100 hover:border-black transition-colors">
                    <Heart className={`w-5 h-5 ${wishlisted ? 'fill-black text-black' : 'text-stone-400'}`} />
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center border border-stone-100 hover:border-black transition-colors">
                    <Share2 className="w-4 h-4 text-stone-400" />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-black text-black' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 tracking-widest">{product.rating} / 5.0 ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-10">
                <span className="text-3xl font-medium text-black tracking-tight">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-lg text-stone-300 line-through">₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}</span>
                <span className="text-xs text-stone-500 bg-stone-100 px-2 py-1 tracking-widest">30% OFF</span>
              </div>

              {/* Color */}
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-widest text-stone-500 mb-4">Color: <span className="text-black font-medium">{product.color}</span></p>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full border border-black p-0.5 flex items-center justify-center cursor-pointer">
                    <div className="w-full h-full rounded-full bg-stone-300 shadow-inner" style={{ backgroundColor: product.color.toLowerCase() }} />
                  </div>
                  {/* Placeholders for other colors */}
                  <div className="w-8 h-8 rounded-full border border-transparent hover:border-stone-200 p-0.5 flex items-center justify-center cursor-pointer transition-colors">
                    <div className="w-full h-full rounded-full bg-stone-800 shadow-inner" />
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] uppercase tracking-widest text-stone-500">Select Size</p>
                  <button className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-400 hover:text-black transition-colors">
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[56px] h-12 flex items-center justify-center text-[12px] uppercase tracking-widest border transition-all duration-200
                        ${selectedSize === size 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white text-stone-600 border-stone-200 hover:border-black hover:text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && <p className="text-[10px] text-stone-400 mt-3 italic tracking-wide">Please select a size to add to bag</p>}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4 mb-12">
                <button
                  onClick={handleAddToBag}
                  disabled={!selectedSize}
                  className={`w-full py-5 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500
                    ${selectedSize 
                      ? 'bg-black text-white hover:bg-stone-900 active:scale-[0.99]' 
                      : 'bg-stone-100 text-stone-400 cursor-not-allowed'}
                    ${added ? 'bg-stone-700 pointer-events-none' : ''}`}
                >
                  {added ? (
                    <><Check className="w-4 h-4" /> Added to Bag</>
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Add to Bag</>
                  )}
                </button>
                <button className="w-full py-5 border border-black text-black text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
                  Buy it Now
                </button>
              </div>

              {/* Details Tabs */}
              <div className="border-t border-stone-100">
                <div className="flex gap-8">
                  {['details', 'shipping', 'returns'].map(tab => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-[10px] uppercase tracking-[0.2em] border-b-2 transition-all duration-300
                        ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="py-6 text-sm text-stone-500 leading-relaxed font-light">
                  {activeTab === 'details' && (
                    <div className="space-y-4">
                      <p>Elevate your wardrobe with the {product.name}. A hallmark of the HIVNK collection, this piece merges traditional craftsmanship with contemporary silhouette.</p>
                      <ul className="space-y-2 list-disc list-inside">
                        <li>100% Premium Sustainable Fabric</li>
                        <li>Hand-finished detailing</li>
                        <li>Tailored for a sophisticated fit</li>
                        <li>Made in limited quantities</li>
                      </ul>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <p>Complimentary standard shipping on all orders. Express delivery (2-4 business days) available at checkout. Your order will arrive in our signature HIVNK sustainable packaging.</p>
                  )}
                  {activeTab === 'returns' && (
                    <p>We accept returns of unworn, unwashed items with original tags within 30 days of delivery. Return shipping is complimentary for domestic orders.</p>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-50">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-5 h-5 text-stone-300" />
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">Global Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-stone-300" />
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Check className="w-5 h-5 text-stone-300" />
                  <span className="text-[9px] uppercase tracking-widest text-stone-400">Authenticity Guarantee</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
