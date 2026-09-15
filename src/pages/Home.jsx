import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Award, 
  Heart, 
  Star, 
  ShoppingBag, 
  Quote, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CheckCircle2, 
  MapPin, 
  MessageCircle,
  Phone,
  Mail,
  Send,
  Layers,
  Calendar,
  Gift
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { YeolaMap } from '../components/YeolaMap';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEO } from '../components/SEO';

export const Home = () => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { addToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.title}" to your Shopping Bag!`, 'success', 'cart');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast('Thank you for subscribing to Indrani Paithani updates!', 'success', 'check');
    setNewsletterEmail('');
  };

  const collections = [
    {
      name: 'Paithani Sarees',
      category: 'Yeola Paithani',
      desc: 'Handcrafted with pure Mulberry silk and 24K real gold zari.',
      img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Pure Silk Paithani',
      category: 'Yeola Paithani',
      desc: '100% Silk Mark certified natural silk in vibrant peacock hues.',
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Bridal Collection',
      category: 'Maharani',
      desc: 'Ornate Maharani trousseaus with 100+ peacock buttis and durbar pallus.',
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    },
    {
      name: 'Festival Collection',
      category: 'Tissue Silk',
      desc: 'Iridescent Tissue Gold sarees designed for grand celebrations.',
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen">
      <SEO title="Authentic Handwoven Yeola Paithani Sarees" />

      {/* 3. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-black overflow-hidden border-b-4 border-brand-gold">
        {/* Full-width realistic Paithani saree background visual */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center md:bg-right-top transform scale-105 transition-transform duration-1000 opacity-90"
          style={{ backgroundImage: `url('/hero-paithani-bg.jpg')` }}
        />

        {/* Multi-layered dark luxury gradient overlay for maximum text contrast */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/95 via-black/80 to-black/30 md:from-black/95 md:via-black/70 md:to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-transparent to-black/60" />

        {/* Ambient gold glow highlight in background */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              {/* Brand Tagline Badge */}
              <div className="inline-flex items-center gap-2.5 bg-brand-gold/20 border border-brand-gold/50 backdrop-blur-md text-brand-gold px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] shadow-lg">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>INDRANI PAITHANI</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                Timeless Paithani.<br />
                <span className="text-brand-gold font-normal italic drop-shadow">Woven with Tradition.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-amber-100/90 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                Discover authentic Paithani sarees inspired by the rich handloom heritage of Yeola, Maharashtra.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-brand-gold text-brand-maroon hover:bg-amber-300 px-8 py-4 rounded-xl font-serif font-bold text-xs uppercase tracking-widest shadow-gold-glow transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4 text-brand-maroon group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/shop?category=Yeola%20Paithani"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-brand-gold border border-brand-gold/60 px-8 py-4 rounded-xl font-serif font-bold text-xs uppercase tracking-widest transition-all hover:border-brand-gold flex items-center justify-center gap-2"
                >
                  <span>SHOP PAITHANI</span>
                </Link>
              </div>

              {/* Trust Badges Strip */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-[11px] text-amber-200/80 uppercase font-semibold tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>100% Silk Mark Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-brand-gold" />
                  <span>24K Gold Zari Weave</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Direct From Yeola Weavers</span>
                </div>
              </div>

            </div>

            {/* Right Side Luxury Editorial Callout Pill */}
            <div className="lg:col-span-4 hidden lg:flex justify-end relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-black/60 backdrop-blur-xl border border-brand-gold/40 p-6 rounded-2xl max-w-xs shadow-2xl text-white space-y-3"
              >
                <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Signature Royal Motif</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white">Pure Mulberry Silk & Peacock Mor Zari</h4>
                <p className="text-xs text-amber-100/70 leading-relaxed">
                  Hand-spun on traditional Yeola looms with pure metallic zari threads and authentic peacock tapestry pallus.
                </p>
                <div className="pt-2 border-t border-brand-gold/20 flex items-center justify-between text-xs">
                  <span className="text-amber-200 font-serif italic">Artisan Masterpiece</span>
                  <span className="font-bold text-brand-gold">64+ Yrs Heritage</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BRAND INTRO - THE ART OF PAITHANI */}
      <section className="py-16 bg-white border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-maroon-dark text-white rounded-3xl p-8 sm:p-12 border-2 border-brand-gold shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/20 px-3.5 py-1 rounded-full border border-brand-gold/30">
                The Art of Paithani
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold leading-tight">
                Queen of Silks. Legacy of Peshwas.
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                Originating over 2,000 years ago during the Satavahana dynasty and cherished by the Peshwas of Maharashtra, the Paithani saree is distinguished by its oblique square border designs and ornate tapestry pallu adorned with peacocks, lotuses, and parrots.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <Link
                to="/our-craftsmanship"
                className="bg-brand-gold text-brand-maroon hover:bg-amber-300 px-6 py-3.5 rounded-xl font-serif font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
              >
                Learn Our Weaving Art <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COLLECTIONS GRID */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
            Browse By Category
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mt-3">
            Featured Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${encodeURIComponent(col.category)}`}
              className="group bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-4/5 overflow-hidden bg-gray-100 relative">
                <img src={col.img} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">{col.name}</h3>
                    <p className="text-[11px] text-amber-200 line-clamp-2 mt-0.5">{col.desc}</p>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-amber-50 text-brand-maroon text-xs font-bold uppercase tracking-wider flex items-center justify-between group-hover:bg-brand-maroon group-hover:text-brand-gold transition-colors">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PAITHANI SAREES */}
      <section className="py-16 bg-white border-t border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
              Handwoven Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mt-3">
              Featured Paithani Sarees
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PRODUCTS.slice(0, 3).map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div key={product.id} className="bg-brand-cream rounded-2xl border border-amber-200/80 overflow-hidden shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                        className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                          isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-gray-600 hover:text-brand-maroon'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">{product.category}</span>
                      <h3 className="font-serif text-base font-bold text-brand-maroon line-clamp-1">{product.title}</h3>
                      <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-gray-800">{product.rating}</span>
                        <span className="text-gray-400 text-[10px]">({product.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                    <span className="font-serif text-xl font-bold text-brand-maroon">₹{product.price.toLocaleString('en-IN')}</span>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Bag
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold px-8 py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:bg-brand-maroon-dark transition-all">
              View All Sarees <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PAITHANI HERITAGE SHOWCASE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-brand-maroon text-white rounded-3xl p-8 sm:p-12 border-2 border-brand-gold shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/20 px-3.5 py-1 rounded-full border border-brand-gold/30">
                64+ Years of Legacy
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-gold">
                Preserving Yeola's Authentic Handloom Weaving
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                For over six decades, Indrani Paithani has worked directly with traditional weaver families in Yeola, Maharashtra. Every saree is woven on traditional handlooms without automated machinery, preserving the sacred integrity of real silver and gold zari.
              </p>
              <div className="pt-2">
                <Link to="/paithani-heritage" className="text-xs font-bold text-brand-gold uppercase tracking-wider underline hover:text-white flex items-center gap-1">
                  Read Full Heritage Story <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-white/10 rounded-2xl border border-brand-gold/30">
                <span className="font-serif text-3xl font-bold text-brand-gold block">64+</span>
                <span className="text-[10px] text-amber-200 uppercase font-bold">Years Heritage</span>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-brand-gold/30">
                <span className="font-serif text-3xl font-bold text-brand-gold block">100%</span>
                <span className="text-[10px] text-amber-200 uppercase font-bold">Silk Mark Verified</span>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-brand-gold/30">
                <span className="font-serif text-3xl font-bold text-brand-gold block">Yeola</span>
                <span className="text-[10px] text-amber-200 uppercase font-bold">Weaving Hub</span>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl border border-brand-gold/30">
                <span className="font-serif text-3xl font-bold text-brand-gold block">15,000+</span>
                <span className="text-[10px] text-amber-200 uppercase font-bold">Happy Patrons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CRAFTSMANSHIP PREVIEW */}
      <section className="py-16 bg-white border-t border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
              From Yarn to Saree
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">
              The Craftsmanship Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-brand-gold">STEP 01</span>
              <h4 className="font-serif font-bold text-brand-maroon">Mulberry Silk Selection</h4>
              <p className="text-xs text-gray-600">Sourcing 100% natural Mulberry silk threads for luminous luster and strength.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-brand-gold">STEP 02</span>
              <h4 className="font-serif font-bold text-brand-maroon">Zari Weft & Tapestry</h4>
              <p className="text-xs text-gray-600">Interweaving pure metallic gold zari onto wooden bobbins for intricate pallu motifs.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-2">
              <span className="text-xs font-bold text-brand-gold">STEP 03</span>
              <h4 className="font-serif font-bold text-brand-maroon">Master Loom Weaving</h4>
              <p className="text-xs text-gray-600">Artisans spend weeks weaving peacock (mor) and parrot (munia) motifs by hand.</p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link to="/our-craftsmanship" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-maroon hover:text-brand-gold">
              Explore Complete Craftsmanship Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE INDRANI PAITHANI (TRUST FEATURES) */}
      <section className="bg-brand-maroon text-amber-100 py-12 border-b border-amber-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/20 px-3.5 py-1 rounded-full border border-brand-gold/30">
              The Indrani Guarantee
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mt-2">
              Why Choose Indrani Paithani?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center text-xs">
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-2xl border border-brand-gold/20">
              <Award className="w-8 h-8 text-brand-gold" />
              <span className="font-serif font-bold text-brand-gold">64+ Years Legacy</span>
              <p className="text-[10px] text-amber-200/70">Pioneers in authentic Yeola handloom weaving since decades.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-2xl border border-brand-gold/20">
              <ShieldCheck className="w-8 h-8 text-brand-gold" />
              <span className="font-serif font-bold text-brand-gold">Silk Mark Certified</span>
              <p className="text-[10px] text-amber-200/70">100% natural Mulberry silk purity guarantee on every saree.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-2xl border border-brand-gold/20">
              <Sparkles className="w-8 h-8 text-brand-gold" />
              <span className="font-serif font-bold text-brand-gold">Real Gold Zari</span>
              <p className="text-[10px] text-amber-200/70">Crafted with authentic metallic zari and hand-spun motifs.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-2xl border border-brand-gold/20">
              <CheckCircle2 className="w-8 h-8 text-brand-gold" />
              <span className="font-serif font-bold text-brand-gold">Weaver Direct Price</span>
              <p className="text-[10px] text-amber-200/70">Fair price directly from master weavers in Yeola.</p>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col items-center space-y-2 p-4 bg-white/5 rounded-2xl border border-brand-gold/20">
              <Truck className="w-8 h-8 text-brand-gold" />
              <span className="font-serif font-bold text-brand-gold">Insured Express Shipping</span>
              <p className="text-[10px] text-amber-200/70">Free express delivery across India with full transit insurance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OCCASION-BASED COLLECTIONS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">
            Curated For Every Event
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">
            Occasion-Based Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITE_CONFIG.occasions.slice(0, 3).map((occ, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-xs hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group">
              <div className="aspect-4/3 overflow-hidden relative bg-gray-100">
                <img src={occ.img} alt={occ.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-gold">{occ.subtitle}</span>
                    <h3 className="font-serif text-lg font-bold text-white">{occ.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-gray-600 leading-relaxed">{occ.desc}</p>
                <Link
                  to={`/shop?category=${encodeURIComponent(occ.filter)}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-maroon hover:text-brand-gold"
                >
                  Shop {occ.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CUSTOMER REVIEWS & RATINGS */}
      <section className="py-16 bg-white border-t border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">
              Stories of Joy & Heritage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="bg-brand-cream p-6 rounded-2xl border border-amber-200 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs italic text-gray-700 leading-relaxed font-serif">"{rev.comment}"</p>
                </div>
                <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-brand-maroon block">{rev.author}</span>
                    <span className="text-[10px] text-gray-500">{rev.location}</span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. VISIT US IN YEOLA (GOOGLE MAPS SECTION) */}
      <YeolaMap />

      {/* 13. ABOUT THE BOUTIQUE & FOUNDER */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-amber-200 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-80 h-80 sm:h-[400px] rounded-2xl overflow-hidden border-4 border-brand-gold shadow-2xl">
                <img src={SITE_CONFIG.founder.photo} alt={SITE_CONFIG.founder.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">About The Founder</span>
                <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">{SITE_CONFIG.founder.name}</h2>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">{SITE_CONFIG.founder.role}</p>
              </div>

              <div className="pl-6 border-l-4 border-brand-gold space-y-4">
                <Quote className="w-8 h-8 text-brand-gold/40 absolute -top-2 left-0 -translate-x-1/2" />
                <p className="font-serif text-base italic text-gray-800 leading-relaxed">"{SITE_CONFIG.founder.quote}"</p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "Our commitment extends beyond beautiful sarees. We strive to build lasting relationships founded on customer satisfaction, transparency, and unwavering trust."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14. CONTACT US CTA */}
      <section className="py-16 bg-brand-maroon text-white text-center border-t border-brand-gold">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-3xl font-bold text-brand-gold">Have Questions About Custom Paithani Weaving?</h2>
          <p className="text-xs text-amber-100/90 max-w-xl mx-auto">
            Our customer desk in Yeola is available 7 days a week to assist with bridal trousseaus and custom zari designs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a href={`tel:${SITE_CONFIG.supportPhone}`} className="bg-brand-gold text-brand-maroon px-6 py-3 rounded-full font-serif font-bold text-xs uppercase flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Us: {SITE_CONFIG.supportPhone}
            </a>
            <a href={SITE_CONFIG.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="bg-emerald-700 text-white px-6 py-3 rounded-full font-serif font-bold text-xs uppercase flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-300 fill-current" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 15. NEWSLETTER SUBSCRIPTION */}
      <section className="py-12 bg-amber-50 border-t border-amber-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" /> Exclusive Loom Updates
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-maroon">Join the Indrani Heritage Circle</h3>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Subscribe to receive private invitations for new loom drops, festival discounts, and bespoke bridal saree showcases.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2 pt-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-amber-300 text-xs focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="submit"
              className="bg-brand-maroon text-brand-gold font-serif font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-maroon-dark transition-colors"
            >
              Subscribe <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
