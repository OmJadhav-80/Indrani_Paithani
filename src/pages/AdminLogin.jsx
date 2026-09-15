import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const AdminLogin = () => {
  const { adminLogin, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('owner@indranipaithani.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (user && user.role === 'OWNER') {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide owner email and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await adminLogin(email, password);
      if (res.success && res.user.role === 'OWNER') {
        navigate('/admin');
      } else {
        setError('Unauthorized credentials. Owner privilege required.');
      }
    } catch (err) {
      setError('Owner authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-maroon-dark min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Owner Portal Authentication" description="Owner login portal for Indrani Paithani." canonical="/admin/login" />

      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center">
          <img src="/indrani-official-logo.jpg" alt="Official Indrani Paithani Logo" className="w-20 h-20 rounded-full object-cover border-2 border-amber-400/80 shadow-luxury mx-auto mb-3" />
          <h1 className="font-serif text-3xl font-bold text-brand-gold">
            Indrani Paithani – Owner Portal
          </h1>
          <p className="text-xs text-amber-200/80 mt-1">
            Sign in to access boutique analytics, inventory, and order fulfillment.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-amber-200 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Owner Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Owner Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Authenticating Owner...' : 'Owner Login'} <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </form>

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs font-bold text-gray-500 hover:text-brand-maroon">
              ← Back to Customer Login
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-amber-200/60 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4 text-brand-gold" /> Protected Administrator Authorization Protocol
        </div>

      </div>
    </div>
  );
};
