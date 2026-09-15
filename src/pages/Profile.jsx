import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  AlertCircle, 
  Clock, 
  FileText, 
  ExternalLink,
  Lock,
  X,
  Smartphone,
  Mail,
  Home,
  Briefcase,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { MOCK_ORDERS, MOCK_PRODUCTS, PINCODE_DATABASE } from '../data/mockData';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab State (personal, addresses, orders, wishlist, security)
  const activeTab = searchParams.get('tab') || 'personal';

  // Slide-Over Drawer States
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Profile Edit Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    altPhone: user?.altPhone || '',
    gender: user?.gender || 'Female',
    dob: user?.dob || '',
    anniversaryDate: user?.anniversaryDate || ''
  });

  // Address Form State
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    fullName: user ? `${user.firstName} ${user.lastName}` : '',
    phone: user?.phone || '',
    flat: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  if (!user) {
    return (
      <div className="bg-brand-cream min-h-screen py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-luxury border border-amber-200">
          <User className="w-16 h-16 text-brand-maroon mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-brand-maroon">Please Sign In</h2>
          <p className="text-xs text-gray-600 mt-2 mb-6">
            Log in to view your orders, manage saved addresses, and access your privilege account.
          </p>
          <button
            onClick={() => navigate('/register')}
            className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold text-xs uppercase"
          >
            Go to Login / Registration
          </button>
        </div>
      </div>
    );
  }

  // Handle Tab Switch
  const setTab = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  // Profile Drawer Handler
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditProfileOpen(false);
  };

  // Address CRUD Handlers
  const handleOpenAddressModal = (address = null) => {
    if (address) {
      setEditingAddressId(address.id);
      setAddressForm({
        label: address.label || 'Home',
        fullName: address.fullName,
        phone: address.phone,
        flat: address.flat,
        street: address.street,
        landmark: address.landmark || '',
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        isDefault: address.isDefault || false
      });
    } else {
      setEditingAddressId(null);
      setAddressForm({
        label: 'Home',
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone || '',
        flat: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: user.addresses.length === 0
      });
    }
    setAddressModalOpen(true);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      editAddress(editingAddressId, addressForm);
    } else {
      addAddress(addressForm);
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

  // Invoice Download Handler
  const handleDownloadInvoice = (order) => {
    const content = `INDRANI PAITHANI - TAX INVOICE\nOrder ID: ${order.id}\nDate: ${order.date}\nCustomer: ${user.firstName} ${user.lastName}\nTotal Amount: ₹${order.totalAmount}\nStatus: ${order.status}\n\nThank you for shopping authentic handloom sarees with Indrani Paithani.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword === passwordForm.confirmPassword && passwordForm.newPassword.length >= 6) {
      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 4000);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Profile Banner */}
        <div className="bg-brand-maroon text-white rounded-2xl p-6 sm:p-8 shadow-luxury mb-8 border border-brand-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-maroon flex items-center justify-center font-serif font-bold text-2xl border-2 border-white shadow-md">
              {user.firstName[0]}
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xs text-amber-200/90 mt-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="bg-white/10 hover:bg-white/20 text-brand-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-amber-400/30"
          >
            <LogOut className="w-4 h-4" /> Logout Session
          </button>
        </div>

        {/* Tabbed Navigation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT: TAB NAVIGATION PANEL (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-amber-200 shadow-sm space-y-1">
              
              <button
                onClick={() => setTab('personal')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'personal' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <User className="w-4 h-4" /> Personal Profile
              </button>

              <button
                onClick={() => setTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'addresses' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <MapPin className="w-4 h-4" /> Saved Addresses ({user.addresses?.length || 0})
              </button>

              <button
                onClick={() => setTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'orders' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Package className="w-4 h-4" /> Order History ("My Orders")
              </button>

              <button
                onClick={() => setTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'wishlist' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
              </button>

              <button
                onClick={() => setTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'security' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Account Security
              </button>

            </div>
          </div>

          {/* RIGHT: TAB CONTENT PANEL (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-sm">
            
            {/* TAB 1: PERSONAL PROFILE */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-maroon">Personal Profile</h3>
                    <p className="text-xs text-gray-500">Manage your contact details and verification status.</p>
                  </div>
                  <button
                    onClick={() => setEditProfileOpen(true)}
                    className="bg-amber-100 text-brand-maroon px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-200 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                </div>

                {/* Profile Information Table */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Full Name</span>
                    <span className="font-bold text-brand-maroon text-sm mt-1 block">{user.firstName} {user.lastName}</span>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Email Verification Status</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-800">{user.email}</span>
                      {user.emailVerified ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Unverified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Mobile Phone Status</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-gray-800">{user.phone}</span>
                      {user.phoneVerified ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Unverified
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Alternate Phone</span>
                    <span className="font-bold text-gray-800 text-sm mt-1 block">{user.altPhone || 'Not provided'}</span>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Gender</span>
                    <span className="font-bold text-gray-800 text-sm mt-1 block">{user.gender}</span>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <span className="text-gray-500 font-medium block">Date of Birth / Anniversary</span>
                    <span className="font-bold text-gray-800 text-sm mt-1 block">
                      DOB: {user.dob || 'N/A'} {user.anniversaryDate ? `| Anniversary: ${user.anniversaryDate}` : ''}
                    </span>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-amber-100/40 p-4 rounded-xl space-y-2">
                  <h4 className="font-serif text-sm font-bold text-brand-maroon">Communication Preferences</h4>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> WhatsApp Tracking Updates
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Festive Drop Notifications
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SAVED ADDRESSES CRUD */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-maroon">Saved Addresses</h3>
                    <p className="text-xs text-gray-500">Manage delivery locations and set default address.</p>
                  </div>
                  <button
                    onClick={() => handleOpenAddressModal()}
                    className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-brand-maroon-dark transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>
                </div>

                {/* Address Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        addr.isDefault 
                          ? 'border-brand-gold bg-amber-50/80 shadow-md ring-1 ring-amber-300' 
                          : 'border-gray-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        {/* Label Badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-maroon text-brand-gold">
                            {addr.label === 'Home' && <Home className="w-3 h-3" />}
                            {addr.label === 'Work' && <Briefcase className="w-3 h-3" />}
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                              Default Address
                            </span>
                          )}
                        </div>

                        <h5 className="font-bold text-xs text-brand-maroon">{addr.fullName}</h5>
                        <p className="text-xs text-gray-600 mt-1">{addr.flat}, {addr.street}</p>
                        {addr.landmark && <p className="text-xs text-gray-500">Landmark: {addr.landmark}</p>}
                        <p className="text-xs font-bold text-gray-800 mt-1">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Phone: {addr.phone}</p>
                      </div>

                      {/* Address Card Actions */}
                      <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
                        {!addr.isDefault && (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-amber-800 font-bold hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <div className="flex items-center gap-3 ml-auto">
                          <button
                            onClick={() => handleOpenAddressModal(addr)}
                            className="text-gray-600 hover:text-brand-maroon font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">Order History ("My Orders")</h3>
                  <p className="text-xs text-gray-500">View real-time status, tracking links, and tax invoices.</p>
                </div>

                <div className="space-y-6">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="border border-amber-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                      
                      {/* Order Header */}
                      <div className="bg-amber-50/80 p-4 border-b border-amber-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-brand-maroon font-serif text-sm">Order #{order.id}</span>
                          <span className="text-gray-500 block">Placed on: {order.date}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {/* Status Tag */}
                          <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>

                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="bg-white border border-amber-300 text-brand-maroon px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 hover:bg-amber-100 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" /> Download Invoice
                          </button>
                        </div>
                      </div>

                      {/* Order Body Items */}
                      <div className="p-4 space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4 items-center">
                            <img src={item.image} alt={item.title} className="w-16 h-20 object-cover rounded-lg border border-amber-100" />
                            <div className="flex-1 text-xs">
                              <h5 className="font-serif font-bold text-brand-maroon">{item.title}</h5>
                              <p className="text-gray-500">Color: {item.color} | Qty: {item.quantity}</p>
                              <span className="font-bold text-brand-maroon mt-1 block">
                                ₹{item.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Tracking Footer */}
                      <div className="bg-gray-50 p-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <div className="text-gray-600">
                          Courier: <span className="font-bold text-gray-800">{order.courier}</span> ({order.trackingNumber})
                        </div>
                        <a
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-maroon font-bold flex items-center gap-1 hover:underline"
                        >
                          Track Package <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST & QUICK BAG */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">My Saved Wishlist ({wishlist.length})</h3>
                  <p className="text-xs text-gray-500">Quickly move saved sarees into your shopping cart.</p>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto text-amber-300 mb-3" />
                    <p className="text-sm font-semibold">Your Wishlist is Empty</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                      <div key={product.id} className="border border-amber-200 rounded-xl p-3 flex gap-3 items-center bg-white">
                        <img src={product.images[0]} alt={product.title} className="w-20 h-24 object-cover rounded-lg" />
                        <div className="flex-1 text-xs space-y-1">
                          <h5 className="font-serif font-bold text-brand-maroon line-clamp-1">{product.title}</h5>
                          <span className="font-bold text-brand-maroon text-sm block">₹{product.price.toLocaleString('en-IN')}</span>
                          <div className="flex gap-2 pt-1">
                            <button
                              onClick={() => addToCart(product, 1)}
                              className="bg-brand-maroon text-brand-gold px-3 py-1.5 rounded-lg font-bold text-[11px]"
                            >
                              Add to Bag
                            </button>
                            <button
                              onClick={() => toggleWishlist(product)}
                              className="text-red-600 hover:text-red-800 text-[11px] font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: ACCOUNT SECURITY */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">Account Security</h3>
                  <p className="text-xs text-gray-500">Update password and manage active sessions.</p>
                </div>

                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Password updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-maroon text-brand-gold px-6 py-3 rounded-xl font-bold uppercase tracking-wider"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ADDRESS MODAL DRAWER */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-serif font-bold text-lg text-brand-maroon">
                {editingAddressId ? 'Edit Delivery Address' : 'Add New Address'}
              </h4>
              <button onClick={() => setAddressModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-4 text-xs">
              <div className="flex gap-2">
                {['Home', 'Work', 'Other'].map(lbl => (
                  <button
                    key={lbl}
                    type="button"
                    onClick={() => setAddressForm({ ...addressForm, label: lbl })}
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      addressForm.label === lbl ? 'bg-brand-maroon text-brand-gold' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Full Name"
                required
                value={addressForm.fullName}
                onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl"
              />

              <input
                type="text"
                placeholder="Flat / Building Name"
                required
                value={addressForm.flat}
                onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl"
              />

              <input
                type="text"
                placeholder="Street / Area Name"
                required
                value={addressForm.street}
                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Pincode"
                  required
                  maxLength={6}
                  value={addressForm.pincode}
                  onChange={handleAddressPincode}
                  className="w-full px-3.5 py-2 border rounded-xl"
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full px-3.5 py-2 border rounded-xl bg-gray-50"
                />
              </div>

              <input
                type="text"
                placeholder="State"
                required
                value={addressForm.state}
                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                className="w-full px-3.5 py-2 border rounded-xl bg-gray-50"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="accent-brand-maroon"
                />
                <span>Set as default shipping address</span>
              </label>

              <button
                type="submit"
                className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
