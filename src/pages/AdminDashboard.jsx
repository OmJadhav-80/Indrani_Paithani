import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Users, 
  Boxes, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search, 
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../data/mockData';
import { SITE_CONFIG } from '../config/siteConfig';
import { SEO } from '../components/SEO';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Tab State: overview, products, collections, orders, customers, inventory, enquiries, analytics, settings
  const activeTab = searchParams.get('tab') || 'overview';

  // Local Admin State for Product & Order CRUD
  const [productsList, setProductsList] = useState(MOCK_PRODUCTS);
  const [ordersList, setOrdersList] = useState(MOCK_ORDERS);
  const [enquiriesList, setEnquiriesList] = useState([
    { id: 'enq-1', name: 'Aarti Shinde', email: 'aarti@example.com', phone: '+91 9823456789', message: 'Interested in custom bridal Paithani in royal blue.', status: 'New', date: '2026-09-14' },
    { id: 'enq-2', name: 'Rajesh Patil', email: 'rajesh@example.com', phone: '+91 9422012345', message: 'Do you ship to London, UK?', status: 'In Progress', date: '2026-09-12' }
  ]);

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    sku: '',
    category: 'Yeola Paithani',
    collection: 'Bridal Collection',
    fabric: 'Pure Silk',
    price: 35000,
    originalPrice: 40000,
    stockQuantity: 5,
    description: '',
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800']
  });

  // Authorization Guard
  React.useEffect(() => {
    if (!user) {
      navigate('/admin/login');
    } else if (user.role !== 'OWNER') {
      navigate('/account');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'OWNER') return null;

  const setTab = (tabName) => setSearchParams({ tab: tabName });

  // Order Status Updater
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrdersList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast(`Order #${orderId} status updated to ${newStatus}`, 'success', 'check');
  };

  // Enquiry Status Updater
  const handleUpdateEnquiryStatus = (enqId, newStatus) => {
    setEnquiriesList(prev => prev.map(e => e.id === enqId ? { ...e, status: newStatus } : e));
    addToast(`Enquiry #${enqId} marked as ${newStatus}`, 'success', 'check');
  };

  // Product Save / Edit Handler
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProductId) {
      setProductsList(prev => prev.map(p => p.id === editingProductId ? { ...p, ...productForm } : p));
      addToast('Product updated successfully!', 'success', 'check');
    } else {
      const newP = {
        ...productForm,
        id: 'pth-' + Date.now(),
        slug: productForm.title.toLowerCase().replace(/ /g, '-'),
        rating: 5.0,
        reviewsCount: 0,
        inStock: productForm.stockQuantity > 0,
        colors: [{ name: 'Royal Maroon', hex: '#4A0E17' }]
      };
      setProductsList(prev => [newP, ...prev]);
      addToast('New product added to catalog!', 'success', 'check');
    }
    setProductModalOpen(false);
  };

  // Product Delete
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      addToast('Product deleted from inventory', 'success', 'check');
    }
  };

  // Metrics Calculations
  const totalSales = ordersList.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = ordersList.length;
  const pendingOrders = ordersList.filter(o => ['Processing', 'Shipped', 'Placed'].includes(o.status)).length;
  const lowStockProducts = productsList.filter(p => p.stockQuantity <= 3).length;

  return (
    <div className="bg-brand-cream min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <SEO title="Owner Admin Dashboard" canonical="/admin" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-brand-maroon-dark text-white p-6 sm:p-8 rounded-3xl border border-brand-gold/40 shadow-luxury flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/20 px-3 py-0.5 rounded-full border border-brand-gold/30">
              Boutique Owner Portal
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mt-1">
              Indrani Paithani Owner Dashboard
            </h1>
            <p className="text-xs text-amber-200/80">Manage your boutique, products, customers and order fulfillment.</p>
          </div>

          <button
            onClick={() => { logout(); navigate('/admin/login'); }}
            className="bg-white/10 hover:bg-white/20 text-brand-gold px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border border-amber-400/30"
          >
            <LogOut className="w-4 h-4" /> Exit Owner Portal
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ADMIN SIDEBAR (3 cols) */}
          <div className="lg:col-span-3 space-y-2">
            <div className="bg-white rounded-2xl p-3 border border-amber-200 shadow-sm space-y-1 text-xs font-bold">
              
              <button onClick={() => setTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <LayoutDashboard className="w-4 h-4" /> Overview & Sales
              </button>

              <button onClick={() => setTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <Package className="w-4 h-4" /> Products ({productsList.length})
              </button>

              <button onClick={() => setTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <ShoppingBag className="w-4 h-4" /> Orders ({ordersList.length})
              </button>

              <button onClick={() => setTab('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <Boxes className="w-4 h-4" /> Inventory Alerts ({lowStockProducts})
              </button>

              <button onClick={() => setTab('enquiries')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'enquiries' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <MessageSquare className="w-4 h-4" /> Enquiries ({enquiriesList.length})
              </button>

              <button onClick={() => setTab('analytics')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <TrendingUp className="w-4 h-4" /> Sales Analytics
              </button>

              <button onClick={() => setTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-brand-maroon text-brand-gold shadow-md' : 'text-gray-700 hover:bg-amber-50'}`}>
                <Settings className="w-4 h-4" /> Settings
              </button>

            </div>
          </div>

          {/* MAIN ADMIN CONTENT AREA (9 cols) */}
          <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Sales & Performance Summary</h2>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-xl font-bold text-brand-maroon block">₹{totalSales.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Total Revenue</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-xl font-bold text-brand-maroon block">{totalOrders}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Total Orders</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-xl font-bold text-brand-maroon block">{pendingOrders}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Pending Fulfillment</span>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
                    <span className="font-serif text-xl font-bold text-amber-800 block">{lowStockProducts}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Low Stock Alerts</span>
                  </div>
                </div>

                {/* Recent Orders List */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif text-lg font-bold text-brand-maroon">Orders Needing Processing</h3>
                  <div className="overflow-x-auto border border-amber-200 rounded-2xl">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-amber-50 text-brand-maroon font-serif">
                        <tr>
                          <th className="p-3">Order ID</th>
                          <th className="p-3">Date</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Update Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {ordersList.map(order => (
                          <tr key={order.id}>
                            <td className="p-3 font-bold text-brand-maroon">{order.id}</td>
                            <td className="p-3 text-gray-500">{order.date}</td>
                            <td className="p-3 font-bold">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                            <td className="p-3">
                              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold text-[10px]">{order.status}</span>
                            </td>
                            <td className="p-3">
                              <select
                                value={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                className="bg-white border rounded p-1 text-[11px] font-bold text-brand-maroon"
                              >
                                <option value="Placed">Placed</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-amber-200 pb-4">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-brand-maroon">Product Management</h2>
                    <p className="text-xs text-gray-500">Add, edit, or remove catalog saree items.</p>
                  </div>
                  <button
                    onClick={() => { setEditingProductId(null); setProductModalOpen(true); }}
                    className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>

                <div className="overflow-x-auto border border-amber-200 rounded-2xl">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-amber-50 text-brand-maroon font-serif">
                      <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">Title & SKU</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productsList.map(p => (
                        <tr key={p.id}>
                          <td className="p-3">
                            <img src={p.images[0]} alt={p.title} className="w-12 h-14 object-cover rounded-lg" />
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-brand-maroon block">{p.title}</span>
                            <span className="text-gray-400 text-[10px]">SKU: {p.sku}</span>
                          </td>
                          <td className="p-3 text-gray-700">{p.category}</td>
                          <td className="p-3 font-bold">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-3 font-bold text-emerald-800">{p.stockQuantity} units</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <button onClick={() => { setEditingProductId(p.id); setProductForm(p); setProductModalOpen(true); }} className="text-gray-600 hover:text-brand-maroon font-bold"><Edit3 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Order Fulfillment Manager</h2>
                  <p className="text-xs text-gray-500">Update shipping statuses to keep customers informed.</p>
                </div>

                <div className="space-y-4">
                  {ordersList.map(order => (
                    <div key={order.id} className="p-4 border border-amber-200 rounded-2xl bg-amber-50/40 text-xs space-y-3">
                      <div className="flex justify-between items-center font-bold text-brand-maroon">
                        <span>Order #{order.id} - Total: ₹{order.totalAmount.toLocaleString('en-IN')}</span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="bg-white border border-amber-300 rounded p-1 text-xs font-bold text-brand-maroon"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <div className="text-gray-600">
                        Customer: <strong>{order.shippingAddress.name}</strong> ({order.shippingAddress.phone})
                        <p>{order.shippingAddress.flat}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INVENTORY TAB */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Inventory & Low Stock Alerts</h2>
                </div>

                <div className="space-y-3">
                  {productsList.map(p => (
                    <div key={p.id} className="p-4 border border-amber-200 rounded-2xl flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-brand-maroon">{p.title} (SKU: {p.sku})</span>
                        <p className="text-gray-500">Category: {p.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full font-bold ${p.stockQuantity <= 3 ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                          Stock: {p.stockQuantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Customer Enquiries</h2>
                </div>

                <div className="space-y-3">
                  {enquiriesList.map(e => (
                    <div key={e.id} className="p-4 border border-amber-200 rounded-2xl text-xs space-y-2 bg-amber-50/40">
                      <div className="flex justify-between font-bold text-brand-maroon">
                        <span>{e.name} ({e.phone})</span>
                        <select
                          value={e.status}
                          onChange={(val) => handleUpdateEnquiryStatus(e.id, val.target.value)}
                          className="bg-white border rounded p-1 text-xs"
                        >
                          <option value="New">New</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                      <p className="text-gray-700">"{e.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 text-xs">
                <div className="border-b border-amber-200 pb-4">
                  <h2 className="font-serif text-2xl font-bold text-brand-maroon">Boutique Configuration</h2>
                </div>

                <div className="space-y-3 max-w-md">
                  <div><label className="font-bold">Phone Number:</label> <input type="text" disabled value={SITE_CONFIG.supportPhone} className="w-full p-2 border rounded bg-gray-100" /></div>
                  <div><label className="font-bold">Email:</label> <input type="text" disabled value={SITE_CONFIG.supportEmail} className="w-full p-2 border rounded bg-gray-100" /></div>
                  <div><label className="font-bold">Location:</label> <input type="text" disabled value={SITE_CONFIG.locationCity} className="w-full p-2 border rounded bg-gray-100" /></div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* PRODUCT MODAL DRAWER */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-amber-200 text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h4 className="font-serif font-bold text-lg text-brand-maroon">{editingProductId ? 'Edit Product' : 'Add New Saree Product'}</h4>
              <button onClick={() => setProductModalOpen(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <input type="text" placeholder="Product Title" required value={productForm.title} onChange={(e) => setProductForm({ ...productForm, title: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              <input type="text" placeholder="SKU Code" required value={productForm.sku} onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })} className="w-full p-2.5 border rounded-xl" />
              
              <div className="grid grid-cols-2 gap-2">
                <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="w-full p-2.5 border rounded-xl bg-white">
                  <option value="Yeola Paithani">Yeola Paithani</option>
                  <option value="Maharani">Maharani</option>
                  <option value="Tissue Silk">Tissue Silk</option>
                  <option value="Semi-Paithani">Semi-Paithani</option>
                </select>
                <input type="number" placeholder="Price (INR)" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full p-2.5 border rounded-xl" />
              </div>

              <input type="number" placeholder="Stock Quantity" required value={productForm.stockQuantity} onChange={(e) => setProductForm({ ...productForm, stockQuantity: Number(e.target.value) })} className="w-full p-2.5 border rounded-xl" />

              <button type="submit" className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase">Save Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
