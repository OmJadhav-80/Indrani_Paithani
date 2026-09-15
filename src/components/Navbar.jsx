import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { SITE_CONFIG } from '../config/siteConfig';

export const Navbar = () => {
  const { user } = useAuth();
  const { totalCartCount, wishlist, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Our Craftsmanship', path: '/our-craftsmanship' },
    { name: 'Paithani Heritage', path: '/paithani-heritage' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/50 shadow-xs">
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
              className="w-11 h-11 transition-transform duration-300 group-hover:scale-105 drop-shadow" 
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-maroon leading-none">
                INDRANI <span className="text-brand-gold font-normal">PAITHANI</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase font-semibold text-amber-800/80 mt-1">
                Luxury Handloom Heritage
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-brand-gold ${
                    isActive ? 'text-brand-maroon font-bold border-b-2 border-brand-gold pb-1' : 'text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons (Search, Wishlist, Account, Shopping Bag, Shop Now CTA) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Search Icon Trigger */}
            <button
              onClick={() => navigate('/shop')}
              className="p-2 text-gray-700 hover:text-brand-maroon transition-colors"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>

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

            {/* Account Profile Link */}
            <Link
              to={user ? '/profile' : '/login'}
              className="flex items-center gap-1.5 text-gray-700 hover:text-brand-maroon transition-colors group p-1"
              title={user ? `Logged in as ${user.firstName}` : 'Account Login'}
            >
              <User className="w-5 h-5 text-brand-maroon" />
              <span className="hidden xl:inline text-xs font-semibold text-gray-800">
                {user ? user.firstName : 'Sign In'}
              </span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-brand-maroon text-white px-3.5 py-2 rounded-full hover:bg-brand-maroon-dark transition-all shadow-md group"
              aria-label="Open Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-maroon text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-brand-gold">
                Bag
              </span>
            </button>

            {/* Header Shop Now CTA */}
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-1 bg-brand-gold text-brand-maroon hover:bg-amber-300 px-4 py-2 rounded-full font-serif font-bold text-xs uppercase tracking-wider shadow-xs transition-transform transform hover:scale-105"
            >
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-200 bg-brand-cream px-4 pt-4 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-sm font-bold text-gray-800 hover:text-brand-maroon border-b border-amber-100 uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs text-gray-600">
            <span>Customer Support:</span>
            <a href={`tel:${SITE_CONFIG.supportPhone}`} className="font-semibold text-brand-maroon">{SITE_CONFIG.supportPhone}</a>
          </div>
        </div>
      )}
    </header>
  );
};
