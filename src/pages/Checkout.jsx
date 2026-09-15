import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, CreditCard, Truck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, grandTotal, subtotal, gst, deliveryFee, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'cod'
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="bg-brand-cream min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-luxury border border-amber-200">
          <h2 className="font-serif text-2xl font-bold text-brand-maroon">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-gray-600 mt-2 mb-6">Add sarees from our catalog before proceeding to checkout.</p>
          <button onClick={() => navigate('/catalog')} className="bg-brand-maroon text-brand-gold px-6 py-3 rounded-xl font-bold text-xs uppercase">
            Browse Catalog
          </button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    setTimeout(() => {
      const newOrder = {
        id: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'razorpay' ? 'Prepaid (Razorpay / UPI / Cards)' : 'Cash on Delivery',
        status: 'Processing',
        items: [...cartItems],
        address: user?.addresses[selectedAddressIndex] || { city: 'Pune', state: 'Maharashtra' }
      };
      setOrderComplete(newOrder);
      clearCart();
      setIsPlacingOrder(false);
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="bg-brand-cream min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-luxury border border-amber-200 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-brand-maroon">Order Placed Successfully!</h1>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Thank you for shopping with Indrani Paithani. Your order <span className="font-bold text-brand-maroon">#{orderComplete.id}</span> has been confirmed and sent to our Yeola weaving hub.
          </p>

          <div className="p-4 bg-amber-50 rounded-xl text-xs text-left border border-amber-200 space-y-2">
            <div className="flex justify-between font-bold text-brand-maroon">
              <span>Order Total: ₹{orderComplete.totalAmount.toLocaleString('en-IN')}</span>
              <span>Payment: {orderComplete.paymentMethod}</span>
            </div>
            <p className="text-gray-600">
              Delivery Address: {orderComplete.address.flat}, {orderComplete.address.city}, {orderComplete.address.state} - {orderComplete.address.pincode}
            </p>
          </div>

          <button
            onClick={() => navigate('/profile?tab=orders')}
            className="bg-brand-maroon text-brand-gold px-8 py-3.5 rounded-xl font-bold text-xs uppercase"
          >
            View in My Orders History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: CHECKOUT STEPS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Select Delivery Address */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-200 pb-3">
              <MapPin className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-lg font-bold text-brand-maroon">1. Select Delivery Address</h2>
            </div>

            <div className="space-y-3">
              {user?.addresses?.map((addr, idx) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddressIndex(idx)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    selectedAddressIndex === idx ? 'border-brand-maroon bg-amber-50/80 ring-2 ring-brand-gold' : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressIndex === idx}
                    onChange={() => setSelectedAddressIndex(idx)}
                    className="mt-1 accent-brand-maroon"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-brand-maroon">{addr.fullName} ({addr.label})</span>
                    <p className="text-gray-600 mt-0.5">{addr.flat}, {addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-gray-500">Phone: {addr.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Payment Method Selector */}
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-amber-200 pb-3">
              <CreditCard className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-lg font-bold text-brand-maroon">2. Select Payment Method</h2>
            </div>

            <div className="space-y-3">
              {/* Razorpay Online Payment */}
              <div
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'razorpay' ? 'border-brand-maroon bg-amber-50/80 ring-2 ring-brand-gold' : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                    className="accent-brand-maroon"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-brand-maroon">Prepaid via Razorpay / Cashfree</span>
                    <p className="text-gray-500">Instant Payment via UPI (GPay/PhonePe), Credit/Debit Cards & NetBanking</p>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Recommended</span>
              </div>

              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'cod' ? 'border-brand-maroon bg-amber-50/80 ring-2 ring-brand-gold' : 'border-gray-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-brand-maroon"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-brand-maroon">Cash on Delivery (COD)</span>
                    <p className="text-gray-500">Pay cash upon parcel delivery at your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: ORDER SUMMARY (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-luxury space-y-4">
            <h3 className="font-serif text-lg font-bold text-brand-maroon border-b border-amber-200 pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs items-center">
                  <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-14 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h5 className="font-serif font-bold text-brand-maroon line-clamp-1">{item.product.title}</h5>
                    <p className="text-gray-500">Color: {item.selectedColor} | Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-brand-maroon">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-amber-200 pt-3 text-xs text-gray-600">
              <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>GST (5% Silk Handloom):</span><span>₹{gst.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Shipping:</span><span className="text-emerald-700 font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
            </div>

            <div className="border-t border-amber-200 pt-3 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-sm">Total Payable</span>
              <span className="font-serif text-2xl font-bold text-brand-maroon">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isPlacingOrder ? 'Confirming Order with Hub...' : 'Place Order & Pay'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
