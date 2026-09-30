import React from 'react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { formatToman, toPersianDigits, getTemperamentLabel } from '../utils/formatters';
import { BotanicalArtwork } from './BotanicalArtwork';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const finalPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price && product.discount_price < product.price;

  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-xl overflow-hidden border border-[#E8ECE0] hover:border-[#4F6F52]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
    >
      {/* Product Visual Container (65% visual weight) */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        <BotanicalArtwork type={product.slug} className="w-full h-full group-hover:scale-105 transition-transform duration-500" />
        
        {/* Wishlist toggle button */}
        <button
          type="button"
          onClick={(e) => onToggleWishlist(product, e)}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-white text-rose-500 shadow-sm'
              : 'bg-black/20 text-white hover:bg-white hover:text-rose-500'
          }`}
          title="افزودن به علاقه‌مندی‌ها"
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Weight tag (clean minimal) */}
        <div className="absolute top-3 right-3 text-[11px] font-medium text-stone-200 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-sm">
          {toPersianDigits(product.weight)} گرم
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Metadata Row: Zero-pill discipline (clean text with typographic separators) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 flex-wrap">
            <span>{product.category.name}</span>
            <span aria-hidden="true">·</span>
            <span>{getTemperamentLabel(product.temperament)}</span>
            {product.caffeine_free && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#4F6F52]">بدون کافئین</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-stone-900 group-hover:text-[#4F6F52] transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Short summary */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {product.short_description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-auto">
          {/* Rating & Price */}
          <div>
            <div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
              <span className="font-semibold text-stone-700">{toPersianDigits(product.rating_average)}</span>
              <span className="text-stone-400">({toPersianDigits(product.review_count)})</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#2A3E2D] font-mono">
                {formatToman(finalPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  {formatToman(product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className="p-2.5 bg-[#F4F6F0] hover:bg-[#4F6F52] text-[#4F6F52] hover:text-white rounded-lg transition-colors cursor-pointer"
            title="افزودن به سبد خرید"
            aria-label="افزودن به سبد خرید"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
