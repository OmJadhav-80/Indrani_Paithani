import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/SEO';

export const Register = () => {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await register(formData);
      if (res.success) {
        navigate('/account');
      } else {
        setErrors({ submit: res.message || 'Registration failed.' });
      }
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please check your credentials.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const mockGoogleProfile = {
        email: formData.email.trim() || `patron.${Date.now()}@gmail.com`,
        firstName: formData.firstName || 'Indrani',
        lastName: formData.lastName || 'Patron',
        googleId: 'goog_' + Date.now(),
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      };
      const res = await googleLogin(mockGoogleProfile);
      if (res.success) {
        navigate('/account');
      }
    } catch (err) {
      setErrors({ submit: 'Google registration failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-brand-maroon-dark">
      <SEO title="Create Account" description="Join Indrani Paithani Privilege Circle." canonical="/register" />

      {/* Floating Saree Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 filter blur-[0.5px]"
          style={{ backgroundImage: `url('/hero-paithani-bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-brand-maroon-dark/80 to-black/60" />
      </div>

      <div className="relative z-10 max-w-lg w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/80 p-8 sm:p-10 space-y-6">
        
        <div className="text-center">
          <img src="/logo.svg" alt="Indrani Paithani Logo" className="w-12 h-12 mx-auto mb-2" />
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-maroon">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Join Indrani Paithani to manage your orders, wishlist, and saved addresses.
          </p>
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-3 shadow-xs transition-all hover:border-gray-400"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 font-bold text-gray-400">OR REGISTER WITH EMAIL</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">First Name</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="First Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
              />
              {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Last Name</label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Last Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
              />
              {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
            />
            {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 9823456789"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min 6 chars"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
              />
              {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
              />
              {errors.confirmPassword && <p className="text-[10px] text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark py-3.5 rounded-xl font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Creating Account...' : 'CREATE ACCOUNT'}
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </button>
        </form>

        <div className="pt-4 border-t border-amber-200/60 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-brand-maroon hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
