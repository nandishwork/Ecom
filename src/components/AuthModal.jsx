import React from 'react';
import { X, ArrowRight, User, Mail, Lock } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6 lg:p-8 animate-fade-in transition-all">
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-md p-8 sm:p-12 shadow-2xl animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo/Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold tracking-tighter mb-2">HIVNK</h2>
          <div className="flex justify-center space-x-6 border-b border-gray-100 mt-8">
            <button 
              onClick={() => setActiveTab('signin')}
              className={`pb-3 text-xs uppercase tracking-[0.2em] transition-all ${activeTab === 'signin' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`pb-3 text-xs uppercase tracking-[0.2em] transition-all ${activeTab === 'signup' ? 'border-b-2 border-black text-black' : 'text-gray-400'}`}
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="space-y-6">
          {activeTab === 'signin' ? (
            <>
              {/* Sign In Form */}
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="PASSWORD" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                  Forgot?
                </button>
              </div>
              <button className="w-full py-4 bg-black text-white text-xs uppercase tracking-[0.2em] mt-8 hover:bg-gray-900 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/10 active:scale-[0.98]">
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="FIRST NAME" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="LAST NAME" 
                  className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
              />
              <input 
                type="password" 
                placeholder="PASSWORD (8+ CHARS)" 
                className="w-full bg-transparent border-b border-gray-200 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-black transition-colors"
              />
              <div className="flex items-start space-x-2 pt-2">
                <input type="checkbox" className="mt-1 accent-black" id="terms" />
                <label htmlFor="terms" className="text-[10px] text-gray-400 font-light leading-relaxed uppercase tracking-widest">
                  I agree to the <a href="#" className="underline text-black">Terms of Service</a> and <a href="#" className="underline text-black">Privacy Policy</a>.
                </label>
              </div>
              <button className="w-full py-4 bg-black text-white text-xs uppercase tracking-[0.2em] mt-8 hover:bg-gray-900 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-black/10 active:scale-[0.98]">
                Create Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </>
          )}
        </div>

        {/* Footer Helper */}
        <div className="text-center mt-10">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-light">
            Need Help? Contact <a href="mailto:support@hivnk.com" className="text-black font-normal">Our Artisans</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
