import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Category, Product, TemperamentType } from '../types';
import { ProductCard } from '../components/ProductCard';
import { toPersianDigits, formatToman, getTemperamentLabel } from '../utils/formatters';

interface ShopPageProps {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  wishlist: number[];
  onToggleWishlist: (p: Product, e: React.MouseEvent) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  categories,
  initialCategory = '',
  initialSearch = '',
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedTemperament, setSelectedTemperament] = useState<string>('all');
  const [caffeineFreeOnly, setCaffeineFreeOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(900000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory && p.category.slug !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.english_name.toLowerCase().includes(q) ||
            p.ingredients.toLowerCase().includes(q) ||
            p.benefits.toLowerCase().includes(q) ||
            p.short_description.toLowerCase().includes(q);
          if (!matches) return false;
        }
        // Temperament filter
        if (selectedTemperament !== 'all' && p.temperament !== selectedTemperament) {
          return false;
        }
        // Caffeine filter
        if (caffeineFreeOnly && !p.caffeine_free) {
          return false;
        }
        // Price filter
        const finalPrice = p.discount_price || p.price;
        if (finalPrice > maxPrice) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        const priceA = a.discount_price || a.price;
        const priceB = b.discount_price || b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        if (sortBy === 'popularity') return b.sales_count - a.sales_count;
        if (sortBy === 'rating') return b.rating_average - a.rating_average;
        return b.id - a.id; // newest
      });
  }, [products, selectedCategory, searchQuery, selectedTemperament, caffeineFreeOnly, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSelectedTemperament('all');
    setCaffeineFreeOnly(false);
    setMaxPrice(900000);
    setSortBy('newest');
  };

  const hasActiveFilters =
    selectedCategory !== '' ||
    searchQuery !== '' ||
    selectedTemperament !== 'all' ||
    caffeineFreeOnly ||
    maxPrice < 900000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D]">
            فروشگاه دمنوش‌ها و چای‌های گیاهی
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            مشاهده {toPersianDigits(filteredProducts.length)} دمنوش ارگانیک و دست‌چین
          </p>
        </div>

        {/* Live Search input */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              placeholder="جستجوی نام گیاه، خاصیت یا طبع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg flex items-center gap-1.5 shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>فیلترها</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters (3 cols) + Product Grid (9 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Filters Sidebar (Desktop sticky sidebar + Mobile modal) */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
            <div className="bg-white rounded-t-2xl w-full max-h-[85vh] p-5 overflow-y-auto space-y-5 animate-slideUp">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#4F6F52]" />
                  <span>فیلترهای محصولات</span>
                </h3>
                <div className="flex items-center gap-3">
                  {hasActiveFilters && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs text-rose-600 font-semibold cursor-pointer"
                    >
                      حذف همه
                    </button>
                  )}
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* 1. Category Filter */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-800">دسته‌بندی دمنوش</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('')}
                    className={`text-right px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between border ${
                      selectedCategory === ''
                        ? 'bg-[#4F6F52] text-white border-[#4F6F52] font-bold'
                        : 'border-stone-200 text-stone-700 bg-stone-50'
                    }`}
                  >
                    <span>همه دسته‌ها</span>
                    <span>{toPersianDigits(products.length)}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`text-right px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between border truncate ${
                        selectedCategory === cat.slug
                          ? 'bg-[#4F6F52] text-white border-[#4F6F52] font-bold'
                          : 'border-stone-200 text-stone-700 bg-stone-50'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Temperament Filter */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <h4 className="text-xs font-bold text-stone-800">طبع و مزاج گیاهی</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'all', label: 'همه طبع‌ها' },
                    { id: 'warm', label: 'گرم و خشک' },
                    { id: 'warm_wet', label: 'گرم و تر' },
                    { id: 'cold', label: 'سرد و خشک' },
                    { id: 'cold_wet', label: 'سرد و تر' },
                    { id: 'moderate', label: 'معتدل' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTemperament(item.id)}
                      className={`px-2 py-2 text-xs rounded-lg border text-center transition-colors ${
                        selectedTemperament === item.id
                          ? 'bg-[#4F6F52] text-white border-[#4F6F52] font-semibold'
                          : 'border-stone-200 text-stone-700 bg-stone-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Caffeine Filter */}
              <div className="pt-3 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 p-2 bg-stone-50 rounded-lg border border-stone-200">
                  <input
                    type="checkbox"
                    checked={caffeineFreeOnly}
                    onChange={(e) => setCaffeineFreeOnly(e.target.checked)}
                    className="rounded text-[#4F6F52] focus:ring-[#4F6F52] w-4 h-4"
                  />
                  <span className="font-semibold">فقط دمنوش‌های بدون کافئین</span>
                </label>
              </div>

              {/* 4. Price Slider */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex justify-between text-xs text-stone-800">
                  <span className="font-bold">حداکثر قیمت:</span>
                  <span className="font-mono text-[#4F6F52] font-bold">{formatToman(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="900000"
                  step="20000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#4F6F52] cursor-pointer"
                />
              </div>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
              >
                مشاهده {toPersianDigits(filteredProducts.length)} دمنوش
              </button>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-5 rounded-xl border border-stone-200 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#4F6F52]" />
              <span>فیلترهای تخصصی</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-stone-800">دسته‌بندی دمنوش</h4>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className={`w-full text-right px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                  selectedCategory === ''
                    ? 'bg-[#F4F6F0] font-bold text-[#4F6F52]'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                <span>همه دسته‌بندی‌ها</span>
                <span>{toPersianDigits(products.length)}</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`w-full text-right px-2.5 py-1.5 rounded-md text-xs transition-colors flex items-center justify-between ${
                    selectedCategory === cat.slug
                      ? 'bg-[#F4F6F0] font-bold text-[#4F6F52]'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span>{toPersianDigits(cat.products_count || 3)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Temperament Filter (طبع گیاهی) */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-800">طبع و مزاج گیاهی</h4>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'all', label: 'همه طبع‌ها' },
                { id: 'warm', label: 'گرم و خشک' },
                { id: 'warm_wet', label: 'گرم و تر' },
                { id: 'cold', label: 'سرد و خشک' },
                { id: 'cold_wet', label: 'سرد و تر' },
                { id: 'moderate', label: 'معتدل' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedTemperament(item.id)}
                  className={`px-2 py-1.5 text-[11px] rounded-md border text-center transition-colors ${
                    selectedTemperament === item.id
                      ? 'bg-[#4F6F52] text-white border-[#4F6F52] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Caffeine Filter */}
          <div className="pt-4 border-t border-stone-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700">
              <input
                type="checkbox"
                checked={caffeineFreeOnly}
                onChange={(e) => setCaffeineFreeOnly(e.target.checked)}
                className="rounded text-[#4F6F52] focus:ring-[#4F6F52] w-4 h-4"
              />
              <span className="font-medium">فقط دمنوش‌های بدون کافئین</span>
            </label>
          </div>

          {/* 4. Price Slider */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <div className="flex justify-between text-xs text-stone-800">
              <span className="font-bold">حداکثر قیمت:</span>
              <span className="font-mono text-[#4F6F52] font-bold">{formatToman(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="900000"
              step="20000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#4F6F52] cursor-pointer"
            />
          </div>
        </aside>

        {/* Product Catalog Display (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Sorting Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-stone-500">
              نمایش نتایج بر اساس:
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'newest', label: 'جدیدترین' },
                { id: 'popularity', label: 'محبوب‌ترین' },
                { id: 'rating', label: 'بیشترین امتیاز' },
                { id: 'price-asc', label: 'ارزان‌ترین' },
                { id: 'price-desc', label: 'گران‌ترین' },
              ].map((sortOption) => (
                <button
                  key={sortOption.id}
                  onClick={() => setSortBy(sortOption.id)}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    sortBy === sortOption.id
                      ? 'bg-[#2A3E2D] text-white font-bold'
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {sortOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-stone-800">هیچ محصولی با این مشخصات یافت نشد</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                می‌توانید فیلترهای اعمال شده را تغییر دهید یا واژه جستجوی دیگری را امتحان فرمایید.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#4F6F52] text-white text-xs font-semibold rounded-lg hover:bg-[#3D5640]"
              >
                بازنشانی همه فیلترها
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
