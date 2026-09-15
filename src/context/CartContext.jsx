import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('indrani_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: MOCK_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Royal Maroon'
      }
    ];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('indrani_wishlist');
    return saved ? JSON.parse(saved) : [MOCK_PRODUCTS[1].id];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('indrani_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('indrani_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const colorToUse = selectedColor || product.selectedColor || (product.colors && product.colors[0]?.name) || 'Standard';
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === colorToUse
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedColor: colorToUse }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, selectedColor) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (productId, selectedColor, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === selectedColor) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      }
      return [...prev, product.id];
    });
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Financial Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const totalSavings = cartItems.reduce(
    (sum, item) => sum + ((item.product.originalPrice || item.product.price) - item.product.price) * item.quantity,
    0
  );

  const gst = Math.round(subtotal * 0.05); // 5% GST on silk handloom sarees
  const freeShippingThreshold = 10000;
  const deliveryFee = subtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 350;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const grandTotal = subtotal + gst + deliveryFee;

  const totalCartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        openCart,
        closeCart,
        subtotal,
        totalSavings,
        gst,
        deliveryFee,
        freeShippingThreshold,
        freeShippingRemaining,
        grandTotal,
        totalCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
