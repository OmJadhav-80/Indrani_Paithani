import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ShieldCheck, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { user } = useAuth();
  const { totalCartCount, wishlist, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'All Sarees', path: '/catalog' },
    { name: 'Yeola Paithani', path: '/catalog?category=Yeola+Paithani' },
    { name: 'Maharani Silk', path: '/catalog?category=Maharani' },
    { name: 'Tissue Silk', path: '/catalog?category=Tissue+Silk' },
    { name: 'Bridal Collection', path: '/catalog?occasion=Bridal' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-sm">
      {/* Top Banner Announcement */}
      <div className="bg-brand-maroon text-brand-gold text-xs py-2 px-4 text-center font-medium flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
          <span>100% Authentic Silk Mark Certified</span>
        </div>
        <p className="flex-1 text-center">
          ✨ Festive Offer: <span className="font-semibold text-white">Complimentary Express Shipping Across India</span> on orders above ₹10,000
        </p>
        <div className="hidden md:flex items-center gap-2 text-white/80 hover:text-white">
          <Phone className="w-3 h-3 text-brand-gold" />
          <span>Help Desk: +91 98234 56789</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-brand-maroon hover:text-brand-gold focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/logo.svg" 
              alt="Indrani Paithani Logo" 
              className="w-12 h-12 transition-transform duration-300 group-hover:scale-105 drop-shadow" 
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-maroon leading-none">
                INDRANI <span className="text-brand-gold font-normal">PAITHANI</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-800/80 mt-1">
                Luxury Handloom Heritage
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname + location.search === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-gold ${
                    isActive ? 'text-brand-maroon font-semibold border-b-2 border-brand-gold pb-1' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate('/catalog')}
              className="p-2 text-gray-700 hover:text-brand-maroon transition-colors"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Profile Link */}
            <Link
              to={user ? '/profile' : '/login'}
              className="flex items-center gap-2 text-gray-700 hover:text-brand-maroon transition-colors group"
              title={user ? `Logged in as ${user.firstName}` : 'Account Login'}
            >
              <div className="p-2 rounded-full group-hover:bg-amber-100/60">
                <User className="w-5 h-5 text-brand-maroon" />
              </div>
              <span className="hidden md:inline text-xs font-semibold text-gray-800">
                {user ? user.firstName : 'Sign In'}
              </span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/profile?tab=wishlist"
              className="p-2 text-gray-700 hover:text-brand-maroon transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-brand-maroon text-brand-gold text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-brand-maroon text-white px-3.5 py-2 rounded-full hover:bg-brand-maroon-dark transition-all shadow-md group"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-maroon text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-brand-gold">
                Bag
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-brand-cream px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-gray-800 hover:text-brand-maroon border-b border-amber-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between text-sm text-gray-600">
            <span>Customer Support:</span>
            <a href="tel:+919823456789" className="font-semibold text-brand-maroon">+91 98234 56789</a>
          </div>
        </div>
      )}
    </header>
  );
};
