import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Star, Heart, ShoppingBag, Award, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ProductDetail } from '../components/ProductDetail';

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Selected Product for PDP modal view
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filters State
  const initialCategory = searchParams.get('category') || 'All';
  const initialOccasion = searchParams.get('occasion') || 'All';

  const [selectedFabric, setSelectedFabric] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fabrics = ['All', 'Pure Silk', 'Yeola Paithani', 'Maharani', 'Tissue Silk', 'Semi-Paithani'];
  const occasions = ['All', 'Bridal', 'Festive', 'Casual'];
  const colors = ['All', 'Royal Maroon', 'Emerald Green', 'Sunburst Gold', 'Crimson Red', 'Pastel Yellow'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Fabric filter
      if (selectedFabric !== 'All' && product.category !== selectedFabric && product.fabric !== selectedFabric) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = product.colors && product.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // Default featured
    });
  }, [selectedFabric, selectedOccasion, maxPrice, selectedColor, sortBy]);

  return (
    <div className="bg-brand-cream min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Catalog Banner */}
        <div className="bg-gradient-to-r from-brand-maroon via-brand-maroon-dark to-brand-maroon text-white p-8 rounded-2xl shadow-luxury mb-8 border border-brand-gold/40 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">
            Royal Yeola Paithani & Silk Collection
          </h1>
          <p className="text-xs text-amber-200/90 mt-2 max-w-xl mx-auto">
            Authentic handwoven sarees with real Gold Zari and certified pure Mulberry silk, crafted by master weavers of Yeola.
          </p>
        </div>

        {/* Modal PDP View when product selected */}
        {selectedProduct ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-maroon-dark transition-colors"
            >
              ← Back to Catalog Filtered Grid
            </button>
            <ProductDetail product={selectedProduct} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: FACETED FILTER PANEL (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm space-y-6">
                
                <div className="flex justify-between items-center border-b border-amber-200 pb-3">
                  <h3 className="font-serif font-bold text-brand-maroon flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-brand-gold" /> Filter Sarees
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedFabric('All');
                      setSelectedOccasion('All');
                      setMaxPrice(60000);
                      setSelectedColor('All');
                    }}
                    className="text-[11px] text-amber-800 font-bold hover:underline"
                  >
                    Reset All
                  </button>
                </div>

                {/* Fabric / Variety Filter */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Fabric & Variety
                  </label>
                  <div className="space-y-1.5 text-xs">
                    {fabrics.map((fab) => (
                      <button
                        key={fab}
                        onClick={() => setSelectedFabric(fab)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                          selectedFabric === fab ? 'bg-brand-maroon text-brand-gold font-bold' : 'text-gray-700 hover:bg-amber-50'
                        }`}
                      >
                        <span>{fab}</span>
                        {selectedFabric === fab && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <span>Price Range</span>
                    <span className="text-brand-maroon font-serif text-sm">Up to ₹{maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min={10000}
                    max={60000}
                    step={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-brand-maroon cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
                    <span>₹10,000</span>
                    <span>₹60,000</span>
                  </div>
                </div>

                {/* Occasion Filter */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Occasion
                  </label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => setSelectedOccasion(occ)}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          selectedOccasion === occ ? 'bg-brand-maroon text-brand-gold font-bold border-brand-maroon' : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300'
                        }`}
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT: SAREE CATALOG GRID (9 cols) */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Sorting Bar & Results Count */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                <span className="text-gray-600 font-medium">
                  Showing <strong className="text-brand-maroon font-bold">{filteredProducts.length}</strong> Authentic Handloom Sarees
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-gray-500">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 font-semibold text-brand-maroon focus:outline-none"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Products Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Card Image Container */}
                        <div className="relative aspect-4/5 overflow-hidden bg-gray-50 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Silk Mark Badge Overlay */}
                          {product.silkMarkCertified && (
                            <span className="absolute top-3 left-3 bg-brand-maroon/90 text-brand-gold text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              <Award className="w-3 h-3" /> Silk Mark
                            </span>
                          )}

                          {/* Wishlist Button Overlay */}
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                            className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                              isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-gray-600 hover:text-brand-maroon'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        {/* Product Information */}
                        <div className="p-4 space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                            {product.category}
                          </span>
                          
                          <h3 
                            onClick={() => setSelectedProduct(product)}
                            className="font-serif text-sm font-bold text-brand-maroon line-clamp-2 cursor-pointer hover:underline"
                          >
                            {product.title}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1.5 text-amber-500 text-xs">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="font-bold text-gray-800">{product.rating}</span>
                            <span className="text-gray-400 text-[10px]">({product.reviewsCount})</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Price & Add to Cart */}
                      <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                        <div>
                          <span className="font-serif text-lg font-bold text-brand-maroon">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through block">
                              ₹{product.originalPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product, 1)}
                          className="bg-brand-maroon text-brand-gold hover:bg-brand-maroon-dark p-2.5 rounded-xl transition-all shadow-xs"
                          title="Add to Cart Bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
