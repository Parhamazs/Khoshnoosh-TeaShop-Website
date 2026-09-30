import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Shield,
  HeartHandshake,
  Leaf,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Trophy,
  Dumbbell,
  Flame,
  Check,
  Gift,
  Star,
} from 'lucide-react';
import { Category, Product, BlogPost } from '../types';
import { ProductCard } from '../components/ProductCard';
import { BotanicalArtwork } from '../components/BotanicalArtwork';
import { toPersianDigits, formatPersianDate, formatToman } from '../utils/formatters';

interface HomePageProps {
  categories: Category[];
  featuredProducts: Product[];
  blogPosts: BlogPost[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  onSelectCategory: (categorySlug: string) => void;
  onNavigate: (tab: string, slug?: string) => void;
  wishlist: number[];
  onToggleWishlist: (p: Product, e: React.MouseEvent) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  categories,
  featuredProducts,
  blogPosts,
  onSelectProduct,
  onAddToCart,
  onSelectCategory,
  onNavigate,
  wishlist,
  onToggleWishlist,
}) => {
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);

  // Curated Special Offers as requested: Best Sellers, Athletes & Performance, Metabolism & Fitness, Luxury Gift
  const specialOffers = [
    {
      id: 'bestseller',
      categoryTab: 'پرفروش‌ها',
      badge: 'پرفروش‌ترین دمنوش فصل',
      icon: Star,
      title: 'دمنوش آرامش گل‌گاوزبان و سنبل‌الطیب',
      subtitle: 'معجون اصیل سنتی ایران برای آرامش عمیق و رفع خستگی عصبی',
      slug: 'gol-gavzaban-sonboltieb',
      targetCategory: 'relaxation-sleep',
      features: [
        'کاهش استرس و تسکین تپش قلب',
        'بهبود کیفیت خواب عمیق شبانه',
        'طبع گرم و تر با غنچه گل‌محمدی',
      ],
      price: 158000,
      originalPrice: 185000,
      weight: 120,
      gradientBg: 'from-[#2B1B30] via-[#42254B] to-[#1F1424]',
      badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
      artworkType: 'gol-gavzaban-sonboltieb',
    },
    {
      id: 'athletes',
      categoryTab: 'مخصوص ورزشکاران',
      badge: 'مخصوص ورزشکاران و پرانرژی',
      icon: Dumbbell,
      title: 'دمنوش شاهانه زعفران، زنجبیل و هل سبز',
      subtitle: 'اکسیر نشاط‌آور و تقویت عضلات قبل و بعد از تمرینات سنگین',
      slug: 'saffron-ginger-cardamom',
      targetCategory: 'energy-vitality',
      features: [
        'افزایش استقامت بدنی و ریکاوری عضلات',
        'بهبود گردش خون و ضداسپاسم مفاصل',
        'انرژی پایدار و نشاط‌آور طبیعی بدون افت قند',
      ],
      price: 245000,
      originalPrice: 280000,
      weight: 90,
      gradientBg: 'from-[#3A170F] via-[#5C2314] to-[#240E0A]',
      badgeColor: 'bg-orange-500/25 text-orange-200 border-orange-400/30',
      artworkType: 'saffron-ginger-cardamom',
    },
    {
      id: 'fitness',
      categoryTab: 'تناسب اندام و هضم',
      badge: 'مخصوص هضم و چربی‌سوزی',
      icon: Flame,
      title: 'دمنوش نعناع فلفلی، رازیانه و زیره کوهی',
      subtitle: 'فرمولاسیون گیاهی برای سبکی بعد از غذا و پاکسازی کبد',
      slug: 'peppermint-fennel-digestive',
      targetCategory: 'digestive-slimming',
      features: [
        'رفع سریع نفخ و دل‌پیچه معده',
        'کمک به سوخت‌وساز و چربی‌سوزی طبیعی',
        'طبع معتدل با خنکی نعناع فلفلی تازه',
      ],
      price: 125000,
      originalPrice: 140000,
      weight: 110,
      gradientBg: 'from-[#142A1D] via-[#244A32] to-[#0F1F15]',
      badgeColor: 'bg-emerald-500/25 text-emerald-200 border-emerald-400/30',
      artworkType: 'peppermint-fennel-digestive',
    },
    {
      id: 'gift',
      categoryTab: 'بسته هدیه',
      badge: 'پیشنهاد ویژه تشریفات و هدیه',
      icon: Gift,
      title: 'جعبه هدیه چوبی «چهار فصل سلامتی» خوشنوش',
      subtitle: 'جعبه چوب گردوی دست‌ساز به همراه قوری پیرکس وارمردار',
      slug: 'royal-herbal-gift-box',
      targetCategory: 'gifts-accessories',
      features: [
        'شامل ۴ شیشه دمنوش منتخب دست‌چین',
        'قوری پیرکس شعله‌مستقیم وارمردار',
        'بسته‌بندی نفیس و اصیل اداری و خانگی',
      ],
      price: 790000,
      originalPrice: 890000,
      weight: 850,
      gradientBg: 'from-[#281A12] via-[#3E291C] to-[#18100B]',
      badgeColor: 'bg-purple-400/20 text-purple-200 border-purple-400/30',
      artworkType: 'royal-herbal-gift-box',
    },
  ];

  const currentOffer = specialOffers[activeOfferIndex];

  const handlePrevOffer = () => {
    setActiveOfferIndex((prev) => (prev === 0 ? specialOffers.length - 1 : prev - 1));
  };

  const handleNextOffer = () => {
    setActiveOfferIndex((prev) => (prev === specialOffers.length - 1 ? 0 : prev + 1));
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const product = featuredProducts.find((p) => p.slug === currentOffer.slug) || featuredProducts[0];
    onAddToCart(product, e);
  };

  const handleViewDetail = () => {
    const product = featuredProducts.find((p) => p.slug === currentOffer.slug);
    if (product) {
      onSelectProduct(product);
    } else {
      onNavigate('shop');
    }
  };
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section: Storefront Hero Intro */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F6F0] via-[#F9FAF6] to-[#FBFBFA] border-b border-[#E8ECE0] pt-8 sm:pt-14 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            
            {/* Natural kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-[#D5DFC7] text-xs font-semibold text-[#4F6F52] shadow-xs">
              <Leaf className="w-3.5 h-3.5 text-[#A9B388]" />
              <span>برگرفته از دست‌چین بکرترین کوهستان‌های ایران</span>
              <span aria-hidden="true">·</span>
              <span>۱۰۰٪ طبیعی و بدون اسانس</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#2A3E2D] leading-[1.3] text-balance">
              آرامش در هر جرعه، <br />
              <span className="text-[#4F6F52]">عطر اصیل دمنوش‌های طبیعی و ارگانیک</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
              خوشنوش حاصل ترکیب آیین کهن گیاه‌درمانی ایرانی و دانش مدرن داروسازی گیاهی است. خالص‌ترین گل‌ها، چای‌های بهاره و معجون‌های درمانی بدون هیچ‌گونه ماده شیمیایی برای سلامت جسم و آرامش جان شما.
            </p>

            {/* Hero Trust Indicators */}
            <div className="pt-2 flex items-center justify-center gap-4 sm:gap-6 text-xs text-stone-600 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#4F6F52]" />
                <span>تضمین اصالت گیاهی</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#DDA15E]" />
                <span>برداشت تازه سال ۱۴۰۳-۱۴۰۴</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#4F6F52]" />
                <span>ارسال رایگان بالای ۳۰۰ هزار تومان</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Expansive Special Offers Showcase (پیشنهادهای ویژه و منتخب خوشنوش) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D5DFC7] shadow-md overflow-hidden">
          
          {/* Showcase Top Control Bar: Category Pills + Next/Prev Arrow Switchers */}
          <div className="p-4 sm:p-5 bg-[#F9FAF6] border-b border-[#E8ECE0] flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#DDA15E] animate-ping" />
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[#2A3E2D]">
                  پیشنهادهای ویژه و شگفت‌انگیز خوشنوش
                </h2>
                <p className="text-[11px] text-[#4F6F52]">
                  تخفیف ویژه دوره‌ای با ارسال سریع
                </p>
              </div>
            </div>

            {/* Category Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {specialOffers.map((offer, idx) => {
                const IconComponent = offer.icon;
                const isActive = idx === activeOfferIndex;
                return (
                  <button
                    key={offer.id}
                    type="button"
                    onClick={() => setActiveOfferIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#4F6F52] text-white border-[#4F6F52] font-bold shadow-xs'
                        : 'border-[#E8ECE0] bg-white text-stone-700 hover:border-[#4F6F52] hover:bg-[#F4F6F0]'
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{offer.categoryTab}</span>
                  </button>
                );
              })}
            </div>

            {/* Left & Right Switcher Buttons < > */}
            <div className="flex items-center justify-center gap-2 self-center sm:self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={handlePrevOffer}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#4F6F52] text-stone-700 hover:text-white border border-stone-200 hover:border-[#4F6F52] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                title="پیشنهاد قبلی (>)"
                aria-label="پیشنهاد قبلی"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <span className="text-xs font-mono font-bold text-stone-600 px-1">
                {toPersianDigits(activeOfferIndex + 1)} از {toPersianDigits(specialOffers.length)}
              </span>

              <button
                type="button"
                onClick={handleNextOffer}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#4F6F52] text-stone-700 hover:text-white border border-stone-200 hover:border-[#4F6F52] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                title="پیشنهاد بعدی (<)"
                aria-label="پیشنهاد بعدی"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Showcase Main Content Card: 12 Columns Full Width */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Column 1: Details & Benefits (7 cols on desktop) */}
            <div className="lg:col-span-7 p-5 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                
                {/* Badge row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentOffer.badgeColor}`}>
                    {currentOffer.badge}
                  </span>
                  <span className="text-xs text-stone-500">
                    وزن بسته: <strong className="text-stone-800 font-mono">{toPersianDigits(currentOffer.weight)}</strong> گرم
                  </span>
                </div>

                {/* Offer Display Title */}
                <div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-[#2A3E2D] leading-tight">
                    {currentOffer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {currentOffer.subtitle}
                  </p>
                </div>

                {/* 3 Benefit Feature Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {currentOffer.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-xl bg-[#F9FAF6] border border-[#E8EDE0] space-y-1"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#4F6F52] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <p className="text-xs font-semibold text-stone-800 leading-snug">{feat}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Price & Primary Action Row */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-stone-400 line-through font-mono block">
                    {formatToman(currentOffer.originalPrice)}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-[#2A3E2D] font-mono">
                      {formatToman(currentOffer.price)}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      تخفیف ویژه جشنواره
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleQuickBuy}
                    className="flex-1 sm:flex-none px-6 py-3 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>خرید سریع دمنوش</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleViewDetail}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl border border-stone-300 transition-colors cursor-pointer text-center"
                  >
                    مشاهده جزئیات
                  </button>
                </div>
              </div>

            </div>

            {/* Column 2: Botanical Artwork Showcase (5 cols on desktop) */}
            <div className={`lg:col-span-5 bg-gradient-to-br ${currentOffer.gradientBg} p-6 sm:p-10 flex flex-col justify-between items-center relative overflow-hidden text-white min-h-[260px] sm:min-h-[340px]`}>
              
              {/* Background ambient accents */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-black/30 blur-2xl pointer-events-none" />

              {/* Artwork Frame */}
              <div className="w-full max-w-xs aspect-square rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative z-10 my-auto">
                <BotanicalArtwork type={currentOffer.artworkType} className="w-full h-full" />
              </div>

              {/* Dots indicator at bottom of artwork */}
              <div className="relative z-10 flex items-center gap-2 pt-4">
                {specialOffers.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveOfferIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === activeOfferIndex
                        ? 'w-7 bg-[#DDA15E]'
                        : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`رفتن به پیشنهاد ${dotIdx + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <span className="text-xs font-bold text-[#4F6F52] tracking-wider">دسته‌بندی‌ها</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D] mt-1">
              دمنوش مناسب حال و نیاز شما
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#4F6F52] hover:text-[#2A3E2D] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه دسته‌ها</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Categories Grid (grid-cols-1 on small mobile, scaling cleanly) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.slug);
                onNavigate('shop');
              }}
              className="group p-4 sm:p-5 bg-white rounded-xl border border-[#E8ECE0] hover:border-[#4F6F52] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-0 mb-2 sm:mb-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F4F6F0] group-hover:bg-[#4F6F52] text-[#4F6F52] group-hover:text-white flex items-center justify-center transition-colors shrink-0 sm:mb-4">
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#4F6F52] transition-colors mb-0.5 sm:mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
              <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span>{toPersianDigits(cat.products_count || 4)} دمنوش</span>
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid (3 columns desktop, generous whitespace) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#4F6F52] tracking-wider">محبوب‌ترین ترکیبات</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D] mt-1">
              پرفروش‌ترین دمنوش‌های گیاهی خوشنوش
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#4F6F52] hover:text-[#2A3E2D] flex items-center gap-1 cursor-pointer"
          >
            <span>ورود به فروشگاه کامل</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.slice(0, 6).map((product) => (
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
      </section>

      {/* 4. Craftsmanship & Natural Story (Section Ceiling - 1 deep story section) */}
      <section className="bg-[#F4F6F0] border-y border-[#E8ECE0] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#4F6F52] tracking-wider">آیین برداشت و اصالت</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2A3E2D] leading-tight">
                از مزارع کوهستانی تا فنجان گرم آرامش شما
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                در خوشنوش، هیچ گیاهی به صورت انبوه صنعتی یا با فرآوری‌های شیمیایی بسته‌بندی نمی‌شود. ما با مزارع سنتی در الموت قزوین، کاشان، لاهیجان و قائنات همکاری مستقیم داریم تا گل‌ها و برگ‌ها در اوج شادابی فصلی و به دور از آلودگی‌های شهری چیده شوند.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4F6F52] text-white flex items-center justify-center shrink-0 text-xs font-bold">۱</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">خشک‌کردن در سایه و هوای آزاد</h4>
                    <p className="text-xs text-stone-600">حفظ کامل اسانس‌های روغنی و مواد موثره درمانی بدون حرارت کوره</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4F6F52] text-white flex items-center justify-center shrink-0 text-xs font-bold">۲</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">آزمایش سلامت و عاری بودن از سموم</h4>
                    <p className="text-xs text-stone-600">بررسی کیفیت میکروبی و تضمین عدم وجود سموم آفت‌کش کشاورزی</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4F6F52] text-white flex items-center justify-center shrink-0 text-xs font-bold">۳</div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">بسته‌بندی چندلایه مقاوم به نور و رطوبت</h4>
                    <p className="text-xs text-stone-600">حفظ عطر سرمست‌کننده گیاهان تا آخرین فنجان در منزل شما</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8ECE0] shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#2A3E2D]">
                  راهنمای رایگان انتخاب دمنوش بر اساس طبع شما
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  آیا بعد از غذا احساس سنگینی می‌کنید؟ یا شب‌ها افکار مکرر مانع خواب عمیق شما می‌شوند؟ هر یک از دمنوش‌های خوشنوش برای بازگرداندن تعادل ارگانیک به بدن شما فرموله شده است.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div
                    onClick={() => { onSelectCategory('relaxation-sleep'); onNavigate('shop'); }}
                    className="p-3 rounded-lg bg-[#F9FAF6] border border-[#E8EDE0] hover:border-[#4F6F52] cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">آرامش و رفع بی‌خوابی</span>
                    <span className="text-[11px] text-stone-500">گل گاوزبان و بابونه</span>
                  </div>

                  <div
                    onClick={() => { onSelectCategory('digestive-slimming'); onNavigate('shop'); }}
                    className="p-3 rounded-lg bg-[#F9FAF6] border border-[#E8EDE0] hover:border-[#4F6F52] cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">هضم و سبکی معده</span>
                    <span className="text-[11px] text-stone-500">نعناع فلفلی و رازیانه</span>
                  </div>

                  <div
                    onClick={() => { onSelectCategory('energy-vitality'); onNavigate('shop'); }}
                    className="p-3 rounded-lg bg-[#F9FAF6] border border-[#E8EDE0] hover:border-[#4F6F52] cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">انرژی و نشاط روزانه</span>
                    <span className="text-[11px] text-stone-500">زعفران نگین و زنجبیل</span>
                  </div>

                  <div
                    onClick={() => { onSelectCategory('pure-leaves'); onNavigate('shop'); }}
                    className="p-3 rounded-lg bg-[#F9FAF6] border border-[#E8EDE0] hover:border-[#4F6F52] cursor-pointer transition-colors"
                  >
                    <span className="text-xs font-bold text-stone-900 block mb-0.5">تصفیه کبد و نشاط</span>
                    <span className="text-[11px] text-stone-500">چای ترش و زرشک کوهی</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('shop')}
                  className="w-full py-3 bg-[#2A3E2D] hover:bg-[#1E2B20] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  فیلتر محصولات بر اساس مزاج و طبع سنتی
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Blog Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#4F6F52] tracking-wider">دانشنامه سلامتی</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D] mt-1">
              آخرین مقالات طب گیاهی و سبک زندگی
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-bold text-[#4F6F52] hover:text-[#2A3E2D] flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.slice(0, 2).map((post) => (
            <article
              key={post.id}
              onClick={() => onNavigate('blog-post', post.slug)}
              className="group bg-white rounded-xl p-6 border border-[#E8ECE0] hover:border-[#4F6F52]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>{post.category_name}</span>
                  <span aria-hidden="true">·</span>
                  <span>{toPersianDigits(post.reading_time)} دقیقه مطالعه</span>
                  <span aria-hidden="true">·</span>
                  <span>{formatPersianDate(post.created_at)}</span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#4F6F52] transition-colors leading-snug mb-3">
                  {post.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-[#4F6F52]">
                <span>ادامه مطلب و بررسی علمی</span>
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
