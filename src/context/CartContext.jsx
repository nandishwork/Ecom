import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems]     = useState([]);
  const [isOpen, setIsOpen]   = useState(false);

  const addItem = useCallback((item) => {
    setItems(prev => {
      // Unique key based on ID, size, and color to allow different variants in cart
      const variantId = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === variantId);
      
      if (existing) {
        return prev.map(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` === variantId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((variantId, delta) => {
    setItems(prev => {
      const result = prev.map(i => {
        const currentVariantId = `${i.id}-${i.selectedSize}-${i.selectedColor}`;
        if (currentVariantId === variantId) {
          return { ...i, qty: i.qty + delta };
        }
        return i;
      });
      return result.filter(i => i.qty > 0);
    });
  }, []);

  const removeItem = useCallback((variantId) => {
    setItems(prev => prev.filter(i => `${i.id}-${i.selectedSize}-${i.selectedColor}` !== variantId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart  = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      isOpen, openCart, closeCart,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
