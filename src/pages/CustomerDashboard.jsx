import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  LogOut, 
  ShoppingBag, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  ExternalLink,
  MessageCircle,
  X,
  ChevronRight,
  AlertCircle,
  Send
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { MOCK_ORDERS, MOCK_PRODUCTS, PINCODE_DATABASE } from '../data/mockData';
import { SEO } from '../components/SEO';

export const CustomerDashboard = () => {
  const { user, updateProfile, addAddress, editAddress, deleteAddress, setDefaultAddress, logout } = useAuth();
  const { wishlist, toggleWishlist, addToCart, cartItems } = useCart();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab State: overview, orders, track, wishlist, addresses, profile, support
  const activeTab = searchParams.get('tab') || 'overview';
  const selectedOrderId = searchParams.get('orderId');

  // Address Modal State
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
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

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    altPhone: user?.altPhone || '',
    gender: user?.gender || 'Female'
  });

  // Support Enquiry Form State
  const [enquiryForm, setEnquiryForm] = useState({ type: 'General', message: '' });
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Redirect if logged out or if user is OWNER
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'OWNER') {
      navigate('/admin');
    }
  }, [user, navigate]);

  if (!user) return null;

  const setTab = (tabName) => {
    setSearchParams({ tab: tabName });
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

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (editingAddressId) {
      editAddress(editingAddressId, addressForm);
      addToast('Address updated successfully!', 'success', 'check');
    } else {
      addAddress(addressForm);
      addToast('New address saved to your address book!', 'success', 'check');
    }
    setAddressModalOpen(false);
  };

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

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setEnquirySuccess(true);
    addToast('Support enquiry submitted! Our desk will contact you.', 'success', 'check');
    setEnquiryForm({ type: 'General', message: '' });
  };

  // Order Timeline Tracking Calculation
  const getTrackingSteps = (status) => {
    const steps = [
      { label: 'Order Placed', completed: true },
      { label: 'Order Confirmed', completed: ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].includes(status) },
      { label: 'Processing', completed: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].includes(status) },
      { label: 'Shipped', completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(status) },
      { label: 'Out for Delivery', completed: ['Out for Delivery', 'Delivered'].includes(status) },
      { label: 'Delivered', completed: status === 'Delivered' }
    ];
    return steps;
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <SEO title={`Customer Portal - Welcome ${user.firstName}`} canonical="/account" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Profile Welcome Banner */}
        <div className="bg-brand-maroon text-white rounded-3xl p-6 sm:p-8 shadow-luxury border border-brand-gold/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-maroon flex items-center justify-center font-serif font-bold text-2xl border-2 border-white shadow-md">
              {user.firstName[0]}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/20 px-2.5 py-0.5 rounded-full">
                Privilege Customer Account
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Welcome back, {user.firstName} {user.lastName}
              </h1>
              <p className="text-xs text-amber-200/90 mt-0.5">{user.email} | {user.phone}</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/'); }}
            className="bg-white/10 hover:bg-white/20 text-brand-gold px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-amber-400/30"
          >
            <LogOut className="w-4 h-4" /> Logout Session
          </button>
        </div>

        {/* Main Customer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CUSTOMER SIDEBAR NAVIGATION (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-amber-200 shadow-sm space-y-1">
              
              <button
                onClick={() => setTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'overview' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <User className="w-4 h-4" /> Dashboard Overview
              </button>

              <button
                onClick={() => setTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'orders' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Package className="w-4 h-4" /> My Orders ({MOCK_ORDERS.length})
              </button>

              <button
                onClick={() => setTab('track')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'track' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <Truck className="w-4 h-4" /> Track Order Timeline
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
                onClick={() => navigate('/cart')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-700 hover:bg-amber-50 transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> My Cart ({cartItems.length})
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
                onClick={() => setTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'profile' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <User className="w-4 h-4" /> My Profile
              </button>

              <button
                onClick={() => setTab('support')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'support' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Customer Support
              </button>

            </div>
          </div>

          {/* MAIN CONTENT AREA (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Dashboard Overview</h2>
                  <p className="text-xs text-gray-500">Quick summary of your orders, wishlist, and shipping addresses.</p>
                </div>

                {/* Summary Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-2xl font-bold text-brand-maroon block">{MOCK_ORDERS.length}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">Total Orders</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-2xl font-bold text-brand-maroon block">
                      {MOCK_ORDERS.filter(o => o.status === 'Processing' || o.status === 'Shipped').length}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">Pending Orders</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-2xl font-bold text-brand-maroon block">
                      {MOCK_ORDERS.filter(o => o.status === 'Delivered').length}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">Delivered Orders</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-2xl font-bold text-brand-maroon block">{wishlist.length}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">Wishlist Items</span>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-lg font-bold text-brand-maroon">Recent Orders</h3>
                    <button onClick={() => setTab('orders')} className="text-xs font-bold text-brand-maroon hover:underline">
                      View All Orders →
                    </button>
                  </div>

                  {MOCK_ORDERS.slice(0, 2).map((order) => (
                    <div key={order.id} className="border border-amber-200 rounded-2xl p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="font-bold text-brand-maroon font-serif text-sm block">Order #{order.id}</span>
                        <span className="text-gray-500">Placed on: {order.date}</span>
                        <p className="font-bold text-gray-800">Total: ₹{order.totalAmount.toLocaleString('en-IN')}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold text-[11px]">
                          {order.status}
                        </span>
                        <button
                          onClick={() => setSearchParams({ tab: 'track', orderId: order.id })}
                          className="bg-brand-maroon text-brand-gold px-3.5 py-1.5 rounded-xl font-bold text-xs"
                        >
                          Track Timeline
                        </button>
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
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Orders History</h2>
                  <p className="text-xs text-gray-500">Real-time order statuses, item breakdown, and tax invoice downloads.</p>
                </div>

                <div className="space-y-6">
                  {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="border border-amber-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                      
                      <div className="bg-amber-50 p-4 border-b border-amber-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-serif font-bold text-base text-brand-maroon block">Order #{order.id}</span>
                          <span className="text-gray-500">Placed: {order.date}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                            order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                          <button
                            onClick={() => handleDownloadInvoice(order)}
                            className="bg-white border border-amber-300 text-brand-maroon px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" /> Invoice
                          </button>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4 items-center text-xs">
                            <img src={item.image} alt={item.title} className="w-14 h-18 object-cover rounded-lg border" />
                            <div className="flex-1">
                              <h5 className="font-serif font-bold text-brand-maroon">{item.title}</h5>
                              <p className="text-gray-500">Color: {item.color} | Qty: {item.quantity}</p>
                              <span className="font-bold text-brand-maroon block mt-0.5">₹{item.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 border-t flex justify-between items-center text-xs">
                        <span className="text-gray-600">Courier: <strong>{order.courier}</strong> ({order.trackingNumber})</span>
                        <button
                          onClick={() => setSearchParams({ tab: 'track', orderId: order.id })}
                          className="font-bold text-brand-maroon hover:underline flex items-center gap-1"
                        >
                          View Order Timeline <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRACK ORDER TIMELINE TAB */}
            {activeTab === 'track' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Visual Order Tracking Timeline</h2>
                  <p className="text-xs text-gray-500">Track real-time dispatch and delivery progress from our Yeola hub.</p>
                </div>

                {MOCK_ORDERS.map((order) => {
                  const steps = getTrackingSteps(order.status);
                  return (
                    <div key={order.id} className="p-6 border border-amber-200 rounded-2xl bg-amber-50/40 space-y-6">
                      <div className="flex justify-between items-center border-b border-amber-200 pb-3 text-xs">
                        <div>
                          <span className="font-serif font-bold text-base text-brand-maroon">Order #{order.id}</span>
                          <span className="text-gray-500 block">Status: <strong className="text-brand-maroon">{order.status}</strong></span>
                        </div>
                        <a href={order.trackingUrl} target="_blank" rel="noreferrer" className="bg-brand-maroon text-brand-gold px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1">
                          Bluedart Tracking <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Visual Progress Steps */}
                      <div className="relative py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center">
                          {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center space-y-2 relative">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                                step.completed ? 'bg-brand-gold text-brand-maroon border-2 border-brand-maroon' : 'bg-gray-200 text-gray-500'
                              }`}>
                                {step.completed ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[11px] font-semibold ${step.completed ? 'text-brand-maroon' : 'text-gray-400'}`}>
                                {step.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Saved Wishlist ({wishlist.length})</h2>
                </div>

                {wishlist.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 space-y-3">
                    <Heart className="w-12 h-12 mx-auto text-amber-300" />
                    <p className="font-serif font-bold text-base text-brand-maroon">Your wishlist is waiting for something beautiful.</p>
                    <Link to="/shop" className="inline-block bg-brand-maroon text-brand-gold px-6 py-2.5 rounded-xl text-xs font-bold uppercase">
                      Explore Sarees
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MOCK_PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
                      <div key={product.id} className="border border-amber-200 rounded-xl p-3 flex gap-3 items-center bg-white">
                        <img src={product.images[0]} alt={product.title} className="w-16 h-20 object-cover rounded-lg" />
                        <div className="flex-1 text-xs space-y-1">
                          <h5 className="font-serif font-bold text-brand-maroon line-clamp-1">{product.title}</h5>
                          <span className="font-bold text-brand-maroon block">₹{product.price.toLocaleString('en-IN')}</span>
                          <div className="flex gap-2 pt-1">
                            <button onClick={() => addToCart(product, 1)} className="bg-brand-maroon text-brand-gold px-3 py-1 rounded-lg font-bold text-[11px]">
                              Add to Bag
                            </button>
                            <button onClick={() => toggleWishlist(product)} className="text-red-600 hover:text-red-800 text-[11px] font-semibold">
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

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-maroon">Saved Address Book</h2>
                    <p className="text-xs text-gray-500">Manage delivery locations and default shipping address.</p>
                  </div>
                  <button
                    onClick={() => { setEditingAddressId(null); setAddressModalOpen(true); }}
                    className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.addresses?.map((addr) => (
                    <div key={addr.id} className={`p-4 rounded-2xl border text-xs relative flex flex-col justify-between ${
                      addr.isDefault ? 'border-brand-gold bg-amber-50 shadow-xs' : 'border-gray-200 bg-white'
                    }`}>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="bg-brand-maroon text-brand-gold px-2.5 py-0.5 rounded-full font-bold text-[10px]">{addr.label}</span>
                          {addr.isDefault && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Default</span>}
                        </div>
                        <h5 className="font-bold text-brand-maroon">{addr.fullName}</h5>
                        <p className="text-gray-600 mt-1">{addr.flat}, {addr.street}</p>
                        <p className="font-bold text-gray-800 mt-0.5">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-gray-500 mt-0.5">Phone: {addr.phone}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t flex justify-between items-center text-[11px]">
                        {!addr.isDefault && (
                          <button onClick={() => setDefaultAddress(addr.id)} className="text-amber-800 font-bold hover:underline">
                            Set as Default
                          </button>
                        )}
                        <div className="flex gap-2 ml-auto">
                          <button onClick={() => { setEditingAddressId(addr.id); setAddressForm(addr); setAddressModalOpen(true); }} className="text-gray-600 hover:text-brand-maroon font-bold">Edit</button>
                          <button onClick={() => deleteAddress(addr.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">My Personal Profile</h2>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); updateProfile(profileForm); addToast('Profile updated!', 'success', 'check'); }} className="max-w-md space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">First Name</label>
                    <input type="text" value={profileForm.firstName} onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Last Name</label>
                    <input type="text" value={profileForm.lastName} onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Mobile Phone</label>
                    <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full p-2.5 border rounded-xl" />
                  </div>
                  <button type="submit" className="bg-brand-maroon text-brand-gold px-6 py-3 rounded-xl font-bold uppercase">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {/* CUSTOMER SUPPORT TAB */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Customer Support Desk</h2>
                  <p className="text-xs text-gray-500">Submit order inquiries directly to our Yeola customer desk.</p>
                </div>

                {enquirySuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-2">
                    <p className="font-bold">Your enquiry has been received!</p>
                    <p>Our Yeola customer desk will contact you via WhatsApp/Email shortly.</p>
                    <button onClick={() => setEnquirySuccess(false)} className="text-brand-maroon font-bold underline">Submit another message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSupportSubmit} className="max-w-md space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Enquiry Type</label>
                      <select value={enquiryForm.type} onChange={(e) => setEnquiryForm({ ...enquiryForm, type: e.target.value })} className="w-full p-2.5 border rounded-xl bg-white">
                        <option value="General">General Enquiry</option>
                        <option value="Order">Order Status Enquiry</option>
                        <option value="Shipping">Shipping & Delivery</option>
                        <option value="Custom">Custom Bridal Weaving</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Message</label>
                      <textarea rows={4} required value={enquiryForm.message} onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })} placeholder="Describe your question..." className="w-full p-2.5 border rounded-xl" />
                    </div>

                    <button type="submit" className="bg-brand-maroon text-brand-gold px-6 py-3 rounded-xl font-bold uppercase flex items-center gap-2">
                      Submit Enquiry <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
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
              <h4 className="font-serif font-bold text-lg text-brand-maroon">{editingAddressId ? 'Edit Address' : 'Add New Address'}</h4>
              <button onClick={() => setAddressModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleAddressSubmit} className="space-y-3 text-xs">
              <input type="text" placeholder="Full Name" required value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="Flat / Building Name" required value={addressForm.flat} onChange={(e) => setAddressForm({ ...addressForm, flat: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="Street / Area Name" required value={addressForm.street} onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Pincode" required maxLength={6} value={addressForm.pincode} onChange={handleAddressPincode} className="w-full p-2.5 border rounded-xl" />
                <input type="text" placeholder="City" required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} className="w-full p-2.5 border rounded-xl bg-gray-50" />
              </div>

              <input type="text" placeholder="State" required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} className="w-full p-2.5 border rounded-xl bg-gray-50" />

              <button type="submit" className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase">Save Address</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
