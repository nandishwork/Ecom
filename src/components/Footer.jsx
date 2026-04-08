import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-serif font-bold tracking-tighter mb-6">HIVNK</h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 max-w-xs">
              Defining modern luxury through timeless craftsmanship and minimalist aesthetics. Join our inner circle for exclusive drops and private sales.
            </p>
            <div className="relative max-w-xs">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-gray-700 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-white transition-colors"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">Collections</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Women</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Men</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Accessories</a></li>
              <li><a href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm font-light text-gray-400 hover:text-white transition-colors">Seasonal Sale</a></li>
            </ul>
          </div>

          {/* Assistance */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">Assistance</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Customer Care</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-8">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm font-light hover:text-gray-400 transition-colors">Accessibility</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            &copy; 2026 HIVNK LUXURY RETAIL. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">IND / ENGLISH</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">DESIGNED BY ARTISANS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
