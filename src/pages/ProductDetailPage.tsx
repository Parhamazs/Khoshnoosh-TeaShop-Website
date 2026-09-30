import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Clock,
  Flame,
  MessageSquarePlus,
  Send,
  ArrowRight,
} from 'lucide-react';
import { Product, Review } from '../types';
import { formatToman, toPersianDigits, getTemperamentLabel, formatPersianDate } from '../utils/formatters';
import { BotanicalArtwork } from '../components/BotanicalArtwork';

interface ProductDetailPageProps {
  product: Product;
  onAddToCart: (p: Product, quantity: number) => void;
  onBack: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  relatedProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onAddToCart,
  onBack,
  isWishlisted,
  onToggleWishlist,
  relatedProducts,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'brewing' | 'warnings' | 'reviews'>('benefits');
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      user_name: 'مهدیه کریمی',
      rating: 5,
      comment: 'عطر و طعم فوق‌العاده‌ای داره! شب‌ها بعد از یک روز شلوغ کاری با کمی عسل دم می‌کنم و خوابم رو عمیقاً تنظیم کرده.',
      created_at: '2026-09-22',
    },
    {
      id: 2,
      user_name: 'علیرضا راد',
      rating: 5,
      comment: 'بسته‌بندی بسیار بهداشتی و شیک بود. گیاه کاملاً تازه است و اصلاً بوی کهنگی یا خاک نمیده. به شدت توصیه می‌کنم.',
      created_at: '2026-09-18',
    },
  ]);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const finalPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price && product.discount_price < product.price;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      const rev: Review = {
        id: Date.now(),
        user_name: newReviewAuthor.trim(),
        rating: newReviewRating,
        comment: newReviewComment.trim(),
        created_at: new Date().toISOString(),
      };
      setReviews([rev, ...reviews]);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumb / Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#4F6F52] transition-colors cursor-pointer"
      >
        <ArrowRight className="w-4 h-4" />
        <span>بازگشت به فروشگاه</span>
      </button>

      {/* Main PDP Grid: Gallery (Left in RTL, visual 6 cols) + Purchase Module (Right, 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Gallery / Visual Column (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl overflow-hidden border border-stone-200 aspect-4/3 bg-stone-100 shadow-sm relative">
            <BotanicalArtwork type={product.slug} className="w-full h-full" />
            <button
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-md transition-colors ${
                isWishlisted
                  ? 'bg-white text-rose-500 shadow-md'
                  : 'bg-black/20 text-white hover:bg-white hover:text-rose-500'
              }`}
              title="افزودن به علاقه‌مندی‌ها"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Botanical Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-center text-xs">
            <div className="p-3 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] flex sm:flex-col items-center justify-center gap-3 sm:gap-1">
              <Sparkles className="w-5 h-5 text-[#4F6F52] shrink-0 sm:mx-auto sm:mb-1" />
              <div>
                <span className="font-bold text-stone-800 block">برداشت دست‌چین</span>
                <span className="text-[11px] text-stone-500">ارگانیک ۱۰۰٪</span>
              </div>
            </div>
            <div className="p-3 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] flex sm:flex-col items-center justify-center gap-3 sm:gap-1">
              <Truck className="w-5 h-5 text-[#4F6F52] shrink-0 sm:mx-auto sm:mb-1" />
              <div>
                <span className="font-bold text-stone-800 block">ارسال ایمن</span>
                <span className="text-[11px] text-stone-500">بسته‌بندی رطوبت‌گیر</span>
              </div>
            </div>
            <div className="p-3 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] flex sm:flex-col items-center justify-center gap-3 sm:gap-1">
              <ShieldCheck className="w-5 h-5 text-[#4F6F52] shrink-0 sm:mx-auto sm:mb-1" />
              <div>
                <span className="font-bold text-stone-800 block">سلامت تضمینی</span>
                <span className="text-[11px] text-stone-500">بدون مواد افزودنی</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contiguous Purchase Module (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            {/* Metadata (Zero-pill discipline: unboxed text with separators) */}
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2 flex-wrap">
              <span>{product.category.name}</span>
              <span aria-hidden="true">·</span>
              <span>{getTemperamentLabel(product.temperament)}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#4F6F52] font-medium">وزن خالص: {toPersianDigits(product.weight)} گرم</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D] leading-tight mb-2">
              {product.name}
            </h1>
            <p className="text-xs text-stone-400 font-sans tracking-wide">
              {product.english_name}
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 pt-3 text-xs text-stone-600 flex-wrap">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-stone-800 font-mono">
                {toPersianDigits(product.rating_average)} از ۵
              </span>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="hover:text-[#4F6F52] underline cursor-pointer"
              >
                {toPersianDigits(reviews.length)} دیدگاه ثبت‌شده خریداران
              </button>
            </div>
          </div>

          {/* Pricing Module */}
          <div className="p-4 bg-[#FBFBFA] rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-stone-500 block mb-0.5">قیمت مصرف‌کننده:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-extrabold text-[#2A3E2D] font-mono">
                  {formatToman(finalPrice)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-stone-400 line-through font-mono">
                    {formatToman(product.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right sm:text-left">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                موجود در انبار ({toPersianDigits(product.stock)} بسته)
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Contiguous Buy Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center justify-center border border-stone-300 rounded-lg bg-white p-1 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-stone-100 text-stone-700 font-bold rounded cursor-pointer"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold text-stone-900 font-mono">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-stone-100 text-stone-700 font-bold rounded cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Primary Buy CTA */}
              <button
                type="button"
                onClick={() => onAddToCart(product, quantity)}
                className="w-full sm:flex-1 py-3.5 px-6 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن {toPersianDigits(quantity)} بسته به سبد خرید</span>
              </button>
            </div>

            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#4F6F52]" />
              <span>ضمانت بازگشت وجه در صورت عدم رضایت از عطر و تازگی دمنوش تا ۷ روز</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs for Botanical Details & Reviews */}
      <div className="pt-8 border-t border-stone-200">
        
        {/* Tab Buttons (Interactive filter controls) */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto text-xs font-medium mb-6">
          <button
            onClick={() => setActiveTab('benefits')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'benefits' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            خواص و فواید درمانی
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'ingredients' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            ترکیبات و اجزای ارگانیک
          </button>
          <button
            onClick={() => setActiveTab('brewing')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'brewing' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            دستور دم‌آوری اصولی
          </button>
          <button
            onClick={() => setActiveTab('warnings')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'warnings' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            موارد احتیاط و منع مصرف
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'reviews' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            دیدگاه‌های کاربران ({toPersianDigits(reviews.length)})
          </button>
        </div>

        {/* Tab Panels */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200">
          
          {activeTab === 'benefits' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#2A3E2D]">تاثیرات درمانی و بالینی گیاهی</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.benefits}
              </p>
              <div className="p-4 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] text-xs text-stone-600 leading-relaxed">
                <strong>نکته تخصصی طب سنتی:</strong> این دمنوش به واسطه طبیعت {getTemperamentLabel(product.temperament)} خود، به تعادل اخلاط و بازگرداندن انرژی حیاتی ارگان‌های اصلی بدن کمک شایانی می‌کند.
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-[#2A3E2D]">اجزای تشکیل‌دهنده این معجون گیاهی</h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.ingredients}
              </p>
              <p className="text-xs text-stone-500">
                تمامی گیاهان فوق به شیوه دستی و با رعایت استانداردهای بهداشتی بدون استفاده از سموم علف‌کش جمع‌آوری و بسته‌بندی شده‌اند.
              </p>
            </div>
          )}

          {activeTab === 'brewing' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2A3E2D]">
                <Clock className="w-5 h-5 text-[#DDA15E]" />
                <span>راهنمای گام‌به‌گام دم‌آوری</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.usage_method}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-bold block text-stone-800 mb-1">دمای بهینه آب:</span>
                  <span className="text-stone-600">۸۵ الی ۹۰ درجه سانتی‌گراد (پس از جوش آمدن آب، ۲ دقیقه صبر کنید)</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="font-bold block text-stone-800 mb-1">ظرف مناسب:</span>
                  <span className="text-stone-600">قوری شیشه‌ای پیرکس یا سرامیکی با حرارت غیرمستقیم وارمر</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span>نکات ایمنی و موارد احتیاط</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {product.warnings || 'این دمنوش گیاهی فاقد هرگونه ماده محرک بوده و برای تمامی افراد قابل استفاده است.'}
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="text-sm sm:text-base font-bold text-stone-900">
                  تجربه خریداران این دمنوش
                </h3>
                <span className="text-xs text-stone-500">
                  {toPersianDigits(reviews.length)} نظر تایید شده
                </span>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl border border-stone-100 bg-[#FBFBFA] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-800">{rev.user_name}</span>
                      <span className="text-stone-400">{formatPersianDate(rev.created_at)}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="pt-6 border-t border-stone-200">
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 mb-3 flex items-center gap-1.5">
                  <MessageSquarePlus className="w-4 h-4 text-[#4F6F52]" />
                  <span>ثبت نظر و تجربه شما از این محصول</span>
                </h4>

                {reviewSubmitted ? (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs">
                    نظر شما با موفقیت ثبت شد و پس از بررسی به نمایش درآمد. سپاس از همراهی شما!
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-stone-600 block mb-1">نام شما:</label>
                        <input
                          type="text"
                          required
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="مثال: نرگس موسوی"
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-stone-600 block mb-1">امتیاز شما:</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                        >
                          <option value={5}>۵ ستاره - عالی و فوق‌العاده</option>
                          <option value={4}>۴ ستاره - بسیار خوب</option>
                          <option value={3}>۳ ستاره - معمولی</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-stone-600 block mb-1">متن دیدگاه:</label>
                      <textarea
                        required
                        rows={3}
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="تجربه طعم، نحوه مصرف و اثرات آن بر آرامش یا گوارش..."
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#4F6F52]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2A3E2D] hover:bg-[#1E2B20] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ارسال دیدگاه</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-stone-200 space-y-6">
          <h3 className="text-xl font-extrabold text-[#2A3E2D]">
            دمنوش‌های مکمل و پیشنهادی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((p) => (
              <div
                key={p.id}
                onClick={() => onSelectProduct(p)}
                className="group p-4 bg-white rounded-xl border border-stone-200 hover:border-[#4F6F52] cursor-pointer transition-all flex gap-4 items-center"
              >
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-stone-100">
                  <BotanicalArtwork type={p.slug} className="w-full h-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#4F6F52] line-clamp-1 mb-1">
                    {p.name}
                  </h4>
                  <span className="text-[11px] text-stone-500 block mb-1">
                    {getTemperamentLabel(p.temperament)}
                  </span>
                  <span className="text-xs font-bold text-[#2A3E2D] font-mono">
                    {formatToman(p.discount_price || p.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
