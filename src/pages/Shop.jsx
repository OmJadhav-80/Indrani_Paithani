import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  ShoppingBag, 
  Award, 
  Check, 
  Search, 
  X, 
  Eye,
  ChevronDown
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { SEO } from '../components/SEO';
import { CatalogSkeletonGrid } from '../components/SkeletonLoader';
import { ProductDetail } from '../components/ProductDetail';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { addToast } = useToast();

  // Search & Filter State from URL
  const queryCategory = searchParams.get('category') || 'All';
  const queryCollection = searchParams.get('collection') || 'All';
  const querySearch = searchParams.get('search') || '';

  const [searchKeyword, setSearchKeyword] = useState(querySearch);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [selectedCollection, setSelectedCollection] = useState(queryCollection);
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  // UI States
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState(null);
  const [hoveredProductImage, setHoveredProductImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['All', 'Yeola Paithani', 'Maharani', 'Tissue Silk', 'Semi-Paithani'];
  const collections = ['All', 'Bridal Collection', 'Festival Collection', 'Traditional Collection'];
  const fabrics = ['All', 'Pure Silk', 'Tissue Silk', 'Semi-Paithani'];
  const occasions = ['All', 'Bridal', 'Festive', 'Casual'];
  const colors = ['All', 'Royal Maroon', 'Emerald Green', 'Sunburst Gold', 'Crimson Red', 'Pastel Yellow'];

  // Filter & Search Evaluation
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Search keyword match
      if (searchKeyword.trim()) {
        const term = searchKeyword.toLowerCase();
        const matchesName = product.title.toLowerCase().includes(term);
        const matchesCat = product.category.toLowerCase().includes(term);
        const matchesFabric = product.fabric.toLowerCase().includes(term);
        const matchesColor = product.colors.some(c => c.name.toLowerCase().includes(term));
        if (!matchesName && !matchesCat && !matchesFabric && !matchesColor) return false;
      }

      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;

      // Collection match
      if (selectedCollection !== 'All' && product.collection !== selectedCollection) return false;

      // Fabric match
      if (selectedFabric !== 'All' && product.fabric !== selectedFabric) return false;

      // Occasion match
      if (selectedOccasion !== 'All' && product.occasion !== selectedOccasion) return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // In Stock filter
      if (inStockOnly && !product.inStock) return false;

      // Color filter
      if (selectedColor !== 'All') {
        const hasColor = product.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // Featured
    });
  }, [searchKeyword, selectedCategory, selectedCollection, selectedFabric, selectedOccasion, selectedColor, maxPrice, inStockOnly, sortBy]);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    addToast(`Added "${product.title}" to your Shopping Bag!`, 'success', 'cart');
  };

  const handleToggleWishlist = (product, e) => {
    e.stopPropagation();
    const isCurrentlyWishlisted = wishlist.includes(product.id);
    toggleWishlist(product);
    addToast(
      isCurrentlyWishlisted ? `Removed from Wishlist` : `Saved to Wishlist!`,
      'success',
      'heart'
    );
  };

  const resetFilters = () => {
    setSearchKeyword('');
    setSelectedCategory('All');
    setSelectedCollection('All');
    setSelectedFabric('All');
    setSelectedOccasion('All');
    setSelectedColor('All');
    setMaxPrice(60000);
    setInStockOnly(false);
    setSearchParams({});
  };

  return (
    <div className="bg-brand-cream min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Royal Handloom Saree Collection" 
        description="Explore authentic Yeola Paithani sarees, Maharani Silk, Tissue Gold & Bridal collections. Silk Mark Certified with free express delivery across India."
        canonical="/shop"
      />

      <div className="max-w-7xl mx-auto">
        
        {/* Catalog Banner */}
        <div className="bg-gradient-to-r from-brand-maroon via-brand-maroon-dark to-brand-maroon text-white p-8 rounded-2xl shadow-luxury mb-8 border border-brand-gold/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest bg-brand-gold/20 px-3 py-1 rounded-full">
              Authentic Handloom Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold mt-2">
              Royal Paithani Sarees & Ethnic Silk
            </h1>
            <p className="text-xs text-amber-200/90 mt-1 max-w-xl">
              Handcrafted in Yeola with certified pure Mulberry silk, 24K Gold Zari pallus, and 2,000-year Maharashtrian weaving heritage.
            </p>
          </div>

          <div className="w-full md:w-auto relative max-w-xs">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search saree, color, fabric..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white text-gray-800 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            {searchKeyword && (
              <button onClick={() => setSearchKeyword('')} className="absolute right-3 top-3 text-gray-400 hover:text-brand-maroon">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick View Modal */}
        {selectedQuickViewProduct ? (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedQuickViewProduct(null)}
              className="bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-maroon-dark transition-colors flex items-center gap-2"
            >
              ← Back to Shop Grid
            </button>
            <ProductDetail product={selectedQuickViewProduct} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* DESKTOP SIDEBAR FILTERS (3 cols) */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-amber-200 shadow-sm space-y-6 sticky top-28">
                
                <div className="flex justify-between items-center border-b border-amber-200 pb-3">
                  <h3 className="font-serif font-bold text-brand-maroon flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-brand-gold" /> Filter Sarees
                  </h3>
                  <button onClick={resetFilters} className="text-[11px] text-amber-800 font-bold hover:underline">
                    Reset All
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category</label>
                  <div className="space-y-1.5 text-xs">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${
                          selectedCategory === cat ? 'bg-brand-maroon text-brand-gold font-bold' : 'text-gray-700 hover:bg-amber-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Collections */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Collection</label>
                  <div className="space-y-1.5 text-xs">
                    {collections.map((col) => (
                      <button
                        key={col}
                        onClick={() => setSelectedCollection(col)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                          selectedCollection === col ? 'font-bold text-brand-maroon bg-amber-100/60' : 'text-gray-600 hover:text-brand-maroon'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    <span>Max Price</span>
                    <span className="text-brand-maroon font-serif text-sm">₹{maxPrice.toLocaleString('en-IN')}</span>
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
                </div>

                {/* Color Filter Swatches */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Color Variant</label>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                          selectedColor === c ? 'bg-brand-maroon text-brand-gold border-brand-maroon' : 'bg-white border-gray-200 text-gray-700'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Availability Checkbox */}
                <div className="pt-2 border-t border-amber-200/60">
                  <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="accent-brand-maroon rounded"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>

              </div>
            </div>

            {/* PRODUCT GRID & CONTROLS (9 cols) */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* Controls Bar & Mobile Filter Trigger */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm flex flex-wrap justify-between items-center gap-4 text-xs">
                
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden bg-brand-maroon text-brand-gold px-4 py-2 rounded-xl font-bold flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </button>

                <span className="text-gray-600 font-medium">
                  Showing <strong className="text-brand-maroon font-bold">{filteredProducts.length}</strong> Sarees
                </span>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-gray-500">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 font-semibold text-brand-maroon focus:outline-none"
                  >
                    <option value="featured">Featured Collection</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Product Grid Render */}
              {isLoading ? (
                <CatalogSkeletonGrid count={6} />
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-amber-200 space-y-4">
                  <Search className="w-12 h-12 text-amber-300 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-brand-maroon">No Sarees Found</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    We couldn't find any sarees matching your selected filters or search keyword.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="bg-brand-maroon text-brand-gold px-6 py-2.5 rounded-xl font-bold text-xs uppercase"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    const currentImgIndex = hoveredProductImage[product.id] || 0;

                    return (
                      <div
                        key={product.id}
                        className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Image Container with Hover Preview Toggle */}
                          <div 
                            className="relative aspect-4/5 overflow-hidden bg-gray-50 cursor-pointer"
                            onClick={() => navigate(`/product/${product.slug}`)}
                            onMouseEnter={() => {
                              if (product.images.length > 1) {
                                setHoveredProductImage({ ...hoveredProductImage, [product.id]: 1 });
                              }
                            }}
                            onMouseLeave={() => {
                              setHoveredProductImage({ ...hoveredProductImage, [product.id]: 0 });
                            }}
                          >
                            <img
                              src={product.images[currentImgIndex]}
                              alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Silk Mark Overlay Badge */}
                            {product.silkMarkCertified && (
                              <span className="absolute top-3 left-3 bg-brand-maroon/90 text-brand-gold text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                <Award className="w-3 h-3" /> Silk Mark
                              </span>
                            )}

                            {/* Wishlist Button Overlay */}
                            <button
                              onClick={(e) => handleToggleWishlist(product, e)}
                              className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-colors ${
                                isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white/90 text-gray-600 hover:text-brand-maroon'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                            </button>

                            {/* Quick View Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedQuickViewProduct(product);
                              }}
                              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 text-brand-maroon hover:bg-brand-maroon hover:text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1"
                            >
                              <Eye className="w-3.5 h-3.5" /> Quick View
                            </button>
                          </div>

                          {/* Card Body */}
                          <div className="p-4 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
                              {product.category}
                            </span>

                            <h3 
                              onClick={() => navigate(`/product/${product.slug}`)}
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

                        {/* Card Footer */}
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
                            onClick={(e) => handleAddToCart(product, e)}
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
              )}

            </div>

          </div>
        )}

      </div>

      {/* MOBILE BOTTOM DRAWER FILTERS */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end lg:hidden">
          <div className="bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-brand-maroon">Filter Sarees</h3>
              <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6 text-gray-500" /></button>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Category</label>
              <div className="flex flex-wrap gap-2 text-xs">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={`px-3 py-1.5 rounded-lg border ${selectedCategory === c ? 'bg-brand-maroon text-brand-gold font-bold' : 'bg-gray-50'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full bg-brand-maroon text-brand-gold py-3 rounded-xl font-bold uppercase text-xs"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
