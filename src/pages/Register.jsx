import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PINCODE_DATABASE } from '../data/mockData';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form Field State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    gender: 'Female',
    dob: '',
    anniversaryDate: '',
    password: '',
    confirmPassword: '',
    // Initial Delivery Address
    address: {
      flat: '',
      street: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      country: 'India'
    },
    // Preferences
    whatsappUpdates: true,
    promotionalOffers: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatic City/State lookup on Pincode Change
  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, pincode: val }
    }));

    if (val.length === 6) {
      const match = PINCODE_DATABASE[val];
      if (match) {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: match.city,
            state: match.state
          }
        }));
        setErrors((prev) => ({ ...prev, pincode: null }));
      } else {
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: prev.address.city || 'Nashik',
            state: prev.address.state || 'Maharashtra'
          }
        }));
      }
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile phone is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    // Address validation
    if (!formData.address.flat.trim()) newErrors.flat = 'Flat / House No. is required.';
    if (!formData.address.street.trim()) newErrors.street = 'Street / Area name is required.';
    if (!formData.address.pincode || formData.address.pincode.length !== 6) {
      newErrors.pincode = 'Valid 6-digit Pincode is required.';
    }
    if (!formData.address.city.trim()) newErrors.city = 'City is required.';
    if (!formData.address.state.trim()) newErrors.state = 'State is required.';

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
        navigate('/profile');
      }
    } catch (err) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Registration Header */}
        <div className="text-center mb-8">
          <img src="/logo.svg" alt="Indrani Paithani" className="w-16 h-16 mx-auto mb-3" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon">
            Join the Indrani Paithani Privilege Circle
          </h1>
          <p className="text-xs text-amber-900/80 mt-2 max-w-md mx-auto">
            Create your luxury customer account to enjoy personalized recommendations, saved addresses, exclusive festive offer previews, and seamless order tracking.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="bg-white rounded-2xl shadow-luxury border border-amber-200/80 p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* SECTION 1: PERSONAL DETAILS */}
            <div>
              <div className="flex items-center gap-2 border-b border-amber-200 pb-3 mb-6">
                <User className="w-5 h-5 text-brand-gold" />
                <h2 className="font-serif text-xl font-bold text-brand-maroon">1. Personal Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. Indrani"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Kulkarni"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.lastName && <p className="text-[11px] text-red-500 mt-1">{errors.lastName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="indrani@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Mobile Phone (+91) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                      placeholder="9823456789"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                        errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Alternate Phone */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Alternate Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={formData.altPhone}
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value.replace(/\D/g, '') })}
                    placeholder="Secondary contact number"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-white"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>Date of Birth</span>
                    <span className="text-[10px] text-brand-gold font-normal">🎁 Festive Gift Eligible</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>
                </div>

                {/* Anniversary Date */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Anniversary Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.anniversaryDate}
                    onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 2: INITIAL DELIVERY ADDRESS */}
            <div>
              <div className="flex items-center gap-2 border-b border-amber-200 pb-3 mb-6">
                <MapPin className="w-5 h-5 text-brand-gold" />
                <h2 className="font-serif text-xl font-bold text-brand-maroon">2. Initial Delivery Address</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Flat / House No */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Flat / House No. / Building Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.flat}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, flat: e.target.value }
                    })}
                    placeholder="Flat 402, Royal Palms Apartments"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.flat ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.flat && <p className="text-[11px] text-red-500 mt-1">{errors.flat}</p>}
                </div>

                {/* Street / Area */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Street / Area Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value }
                    })}
                    placeholder="FC Road, Shivaji Nagar"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.street ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.street && <p className="text-[11px] text-red-500 mt-1">{errors.street}</p>}
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.address.landmark}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, landmark: e.target.value }
                    })}
                    placeholder="Near Goodluck Cafe"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>

                {/* Pincode with Auto Lookup */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex justify-between">
                    <span>Pincode <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-emerald-700 font-normal">Auto City Lookup</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.address.pincode}
                    onChange={handlePincodeChange}
                    placeholder="411004"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.pincode ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.pincode && <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value }
                    })}
                    placeholder="Pune"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-gray-50"
                  />
                  {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value }
                    })}
                    placeholder="Maharashtra"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold bg-gray-50"
                  />
                  {errors.state && <p className="text-[11px] text-red-500 mt-1">{errors.state}</p>}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 bg-gray-100 text-gray-600 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 3: ACCOUNT SECURITY & PREFERENCES */}
            <div>
              <div className="flex items-center gap-2 border-b border-amber-200 pb-3 mb-6">
                <Lock className="w-5 h-5 text-brand-gold" />
                <h2 className="font-serif text-xl font-bold text-brand-maroon">3. Security & Communication</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Re-enter password"
                    className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:outline-none ${
                      errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:ring-2 focus:ring-brand-gold'
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Communication Checkboxes */}
              <div className="space-y-3 bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.whatsappUpdates}
                    onChange={(e) => setFormData({ ...formData, whatsappUpdates: e.target.checked })}
                    className="w-4 h-4 accent-brand-maroon rounded"
                  />
                  <span className="text-xs font-medium text-gray-800">
                    Receive instant order tracking alerts and dispatch updates via WhatsApp
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.promotionalOffers}
                    onChange={(e) => setFormData({ ...formData, promotionalOffers: e.target.checked })}
                    className="w-4 h-4 accent-brand-maroon rounded"
                  />
                  <span className="text-xs font-medium text-gray-800">
                    Receive VIP invites to private Yeola handloom saree drops and festive sales
                  </span>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                Already have an Indrani Paithani account?{' '}
                <Link to="/profile" className="font-bold text-brand-maroon hover:underline">
                  Sign In Here
                </Link>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Creating Privilege Account...' : 'Complete Registration'}
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
