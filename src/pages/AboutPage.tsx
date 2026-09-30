import React from 'react';
import { Award, Leaf, Heart, ShieldCheck, MapPin, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12">
      
      {/* Hero Headline */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-[#4F6F52] tracking-wider">داستان پیدایش خوشنوش</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A3E2D]">
          بازگشت به خلوص گیاهان، احیای سنت کهن دمنوش
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          «خوشنوش» از یک باور ساده متولد شد: طبیعت بکر کوهستان‌های ایران، شفا و آرامشی در دل خود دارد که دنیای پرهیاهوی امروز بیش از هر زمان به آن نیازمند است.
        </p>
      </div>

      {/* Philosophy */}
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E8ECE0] shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-[#2A3E2D]">رسالت ما: سلامت پایدار و احترام به خاک</h2>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          بازار امروز مملو از چای‌های طعم‌دار صنعتی با اسانس‌های شیمیایی و نگهدارنده‌های مصنوعی است. ما در خوشنوش بر این باوریم که گل بابونه بهاره، برگ به‌لیمو و شکوفه گل گاوزبان به تنهایی آن‌قدر غنی، خوش‌عطر و شفابخش هستند که نیازی به هیچ عطر مصنوعی ندارند.
        </p>
        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
          ما با کشاورزان بومی در روستاهای کوهستانی قزوین، اصفهان، خراسان و گیلان کار می‌کنیم؛ کشاورزانی که نسل اندر نسل دانش برداشت در ساعات خنک صبحگاهی و فرآوری سایه‌خشک را سینه به سینه حفظ کرده‌اند.
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] space-y-2">
          <Leaf className="w-8 h-8 text-[#4F6F52] mx-auto" />
          <h3 className="text-sm font-bold text-stone-900">۱۰۰٪ ارگانیک</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            هیچ‌گونه آفت‌کش شیمیایی یا علف‌کش در فرآیند کشت استفاده نمی‌شود.
          </p>
        </div>

        <div className="p-6 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] space-y-2">
          <Award className="w-8 h-8 text-[#DDA15E] mx-auto" />
          <h3 className="text-sm font-bold text-stone-900">آزمایشگاه دارویی</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            بررسی دقیق میزان اسانس، سلامت میکروبی و خلوص مواد موثره پیش از بسته‌بندی.
          </p>
        </div>

        <div className="p-6 bg-[#F4F6F0] rounded-xl border border-[#E8EDE0] space-y-2">
          <Heart className="w-8 h-8 text-[#4F6F52] mx-auto" />
          <h3 className="text-sm font-bold text-stone-900">تجارت منصفانه</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            خرید مستقیم با بالاترین قیمت تضمینی از کشاورزان زحمتکش مناطق روستایی.
          </p>
        </div>
      </div>

      {/* Production Facilities & Standards */}
      <div className="bg-[#2A3E2D] text-[#E8ECE0] rounded-2xl p-6 sm:p-10 space-y-4">
        <h3 className="text-lg font-bold text-white">تعهد کیفی خوشنوش</h3>
        <p className="text-xs leading-relaxed text-[#A9B388]">
          تمامی بسته‌بندی‌های خوشنوش از فویل‌های سه‌لایه بهداشتی فودگرید تهیه می‌شوند تا نور مستقیم آفتاب و رطوبت محیط، اسانس‌های فرار گیاهی را اکسید نکند. از زمان پلمپ تا لحظه‌ای که زیپ بسته را در آشپزخانه باز می‌کنید، عطر سرمست‌کننده روز برداشت محفوظ مانده است.
        </p>
      </div>

    </div>
  );
};
