import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Award, Sparkles, MapPin, Settings, X, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const Login = () => {
  const { login, googleLogin, forgotPassword, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Google OAuth Config State
  const [googleClientId, setGoogleClientId] = useState(() => {
    return localStorage.getItem('indrani_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  });
  const [googleConfigModalOpen, setGoogleConfigModalOpen] = useState(false);
  const [inputClientId, setInputClientId] = useState(googleClientId);

  // Forgot & Reset Password Modal States
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [forgotResponseMessage, setForgotResponseMessage] = useState('');
  const [resetStep, setResetStep] = useState('request');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      if (user.role === 'OWNER' || user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const res = await login(email.trim(), password);
      if (res.success) {
        if (res.user?.role === 'OWNER' || res.user?.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/account');
        }
      } else {
        setError(res.message || 'Account not found. Please create an account first.');
      }
    } catch (err) {
      setError('Authentication failed. Please check your network and credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real Google OAuth Account Chooser Handler
  const handleGoogleSignIn = async () => {
    setError('');
    
    const activeClientId = googleClientId || localStorage.getItem('indrani_google_client_id') || import.meta.env.VITE_GOOGLE_CLIENT_ID;

    if (!activeClientId) {
      // Prompt user to enter their Google Cloud Console Client ID
      setInputClientId('');
      setGoogleConfigModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: activeClientId,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (response) => {
            if (response.error) {
              if (response.error === 'invalid_client') {
                setError('Error 401: invalid_client — The configured Google Client ID was not found in Google Cloud Console.');
                setGoogleConfigModalOpen(true);
              } else {
                setError('Google authentication was cancelled or failed.');
              }
              setIsSubmitting(false);
              return;
            }

            if (response.access_token) {
              try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                  headers: { Authorization: `Bearer ${response.access_token}` },
                }).then((res) => res.json());

                if (userInfo.email) {
                  const res = await googleLogin({
                    email: userInfo.email,
                    firstName: userInfo.given_name || (userInfo.name ? userInfo.name.split(' ')[0] : 'Indrani'),
                    lastName: userInfo.family_name || 'Customer',
                    googleId: userInfo.sub,
                    profilePhoto: userInfo.picture || '',
                  });

                  if (res.success) {
                    if (res.user?.role === 'OWNER' || res.user?.role === 'ADMIN') {
                      navigate('/admin');
                    } else {
                      navigate('/account');
                    }
                  } else {
                    setError(res.message || 'Google sign-in failed.');
                  }
                } else {
                  setError('Failed to retrieve user profile from Google.');
                }
              } catch (e) {
                setError('Failed to retrieve user profile from Google.');
              }
            }
            setIsSubmitting(false);
          },
        });

        tokenClient.requestAccessToken({ prompt: 'select_account' });
      } catch (err) {
        setError('Error 401: invalid_client — The configured Google Client ID is invalid.');
        setGoogleConfigModalOpen(true);
        setIsSubmitting(false);
      }
    } else {
      setError('Google Identity SDK is loading. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const handleSaveGoogleClientId = (e) => {
    e.preventDefault();
    const cleanId = inputClientId.trim();
    if (cleanId) {
      localStorage.setItem('indrani_google_client_id', cleanId);
      setGoogleClientId(cleanId);
      setGoogleConfigModalOpen(false);
      setError('');
      setTimeout(() => handleGoogleSignIn(), 300);
    }
  };

  // Request Password Reset
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    const res = await forgotPassword(resetEmail.trim());
    setForgotResponseMessage(res.message);
  };

  // Reset Password using Token
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetToken || !newPassword) return;
    const res = await resetPassword(resetToken, newPassword);
    if (res.success) {
      setResetSuccessMessage(res.message);
      setTimeout(() => {
        setForgotModalOpen(false);
        setResetStep('request');
        setResetSuccessMessage('');
      }, 2000);
    } else {
      setError(res.message || 'Password reset failed.');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-brand-maroon-dark">
      <SEO title="Sign In" description="Sign in to your Indrani Paithani account." canonical="/login" />

      {/* FLOATING PAITHANI SAREE BACKGROUND VISUAL */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 filter blur-[0.5px]"
          style={{ backgroundImage: `url('/hero-paithani-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-brand-maroon-dark/80 to-black/60" />
      </div>

      {/* MAIN TWO-COLUMN CONTAINER */}
      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT SIDE: "THE ART OF PAITHANI" HERITAGE PANEL */}
        <div className="lg:col-span-5 text-white space-y-6 bg-brand-maroon/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-brand-gold/40 shadow-2xl">
          <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-brand-gold/40">
            <Sparkles className="w-3.5 h-3.5" /> Traditional Heritage
          </div>

          <h2 className="font-serif text-3xl font-bold text-brand-gold">
            THE ART OF PAITHANI
          </h2>

          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Born from centuries of Indian weaving tradition, Paithani is celebrated for its intricate motifs, rich Mulberry silk texture and distinctive 24K zari craftsmanship.
          </p>

          <div className="pt-4 border-t border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-200">
            <MapPin className="w-4 h-4 text-brand-gold" />
            <span className="font-semibold">Handwoven in Yeola, Maharashtra</span>
          </div>

          <div className="p-4 bg-brand-maroon-dark/60 rounded-2xl border border-brand-gold/30 flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-gold shrink-0" />
            <div>
              <span className="font-bold text-xs text-white block">Silk Mark Authenticity</span>
              <span className="text-[10px] text-amber-200/80">Every saree carries verified 100% natural Mulberry silk purity tag.</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: AUTHENTICATION CARD */}
        <div className="lg:col-span-7 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/80 p-8 sm:p-12 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.svg" alt="Indrani Paithani Logo" className="w-10 h-10" />
              <span className="font-serif text-xl font-bold text-brand-maroon">INDRANI PAITHANI</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-maroon">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-600 mt-1">
              Sign in to manage your orders, wishlist, and saved delivery addresses.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 space-y-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-bold">{error}</span>
                </div>
                {error.includes('invalid_client') && (
                  <button
                    type="button"
                    onClick={() => setGoogleConfigModalOpen(true)}
                    className="text-[11px] font-bold text-brand-maroon underline block"
                  >
                    Click here to configure your Google OAuth Client ID →
                  </button>
                )}
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
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
              {isSubmitting ? 'Authenticating...' : 'LOGIN'}
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 font-bold text-gray-400">OR</span>
            </div>
          </div>

          {/* Real Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-3 shadow-xs transition-all hover:border-gray-400"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer Link to Register */}
          <div className="pt-4 border-t border-amber-200/60 text-center space-y-1">
            <p className="text-xs text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-brand-maroon hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link to="/admin/login" className="text-[11px] text-gray-400 hover:text-brand-maroon">
              Boutique Owner / Admin Portal →
            </Link>
          </div>

        </div>

      </div>

      {/* GOOGLE OAUTH CONFIGURATION MODAL */}
      {googleConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2 text-brand-maroon font-serif font-bold text-base">
                <Settings className="w-5 h-5 text-brand-gold" />
                <span>Configure Google OAuth Client ID</span>
              </div>
              <button onClick={() => setGoogleConfigModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <div className="space-y-3 text-gray-600 leading-relaxed">
              <p className="text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200 font-medium">
                To enable Google OAuth login, enter your registered <strong>OAuth 2.0 Client ID</strong> from the Google Cloud Console.
              </p>

              <form onSubmit={handleSaveGoogleClientId} className="space-y-3 pt-1">
                <div>
                  <label className="block font-bold text-gray-800 uppercase tracking-wider mb-1">
                    Google OAuth Client ID
                  </label>
                  <input
                    type="text"
                    required
                    value={inputClientId}
                    onChange={(e) => setInputClientId(e.target.value)}
                    placeholder="e.g. 123456789-abcdef.apps.googleusercontent.com"
                    className="w-full p-3 border border-gray-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setGoogleConfigModalOpen(false)}
                    className="flex-1 border py-2.5 rounded-xl font-bold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-brand-maroon text-brand-gold py-2.5 rounded-xl font-bold uppercase"
                  >
                    Save & Authenticate
                  </button>
                </div>
              </form>

              <div className="pt-3 border-t space-y-1 text-[11px]">
                <span className="font-bold text-gray-800">Setup Instructions for Google Cloud Console:</span>
                <ol className="list-decimal pl-4 space-y-1 text-gray-500">
                  <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-brand-maroon underline inline-flex items-center gap-0.5">Google Cloud Console Credentials <ExternalLink className="w-3 h-3" /></a></li>
                  <li>Click <strong>Create Credentials</strong> $\rightarrow$ <strong>OAuth client ID</strong> $\rightarrow$ Select <strong>Web application</strong></li>
                  <li>Add Authorized JavaScript origins: <code className="bg-gray-100 px-1 font-mono">http://localhost:3000</code>, <code className="bg-gray-100 px-1 font-mono">https://indrani-paithani-web.onrender.com</code></li>
                  <li>Copy your Client ID and paste it above!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FORGOT & RESET PASSWORD MODAL */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-center text-xs">
            <h3 className="font-serif font-bold text-lg text-brand-maroon">
              {resetStep === 'request' ? 'Forgot Password' : 'Reset Password'}
            </h3>

            {forgotResponseMessage ? (
              <div className="space-y-3 text-xs">
                <p className="text-emerald-800 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 leading-relaxed font-medium">
                  {forgotResponseMessage}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setResetStep('reset')}
                    className="flex-1 bg-amber-100 text-brand-maroon border border-amber-300 py-2 rounded-xl font-bold"
                  >
                    Enter Reset Token
                  </button>
                  <button
                    onClick={() => { setForgotModalOpen(false); setForgotResponseMessage(''); }}
                    className="flex-1 bg-brand-maroon text-brand-gold py-2 rounded-xl font-bold uppercase"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : resetStep === 'request' ? (
              <form onSubmit={handleForgotSubmit} className="space-y-3 text-xs text-left">
                <p className="text-gray-600">Enter your registered email address to receive password reset instructions.</p>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-gold"
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
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3 text-xs text-left">
                {resetSuccessMessage ? (
                  <p className="text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold text-center">
                    {resetSuccessMessage}
                  </p>
                ) : (
                  <>
                    <p className="text-gray-600">Enter your reset token and new password.</p>
                    <input
                      type="text"
                      required
                      placeholder="Reset Token"
                      value={resetToken}
                      onChange={(e) => setResetToken(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl"
                    />
                    <input
                      type="password"
                      required
                      placeholder="New Password (min 6 chars)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl"
                    />
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setResetStep('request')}
                        className="flex-1 border py-2.5 rounded-xl font-bold text-gray-600"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-brand-maroon text-brand-gold py-2.5 rounded-xl font-bold uppercase"
                      >
                        Save Password
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
