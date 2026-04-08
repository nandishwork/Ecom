import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Star, Zap } from 'lucide-react';

// Countdown timer hook
const useCountdown = (targetHours = 11, targetMinutes = 47, targetSeconds = 30) => {
  const [time, setTime] = useState({
    hours: targetHours,
    minutes: targetMinutes,
    seconds: targetSeconds,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 };
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black text-white flex items-center justify-center">
      <span className="font-serif text-2xl sm:text-3xl font-light tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mt-2">{label}</span>
  </div>
);

const LimitedOffer = () => {
  const { hours, minutes, seconds } = useCountdown(11, 47, 30);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section className="w-full bg-[#f9f9f9] py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <div className="flex-1 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2 px-4">
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-black font-medium">
              Limited Time Offer
            </span>
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
          </div>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Product Image */}
          <div className="relative">
            {/* Discount Badge */}
            <div className="absolute -top-4 -right-4 z-10 w-20 h-20 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-lg">
              <span className="text-[10px] uppercase tracking-wider leading-none">Save</span>
              <span className="font-serif text-xl font-light leading-tight">40%</span>
            </div>

            {/* Image */}
            <div className="overflow-hidden aspect-[4/5] bg-white shadow-xl shadow-black/5">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=85"
                alt="Limited Edition Jacket"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Stock indicator */}
            <div className="mt-4 px-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mb-1.5">
                <span>Stock Remaining</span>
                <span className="text-black font-medium">Only 7 Left!</span>
              </div>
              <div className="w-full h-1 bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-700"
                  style={{ width: '18%' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right — Product Details */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-black animate-pulse inline-block"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
                Exclusive Drop · Today Only
              </span>
            </div>

            {/* Product Name */}
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-black leading-tight mb-4">
              The Signature<br />
              <span className="italic">Leather Jacket</span>
            </h2>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
                ))}
              </div>
              <span className="text-xs text-gray-500 tracking-wide">4.9 · 238 Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-serif text-4xl text-black font-light">₹11,999</span>
              <span className="text-xl text-gray-400 line-through">₹19,999</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed tracking-wide mb-8 max-w-md">
              Handcrafted from premium full-grain leather, this signature jacket is
              designed to last a lifetime. Features a slim-fit silhouette with
              brushed-metal hardware and a satin lining for unparalleled comfort.
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-black">Select Size</span>
                <button className="text-[10px] uppercase tracking-widest text-gray-400 underline hover:text-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <button
                    key={size}
                    className="w-10 h-10 border border-gray-200 text-xs text-gray-600 hover:border-black hover:text-black transition-all duration-200 first:border-black first:text-black first:font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">
                Offer Expires In:
              </p>
              <div className="flex items-start gap-3">
                <TimeBox value={hours} label="Hours" />
                <span className="text-2xl text-gray-300 mt-4 font-light select-none">:</span>
                <TimeBox value={minutes} label="Minutes" />
                <span className="text-2xl text-gray-300 mt-4 font-light select-none">:</span>
                <TimeBox value={seconds} label="Seconds" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAdd}
                className="group flex-1 py-4 bg-black text-white text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-900 active:scale-[0.98] transition-all duration-200"
              >
                <ShoppingBag className="w-4 h-4" />
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <button
                onClick={() => setWished(!wished)}
                className="sm:w-14 py-4 border border-gray-200 flex items-center justify-center hover:border-black transition-all duration-200"
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${wished ? 'fill-black text-black' : 'text-gray-400'}`}
                />
              </button>
            </div>

            {/* Guarantees */}
            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4">
              {[
                { label: 'Free Shipping', sub: 'On orders ₹5,000+' },
                { label: 'Easy Returns', sub: '30-day policy' },
                { label: 'Authentic', sub: '100% genuine' },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <p className="text-[10px] uppercase tracking-widest text-black font-medium">{item.label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedOffer;
