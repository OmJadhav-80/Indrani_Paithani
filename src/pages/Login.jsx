import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Award, Sparkles, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // If already logged in, redirect based on role
  React.useEffect(() => {
    if (user) {
      if (user.role === 'OWNER') navigate('/admin');
      else navigate('/account');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password) {
      setError('Please enter both email/mobile number and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await login(emailOrPhone, password);
      if (res.success) {
        if (res.user?.role === 'OWNER') {
          navigate('/admin');
        } else {
          navigate('/account');
        }
      } else {
        setError(res.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-maroon-dark">
      <SEO title="Sign In" description="Sign in to your Indrani Paithani account to manage orders, wishlist, and saved addresses." canonical="/login" />

      {/* FLOATING PAITHANI SAREE BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Radial Glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand-gold/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/20 rounded-full blur-3xl" />

        {/* Slow Floating Paithani Saree Graphic */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 1.5, 0, -1.5, 0]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 -left-10 w-[600px] h-[700px] opacity-25 mix-blend-screen"
        >
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200"
            alt="Floating Paithani Silk Texture"
            className="w-full h-full object-cover rounded-3xl filter blur-[1px]"
          />
        </motion.div>
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT SIDE: "THE ART OF PAITHANI" HERITAGE PANEL (5 cols) */}
        <div className="lg:col-span-5 text-white space-y-6 bg-brand-maroon/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-brand-gold/40 shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-gold/40">
            <Sparkles className="w-3.5 h-3.5" /> Traditional Heritage
          </div>

          <h2 className="font-serif text-3xl font-bold text-brand-gold">
            THE ART OF PAITHANI
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Born from centuries of Indian weaving tradition, Paithani is celebrated for its intricate motifs, rich silk texture and distinctive zari craftsmanship.
          </p>

          <div className="pt-4 border-t border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-200">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span className="font-semibold">From Yeola, Maharashtra</span>
          </div>

          <div className="p-4 bg-brand-maroon-dark/60 rounded-2xl border border-brand-gold/30 flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-gold shrink-0" />
            <div>
              <span className="font-bold text-xs text-white block">Silk Mark Authenticity</span>
              <span className="text-[10px] text-amber-200/80">Every saree carries verified 100% natural Mulberry silk purity.</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AUTHENTICATION CARD (7 cols) */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/80 p-8 sm:p-12 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.svg" alt="Indrani Paithani Logo" className="w-10 h-10" />
              <span className="font-serif text-xl font-bold text-brand-maroon">INDRANI PAITHANI</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-maroon">
              Welcome to Indrani Paithani
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Sign in to continue your journey through timeless craftsmanship.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="indrani@example.com or +91 7507755836"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-maroon"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-bold text-gray-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] font-bold text-brand-maroon hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-maroon"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-400 hover:text-brand-maroon"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-brand-maroon rounded"
                />
                <span className="text-gray-600 font-medium">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </form>

          {/* Footer Link to Register */}
          <div className="pt-4 border-t border-amber-200/60 text-center space-y-2">
            <p className="text-xs text-gray-500">
              New to Indrani Paithani?
            </p>
            <Link
              to="/register"
              className="inline-block font-bold text-brand-maroon hover:underline text-xs"
            >
              Create Account
            </Link>
          </div>

          <div className="text-center pt-2">
            <Link to="/admin/login" className="text-[11px] text-gray-400 hover:text-brand-maroon">
              Boutique Owner / Admin Login Portal →
            </Link>
          </div>

        </div>

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-center">
            <h3 className="font-serif font-bold text-lg text-brand-maroon">Reset Password</h3>
            {resetEmailSent ? (
              <div className="space-y-3 text-xs">
                <p className="text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  Password reset link sent to your registered email or mobile number!
                </p>
                <button
                  onClick={() => { setForgotModalOpen(false); setResetEmailSent(false); }}
                  className="bg-brand-maroon text-brand-gold px-6 py-2 rounded-xl font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setResetEmailSent(true); }} className="space-y-3 text-xs text-left">
                <p className="text-gray-600">Enter your registered email address or mobile number to receive password reset instructions.</p>
                <input
                  type="text"
                  required
                  placeholder="indrani@example.com or +91 7507755836"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 border py-2.5 rounded-xl font-bold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-brand-maroon text-brand-gold py-2.5 rounded-xl font-bold uppercase"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
