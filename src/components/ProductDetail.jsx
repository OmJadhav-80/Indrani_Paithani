import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  ShieldCheck, 
  Award, 
  Truck, 
  Maximize2, 
  X, 
  ChevronRight, 
  Star,
  MapPin,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PINCODE_DATABASE } from '../data/mockData';

export const ProductDetail = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Component State
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.selectedColor || (product.colors && product.colors[0]?.name) || 'Royal Maroon'
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  const isWishlisted = wishlist.includes(product.id);

  // Hover Zoom Handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
      backgroundImage: `url(${product.images[selectedImage]})`,
      backgroundSize: '250%'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  // WhatsApp Order URL Generator
  const generateWhatsAppUrl = () => {
    const pageUrl = window.location.href;
    const text = `Hello Indrani Paithani! 👋\nI am interested in purchasing:\n\n📌 *Product:* ${product.title}\n🏷️ *SKU:* ${product.sku}\n🎨 *Color:* ${selectedColor}\n💰 *Price:* ₹${product.price.toLocaleString('en-IN')}\n🔗 *Link:* ${pageUrl}\n\nPlease confirm availability and details for order placement.`;
    return `https://wa.me/919823456789?text=${encodeURIComponent(text)}`;
  };

  // Pincode Deliverability Check
  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeResult({ success: false, message: 'Please enter a valid 6-digit Indian Pincode.' });
      return;
    }

    const data = PINCODE_DATABASE[pincode];
    if (data) {
      setPincodeResult({
        success: true,
        message: `Express Delivery Available to ${data.city}, ${data.state}! Estimated timeframe: ${data.estDays}`
      });
    } else {
      setPincodeResult({
        success: true,
        message: `Standard Express Delivery Available to Pincode ${pincode}! Estimated timeframe: 3-5 Business Days (Free Insured Transit)`
      });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto mb-6 text-xs text-gray-500 flex items-center gap-2">
        <a href="/" className="hover:text-brand-maroon">Home</a>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <a href="/catalog" className="hover:text-brand-maroon">Catalog</a>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-brand-maroon font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-luxury border border-amber-200/60 p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: GALLERY WITH HOVER ZOOM & LIGHTBOX (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Interactive Zoom Box */}
            <div 
              className="relative aspect-4/5 rounded-xl overflow-hidden border border-amber-200 bg-gray-50 cursor-crosshair group shadow-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover transition-opacity duration-200"
              />
              
              {/* Zoom Magnifier Lens Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none z-10 rounded-xl"
                style={zoomStyle}
              />

              {/* Lightbox Expand Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-4 right-4 bg-white/90 text-brand-maroon p-2.5 rounded-full shadow-md hover:bg-brand-maroon hover:text-white transition-colors"
                title="Inspect Zari Details in Fullscreen Lightbox"
              >
                <Maximize2 className="w-5 h-5" />
              </button>

              {/* Silk Mark Badge Overlay */}
              {product.silkMarkCertified && (
                <div className="absolute top-4 left-4 bg-brand-maroon/90 text-brand-gold text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Silk Mark Certified
                </div>
              )}
            </div>

            {/* Thumbnail Carousel */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? 'border-brand-maroon ring-2 ring-amber-300' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 text-center italic">
              🔍 Hover over saree image for 2.5x high-resolution Zari weave inspection
            </p>
          </div>

          {/* RIGHT: CONVERSION ENGINE & DETAILS (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header Title & Ratings */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800 tracking-widest uppercase bg-amber-100/80 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xs font-semibold text-gray-400">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-maroon mt-3 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-500">({product.reviewsCount} Authentic Reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-gray-500 block">Offer Price (Inclusive of all taxes)</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="font-serif text-3xl font-bold text-brand-maroon">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-gray-400 line-through font-medium">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Color Variant: <span className="text-brand-maroon font-serif text-sm ml-1">{selectedColor}</span>
                </label>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedColor === c.name
                          ? 'border-brand-maroon bg-amber-100/60 ring-2 ring-brand-gold text-brand-maroon'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-amber-300'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-gray-300 shadow-xs" style={{ backgroundColor: c.hex }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & High-Converting Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-4 items-center">
                {/* Quantity Controls */}
                <div className="flex items-center border border-amber-300 rounded-xl bg-amber-50/80 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 font-bold text-brand-maroon hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 font-bold text-brand-maroon hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => addToCart(product, quantity, selectedColor)}
                  className="flex-1 bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-5 h-5 text-brand-gold group-hover:scale-110 transition-transform" />
                  Add to Cart Bag
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-amber-200 text-gray-500 hover:text-brand-maroon hover:border-amber-400'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* ORDER ON WHATSAPP HIGH CONVERTING CTA */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 text-sm tracking-wide"
              >
                <MessageCircle className="w-5 h-5 text-emerald-300 fill-current" />
                Order Directly on WhatsApp (Pre-filled Inquiry)
              </a>
            </div>

            {/* PINCODE DELIVERABILITY CHECKER */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
              <label className="block text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-maroon" /> Check Delivery Availability & Delivery Timeframe
              </label>
              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode (e.g., 411004)"
                  className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
                />
                <button
                  type="submit"
                  className="bg-brand-maroon text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-maroon-dark transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeResult && (
                <div className={`mt-2 p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                  pincodeResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {pincodeResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                  <span>{pincodeResult.message}</span>
                </div>
              )}
            </div>

            {/* TRUST BADGES COMPONENT */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-amber-200/80">
              <div className="flex flex-col items-center text-center p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
                <Award className="w-5 h-5 text-brand-maroon mb-1" />
                <span className="text-[11px] font-bold text-gray-800">100% Handloom</span>
                <span className="text-[9px] text-gray-500">Yeola Artisans</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
                <ShieldCheck className="w-5 h-5 text-brand-maroon mb-1" />
                <span className="text-[11px] font-bold text-gray-800">Silk Mark Certified</span>
                <span className="text-[9px] text-gray-500">Pure Mulberry Silk</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-amber-50/50 rounded-lg border border-amber-200/50">
                <Truck className="w-5 h-5 text-brand-maroon mb-1" />
                <span className="text-[11px] font-bold text-gray-800">Free Shipping</span>
                <span className="text-[9px] text-gray-500">Orders &gt; ₹10,000</span>
              </div>
            </div>

          </div>

        </div>

        {/* LOWER SECTION: SPECIFICATIONS & WEAVING DESCRIPTION TABLE */}
        <div className="mt-12 pt-8 border-t border-amber-200">
          <h3 className="font-serif text-xl font-bold text-brand-maroon mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-gold" /> Product Specifications & Weave Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <p className="text-xs leading-relaxed text-gray-700 bg-amber-50/40 p-4 rounded-xl border border-amber-100">
                {product.description}
              </p>
              
              <div className="bg-amber-100/40 p-4 rounded-xl space-y-2">
                <h5 className="font-serif text-sm font-bold text-brand-maroon">Care Instructions</h5>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>{product.washCare}</li>
                  <li>Store in a soft white muslin cloth to preserve Zari metallic sheen.</li>
                  <li>Avoid direct exposure to liquid perfumes on gold zari pallu.</li>
                </ul>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="overflow-hidden rounded-xl border border-amber-200">
              <table className="w-full text-xs text-left">
                <tbody>
                  <tr className="bg-amber-50/80 border-b border-amber-200">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Fabric Purity</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.specs['Fabric Purity'] || product.fabric}</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Zari Type</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.zariType}</td>
                  </tr>
                  <tr className="bg-amber-50/80 border-b border-amber-200">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Border Style</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.borderStyle}</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Blouse Piece</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.blousePiece}</td>
                  </tr>
                  <tr className="bg-amber-50/80 border-b border-amber-200">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Saree Length</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.specs['Saree Length']}</td>
                  </tr>
                  <tr className="border-b border-amber-100">
                    <td className="px-4 py-2.5 font-bold text-gray-700">Weaving Hub</td>
                    <td className="px-4 py-2.5 text-gray-800">{product.specs['Origin']}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-brand-gold p-2 rounded-full"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={product.images[selectedImage]}
            alt={product.title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          <p className="text-white/80 text-xs mt-4 font-serif">
            {product.title} - Close-up Zari Tapestry Inspection View
          </p>
        </div>
      )}
    </div>
  );
};
