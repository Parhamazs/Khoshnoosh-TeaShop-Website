import React from 'react';
import { Home, Store, ShoppingBag, Heart, User } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface MobileBottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  wishlistCount,
  onOpenCart,
  isLoggedIn,
  onOpenAuth,
}) => {
  const handleAccountClick = () => {
    if (isLoggedIn) {
      onNavigate('profile');
    } else {
      onOpenAuth();
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8ECE0] shadow-[0_-4px_16px_rgba(0,0,0,0.04)] h-14 px-2 flex items-center justify-around">
      {/* 1. Home */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'home' ? 'text-[#4F6F52] font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5">خانه</span>
      </button>

      {/* 2. Shop */}
      <button
        type="button"
        onClick={() => onNavigate('shop')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'shop' || currentTab === 'product-detail'
            ? 'text-[#4F6F52] font-bold'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <Store className={`w-5 h-5 ${currentTab === 'shop' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5">فروشگاه</span>
      </button>

      {/* 3. Cart Trigger */}
      <button
        type="button"
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center flex-1 py-1 text-stone-500 hover:text-stone-800 relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 stroke-2" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#4F6F52] text-white text-[9px] font-bold font-mono px-1 min-w-[15px] h-[15px] rounded-full flex items-center justify-center">
              {toPersianDigits(cartCount)}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">سبد خرید</span>
      </button>

      {/* 4. Wishlist */}
      <button
        type="button"
        onClick={() => onNavigate('wishlist')}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'wishlist' ? 'text-[#4F6F52] font-bold' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <div className="relative">
          <Heart className={`w-5 h-5 ${currentTab === 'wishlist' ? 'fill-current stroke-[2.5]' : 'stroke-2'}`} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-[#DDA15E] text-[#283618] text-[9px] font-bold font-mono px-1 min-w-[15px] h-[15px] rounded-full flex items-center justify-center">
              {toPersianDigits(wishlistCount)}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">علاقه‌مندی</span>
      </button>

      {/* 5. Account / Profile */}
      <button
        type="button"
        onClick={handleAccountClick}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors cursor-pointer ${
          currentTab === 'profile' || currentTab === 'orders' || currentTab === 'addresses'
            ? 'text-[#4F6F52] font-bold'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        <User className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px] mt-0.5">{isLoggedIn ? 'حساب من' : 'ورود'}</span>
      </button>
    </nav>
  );
};
