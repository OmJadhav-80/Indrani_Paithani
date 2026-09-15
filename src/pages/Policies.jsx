import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, FileText, Truck, RefreshCw, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/siteConfig';

export const Policies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'privacy';

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const setTab = (tabName) => setSearchParams({ tab: tabName });

  const faqs = [
    {
      q: 'Are all Indrani Paithani sarees certified authentic?',
      a: 'Yes! Every handloom Paithani saree comes with an official Silk Mark tag issued by the Silk Mark Organisation of India guaranteeing 100% natural Mulberry silk purity.'
    },
    {
      q: 'How long does shipping take across India?',
      a: 'Express insured orders above ₹10,000 are delivered within 2-4 business days via Bluedart and Delhivery Air Express.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer a hassle-free 7-day exchange policy for unused sarees returned in their original packaging with Silk Mark tag intact.'
    },
    {
      q: 'Can I order custom color combinations for bridal Paithanis?',
      a: 'Yes! Our master weavers in Yeola accept custom bridal trough requests. Contact us on WhatsApp (+91 98234 56789) to discuss custom zari border motifs.'
    }
  ];

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Store Policies & FAQs" 
        description="Privacy policy, terms & conditions, express shipping details, 7-day return policy, and frequently asked questions for Indrani Paithani."
        canonical="/policies"
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon">
            Policies & Customer FAQs
          </h1>
          <p className="text-xs text-gray-600 mt-2">
            Transparency and customer trust remain at the heart of Indrani Paithani.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-amber-200 pb-4 text-xs font-bold">
          <button
            onClick={() => setTab('privacy')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'privacy' ? 'bg-brand-maroon text-brand-gold shadow-xs' : 'bg-white text-gray-700 hover:bg-amber-100/60'}`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setTab('terms')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'terms' ? 'bg-brand-maroon text-brand-gold shadow-xs' : 'bg-white text-gray-700 hover:bg-amber-100/60'}`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => setTab('shipping')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'shipping' ? 'bg-brand-maroon text-brand-gold shadow-xs' : 'bg-white text-gray-700 hover:bg-amber-100/60'}`}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => setTab('returns')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'returns' ? 'bg-brand-maroon text-brand-gold shadow-xs' : 'bg-white text-gray-700 hover:bg-amber-100/60'}`}
          >
            Returns & Refunds
          </button>
          <button
            onClick={() => setTab('faq')}
            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'faq' ? 'bg-brand-maroon text-brand-gold shadow-xs' : 'bg-white text-gray-700 hover:bg-amber-100/60'}`}
          >
            FAQ
          </button>
        </div>

        {/* Policy Content Card */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-sm text-xs text-gray-700 leading-relaxed space-y-4">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-maroon">Privacy Policy</h2>
              <p>Indrani Paithani respects your privacy. We store user information strictly for order fulfillment, delivery logistics, and opted-in tracking updates.</p>
              <p>Your personal details, address information, and payment authentication credentials are protected under 256-bit SSL encryption. We never sell or share customer data with third-party advertisers.</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-maroon">Terms & Conditions</h2>
              <p>By browsing or placing an order on Indrani Paithani, you agree to our terms of service. Every saree listed represents genuine handloom or pure silk craftsmanship.</p>
              <p>Because authentic handloom Paithani sarees are individually hand-spun by Yeola artisans, slight natural variations in zari weave threads or silk shading reflect genuine handloom artistry.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-maroon">Shipping & Transit Policy</h2>
              <p>We provide complimentary express shipping across India on all orders exceeding ₹10,000. Orders under ₹10,000 carry a nominal ₹350 flat shipping fee.</p>
              <p>All parcels are fully insured against transit damage and dispatched directly from our Yeola hub with real-time tracking via Bluedart and Delhivery.</p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-maroon">Returns, Refunds & Exchanges</h2>
              <p>We honor a 7-day hassle-free replacement guarantee for defective or mismatched items. Saree items must remain unwashed, unstitched, and in their original packaging with the Silk Mark tag intact.</p>
              <p>To initiate a return or exchange request, email support@indranipaithani.com or message our customer care team on WhatsApp (+91 98234 56789).</p>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-bold text-brand-maroon mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-amber-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-4 text-left font-bold text-brand-maroon flex justify-between items-center bg-amber-50/50 hover:bg-amber-100/50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {openFaqIndex === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-4 bg-white border-t border-amber-100 text-gray-700">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
