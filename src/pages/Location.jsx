import React from 'react';
import { YeolaMap } from '../components/YeolaMap';
import { SEO } from '../components/SEO';

export const Location = () => {
  return (
    <div className="bg-brand-cream min-h-screen">
      <SEO
        title="Visit Us in Yeola"
        description="Visit the Indrani Paithani weaving cluster hub in Yeola, Maharashtra. Get directions via Google Maps."
        canonical="/location"
      />
      <YeolaMap />
    </div>
  );
};
