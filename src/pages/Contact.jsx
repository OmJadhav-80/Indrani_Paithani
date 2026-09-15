import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEO } from '../components/SEO';
import { useToast } from '../components/Toast';

export const Contact = () => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      addToast('Thank you! Your inquiry has been submitted to Indrani Paithani.', 'success', 'check');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1200);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contact Us & Store Locations" 
        description="Get in touch with Indrani Paithani. Visit our Yeola weaving cluster hub or Pune flagship store, or chat directly on WhatsApp."
        canonical="/contact"
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-maroon px-3 py-1 rounded-full">
            We Are Here To Help
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-maroon mt-3">
            Contact Indrani Paithani
          </h1>
          <p className="text-xs text-gray-600 mt-2">
            Have questions about saree silk purity, custom weaving, or shipping? Reach out to our customer care team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: STORE LOCATIONS & CONTACT INFO (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200 shadow-sm space-y-6">
              
              <h3 className="font-serif text-xl font-bold text-brand-maroon border-b border-amber-200 pb-3">
                Customer Care & Stores
              </h3>

              {/* Main Weaving Hub */}
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-amber-800 uppercase tracking-wider block">Main Weaving Cluster Hub</span>
                <div className="flex items-start gap-2.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-brand-maroon shrink-0 mt-0.5" />
                  <p>{SITE_CONFIG.storeAddress.hub}</p>
                </div>
              </div>

              {/* Flagship Store */}
              <div className="space-y-1.5 text-xs border-t border-gray-100 pt-4">
                <span className="font-bold text-amber-800 uppercase tracking-wider block">Flagship Boutique Store</span>
                <div className="flex items-start gap-2.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-brand-maroon shrink-0 mt-0.5" />
                  <p>{SITE_CONFIG.storeAddress.flagship}</p>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="space-y-3 text-xs border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Phone className="w-4 h-4 text-brand-maroon shrink-0" />
                  <span>{SITE_CONFIG.supportPhone} / {SITE_CONFIG.altPhone}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Mail className="w-4 h-4 text-brand-maroon shrink-0" />
                  <span>{SITE_CONFIG.supportEmail}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Clock className="w-4 h-4 text-brand-maroon shrink-0" />
                  <span>{SITE_CONFIG.businessHours}</span>
                </div>
              </div>

              {/* WhatsApp Direct CTA */}
              <div className="pt-2">
                <a
                  href={SITE_CONFIG.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300 fill-current" />
                  Chat Directly on WhatsApp
                </a>
              </div>

            </div>
          </div>

          {/* RIGHT: VALIDATED CONTACT FORM (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-amber-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-brand-maroon border-b border-amber-200 pb-3">
              Send Us a Message
            </h3>

            {success ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-serif font-bold text-lg text-emerald-900">Message Received!</h4>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out to Indrani Paithani. Our customer desk will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-brand-maroon text-brand-gold px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Indrani Kulkarni"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="indrani@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Mobile Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9823456789"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Message / Inquiry Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please specify saree title, custom color requests, or wedding order questions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  {isSubmitting ? 'Sending Message...' : 'Submit Inquiry'} <Send className="w-4 h-4 text-brand-gold" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
