import React, { useState } from 'react';
import { ShieldCheck, Truck, RefreshCw, Award, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2A3E2D] text-[#E8ECE0] pt-14 pb-8 border-t border-[#3D5640]">
      {/* 4 Trust Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#3D5640]/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#3D5640] flex items-center justify-center text-[#DDA15E] mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">۱۰۰٪ ارگانیک و طبیعی</h4>
            <p className="text-xs text-[#A9B388]">بدون اسانس، رنگ و مواد نگهدارنده</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#3D5640] flex items-center justify-center text-[#DDA15E] mb-3">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">ارسال سریع سراسر کشور</h4>
            <p className="text-xs text-[#A9B388]">رایگان برای خرید بالای ۳۰۰ هزار تومان</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#3D5640] flex items-center justify-center text-[#DDA15E] mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">تضمین تازگی و اصالت</h4>
            <p className="text-xs text-[#A9B388]">برگ‌چینی تازه بهاره از بهترین مزارع</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#3D5640] flex items-center justify-center text-[#DDA15E] mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">مشاوره تخصصی مزاج‌شناسی</h4>
            <p className="text-xs text-[#A9B388]">پاسخگویی کارشناسان طب سنتی</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Brand Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <BrandLogo className="w-8 h-8" variant="light" />
              <span className="text-xl font-extrabold text-white">خوشنوش</span>
            </div>
            <p className="text-xs leading-relaxed text-[#A9B388]">
              خوشنوش حاصل عشق به طبیعت بکر کوهستان‌های ایران و دانش کهن گیاه‌درمانی است. ما خالص‌ترین گیاهان دارویی را با روش‌های اصولی برداشت و بدون هیچ‌گونه ماده شیمیایی تقدیم آرامش شما می‌کنیم.
            </p>
            <div className="text-xs text-stone-300 space-y-1">
              <p>تلفن پشتیبانی: ۰۲۱-۸۸۹۹۲۲۳۳</p>
              <p>نشانی: تهران، یوسف‌آباد، خیابان اسدآبادی، کوچه ۱۶، پلاک ۴</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4">دسترسی سریع</h5>
            <ul className="space-y-2 text-xs text-[#A9B388]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  فروشگاه دمنوش‌های گیاهی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors cursor-pointer">
                  دانشنامه گیاهان دارویی و طب سنتی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  داستان برند و مزارع همکار
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  تماس و همکاری تجاری
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white transition-colors cursor-pointer">
                  پرسش‌های متداول خریداران
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-sm font-bold text-white mb-4">دسته‌بندی‌های محبوب</h5>
            <ul className="space-y-2 text-xs text-[#A9B388]">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  دمنوش‌های خواب و آرامش اعصاب
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  دمنوش‌های گوارشی و لاغری طبیعی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  اکسیرهای انرژی‌بخش زعفرانی
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  چای‌های دست‌چین بهاره لاهیجان
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  بسته‌های هدیه چوبی شرکتی و لوکس
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-white mb-2">خبرنامه تندرستی خوشنوش</h5>
            <p className="text-xs text-[#A9B388] leading-relaxed">
              عضو خبرنامه شوید تا از تخفیف‌های فصلی و مقالات تخصصی مزاج‌شناسی باخبر گردید.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#3D5640] rounded-lg text-xs text-[#FEFAE0]">
                با تشکر! عضویت شما در خبرنامه خوشنوش با موفقیت ثبت شد.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="ایمیل خود را بنویسید..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#1F2C24] border border-[#3D5640] rounded-lg text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#DDA15E]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#DDA15E] hover:bg-[#c98e4f] text-[#283618] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  عضویت در خبرنامه
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#3D5640]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9B388]">
        <p>© ۱۴۰۳-۱۴۰۵ تمامی حقوق برای فروشگاه دمنوش‌های طبیعی خوشنوش محفوظ است.</p>
        <p className="mt-2 sm:mt-0 flex items-center gap-1">
          طراحی با الهام از طبیعت و سلامت <Heart className="w-3.5 h-3.5 text-[#DDA15E] fill-current" />
        </p>
      </div>
    </footer>
  );
};
