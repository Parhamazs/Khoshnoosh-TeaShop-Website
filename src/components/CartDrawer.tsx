import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';
import { BotanicalArtwork } from './BotanicalArtwork';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onProceedToCheckout: () => void;
  onViewShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onViewShop,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300000;
  const subtotal = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 35000;
  const finalTotal = subtotal - discountAmount + shippingCost;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'KHOSH10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else if (couponCode.toUpperCase() === 'BAHAR') {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('کد تخفیف وارد شده معتبر نیست. (کد تست: KHOSH10)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FBFBFA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4F6F52]" />
              <h2 className="text-base font-bold text-stone-900">
                سبد خرید شما ({toPersianDigits(items.reduce((s, i) => s + i.quantity, 0))})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
              aria-label="بستن سبد"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#FEFAE0]/80 p-3 border-b border-[#E8ECE0] text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-[#5C5332] font-medium mb-1.5">
                  فقط <span className="font-bold text-[#283618]">{formatToman(remainingForFreeShipping)}</span> دیگر تا ارسال رایگان سراسری!
                </p>
                <div className="w-full h-1.5 bg-[#E8EDE0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4F6F52] transition-all duration-300 rounded-full"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>تبریک! سفارش شما مشمول ارسال رایگان شد.</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800 mb-1">سبد خرید شما خالی است</h3>
                <p className="text-xs text-stone-500 mb-6">
                  طعم و عطر طبیعی دمنوش‌های خوشنوش را به روزمرگی خود اضافه کنید.
                </p>
                <button
                  onClick={() => { onClose(); onViewShop(); }}
                  className="px-5 py-2.5 bg-[#4F6F52] text-white text-xs font-semibold rounded-lg hover:bg-[#3D5640] transition-colors"
                >
                  مشاهده دمنوش‌های گیاهی
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg border border-stone-100 hover:border-stone-200 bg-[#FDFDFD]"
                >
                  {/* Item Image */}
                  <div className="w-18 h-18 shrink-0 rounded-md overflow-hidden bg-stone-100 border border-stone-200">
                    <BotanicalArtwork type={item.product.slug} className="w-full h-full" />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                          title="حذف از سبد"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {toPersianDigits(item.product.weight)} گرم
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 rounded-r-md"
                          aria-label="کاهش تعداد"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-stone-800">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 rounded-l-md"
                          aria-label="افزایش تعداد"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <span className="text-xs font-bold text-[#2A3E2D] font-mono">
                        {formatToman(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FBFBFA] space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف (مثال: KHOSH10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg"
                >
                  اعمال
                </button>
              </form>
              {couponApplied && (
                <div className="text-[11px] text-emerald-700">
                  کد تخفیف {toPersianDigits(discountPercent)}٪ با موفقیت اعمال شد.
                </div>
              )}
              {couponError && (
                <div className="text-[11px] text-rose-600">{couponError}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>مجموع اقلام:</span>
                  <span className="font-mono">{formatToman(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>تخفیف ویژه:</span>
                    <span className="font-mono">- {formatToman(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>هزینه ارسال:</span>
                  <span className="font-mono">
                    {shippingCost === 0 ? 'رایگان' : formatToman(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-[#2A3E2D] font-mono">{formatToman(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                type="button"
                onClick={() => { onClose(); onProceedToCheckout(); }}
                className="w-full py-3 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تکمیل سفارش و تسویه‌حساب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
