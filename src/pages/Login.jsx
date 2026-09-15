import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/profile');
      } else {
        setError(res.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetEmailSent(true);
  };

  return (
    <div className="bg-brand-cream min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="Indrani Paithani Logo" className="w-16 h-16 mx-auto mb-3 drop-shadow" />
          <h1 className="font-serif text-3xl font-bold text-brand-maroon">
            Welcome Back to Indrani Paithani
          </h1>
          <p className="text-xs text-amber-900/80 mt-2">
            Sign in to access your saved addresses, track live orders, and view your privilege account.
          </p>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-2xl shadow-luxury border border-amber-200/80 p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Error Banner */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="indrani@example.com"
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-maroon"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
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
                  className="w-full pl-10 pr-10 py-3 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-maroon"
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

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-brand-maroon rounded"
                />
                <span className="text-gray-600 font-medium">Remember this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Account'}
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </form>

          {/* Create Account Divider */}
          <div className="pt-4 border-t border-amber-200/60 text-center space-y-3">
            <p className="text-xs text-gray-500">
              Don't have an Indrani Paithani privilege account yet?
            </p>
            <Link
              to="/register"
              className="block w-full border border-brand-maroon text-brand-maroon hover:bg-amber-50 py-3 rounded-xl font-bold text-xs uppercase transition-colors"
            >
              Create New Account
            </Link>
          </div>
        </div>

        {/* Bottom Trust Note */}
        <div className="text-center mt-6 text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>256-bit SSL Encrypted Secure Session</span>
        </div>

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-center">
            <h3 className="font-serif font-bold text-lg text-brand-maroon">Reset Password</h3>
            {resetEmailSent ? (
              <div className="space-y-3">
                <p className="text-xs text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  Password reset link sent to your registered email address!
                </p>
                <button
                  onClick={() => { setForgotModalOpen(false); setResetEmailSent(false); }}
                  className="bg-brand-maroon text-brand-gold px-6 py-2 rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3 text-xs text-left">
                <p className="text-gray-600">Enter your registered email address to receive password reset instructions.</p>
                <input
                  type="email"
                  required
                  placeholder="indrani@example.com"
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
