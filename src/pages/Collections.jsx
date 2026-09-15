import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Collections = () => {
  const collectionList = [
    {
      title: 'Yeola Handloom Paithani',
      category: 'Yeola Paithani',
      description: 'Handcrafted by state award-winning weavers using traditional wood-frame handlooms. Woven with pure Mulberry silk and 24K real gold zari.',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      tag: 'Handwoven Classic'
    },
    {
      title: 'Maharani Bridal Trousseau',
      category: 'Maharani',
      description: 'The pinnacle of Maharashtrian bridal luxury. Features 100+ peacock buttis on the body and intricate durbar pallus.',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      tag: 'Bridal Heritage'
    },
    {
      title: 'Tissue Gold Paithani',
      category: 'Tissue Silk',
      description: 'Radiant dual-tone tissue silk interwoven with metallic sheen. Lightweight yet regal, crafted for grand celebrations.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000',
      tag: 'Festive Sheen'
    },
    {
      title: 'Festive Semi-Paithani',
      category: 'Semi-Paithani',
      description: 'Elegant, lightweight silk blend sarees designed for poojas, daytime family gatherings, and traditional celebrations.',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000',
      tag: 'Everyday Elegance'
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Royal Saree Collections" 
        description="Discover Indrani Paithani signature collections: Yeola Handloom, Maharani Bridal Trousseau, and Tissue Gold Sarees."
        canonical="/collections"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
            Curated Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon mt-3">
            Signature Paithani Collections
          </h1>
          <p className="text-xs text-gray-600 mt-2">
            Explore our themed handloom creations tailored for grand weddings, festive celebrations, and heirloom keepsakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collectionList.map((col, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-amber-200 overflow-hidden shadow-luxury flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-brand-maroon text-brand-gold text-xs font-bold px-3.5 py-1.5 rounded-full border border-brand-gold">
                  {col.tag}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-serif text-2xl font-bold text-brand-maroon">{col.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{col.description}</p>

                <Link
                  to={`/shop?category=${encodeURIComponent(col.category)}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-maroon hover:text-brand-gold transition-colors"
                >
                  Explore {col.title} <ArrowRight className="w-4 h-4 text-brand-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
