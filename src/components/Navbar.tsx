import React, { useState } from 'react';
import { ShoppingBag, Heart, User, Search, Terminal, Menu, X, LogOut, Package, MapPin, ChevronLeft } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, slug?: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenApiInspector: () => void;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  userName?: string;
  userEmail?: string;
  onLogout?: () => void;
  onSearch: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenApiInspector,
  onOpenAuth,
  isLoggedIn,
  userName,
  userEmail,
  onLogout,
  onSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      onNavigate('shop');
      setShowSearchModal(false);
    }
  };

  const handleMobileNav = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const handleMobileLogout = () => {
    setMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E8ECE0] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2">
            
            {/* Zone 1: Hamburger (mobile) + Single text element wordmark */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
                aria-label="منوی سایت"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 group text-right cursor-pointer shrink-0"
              >
                <BrandLogo className="w-8 h-8 sm:w-9 sm:h-9" />
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#2A3E2D]">
                    خوشنوش
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-[#A9B388] -mt-1 hidden sm:inline">
                    دمنوش‌های ارگانیک و اصیل
                  </span>
                </div>
              </button>
            </div>

            {/* Zone 2: 4-6 clean text navigation links (Top Bar Contract on Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-stone-600">
              <button
                onClick={() => onNavigate('home')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'home'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                صفحه اصلی
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'shop'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                فروشگاه دمنوش‌ها
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'blog'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                دانشنامه و وبلاگ
              </button>
              <button
                onClick={() => onNavigate('about')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'about'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                درباره خوشنوش
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'contact'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                تماس با ما
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentTab === 'faq'
                    ? 'text-[#2A3E2D] font-bold border-b-2 border-[#4F6F52]'
                    : 'hover:text-[#2A3E2D]'
                }`}
              >
                سوالات متداول
              </button>
            </nav>

            {/* Zone 3: 1-2 primary actions + compact responsive icon controls */}
            <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
              {/* Quick Search trigger */}
              <button
                type="button"
                onClick={() => setShowSearchModal(true)}
                className="p-1.5 sm:p-2 text-stone-600 hover:text-[#2A3E2D] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                title="جستجوی دمنوش"
                aria-label="جستجو"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => onNavigate('wishlist')}
                className="relative p-1.5 sm:p-2 text-stone-600 hover:text-[#2A3E2D] rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                title="لیست علاقه‌مندی‌ها"
                aria-label="لیست علاقه‌مندی‌ها"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#DDA15E] text-[#283618] text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center">
                    {toPersianDigits(wishlistCount)}
                  </span>
                )}
              </button>

              {/* Architecture & API Inspector Button (desktop & tablet) */}
              <button
                type="button"
                onClick={onOpenApiInspector}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#4F6F52] bg-[#F4F6F0] hover:bg-[#E8EDE0] rounded-lg transition-colors border border-[#D5DFC7] cursor-pointer"
                title="مشاهده معماری بک‌اند و مستندات Swagger API"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>معماری API</span>
              </button>

              {/* User Profile / Login (Responsive sizing: icon-only on mobile, never causes overflow) */}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-[#2A3E2D] bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  title="پروفایل کاربری"
                >
                  <User className="w-4 h-4 text-[#4F6F52]" />
                  <span className="hidden lg:inline max-w-[80px] truncate">{userName || 'حساب من'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="flex items-center gap-1 p-1.5 sm:px-3 sm:py-1.5 text-xs font-medium text-[#2A3E2D] border border-stone-300 hover:border-[#4F6F52] hover:text-[#4F6F52] rounded-lg transition-colors cursor-pointer"
                  title="ورود به حساب کاربری"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">ورود</span>
                </button>
              )}

              {/* Shopping Cart Button (Responsive: icon+badge on small, with label on sm+) */}
              <button
                type="button"
                onClick={onOpenCart}
                className="flex items-center gap-1 sm:gap-2 p-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white bg-[#4F6F52] hover:bg-[#3D5640] rounded-lg shadow-xs transition-colors cursor-pointer shrink-0"
                aria-label="سبد خرید"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">سبد خرید</span>
                <span className="bg-[#3D5640] text-emerald-100 text-[10px] sm:text-[11px] px-1 sm:px-1.5 py-0.5 rounded-full font-mono font-bold">
                  {toPersianDigits(cartCount)}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer with complete user controls */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8ECE0] bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn max-h-[85vh] overflow-y-auto">
            
            {/* User Account Card in Mobile Menu */}
            <div className="p-3 bg-[#F4F6F0] rounded-xl border border-[#D5DFC7]">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#4F6F52] text-white flex items-center justify-center font-bold text-sm">
                        {userName ? userName.slice(0, 1) : 'خ'}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">{userName || 'کاربر گرامی'}</p>
                        <p className="text-[10px] text-stone-500 font-mono">{userEmail || ''}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleMobileLogout}
                      className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 bg-white px-2 py-1 rounded-md border border-rose-200 font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>خروج</span>
                    </button>
                  </div>

                  {/* Mobile Account Fast Links */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] text-center">
                    <button
                      onClick={() => handleMobileNav('profile')}
                      className="p-1.5 bg-white rounded-lg border border-stone-200 hover:border-[#4F6F52] text-stone-700 font-medium"
                    >
                      پروفایل
                    </button>
                    <button
                      onClick={() => handleMobileNav('orders')}
                      className="p-1.5 bg-white rounded-lg border border-stone-200 hover:border-[#4F6F52] text-stone-700 font-medium"
                    >
                      سفارش‌ها
                    </button>
                    <button
                      onClick={() => handleMobileNav('addresses')}
                      className="p-1.5 bg-white rounded-lg border border-stone-200 hover:border-[#4F6F52] text-stone-700 font-medium"
                    >
                      آدرس‌ها
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#4F6F52]" />
                    <span className="text-xs font-semibold text-stone-800">حساب کاربری خوشنوش</span>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                    className="px-3 py-1.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    ورود / ثبت‌نام
                  </button>
                </div>
              )}
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 text-sm font-medium text-stone-700">
              <button
                onClick={() => handleMobileNav('home')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>صفحه اصلی</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleMobileNav('shop')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>فروشگاه دمنوش‌ها</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleMobileNav('wishlist')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>لیست علاقه‌مندی‌ها</span>
                <span className="text-xs font-mono text-stone-400">{toPersianDigits(wishlistCount)}</span>
              </button>
              <button
                onClick={() => handleMobileNav('blog')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>دانشنامه و وبلاگ سلامت</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleMobileNav('about')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>درباره خوشنوش</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleMobileNav('contact')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>تماس با ما</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
              <button
                onClick={() => handleMobileNav('faq')}
                className="w-full text-right py-2 px-2 rounded-lg hover:bg-stone-50 flex items-center justify-between"
              >
                <span>سوالات متداول</span>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
            </div>

            {/* Architecture / Developer tool */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenApiInspector(); }}
                className="flex items-center gap-1.5 text-xs text-[#4F6F52] font-semibold p-1"
              >
                <Terminal className="w-4 h-4" />
                <span>مشاهده معماری API و Swagger</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-4 sm:p-5 border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs sm:text-sm font-bold text-stone-800">جستجو در دمنوش‌های خوشنوش</span>
              <button onClick={() => setShowSearchModal(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="مثال: گل گاوزبان، زعفران، آرامش خواب، طبع گرم..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  autoFocus
                  className="w-full pl-10 pr-3 py-2.5 sm:py-3 bg-[#FBFBFA] border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-[#4F6F52] focus:ring-1 focus:ring-[#4F6F52]"
                />
                <button
                  type="submit"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-[#4F6F52] text-white rounded-md hover:bg-[#3D5640]"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[11px] text-stone-500">
              <span>پیشنهادها:</span>
              <button onClick={() => { setSearchInput('گل گاوزبان'); onSearch('گل گاوزبان'); onNavigate('shop'); setShowSearchModal(false); }} className="hover:text-[#4F6F52] underline">گل گاوزبان</button>
              <span>·</span>
              <button onClick={() => { setSearchInput('زعفران'); onSearch('زعفران'); onNavigate('shop'); setShowSearchModal(false); }} className="hover:text-[#4F6F52] underline">زعفران و زنجبیل</button>
              <span>·</span>
              <button onClick={() => { setSearchInput('بابونه'); onSearch('بابونه'); onNavigate('shop'); setShowSearchModal(false); }} className="hover:text-[#4F6F52] underline">بابونه آرام‌بخش</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
