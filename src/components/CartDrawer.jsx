import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalSavings,
    gst,
    deliveryFee,
    freeShippingThreshold,
    freeShippingRemaining,
    grandTotal
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          />

          {/* Slide-Over Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-brand-cream z-50 shadow-2xl flex flex-col border-l border-brand-gold/30"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-brand-maroon text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold" />
                <h3 className="font-serif text-lg font-bold text-brand-gold">Shopping Bag ({cartItems.length})</h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1 rounded-full text-amber-200 hover:text-white hover:bg-brand-maroon-dark transition-colors"
                aria-label="Close Cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-amber-100/70 p-3 border-b border-amber-200 text-xs">
              {freeShippingRemaining > 0 ? (
                <div className="space-y-1">
                  <p className="text-brand-maroon font-medium flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-brand-maroon shrink-0" />
                    Add <span className="font-bold text-amber-900">₹{freeShippingRemaining.toLocaleString('en-IN')}</span> more for <span className="font-bold">FREE Express Delivery</span>
                  </p>
                  <div className="w-full bg-amber-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-brand-gold h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-emerald-800 font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Congratulations! You unlocked FREE Express Shipping across India.
                </p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-brand-maroon">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-maroon">Your Bag is Empty</h4>
                  <p className="text-xs text-gray-600 max-w-xs">Explore our authentic Yeola Paithani & Maharani silk saree collections.</p>
                  <button
                    onClick={() => { closeCart(); navigate('/catalog'); }}
                    className="bg-brand-maroon text-brand-gold px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-brand-maroon-dark transition-colors"
                  >
                    Browse Saree Catalog
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${index}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-amber-200/60 shadow-xs relative"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-20 h-24 object-cover rounded-lg border border-amber-100"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h5 className="font-serif text-xs font-bold text-brand-maroon line-clamp-2">
                            {item.product.title}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Remove Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-amber-900 font-medium mt-0.5">
                          Color: <span className="font-semibold text-brand-maroon">{item.selectedColor}</span>
                        </p>
                        <p className="text-[11px] text-gray-500">SKU: {item.product.sku}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-amber-300 rounded-md bg-amber-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, -1)}
                            className="p-1 text-brand-maroon hover:bg-amber-200 rounded-l-md"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedColor, 1)}
                            className="p-1 text-brand-maroon hover:bg-amber-200 rounded-r-md"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price Display */}
                        <div className="text-right">
                          <span className="font-bold text-sm text-brand-maroon">
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                          {item.product.originalPrice && (
                            <span className="block text-[10px] text-gray-400 line-through">
                              ₹{(item.product.originalPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer with Financial Summary */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-amber-200 space-y-3 shadow-lg">
                <div className="space-y-1.5 text-xs text-gray-600 border-b border-gray-100 pb-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-medium text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Total Savings:</span>
                      <span>-₹{totalSavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5% Silk Handloom):</span>
                    <span className="font-medium text-gray-800">₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Delivery:</span>
                    <span className="font-medium text-gray-800">
                      {deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Total Payable Amount</span>
                    <span className="font-serif text-xl font-bold text-brand-maroon">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckoutClick}
                    className="bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all transform hover:scale-[1.02]"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
