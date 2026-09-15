import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './components/Toast';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Collections } from './pages/Collections';
import { ProductPage } from './pages/ProductPage';
import { About } from './pages/About';
import { PaithaniHeritage } from './pages/PaithaniHeritage';
import { Contact } from './pages/Contact';
import { Location } from './pages/Location';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Checkout } from './pages/Checkout';
import { Policies } from './pages/Policies';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="flex flex-col min-h-screen font-sans bg-brand-cream text-brand-dark antialiased selection:bg-brand-gold selection:text-brand-maroon">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  {/* Public Storefront Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/catalog" element={<Shop />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/product/:slug" element={<ProductPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/paithani-heritage" element={<PaithaniHeritage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Shop />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<CustomerDashboard />} />
                  <Route path="/policies" element={<Policies />} />

                  {/* Protected Customer Portal Routes */}
                  <Route path="/account" element={<CustomerDashboard />} />
                  <Route path="/account/*" element={<CustomerDashboard />} />
                  <Route path="/profile" element={<Profile />} />

                  {/* Protected Owner / Admin Portal Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/*" element={<AdminDashboard />} />

                  {/* Catch-All 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <CartDrawer />
              <Footer />
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
