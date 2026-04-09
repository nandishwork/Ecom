import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ChevronRight, Lock, CreditCard, Truck, 
  MapPin, CheckCircle2, ArrowLeft, Info
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = 0; // Free for luxury brand
  const total = subtotal + shipping;

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
        <h2 className="font-serif text-3xl mb-6">Your bag is empty</h2>
        <Link to="/shop" className="px-8 py-3 bg-black text-white text-[11px] uppercase tracking-widest hover:bg-stone-800 transition-all">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    if (step === 2) {
      // Finalize order
      setTimeout(() => clearCart(), 1000);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 animate-[fadeIn_0.8s_ease-out]">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-10 h-10 text-black" />
        </div>
        <h2 className="font-serif text-4xl mb-4 text-center">Thank you for your order</h2>
        <p className="text-stone-500 mb-10 text-center max-w-md leading-relaxed font-light">
          Your order has been placed successfully. We'll send you a confirmation email with a tracking link shortly.
        </p>
        <Link to="/" className="px-12 py-4 border border-black text-black text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="font-serif text-4xl font-light mb-2">Checkout</h1>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400">
              <span className={step >= 1 ? 'text-black font-medium' : ''}>Shipping</span>
              <ChevronRight className="w-3 h-3" />
              <span className={step >= 2 ? 'text-black font-medium' : ''}>Payment</span>
              <ChevronRight className="w-3 h-3" />
              <span>Confirmation</span>
            </div>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Forms */}
          <div className="lg:col-span-12 xl:col-span-8">
            <form onSubmit={handleNextStep} className="space-y-12">
              
              {step === 1 && (
                <div className="animate-[fadeUp_0.5s_ease-out]">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-medium mb-8 flex items-center gap-3">
                    <MapPin className="w-4 h-4" /> Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Email Address</label>
                      <input 
                        type="email" name="email" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">First Name</label>
                      <input 
                        type="text" name="firstName" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Last Name</label>
                      <input 
                        type="text" name="lastName" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Address</label>
                      <input 
                        type="text" name="address" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">City</label>
                      <input 
                        type="text" name="city" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Zip Code</label>
                      <input 
                        type="text" name="zipCode" required 
                        onChange={handleInputChange}
                        className="w-full border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-[fadeUp_0.5s_ease-out]">
                  <h3 className="text-xs uppercase tracking-[0.3em] font-medium mb-8 flex items-center gap-3">
                    <CreditCard className="w-4 h-4" /> Payment Method
                  </h3>
                  <div className="bg-stone-50 p-8 mb-8 border border-stone-100">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-medium">Credit Card</span>
                      <div className="flex gap-2 grayscale brightness-50 opacity-30">
                        <CreditCard className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Card Number</label>
                        <input 
                          type="text" name="cardNumber" required 
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">Expiry Date</label>
                          <input 
                            type="text" name="expiry" required 
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">CVV</label>
                          <input 
                            type="text" name="cvv" required 
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-black focus:outline-none transition-colors font-light" 
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-sm">
                    <Lock className="w-4 h-4 text-stone-400" />
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest">Your payment details are encrypted and secure.</p>
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
                <button 
                  type="submit"
                  className="px-12 py-5 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-stone-900 transition-all duration-300 active:scale-[0.99] flex-1 sm:flex-none"
                >
                  {step === 1 ? 'Continue to Payment' : 'Complete Order'}
                </button>
                {step === 2 && (
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-5 text-[11px] uppercase tracking-[0.2em] text-stone-400 hover:text-black transition-colors"
                  >
                    Back to Shipping
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-12 xl:col-span-4">
            <div className="sticky top-32">
              <div className="bg-stone-50 p-10 border border-stone-100">
                <h3 className="text-xs uppercase tracking-[0.3em] font-medium mb-8">Order Summary</h3>
                
                {/* Items List */}
                <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                      <div className="w-20 h-24 flex-shrink-0 bg-white">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-serif text-sm text-black truncate pr-2">{item.name}</p>
                          <p className="text-sm font-medium">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">{item.selectedSize} / {item.selectedColor}</p>
                        <p className="text-[10px] uppercase tracking-widest text-stone-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Costs */}
                <div className="space-y-4 pt-6 border-t border-stone-200">
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-stone-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-widest text-stone-500">
                    <span>Shipping</span>
                    <span className="text-black font-medium tracking-normal italic">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-4 border-t border-stone-200">
                    <span className="text-xs uppercase tracking-widest font-bold">Total</span>
                    <span className="text-2xl font-medium tracking-tight">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Extra info */}
                <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
                  <div className="flex gap-3">
                    <Truck className="w-4 h-4 text-stone-300" />
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 leading-relaxed">Arrives in 3-5 business days with signature delivery</p>
                  </div>
                  <div className="flex gap-3">
                    <Info className="w-4 h-4 text-stone-300" />
                    <p className="text-[9px] uppercase tracking-widest text-stone-400 leading-relaxed">Taxes included in product price for domestic orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f4;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d6d3d1;
        }
      `}} />
    </div>
  );
};

export default Checkout;
