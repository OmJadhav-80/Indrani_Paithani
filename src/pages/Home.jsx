import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Award, Heart, Star, ShoppingBag, Quote, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';

export const Home = () => {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  return (
    <div className="bg-brand-cream min-h-screen">
      
      {/* HERO SECTION WITH FLOATING PAITHANI SAREE ANIMATION */}
      <section className="relative bg-gradient-to-b from-brand-maroon via-brand-maroon-dark to-brand-maroon text-white overflow-hidden py-16 lg:py-24 border-b-4 border-brand-gold">
        
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-emerald/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT: BRAND HERITAGE INTRO CONTENT (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-brand-gold" /> Authentic Yeola Handloom Heritage
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
                The Crown Jewel of Maharashtrian <span className="text-brand-gold font-normal italic">Silk Heritage</span>
              </h1>

              <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Handcrafted for over 2,000 years in the historic weaving cluster of Yeola. Woven with pure Mulberry silk, natural dyes, and opulent 24K gold zari pallus.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/catalog"
                  className="w-full sm:w-auto bg-brand-gold text-brand-maroon hover:bg-amber-300 px-8 py-4 rounded-xl font-serif font-bold text-sm uppercase tracking-wider shadow-gold-glow transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Explore Saree Catalog <ArrowRight className="w-4 h-4 text-brand-maroon" />
                </Link>

                <Link
                  to="/catalog?category=Yeola+Paithani"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-brand-gold border border-brand-gold/40 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  View Pure Yeola Paithani
                </Link>
              </div>

              {/* Trust Micro Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 text-center border-t border-amber-900/60 max-w-md mx-auto lg:mx-0">
                <div>
                  <span className="font-serif text-xl font-bold text-brand-gold block">100%</span>
                  <span className="text-[10px] text-amber-200/80 uppercase">Handloom Pure</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-brand-gold block">Silk Mark</span>
                  <span className="text-[10px] text-amber-200/80 uppercase">Certified</span>
                </div>
                <div>
                  <span className="font-serif text-xl font-bold text-brand-gold block">Free</span>
                  <span className="text-[10px] text-amber-200/80 uppercase">Insured Delivery</span>
                </div>
              </div>

            </div>

            {/* RIGHT: FLOATING PAITHANI SAREE HERO ANIMATION (5 cols) */}
            <div className="lg:col-span-5 flex justify-center relative">
              <motion.div
                animate={{
                  y: [0, -16, 0],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative max-w-sm w-full"
              >
                <div className="relative rounded-2xl overflow-hidden border-4 border-brand-gold shadow-2xl bg-brand-maroon-dark">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000"
                    alt="Floating Royal Yeola Paithani Saree"
                    className="w-full h-[450px] object-cover"
                  />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-brand-maroon/90 backdrop-blur-md p-4 rounded-xl border border-brand-gold/60 text-white shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest">Masterpiece Collection</span>
                        <h4 className="font-serif text-sm font-bold text-white">Maharani Royal Peacock Paithani</h4>
                      </div>
                      <span className="font-serif text-base font-bold text-brand-gold">₹38,500</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-brand-gold text-brand-maroon text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" /> Real Gold Zari Woven
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED SAREE CATALOG HIGHLIGHTS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
            Featured Masterpieces
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mt-3">
            Traditional Yeola Handloom Sarees
          </h2>
          <p className="text-xs text-gray-600 mt-2">
            Each saree takes over 45 to 90 days to weave on traditional wood-frame handlooms.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PRODUCTS.slice(0, 3).map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                        isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-gray-600 hover:text-brand-maroon'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-brand-maroon line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-gray-800">{product.rating}</span>
                      <span className="text-gray-400 text-[10px]">({product.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div>
                    <span className="font-serif text-xl font-bold text-brand-maroon">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold px-8 py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:bg-brand-maroon-dark transition-all"
          >
            View Entire Royal Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ABOUT THE FOUNDER SECTION */}
      <section className="py-16 bg-white border-t border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-cream rounded-3xl p-8 lg:p-12 border border-amber-200 shadow-luxury">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Founder Image (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative">
                  <div className="w-64 sm:w-80 h-80 sm:h-[420px] rounded-2xl overflow-hidden border-4 border-brand-gold shadow-2xl">
                    <img
                      src="/founder.png"
                      alt="Niharika Wade - Founder & CEO of Indrani Paithani"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Founder Bio & Legacy Quote (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">
                    About The Founder
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mt-3">
                    Niharika Wade
                  </h2>
                  <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
                    Founder & CEO, Indrani Paithani
                  </p>
                </div>

                <div className="relative pl-6 border-l-4 border-brand-gold space-y-4">
                  <Quote className="w-8 h-8 text-brand-gold/40 absolute -top-2 left-0 -translate-x-1/2" />
                  <p className="font-serif text-base sm:text-lg italic text-gray-800 leading-relaxed">
                    "Luxury begins with trust. At Indrani Paithani, we are dedicated to preserving and celebrating the timeless heritage of Paithani craftsmanship, proudly carrying forward a legacy that has been cherished for over 64 years. Every creation reflects authenticity, elegance, and uncompromising quality."
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    "Our commitment extends beyond beautiful sarees. We strive to build lasting relationships founded on customer satisfaction, transparency, and unwavering trust. These values remain at the heart of everything we do, ensuring that every patron experiences the true essence of heritage and luxury."
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span className="text-xs font-semibold text-gray-800">
                    Handcrafted Authenticity & Unwavering Trust Guaranteed
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
