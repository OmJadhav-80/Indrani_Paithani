import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Award, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { SEO } from '../components/SEO';

export const PaithaniHeritage = () => {
  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Paithani Heritage & Craftsmanship Guide" 
        description="Discover the 2,000-year history of Paithani sarees, Kathpadar borders, Peacock & Asawali zari motifs, and Yeola handloom weaving."
        canonical="/heritage"
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-4 py-1.5 rounded-full">
            Cultural Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon">
            The Legend of Paithani Weaving
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            Referred to as the "Queen of Silks", Paithani is a 2,000-year-old Maharashtrian handloom art form famed for its kaleidoscopic silk sheen and pure gold zari tapestry.
          </p>
        </div>

        {/* Heritage Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-brand-maroon rounded-2xl flex items-center justify-center font-serif font-bold text-xl">
              1
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-maroon">What Makes Paithani Unique?</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Unlike printed or embroidered sarees, a Paithani saree is handwoven using the ancient tapestry interlock technique. Both sides of an authentic handloom Paithani look identical, with zero loose threads on the reverse side of the zari pallu.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-brand-maroon rounded-2xl flex items-center justify-center font-serif font-bold text-xl">
              2
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-maroon">The Yeola Connection</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              In the 17th century, the Peshwas patronized weavers in Yeola (Nashik), transforming it into the beating heart of handloom Paithani creation. Today, Yeola weavers preserve these heritage wood-frame looms.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-brand-maroon rounded-2xl flex items-center justify-center font-serif font-bold text-xl">
              3
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-maroon">Peacock & Asawali Motifs</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Traditional Paithani pallus feature handwoven peacock (*Mor*), flowering vase (*Asawali*), parrot (*Popat*), and lotus (*Kamal*) motifs in pure metallic zari thread.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-amber-200 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-brand-maroon rounded-2xl flex items-center justify-center font-serif font-bold text-xl">
              4
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-maroon">Kathpadar & Kadiyal Borders</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Distinguished by broad contrast Kathpadar zari borders woven with interlocking warp threads. The Kadiyal technique ensures contrast borders seamlessly meld with Mulberry silk bodies.
            </p>
          </div>

        </div>

        {/* CTA Strip */}
        <div className="bg-brand-maroon text-white p-8 rounded-3xl border border-brand-gold text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold text-brand-gold">Experience Authentic Yeola Paithani</h3>
          <p className="text-xs text-amber-100/90 max-w-xl mx-auto">
            Explore our Silk Mark certified handloom sarees crafted by state award-winning weavers.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-maroon px-8 py-3 rounded-full font-serif font-bold text-xs uppercase"
          >
            Explore Saree Collection
          </a>
        </div>

      </div>
    </div>
  );
};
