import React from 'react';
import { ShieldCheck, Phone, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';

export const AnnouncementBar = () => {
  return (
    <div className="bg-brand-maroon text-brand-gold text-xs py-2 px-4 text-center font-medium flex items-center justify-between border-b border-brand-gold/30">
      <div className="hidden sm:flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold shrink-0" />
        <span className="font-semibold text-white">100% Authentic Silk Mark Certified</span>
      </div>
      
      <div className="flex-1 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-brand-gold hidden md:inline" />
        <p className="truncate">
          {SITE_CONFIG.announcement.text} | <span className="font-semibold text-white">{SITE_CONFIG.announcement.offerText}</span>
        </p>
      </div>

      <div className="hidden md:flex items-center gap-2 text-amber-200/90 hover:text-white shrink-0">
        <Phone className="w-3 h-3 text-brand-gold" />
        <span>Help: <a href={`tel:${SITE_CONFIG.supportPhone}`} className="underline font-semibold">{SITE_CONFIG.supportPhone}</a></span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
