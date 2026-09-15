import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ArrowRight, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/siteConfig';

export const Craftsmanship = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      <SEO 
        title="Our Craftsmanship | From Yarn to Paithani Saree"
        description="Step-by-step journey of authentic Yeola Paithani weaving: raw silk selection, natural dyeing, pure zari spinning, and master loom tapestry."
        canonical="/our-craftsmanship"
      />

      {/* Hero Banner */}
      <section className="bg-brand-maroon-dark text-white py-16 lg:py-24 border-b-4 border-brand-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-brand-gold" /> Master Handloom Artistry
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Our Craftsmanship
          </h1>
          <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
            The extraordinary 6-step journey of creating an authentic Yeola Paithani saree — where Mulberry silk, pure gold zari, and centuries of tradition intertw.
          </p>
        </div>
      </section>

      {/* Craftsmanship Step-by-Step Sequence */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">
            Yarn to Saree Journey
          </span>
          <h2 className="font-serif text-3xl font-bold text-brand-maroon">
            The Art of Handloom Weaving
          </h2>
          <p className="text-xs text-gray-600">
            Each Paithani saree takes between 30 to 180 days of dedicated artisan handweaving in Yeola.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SITE_CONFIG.craftsmanshipSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm hover:shadow-luxury transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-4xl font-bold text-brand-gold/40 group-hover:text-brand-gold transition-colors">
                    {step.step}
                  </span>
                  <div className="p-3 bg-amber-50 rounded-2xl text-brand-maroon group-hover:bg-brand-maroon group-hover:text-brand-gold transition-colors">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-maroon">
                  {step.title}
                </h3>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-amber-100 mt-6 flex items-center gap-2 text-[11px] font-bold text-brand-maroon">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Yeola Artisan Handloom Certified</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Heritage Motif Showcase */}
      <section className="bg-white py-16 border-t border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3.5 py-1 rounded-full">
              Signature Motifs
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-maroon mt-3">
              Icons of Paithani Tapestry
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-3">
              <div className="text-3xl font-bold text-brand-gold">🦚</div>
              <h4 className="font-serif font-bold text-base text-brand-maroon">Mor & Munia (Peacock & Parrot)</h4>
              <p className="text-xs text-gray-600">Symbols of grace, beauty, and eternal royalty woven into the borders and pallu.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-3">
              <div className="text-3xl font-bold text-brand-gold">🌸</div>
              <h4 className="font-serif font-bold text-base text-brand-maroon">Asavali (Flowering Vine)</h4>
              <p className="text-xs text-gray-600">Classical Peshwai motif symbolizing prosperity and eternal flowering abundance.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-2xl border border-amber-200 space-y-3">
              <div className="text-3xl font-bold text-brand-gold">🏛️</div>
              <h4 className="font-serif font-bold text-base text-brand-maroon">Durbar Pallu (Royal Court)</h4>
              <p className="text-xs text-gray-600">Heavy ornate tapestry pallus incorporating intricate gold zari buttis and geometric interlaces.</p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold px-8 py-4 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:bg-brand-maroon-dark transition-all"
            >
              Explore Handwoven Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-brand-maroon text-white text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldCheck className="w-10 h-10 text-brand-gold shrink-0" />
            <div>
              <h4 className="font-serif text-lg font-bold text-brand-gold">Silk Mark Authenticated</h4>
              <p className="text-xs text-amber-100">Every Indrani Paithani saree is verified by the Silk Mark Organisation of India.</p>
            </div>
          </div>
          <Link to="/contact" className="bg-brand-gold text-brand-maroon font-serif font-bold text-xs px-6 py-3 rounded-full uppercase tracking-wider shrink-0 hover:bg-amber-300 transition-colors">
            Custom Order Request
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Craftsmanship;
