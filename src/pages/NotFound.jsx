import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  return (
    <div className="bg-brand-cream min-h-[75vh] flex items-center justify-center py-16 px-4">
      <SEO title="Page Not Found (404)" description="Page not found." />

      <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl shadow-luxury border border-amber-200 text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-brand-maroon rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <span className="font-serif font-bold text-5xl text-brand-maroon block">404</span>

        <h1 className="font-serif text-2xl font-bold text-brand-maroon">
          Looks like this page wandered off the loom.
        </h1>

        <p className="text-xs text-gray-600 max-w-xs mx-auto">
          The requested page address does not exist or has been moved to our handloom catalog.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-8 py-3.5 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-md transition-all"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};
