import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, MapPin, Heart, Sparkles, Quote, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEO } from '../components/SEO';

export const About = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="About Us - Our 64+ Year Heritage" 
        description="Learn about Indrani Paithani, Founder & CEO Niharika Wade, and our commitment to authentic Yeola handloom weaving and Silk Mark purity."
        canonical="/about"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner Section */}
        <div className="bg-brand-maroon text-white p-8 sm:p-12 rounded-3xl border border-brand-gold shadow-luxury text-center relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/20 px-4 py-1.5 rounded-full border border-brand-gold/40">
              Our Legacy & Craftsmanship
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-gold">
              Preserving Maharashtra’s Royal Textile Heritage
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
              At Indrani Paithani, we carry forward a cherished weaving legacy spanning over 64 years, connecting master artisans of Yeola directly with patrons worldwide.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 sm:w-80 h-80 sm:h-[420px] rounded-2xl overflow-hidden border-4 border-brand-gold shadow-2xl">
                <img
                  src={SITE_CONFIG.founder.photo}
                  alt={SITE_CONFIG.founder.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
                  About The Founder
                </span>
                <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">
                  {SITE_CONFIG.founder.name}
                </h2>
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mt-1">
                  {SITE_CONFIG.founder.role}
                </p>
              </div>

              <div className="pl-6 border-l-4 border-brand-gold space-y-4">
                <p className="font-serif text-base sm:text-lg italic text-gray-800 leading-relaxed">
                  "{SITE_CONFIG.founder.quote}"
                </p>
                <p className="text-xs text-gray-700 leading-relaxed">
                  "Our commitment extends beyond beautiful sarees. We strive to build lasting relationships founded on customer satisfaction, transparency, and unwavering trust. These values remain at the heart of everything we do, ensuring that every patron experiences the true essence of heritage and luxury."
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-amber-200 text-center space-y-3 shadow-xs">
            <Award className="w-10 h-10 text-brand-maroon mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-maroon">100% Handloom Authenticity</h3>
            <p className="text-xs text-gray-600">Directly woven by state award-winning artisans in Yeola using traditional interlock tapestry techniques.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 text-center space-y-3 shadow-xs">
            <ShieldCheck className="w-10 h-10 text-brand-maroon mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-maroon">Silk Mark Certified</h3>
            <p className="text-xs text-gray-600">Every saree is verified by the Silk Mark Organisation of India to guarantee 100% natural Mulberry silk purity.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-200 text-center space-y-3 shadow-xs">
            <MapPin className="w-10 h-10 text-brand-maroon mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-maroon">Yeola Weaving Hub</h3>
            <p className="text-xs text-gray-600">Our main weaving hub in Yeola (Nashik) preserves age-old Jacquard & wood-frame handloom setups.</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/heritage"
            className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold px-8 py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:bg-brand-maroon-dark transition-all"
          >
            Read Paithani Heritage Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
