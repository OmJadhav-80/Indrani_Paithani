import React from 'react';
import { ShieldCheck, Award, Truck, RefreshCw, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-maroon text-amber-100/90 pt-16 pb-12 border-t-4 border-brand-gold">
      {/* Top Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-amber-900/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <Award className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-gold">100% Handloom Guarantee</h4>
            <p className="text-xs text-amber-200/70">Authentic Yeola weavers crafting pure Mulberry Silk and hand-spun Zari.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-gold">Silk Mark Certified</h4>
            <p className="text-xs text-amber-200/70">Government of India authenticated pure natural silk quality testing.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <Truck className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-gold">Free Express Shipping</h4>
            <p className="text-xs text-amber-200/70">Insured transit across India with real-time Bluedart & Delhivery tracking.</p>
          </div>

          <div className="flex flex-col items-center space-y-3 p-4 bg-brand-maroon-dark/50 rounded-xl border border-amber-500/20">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-full">
              <RefreshCw className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-gold">7-Day Easy Exchange</h4>
            <p className="text-xs text-amber-200/70">Hassle-free replacement policy for defective or mismatched sarees.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Indrani Paithani Logo" className="w-10 h-10" />
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              INDRANI <span className="text-brand-gold">PAITHANI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-amber-200/80">
            Dedicated to preserving the 2000-year-old royal heritage of Maharashtra’s finest handloom Paithani sarees, woven with real gold zari and natural mulberry silk.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h5 className="font-serif text-base font-semibold text-brand-gold mb-4 border-b border-amber-800/60 pb-2">Collections</h5>
          <ul className="space-y-2 text-xs text-amber-100/80">
            <li><a href="/catalog?category=Yeola+Paithani" className="hover:text-brand-gold">Yeola Handloom Paithani</a></li>
            <li><a href="/catalog?category=Maharani" className="hover:text-brand-gold">Maharani Bridal Silk</a></li>
            <li><a href="/catalog?category=Tissue+Silk" className="hover:text-brand-gold">Tissue Gold Paithani</a></li>
            <li><a href="/catalog?category=Semi-Paithani" className="hover:text-brand-gold">Semi-Paithani Sarees</a></li>
            <li><a href="/catalog?occasion=Bridal" className="hover:text-brand-gold">Bridal Trousseau Collection</a></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h5 className="font-serif text-base font-semibold text-brand-gold mb-4 border-b border-amber-800/60 pb-2">Customer Care</h5>
          <ul className="space-y-2 text-xs text-amber-100/80">
            <li><a href="/profile" className="hover:text-brand-gold">My Account & Addresses</a></li>
            <li><a href="/profile?tab=orders" className="hover:text-brand-gold">Track Order Status</a></li>
            <li><a href="/register" className="hover:text-brand-gold">Create Account</a></li>
            <li><a href="#" className="hover:text-brand-gold">Silk Mark Authenticity Guide</a></li>
            <li><a href="#" className="hover:text-brand-gold">Care Instructions for Zari</a></li>
          </ul>
        </div>

        {/* Contact & Weaver Hub */}
        <div className="space-y-3 text-xs">
          <h5 className="font-serif text-base font-semibold text-brand-gold mb-4 border-b border-amber-800/60 pb-2">Weaving Hub & Store</h5>
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
            <p>Main Weaver Hub: Paithani Cluster, Station Road, Yeola, Nashik, Maharashtra - 423401</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-brand-gold shrink-0" />
            <p>+91 98234 56789 / +91 94220 12345</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-brand-gold shrink-0" />
            <p>support@indranipaithani.com</p>
          </div>
        </div>

      </div>

      {/* Copyright Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60">
        <p>© 2026 Indrani Paithani. All Rights Reserved. Handcrafted with pride in Maharashtra.</p>
        <p className="mt-2 sm:mt-0 font-medium text-brand-gold">100% Secure Checkout via Razorpay & Cashfree</p>
      </div>
    </footer>
  );
};
