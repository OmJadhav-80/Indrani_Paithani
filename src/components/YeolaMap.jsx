import React from 'react';
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const YeolaMap = () => {
  return (
    <section className="py-16 bg-white border-t border-b border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
            Weaving Cluster Hub
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon">
            Visit Us in Yeola
          </h2>
          <p className="text-xs text-gray-600">
            Discover the heritage of Paithani craftsmanship from Yeola, Maharashtra.
          </p>
        </div>

        {/* Map & Address Container */}
        <div className="bg-brand-cream rounded-3xl border border-amber-200 overflow-hidden shadow-luxury grid grid-cols-1 lg:grid-cols-12">
          
          {/* Address & Direct Phone Details (4 cols) */}
          <div className="lg:col-span-4 p-8 space-y-6 flex flex-col justify-between bg-white border-b lg:border-b-0 lg:border-r border-amber-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-maroon" />
                <h3 className="font-serif text-xl font-bold text-brand-maroon">Boutique Location</h3>
              </div>

              <div className="text-xs text-gray-700 space-y-2">
                <p className="font-bold text-gray-900">{SITE_CONFIG.brandName} Weaving Hub</p>
                <p>{SITE_CONFIG.storeAddress.hub}</p>
              </div>

              <div className="pt-2 text-xs text-gray-700 space-y-1">
                <p className="font-bold text-gray-900">Direct Contact:</p>
                <p className="flex items-center gap-2 text-brand-maroon font-bold">
                  <Phone className="w-4 h-4 text-brand-gold" /> {SITE_CONFIG.supportPhone}
                </p>
              </div>
            </div>

            {/* Get Directions CTA */}
            <div className="pt-4 border-t border-amber-100">
              <a
                href={SITE_CONFIG.googleMapsCidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-brand-gold" /> Get Directions <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps (8 cols) */}
          <div className="lg:col-span-8 min-h-[350px] relative bg-gray-100">
            <iframe
              title="Indrani Paithani Yeola Location Map"
              src={SITE_CONFIG.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
