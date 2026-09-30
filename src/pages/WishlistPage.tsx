import React from 'react';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { toPersianDigits } from '../utils/formatters';

interface WishlistPageProps {
  wishlistIds: number[];
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (p: Product, e: React.MouseEvent) => void;
  onNavigateToShop: () => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  allProducts,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  onNavigateToShop,
}) => {
  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2A3E2D]">لیست علاقه‌مندی‌ها</h1>
          <p className="text-xs text-stone-500 mt-1">
            {toPersianDigits(wishlistedProducts.length)} دمنوش ذخیره‌شده برای خریدهای آتی
          </p>
        </div>
        <button
          onClick={onNavigateToShop}
          className="text-xs text-[#4F6F52] hover:text-[#2A3E2D] font-bold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <span>مشاهده همه محصولات</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-8 sm:p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-stone-800">لیست علاقه‌مندی‌های شما خالی است</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            با کلیک روی آیکون قلب در کنار هر دمنوش، می‌توانید موارد دلخواه خود را در این بخش ذخیره کنید.
          </p>
          <button
            onClick={onNavigateToShop}
            className="px-5 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            گشت‌وگذار در فروشگاه
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}

    </div>
  );
};
