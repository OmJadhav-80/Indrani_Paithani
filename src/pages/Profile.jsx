import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  X,
  Mail,
  Phone,
  Calendar,
  Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { MOCK_ORDERS, MOCK_PRODUCTS, PINCODE_DATABASE } from '../data/mockData';
import { SEO } from '../components/SEO';

export const Profile = () => {
  const { 
    user, 
    updateProfile, 
    addAddress, 
    editAddress, 
    deleteAddress, 
    setDefaultAddress, 
    logout 
  } = useAuth();
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = searchParams.get('tab') || 'personal';

  // Profile Edit Drawer State
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    profilePhoto: user?.profilePhoto || ''
  });

  // Photo Upload Preview State
  const [photoPreview, setPhotoPreview] = useState(user?.profilePhoto || '');

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    addressType: 'Home',
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    phone: user?.phone || '',
    flat: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false
  });

  if (!user) {
    return (
      <div className="bg-brand-cream min-h-screen py-20 px-4 text-center">
        <SEO title="My Account" canonical="/profile" />
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-luxury border border-amber-200 space-y-4">
          <User className="w-16 h-16 text-brand-maroon mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-brand-maroon">Please Sign In</h2>
          <p className="text-xs text-gray-600">
            Log in to view your profile, manage addresses, orders, and wishlist.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold text-xs uppercase"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const setTab = (tabName) => setSearchParams({ tab: tabName });

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        addToast('File size must be under 5MB.', 'error', 'alert');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setProfileForm((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    const res = await updateProfile(profileForm);
    if (res.success) {
      addToast('Profile updated successfully!', 'success', 'check');
      setEditProfileOpen(false);
    }
  };

  const handleOpenAddressModal = (address = null) => {
    if (address) {
      setEditingAddressId(address.id || address._id);
      setAddressForm({
        addressType: address.addressType || address.label || 'Home',
        fullName: address.fullName,
        phone: address.phone,
        flat: address.flat,
        street: address.street,
        landmark: address.landmark || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country || 'India',
        isDefault: address.isDefault || false
      });
    } else {
      setEditingAddressId(null);
      setAddressForm({
        addressType: 'Home',
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone || '',
        flat: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        isDefault: (user.addresses || []).length === 0
      });
    }
    setAddressModalOpen(true);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (editingAddressId) {
      await editAddress(editingAddressId, addressForm);
      addToast('Address updated successfully!', 'success', 'check');
    } else {
      await addAddress(addressForm);
      addToast('Address added to your address book!', 'success', 'check');
    }
    setAddressModalOpen(false);
  };

  const handleAddressPincode = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setAddressForm((prev) => ({ ...prev, pincode: val }));
    if (val.length === 6 && PINCODE_DATABASE[val]) {
      setAddressForm((prev) => ({
        ...prev,
        city: PINCODE_DATABASE[val].city,
        state: PINCODE_DATABASE[val].state
      }));
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <SEO title={`My Account - ${user.firstName} ${user.lastName}`} canonical="/profile" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* User Account Banner */}
        <div className="bg-brand-maroon text-white rounded-3xl p-6 sm:p-8 shadow-luxury border border-brand-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative">
              {user.profilePhoto ? (
                <img src={user.profilePhoto} alt={user.firstName} className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold shadow-md" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-maroon flex items-center justify-center font-serif font-bold text-2xl border-2 border-white shadow-md">
                  {user.firstName[0]}
                </div>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/20 px-3 py-0.5 rounded-full border border-brand-gold/30">
                {user.role || 'CUSTOMER'}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xs text-amber-200/90 mt-0.5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {user.email} | Provider: <span className="uppercase font-bold text-brand-gold">{user.authProvider || 'Email'}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setProfileForm({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  phone: user.phone || '',
                  profilePhoto: user.profilePhoto || ''
                });
                setPhotoPreview(user.profilePhoto || '');
                setEditProfileOpen(true);
              }}
              className="bg-brand-gold text-brand-maroon px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-300 transition-colors shadow-xs"
            >
              <Edit3 className="w-4 h-4" /> Edit Profile
            </button>

            <button
              onClick={() => { logout(); navigate('/'); }}
              className="bg-white/10 hover:bg-white/20 text-brand-gold px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-amber-400/30"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Side Navigation */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-amber-200 shadow-sm space-y-1 text-xs font-bold">
              
              <button onClick={() => setTab('personal')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'personal' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <User className="w-4 h-4" /> Personal Profile
              </button>

              <button onClick={() => setTab('addresses')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'addresses' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <MapPin className="w-4 h-4" /> My Addresses ({(user.addresses || []).length})
              </button>

              <button onClick={() => setTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <Package className="w-4 h-4" /> My Orders ({MOCK_ORDERS.length})
              </button>

              <button onClick={() => setTab('wishlist')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'wishlist' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
              </button>

            </div>
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            
            {/* PERSONAL INFORMATION TAB (Section 4 & 5) */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Profile</h2>
                    <p className="text-xs text-gray-500">Authenticated user details stored in database persistence.</p>
                  </div>
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                </div>

                {/* Personal & Account Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">User ID</span>
                    <span className="font-mono text-brand-maroon font-bold block">{user._id || user.id}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Full Name</span>
                    <span className="font-bold text-brand-maroon block text-sm">{user.firstName} {user.lastName}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Email Address (Identity)</span>
                    <span className="font-bold text-gray-800 block">{user.email}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Phone Number</span>
                    <span className="font-bold text-gray-800 block">{user.phone || 'Not provided'}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Authentication Provider</span>
                    <span className="font-bold text-brand-maroon uppercase block">{user.authProvider || 'email'}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Account Status</span>
                    <span className="font-bold text-emerald-700 block">{user.accountStatus || 'Active'}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Role</span>
                    <span className="font-bold text-brand-maroon block">{user.role || 'CUSTOMER'}</span>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
                    <span className="text-gray-500 uppercase font-bold text-[10px]">Last Login Date</span>
                    <span className="font-bold text-gray-700 block">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Just now'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESS MANAGEMENT TAB (Section 6) */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Addresses</h2>
                    <p className="text-xs text-gray-500">Manage saved shipping addresses linked to your user ID.</p>
                  </div>
                  <button
                    onClick={() => handleOpenAddressModal()}
                    className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(user.addresses || []).map((addr) => (
                    <div key={addr.id || addr._id} className={`p-5 rounded-2xl border text-xs flex flex-col justify-between ${
                      addr.isDefault ? 'border-brand-gold bg-amber-50 shadow-xs' : 'border-gray-200 bg-white'
                    }`}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="bg-brand-maroon text-brand-gold px-3 py-0.5 rounded-full font-bold text-[10px]">
                            {addr.addressType || addr.label || 'Home'}
                          </span>
                          {addr.isDefault && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <h5 className="font-bold text-brand-maroon">{addr.fullName}</h5>
                        <p className="text-gray-600 mt-1">{addr.flat}, {addr.street}</p>
                        {addr.landmark && <p className="text-gray-500">Landmark: {addr.landmark}</p>}
                        <p className="font-bold text-gray-800 mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-gray-500 mt-1">Phone: {addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t flex justify-between items-center text-[11px]">
                        {!addr.isDefault && (
                          <button onClick={() => setDefaultAddress(addr.id || addr._id)} className="text-amber-800 font-bold hover:underline">
                            Set as Default
                          </button>
                        )}
                        <div className="flex gap-3 ml-auto">
                          <button onClick={() => handleOpenAddressModal(addr)} className="text-gray-600 hover:text-brand-maroon font-bold">Edit</button>
                          <button onClick={() => deleteAddress(addr.id || addr._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Orders</h2>
                </div>

                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="border border-amber-200 rounded-2xl p-4 text-xs space-y-3">
                      <div className="flex justify-between font-bold text-brand-maroon">
                        <span>Order #{order.id} - Total: ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-0.5 rounded-full">{order.status}</span>
                      </div>
                      <p className="text-gray-500">Date: {order.date} | Courier: {order.courier} ({order.trackingNumber})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Wishlist ({wishlist.length})</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                    <div key={product.id} className="border border-amber-200 rounded-xl p-3 flex gap-3 items-center text-xs">
                      <img src={product.images[0]} alt={product.title} className="w-16 h-20 object-cover rounded-lg" />
                      <div className="flex-1 space-y-1">
                        <h5 className="font-serif font-bold text-brand-maroon">{product.title}</h5>
                        <span className="font-bold text-brand-maroon">₹{product.price.toLocaleString('en-IN')}</span>
                        <div className="flex gap-2 pt-1">
                          <button onClick={() => addToCart(product, 1)} className="bg-brand-maroon text-brand-gold px-3 py-1 rounded-lg font-bold">Add to Bag</button>
                          <button onClick={() => toggleWishlist(product)} className="text-red-600 font-semibold">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* EDIT PROFILE DRAWER (Section 5) */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-serif font-bold text-lg text-brand-maroon">Edit Profile</h4>
              <button onClick={() => setEditProfileOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              {/* Profile Photo Upload / Preview (Section 13) */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-maroon flex items-center justify-center font-serif font-bold text-xl">
                      {user.firstName[0]}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <label className="block font-bold text-gray-700">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    className="w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-brand-maroon"
                  />
                  <span className="text-[10px] text-gray-400">Max size 5MB. Accepts PNG, JPG.</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.firstName}
                  onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.lastName}
                  onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email (Authentication Identity)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2.5 border rounded-xl bg-gray-100 text-gray-500 font-semibold cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="+91 9823456789"
                  className="w-full px-3.5 py-2.5 border rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase tracking-wider shadow-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADDRESS MODAL DRAWER (Section 6) */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-serif font-bold text-lg text-brand-maroon">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h4>
              <button onClick={() => setAddressModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-3">
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAddressForm({ ...addressForm, addressType: type })}
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      addressForm.addressType === type ? 'bg-brand-maroon text-brand-gold' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <input type="text" placeholder="Full Name" required value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="tel" placeholder="Phone Number" required value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="Address Line 1 (Flat/House No)" required value={addressForm.flat} onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="Address Line 2 (Street/Area)" required value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="Landmark (Optional)" value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} className="w-full p-2.5 border rounded-xl" />

              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="PIN Code" required maxLength={6} value={addressForm.pincode} onChange={handleAddressPincode} className="w-full p-2.5 border rounded-xl" />
                <input type="text" placeholder="City" required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full p-2.5 border rounded-xl bg-gray-50" />
              </div>

              <input type="text" placeholder="State" required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full p-2.5 border rounded-xl bg-gray-50" />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="accent-brand-maroon"
                />
                <span>Set as default shipping address</span>
              </label>

              <button type="submit" className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase">
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
