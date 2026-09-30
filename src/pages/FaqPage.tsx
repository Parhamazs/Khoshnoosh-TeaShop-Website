import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'آیا دمنوش‌های خوشنوش اسانس یا عطر مصنوعی دارند؟',
    a: 'خیر، به هیچ وجه. تمامی محصولات خوشنوش ۱۰۰٪ طبیعی بوده و عطر و طعم آنها منحصراً ناشی از گلبرگ‌ها، برگ‌ها و ریشه‌های خالص گیاهی است. ما به شدت با استفاده از هرگونه اسانس شیمیایی مخالفیم.',
  },
  {
    q: 'چگونه دمنوش مناسب طبع و مزاج خود را انتخاب کنم؟',
    a: 'در صفحه فروشگاه می‌توانید از فیلتر «طبع و مزاج گیاهی» استفاده نمایید. افراد با طبع سرد یا بلغمی بهتر است از دمنوش‌های با طبع گرم (مثل زنجبیل، زعفران، به و دارچین) و افراد با طبع گرم و صفراوی از ترکیبات معتدل یا خنک (مانند چای ترش و بابونه) بهره ببرند.',
  },
  {
    q: 'هزینه ارسال چقدر است و چه زمانی رایگان می‌شود؟',
    a: 'هزینه ارسال پستی برای تمامی نقاط کشور ۳۵,۰۰۰ تومان است. اما برای سفارش‌های بالای ۳۰۰,۰۰۰ تومان، هزینه حمل و نقل کاملاً رایگان خواهد بود.',
  },
  {
    q: 'مدت زمان ماندگاری و شرایط نگهداری بسته‌ها چگونه است؟',
    a: 'دمنوش‌های خوشنوش در بسته‌های سه‌لایه فودگرید زیپ‌کیپ بسته‌بندی شده‌اند. در صورت نگهداری در جای خشک، خنک و دور از تابش مستقیم آفتاب، تا ۱۸ ماه کیفیت و عطر اولیه خود را کاملاً حفظ می‌کنند.',
  },
  {
    q: 'آیا دمنوش‌ها در دوران بارداری یا شیردهی قابل مصرف هستند؟',
    a: 'گیاهانی نظیر سنبل‌الطیب یا زعفران در مقادیر دارویی بالا ممکن است برای بانوان باردار منع مصرف داشته باشند. در بخش جزئیات هر دمنوش، تب «موارد احتیاط و هشدارها» را مطالعه فرموده و در دوران بارداری حتماً با پزشک معالج خود مشورت نمایید.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A3E2D]">
          پرسش‌های متداول خریداران
        </h1>
        <p className="text-xs sm:text-sm text-stone-500">
          پاسخ به سوالات پرتکرار پیرامون طبع‌شناسی، ارسال، ماندگاری و خواص دمنوش‌ها
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#4F6F52] shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#4F6F52]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
