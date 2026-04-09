import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('signin');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, openCart } = useCart();

  const openAuthModal = (tab) => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Left: Nav Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/shop" className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">Shop</Link>
              <Link to="/collections" className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">Collections</Link>
              <Link to="/about" className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">About</Link>
            </div>

            {/* Center: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <h1 className="text-3xl font-serif font-bold tracking-tighter cursor-pointer">HIVNK</h1>
              </Link>
            </div>

            {/* Right: Search, Auth, Cart (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Search */}
              <div className="flex items-center">
                <div className={`flex items-center transition-all duration-300 ${isSearchActive ? 'w-48 sm:w-64 opacity-100 mr-2' : 'w-0 opacity-0 pointer-events-none'}`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search HIVNK..."
                    autoFocus={isSearchActive}
                    className="w-full border-b border-black py-1 focus:outline-none text-sm placeholder-gray-400 bg-transparent font-light"
                  />
                  {isSearchActive && (
                    <button onClick={() => { setIsSearchActive(false); setSearchQuery(''); }} className="ml-1 text-gray-400 hover:text-black">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setIsSearchActive(!isSearchActive)}
                  className={`p-1 transition-colors duration-200 ${isSearchActive ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                  aria-label="Toggle search"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Auth */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => openAuthModal('signin')}
                  className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors"
                >
                  Sign In
                </button>
                <span className="text-gray-300">/</span>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors"
                >
                  Sign Up
                </button>
              </div>

              {/* Cart Icon */}
              <button
                onClick={openCart}
                className="relative group p-1 hover:text-gray-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                {/* Animated badge */}
                <span
                  className={`absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-medium
                    rounded-full flex items-center justify-center transition-all duration-300
                    ${totalItems > 0 ? 'w-4 h-4 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'}`}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              </button>
            </div>

            {/* Mobile: Search + Cart + Hamburger */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Search */}
              <div className="flex items-center">
                <div className={`flex items-center transition-all duration-300 ${isSearchActive ? 'w-32 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full border-b border-black py-1 focus:outline-none text-[12px] bg-transparent"
                  />
                </div>
                <button onClick={() => setIsSearchActive(!isSearchActive)} className="p-1">
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Cart */}
              <button
                onClick={openCart}
                className="relative"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span
                  className={`absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-medium
                    rounded-full flex items-center justify-center transition-all duration-300
                    ${totalItems > 0 ? 'w-4 h-4 opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-0'}`}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ top: '80px' }}
        >
          <div className="px-6 py-8 flex flex-col space-y-6">
            <Link to="/shop"        className="text-2xl font-serif tracking-widest" onClick={() => setIsOpen(false)}>SHOP</Link>
            <Link to="/collections" className="text-2xl font-serif tracking-widest" onClick={() => setIsOpen(false)}>COLLECTIONS</Link>
            <Link to="/about"       className="text-2xl font-serif tracking-widest" onClick={() => setIsOpen(false)}>ABOUT</Link>
            <div className="pt-8 border-t border-gray-100 flex flex-col space-y-4">
              <button onClick={() => openAuthModal('signin')} className="text-left text-sm uppercase tracking-widest hover:text-black transition-colors">Sign In</button>
              <button onClick={() => openAuthModal('signup')} className="text-left text-sm uppercase tracking-widest hover:text-black transition-colors">Sign Up</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeTab={authTab}
        setActiveTab={setAuthTab}
      />
    </>
  );
};

export default Navbar;
