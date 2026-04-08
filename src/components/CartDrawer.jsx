import React from 'react';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] transition-opacity duration-400
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[95] flex flex-col
          shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <h2 className="font-serif text-xl font-light">
              Your Bag
              {items.length > 0 && (
                <span className="ml-2 text-sm font-sans text-gray-400">({items.reduce((s, i) => s + i.qty, 0)})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full text-center px-8 py-16">
              <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-gray-200" />
              </div>
              <p className="font-serif text-2xl font-light text-gray-300 italic mb-2">Your bag is empty</p>
              <p className="text-[11px] uppercase tracking-widest text-gray-300 mb-10">
                Discover pieces made to last
              </p>
              <button
                onClick={closeCart}
                className="group inline-flex items-center gap-2 px-8 py-3.5 border border-black text-black
                  text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex gap-4 px-7 py-5 group"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-stone-50">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-0.5">{item.cat}</p>
                      <p className="font-serif text-sm text-black leading-snug">{item.name}</p>
                      <p className="text-sm font-medium text-black mt-1.5">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-[12px] font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-7 py-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-widest text-gray-400">Subtotal</span>
              <span className="font-serif text-2xl font-light">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            {/* Shipping note */}
            <p className="text-[10px] text-center text-gray-400 tracking-wide">
              {totalPrice >= 5000
                ? '✓ Free shipping on this order'
                : `Add ₹${(5000 - totalPrice).toLocaleString('en-IN')} more for free shipping`}
            </p>

            {/* Progress bar */}
            <div className="w-full h-0.5 bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-500"
                style={{ width: `${Math.min((totalPrice / 5000) * 100, 100)}%` }}
              />
            </div>

            {/* Checkout */}
            <button className="w-full py-4 bg-black text-white text-[11px] uppercase tracking-widest
              hover:bg-stone-900 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Continue + Clear */}
            <div className="flex items-center justify-between">
              <button
                onClick={closeCart}
                className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
              >
                ← Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="text-[10px] uppercase tracking-widest text-gray-300 hover:text-red-400 transition-colors"
              >
                Clear Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
