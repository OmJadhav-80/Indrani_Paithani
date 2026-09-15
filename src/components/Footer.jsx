import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Truck, RefreshCw, Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const Footer = () => {
  return (
    <footer className="bg-brand-maroon text-amber-100/90 pt-16 pb-12 border-t-4 border-brand-gold">
      
      {/* Top Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-amber-900/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-base font-bold text-brand-gold">100% Handloom Guarantee</h4>
            <p className="text-xs text-amber-200/70">Authentic Yeola weavers crafting pure Mulberry Silk and hand-spun Zari.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-base font-bold text-brand-gold">Silk Mark Certified</h4>
            <p className="text-xs text-amber-200/70">Government of India authenticated pure natural silk quality testing.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <Truck className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-base font-bold text-brand-gold">Free Express Shipping</h4>
            <p className="text-xs text-amber-200/70">Insured transit across India with real-time Bluedart & Delhivery tracking.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <RefreshCw className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-base font-bold text-brand-gold">7-Day Easy Exchange</h4>
            <p className="text-xs text-amber-200/70">Hassle-free replacement policy for defective or mismatched sarees.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Story */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/indrani-official-logo.jpg" alt="Official Indrani Paithani Logo" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/80 shadow-md" />
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              INDRANI <span className="text-brand-gold">PAITHANI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-amber-200/80">
            Dedicated to preserving the 2,000-year-old royal heritage of Maharashtra’s finest handloom Paithani sarees, woven with real gold zari and natural mulberry silk.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <a href={SITE_CONFIG.socialLinks.instagram} target="_blank" rel="noreferrer" className="p-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-maroon rounded-full transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socialLinks.facebook} target="_blank" rel="noreferrer" className="p-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-maroon rounded-full transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socialLinks.youtube} target="_blank" rel="noreferrer" className="p-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-maroon rounded-full transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={SITE_CONFIG.socialLinks.whatsapp} target="_blank" rel="noreferrer" className="p-2 bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-maroon rounded-full transition-colors" title="WhatsApp Chat">
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-serif text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 border-b border-amber-800/60 pb-2">Navigation</h5>
          <ul className="space-y-2 text-xs text-amber-100/80">
            <li><Link to="/shop" className="hover:text-brand-gold">Saree Shop</Link></li>
            <li><Link to="/collections" className="hover:text-brand-gold">Curated Collections</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold">About Us & Founder</Link></li>
            <li><Link to="/heritage" className="hover:text-brand-gold">Paithani Weaving Heritage</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold">Contact & Store Locations</Link></li>
          </ul>
        </div>

        {/* Support & Policies */}
        <div>
          <h5 className="font-serif text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 border-b border-amber-800/60 pb-2">Customer Care & Policies</h5>
          <ul className="space-y-2 text-xs text-amber-100/80">
            <li><Link to="/profile" className="hover:text-brand-gold">My Account & Address Book</Link></li>
            <li><Link to="/profile?tab=orders" className="hover:text-brand-gold">Track Order Status</Link></li>
            <li><Link to="/policies?tab=shipping" className="hover:text-brand-gold">Shipping & Express Delivery</Link></li>
            <li><Link to="/policies?tab=returns" className="hover:text-brand-gold">Return & Refund Policy</Link></li>
            <li><Link to="/policies?tab=privacy" className="hover:text-brand-gold">Privacy Policy & Terms</Link></li>
            <li><Link to="/policies?tab=faq" className="hover:text-brand-gold">Customer FAQs</Link></li>
          </ul>
        </div>

        {/* Store Address & Contact */}
        <div className="space-y-3 text-xs">
          <h5 className="font-serif text-sm font-semibold text-brand-gold uppercase tracking-wider mb-4 border-b border-amber-800/60 pb-2">Weaving Hub & Store</h5>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <p>Main Hub: {SITE_CONFIG.storeAddress.hub}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-brand-gold shrink-0" />
            <p>{SITE_CONFIG.supportPhone} / {SITE_CONFIG.altPhone}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-brand-gold shrink-0" />
            <p>{SITE_CONFIG.supportEmail}</p>
          </div>
        </div>

      </div>

      {/* Copyright Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60">
        <p>© 2026 Indrani Paithani. All Rights Reserved. Crafted with pride in Maharashtra.</p>
        <p className="mt-2 sm:mt-0 font-medium text-brand-gold">100% Secure Checkout via Razorpay & Cashfree</p>
      </div>
    </footer>
  );
};
