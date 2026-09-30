import { Category, Product, BlogPost, Address, Order } from '../types';

export const mockCategories: Category[] = [
  {
    id: 1,
    name: 'دمنوش‌های آرام‌بخش و خواب',
    slug: 'relaxation-sleep',
    description: 'ترکیبات سنتی برای کاهش اضطراب، تسکین تنش‌های عصبی و داشتن خوابی عمیق و آرام',
    icon: 'Moon',
    products_count: 5,
  },
  {
    id: 2,
    name: 'دمنوش‌های گوارشی و لاغری',
    slug: 'digestive-slimming',
    description: 'ترکیبات هضم آسان، رفع نفخ معده و کمک به سوخت‌وساز طبیعی بدن',
    icon: 'Leaf',
    products_count: 4,
  },
  {
    id: 3,
    name: 'دمنوش‌های انرژی‌بخش و نشاط‌آور',
    slug: 'energy-vitality',
    description: 'تقویت سیستم ایمنی، رفع خستگی مفرط روزانه و ایجاد شادابی و انگیزه',
    icon: 'Sun',
    products_count: 4,
  },
  {
    id: 4,
    name: 'چای‌های اصیل و برگ خالص',
    slug: 'pure-leaves',
    description: 'برگ‌های دست‌چین بهاره کوهستان لاهیجان و چای‌های ترش اعلا',
    icon: 'Coffee',
    products_count: 3,
  },
  {
    id: 5,
    name: 'بسته‌های هدیه و اکسسوری دم‌آوری',
    slug: 'gifts-accessories',
    description: 'جعبه‌های چوبی چای و دمنوش، قوری‌های شیشه‌ای بروسیلیکات و تی بگ‌های پنبه‌ای',
    icon: 'Gift',
    products_count: 2,
  },
];

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'دمنوش آرامش گل گاوزبان و سنبل‌الطیب الموت',
    english_name: 'Premium Persian Borage & Valerian Infusion',
    slug: 'gol-gavzaban-sonboltieb',
    short_description: 'معجون اصیل سنتی ایران برای آرامش اعصاب، کاهش تپش قلب و رفع فشارهای روانی روزمره',
    description: 'گل گاوزبان وحشی کوهستان الموت به همراه سنبل‌الطیب طبیعی و پره‌های لیمو عمانی دست‌چین. این دمنوش پس از دم کشیدن رنگ ارغوانی مایل به یاقوتی شگفت‌انگیزی پیدا می‌کند و عطری سرمست‌کننده و تاثیری عمیق در تمدد اعصاب دارد.',
    ingredients: 'گل گاوزبان وحشی الموت، ریشه سنبل‌الطیب، پره لیمو عمانی، غنچه گل محمدی کاشان',
    benefits: 'آرام‌بخش قوی، کاهش دهنده اضطراب، تنظیم کننده فشار خون و بهبود کیفیت خواب عمیق',
    usage_method: 'یک قاشق غذاخوری از ترکیب را در قوری آب جوش (دمای ۹۰ درجه) ریخته و به مدت ۱۰ الی ۱۵ دقیقه به آرامی دم بکشد.',
    warnings: 'به دلیل اثرات آرام‌بخشی، برای خانم‌های باردار و در هنگام رانندگی طولانی توصیه نمی‌شود.',
    temperament: 'warm_wet',
    caffeine_free: true,
    weight: 120,
    price: 185000,
    discount_price: 158000,
    stock: 45,
    is_active: true,
    is_featured: true,
    sales_count: 142,
    rating_average: 4.9,
    review_count: 28,
    category: mockCategories[0],
    tags: [
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
      { id: 2, name: 'بدون کافئین', slug: 'caffeine-free' },
      { id: 3, name: 'کاهش استرس', slug: 'stress-relief' },
    ],
    images: [
      { id: 1, url: '', alt_text: 'دمنوش گل گاوزبان اعلا' }
    ],
    color_accent: '#6B4E71', // deep violet floral
  },
  {
    id: 2,
    name: 'دمنوش بابونه شیرازی، اسطوخودوس و به‌لیمو',
    english_name: 'Organic Chamomile, Lavender & Lemon Verbena',
    slug: 'chamomile-lavender-lemon-verbena',
    short_description: 'عطر شکوفه‌های بابونه طلایی و اسطوخودوس کوهی با طعمی ملایم و دلنشین',
    description: 'ترکیبی هماهنگ و متعادل از غنچه‌های زردرنگ بابونه، برگ‌های معطر به‌لیمو و دانه‌های معطر اسطوخودوس. گزینه‌ای بی‌نظیر برای پایان یک روز پرمشغله و آماده‌سازی بدن برای خواب شبانه آرامش‌بخش.',
    ingredients: 'بابونه شیرازی، اسطوخودوس پروانسی، به‌لیمو ایرانی، بادرنجبویه',
    benefits: 'تسکین سردردهای میگرنی، ضداسپاسم عضلانی، بهبود گوارش و کاهش خستگی ذهنی',
    usage_method: 'یک قاشق مرباخوری را در یک لیوان آب جوش به مدت ۸ دقیقه دم کنید و با کمی عسل طبیعی میل نمایید.',
    warnings: 'افراد با سابقه حساسیت به گیاهان خانواده کاسنی با احتیاط مصرف کنند.',
    temperament: 'moderate',
    caffeine_free: true,
    weight: 100,
    price: 165000,
    discount_price: 145000,
    stock: 60,
    is_active: true,
    is_featured: true,
    sales_count: 98,
    rating_average: 4.8,
    review_count: 19,
    category: mockCategories[0],
    tags: [
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
      { id: 2, name: 'بدون کافئین', slug: 'caffeine-free' },
    ],
    images: [
      { id: 2, url: '', alt_text: 'دمنوش بابونه و اسطوخودوس' }
    ],
    color_accent: '#C2A649', // chamomile gold
  },
  {
    id: 3,
    name: 'دمنوش شاهانه زعفران قائنات، زنجبیل و هل سبز',
    english_name: 'Royal Saffron, Ginger & Green Cardamom Infusion',
    slug: 'saffron-ginger-cardamom',
    short_description: 'اکسیر نشاط‌آور درباری با رشته‌های سرخ زعفران نگین و گرمای نیروبخش زنجبیل',
    description: 'تجربه‌ای اشرافی از عطر و طعم گرمای اصیل مشرق‌زمین. سرشار از آنتی‌اکسیدان، شادی‌آور طبیعی و برطرف‌کننده رخوت و سستی مفرط بدن در فصل سرما یا ساعات پرفشار کاری.',
    ingredients: 'رشته‌های کامل زعفران نگین قائنات، ریشه زنجبیل خشک، هل سبز هندی، دارچین سیلان',
    benefits: 'افزایش سطح انرژی روزانه، تقویت سیستم ایمنی، بهبود گردش خون و نشاط روحی',
    usage_method: 'یک قاشق مرباخوری را به همراه آب جوش درون فرنچ پرس یا قوری ریخته و ۱۲ دقیقه دم کنید.',
    warnings: 'برای افراد مبتلا به زخم معده شدید به دلیل تندی ملایم زنجبیل در حد اعتدال مصرف شود.',
    temperament: 'warm',
    caffeine_free: true,
    weight: 90,
    price: 280000,
    discount_price: 245000,
    stock: 35,
    is_active: true,
    is_featured: true,
    sales_count: 180,
    rating_average: 5.0,
    review_count: 42,
    category: mockCategories[2],
    tags: [
      { id: 4, name: 'طبع گرم', slug: 'warm-temperament' },
      { id: 5, name: 'تقویت ایمنی', slug: 'immunity' },
    ],
    images: [
      { id: 3, url: '', alt_text: 'دمنوش زعفران و زنجبیل' }
    ],
    color_accent: '#C44900', // saffron amber
  },
  {
    id: 4,
    name: 'دمنوش گوارشی نعناع فلفلی، رازیانه و زنیان',
    english_name: 'Digestive Blend: Peppermint, Fennel & Ajwain',
    slug: 'peppermint-fennel-digestive',
    short_description: 'تسکین‌دهنده فوق‌العاده سنگینی و نفخ معده با حس خنکی نعناع فلفلی تازه',
    description: 'فرمولاسیون تخصصی گیاهی برای بهبود عملکرد دستگاه گوارش بعد از وعده‌های غذایی سنگین. احساس سبکی، خنکی و راحتی در سراسر مجاری تنفسی و هاضمه.',
    ingredients: 'نعناع فلفلی اعلا، دانه رازیانه شیرین، زنیان، زیره سبز کوهی، انیسون',
    benefits: 'رفع سریع نفخ و دل‌پیچه، هضم سریع غذا، خنک‌کننده دهان و بهبود بوی مطبوع تنفس',
    usage_method: 'نیم ساعت پس از وعده غذایی، یک قاشق مرباخوری را به مدت ۷ دقیقه دم کرده و گرم بنوشید.',
    warnings: 'در موارد رفلاکس شدید معده به مری، پیش از مصرف مکرر با پزشک مشورت شود.',
    temperament: 'moderate',
    caffeine_free: true,
    weight: 110,
    price: 140000,
    discount_price: 125000,
    stock: 50,
    is_active: true,
    is_featured: false,
    sales_count: 87,
    rating_average: 4.7,
    review_count: 15,
    category: mockCategories[1],
    tags: [
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
      { id: 2, name: 'بدون کافئین', slug: 'caffeine-free' },
    ],
    images: [
      { id: 4, url: '', alt_text: 'دمنوش نعناع فلفلی و رازیانه' }
    ],
    color_accent: '#4F6F52', // herbal green
  },
  {
    id: 5,
    name: 'چای ترش سودانی و زرشک کوهی اعلا',
    english_name: 'Ruby Hibiscus & Mountain Barberry Tea',
    slug: 'sour-hibiscus-barberry',
    short_description: 'نوشیدنی یاقوتی‌رنگ خنک‌کننده کبد، تنظیم‌کننده فشار خون با طعم ملس دلچسب',
    description: 'کاسبرگ‌های درشت و خشک‌شده چای ترش خالص همراه با دانه‌های زرشک کوهی ارگانیک. این نوشیدنی هم به صورت گرم در زمستان و هم به شکل آیس‌تی خنک با یخ و برگ نعناع در تابستان فوق‌العاده است.',
    ingredients: 'کاسبرگ گل چای ترش خالص، زرشک کوهی سیاه، لیمو خشک طبیعی',
    benefits: 'تنظیم و کاهش فشار خون، تصفیه کبد چرب، غنی از ویتامین C و شفاف‌کننده پوست',
    usage_method: 'یک قاشق غذاخوری را در ۵۰۰ میلی‌لیتر آب جوش ریخته و پس از ۱۰ دقیقه صاف کرده و میل نمایید.',
    warnings: 'افرادی که به طور طبیعی فشار خون پایینی دارند به همراه نبات یا عسل مصرف نمایند.',
    temperament: 'cold_wet',
    caffeine_free: true,
    weight: 150,
    price: 170000,
    discount_price: null,
    stock: 70,
    is_active: true,
    is_featured: true,
    sales_count: 115,
    rating_average: 4.9,
    review_count: 23,
    category: mockCategories[3],
    tags: [
      { id: 6, name: 'طبع سرد', slug: 'cold-temperament' },
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
    ],
    images: [
      { id: 5, url: '', alt_text: 'چای ترش و زرشک کوهی' }
    ],
    color_accent: '#8B1E3F', // ruby crimson
  },
  {
    id: 6,
    name: 'دمنوش میوه‌ای به، هل و دارچین روست شده',
    english_name: 'Roasted Quince, Cinnamon & Cardamom Tea',
    slug: 'roasted-quince-cinnamon',
    short_description: 'برش‌های برشته میوه به اصفهان با عطر کاراملی و ادویه‌های معطر گرمابخش',
    description: 'میوه به تازه پس از خلال شدن در حرارت ملایم روست و برشته شده تا رنگ شرابی تیره و طعمی غنی شبیه به میوه‌های خشک شده پیدا کند. همراه با چوب دارچین سیلان و هل سبز دانه‌درشت.',
    ingredients: 'خلال به روست شده طلایی، چوب دارچین سیلان، هل سبز، سیب خشک معطر',
    benefits: 'تقویت قلب و عروق، گرمابخش معده، تقویت قوای جسمانی و نشاط‌آور عصرانه',
    usage_method: 'دو قاشق غذاخوری را در قوری ریخته و ۲۰ دقیقه روی حرارت غیرمستقیم (وارمر یا کتری) دم کنید تا رنگ عمیق سرخ آن آزاد شود.',
    warnings: 'فاقد هرگونه مواد شیمیایی و کاملاً ایمن برای تمام سنین.',
    temperament: 'warm',
    caffeine_free: true,
    weight: 200,
    price: 210000,
    discount_price: 189000,
    stock: 40,
    is_active: true,
    is_featured: true,
    sales_count: 164,
    rating_average: 5.0,
    review_count: 34,
    category: mockCategories[2],
    tags: [
      { id: 4, name: 'طبع گرم', slug: 'warm-temperament' },
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
    ],
    images: [
      { id: 6, url: '', alt_text: 'دمنوش به روست شده' }
    ],
    color_accent: '#A0522D', // roasted warm brown
  },
  {
    id: 7,
    name: 'دمنوش چای سبز لاهیجان با گل یاس و لیمو عمانی',
    english_name: 'Spring Lahijan Green Tea with Jasmine & Dried Lime',
    slug: 'green-tea-jasmine-lime',
    short_description: 'برگ‌های دست‌چین بهاره مزارع لاهیجان معطر شده با گل‌های یاس طبیعی',
    description: 'چای سبز ممتاز با تلخی بسیار ملایم و عطری روح‌بخش از شکوفه‌های یاس سفید. سرشار از پلی‌فنول‌ها و کاتچین‌های ضدسرطان و چربی‌سوز طبیعی.',
    ingredients: 'برگ خالص چای سبز بهاره لاهیجان، گل یاس سفید خشک، پره لیمو ترش',
    benefits: 'افزایش متابولیسم، چربی‌سوزی، ضدپیری پوست و شادابی ذهنی',
    usage_method: 'آب جوش با دمای ۸۰ درجه را روی یک قاشق مرباخوری چای ریخته و ۴ تا ۵ دقیقه دم کنید.',
    warnings: 'بهتر است با معده کاملاً خالی مصرف نشود.',
    temperament: 'cold',
    caffeine_free: false,
    weight: 130,
    price: 155000,
    discount_price: 139000,
    stock: 48,
    is_active: true,
    is_featured: false,
    sales_count: 73,
    rating_average: 4.8,
    review_count: 16,
    category: mockCategories[3],
    tags: [
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
      { id: 6, name: 'طبع سرد', slug: 'cold-temperament' },
    ],
    images: [
      { id: 7, url: '', alt_text: 'چای سبز لاهیجان' }
    ],
    color_accent: '#5E7051', // jasmine green
  },
  {
    id: 8,
    name: 'جعبه هدیه چوبی نفیس «چهار فصل سلامتی» خوشنوش',
    english_name: 'Khoshnoosh Royal Wooden Herbal Gift Box',
    slug: 'royal-herbal-gift-box',
    short_description: 'جعبه چوب گردوی دست‌ساز شامل ۴ شیشه دمنوش منتخب و قوری پیرکس وارمردار',
    description: 'هدیه‌ای ماندگار و اصیل برای عزیزان و مدیران. شامل چهار قوطی شیشه‌ای درپوش چوب‌پنبه حاوی: گل گاوزبان، بابونه و اسطوخودوس، زعفران و هل، و چای ترش به همراه قوری بروسیلیکات مقاوم به شعله مستقیم.',
    ingredients: '۴ نوع دمنوش درجه یک ارگانیک (هر کدام ۵۰ گرم) + قوری وارمردار ۶۰۰ میلی‌لیتر',
    benefits: 'پوشش کامل نیازهای سلامتی و آرامش در تمام فصول سال در بسته‌بندی لوکس',
    usage_method: 'همراه با کاتالوگ جامع راهنمای دم‌آوری و خواص هر ترکیب.',
    warnings: 'بدون هشدار مصرفی.',
    temperament: 'moderate',
    caffeine_free: true,
    weight: 850,
    price: 890000,
    discount_price: 790000,
    stock: 15,
    is_active: true,
    is_featured: true,
    sales_count: 52,
    rating_average: 5.0,
    review_count: 14,
    category: mockCategories[4],
    tags: [
      { id: 1, name: 'ارگانیک ۱۰۰٪', slug: 'organic' },
      { id: 7, name: 'بسته هدیه', slug: 'gift-pack' },
    ],
    images: [
      { id: 8, url: '', alt_text: 'جعبه هدیه چوبی خوشنوش' }
    ],
    color_accent: '#825A2C', // walnut wood
  },
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'راهنمای جامع شناخت طبع و انتخاب دمنوش مناسب بر اساس مزاج سنتی',
    slug: 'temperament-herbal-tea-guide',
    summary: 'چگونه با شناخت طبع گرم و سرد بدن خود، دمنوش مناسبی انتخاب کنیم که تعادل ارگان‌های حیاتی را حفظ کند؟',
    content: `
      طب سنتی ایرانی بر پایه مفهوم اخلاط چهارگانه (دم، صفرا، بلغم و سودا) و تعادل مزاج‌ها استوار است. هر فرد دارای مزاج پایه منحصر‌به‌فردی است که ممکن است به واسطه تغذیه نامناسب، تغییرات فصلی یا فشارهای شغلی از تعادل فیزیولوژیک خارج شود.

      ### دمنوش‌های با طبع گرم
      گیاهانی نظیر زعفران، زنجبیل، دارچین و به، جریان گردش خون را تسریع کرده و سردی مفرط اندام‌های گوارشی را برطرف می‌سازند. این ترکیبات برای افراد با مزاج بلغمی یا در فصول سرد پاییز و زمستان بسیار انرژی‌بخش و مقوی هستند.

      ### دمنوش‌های با طبع معتدل و سرد
      گیاهانی چون بابونه، به‌لیمو، چای ترش و زرشک کوهی، تعدیل‌کننده حرارت درونی بدن و کاهش‌دهنده التهابات کبدی هستند. این نوشیدنی‌ها برای افراد صفراوی‌مزاج یا کسانی که دچار تنش‌های ناشی از گرمی بدن می‌شوند فوق‌العاده سودمندند.
    `,
    reading_time: 6,
    category_name: 'دانشنامه دمنوش و طب سنتی',
    author_name: 'دکتر مریم شریفی (متخصص طب سنتی)',
    views_count: 1420,
    created_at: '2026-09-15',
    image_color: '#4F6F52',
  },
  {
    id: 2,
    title: 'آیین چای عصرگاهی: چگونه یک فنجان دمنوش سطح هورمون استرس (کورتیزول) را کاهش می‌دهد؟',
    slug: 'evening-tea-ritual-cortisol-relief',
    summary: 'پژوهش‌های نوروساینس نشان می‌دهند مکث آگاهانه برای دم‌آوری و نوشیدن گیاهان آرام‌بخش، امواج آلفای مغزی را فعال می‌کند.',
    content: `
      در ریتم شتاب‌زده سبک زندگی مدرن، استرس‌های مکرر روزانه سطح هورمون کورتیزول را در خون به صورت مداوم بالا نگه می‌دارند. بالا بودن مزمن کورتیزول عامل اصلی اختلال خواب، افت ایمنی و پیری زودرس بافت‌ها است.

      ### ترکیب شگفت‌انگیز آپیژنین و لینالول
      عصاره طبیعی بابونه غنی از فلاونوئیدی به نام «آپیژنین» است که به همان گیرنده‌های مغزی متصل می‌شود که داروهای آرام‌بخش روی آن‌ها عمل می‌کنند؛ با این تفاوت بنیادین که هیچ‌گونه وابستگی یا عوارض دارویی به دنبال ندارد. از سوی دیگر رایحه اسطوخودوس به واسطه لینالول ضربان قلب را تعدیل کرده و شما را به آرامشی عمیق می‌رساند.
    `,
    reading_time: 5,
    category_name: 'سبک زندگی و سلامت روان',
    author_name: 'تیم پژوهش گیاهی خوشنوش',
    views_count: 980,
    created_at: '2026-09-20',
    image_color: '#6B4E71',
  },
  {
    id: 3,
    title: 'اصول علمی دم‌آوری دمنوش‌های گیاهی: تفاوت جوشاندن با دم کردن چیست؟',
    slug: 'brewing-temperature-herbal-infusion',
    summary: 'آیا می‌دانستید جوشاندن مستقیم گل‌ها و برگ‌های لطیف، مواد موثره دارویی و عطر طبیعی آن‌ها را تخریب می‌کند؟',
    content: `
      یکی از رایج‌ترین اشتباهات در مصرف گیاهان دارویی، جوشاندن طولانی‌مدت آنها بر روی شعله مستقیم گاز است. برگ‌ها و شکوفه‌های لطیف مانند گل گاوزبان، بابونه و به‌لیمو حاوی روغن‌های فرار و اسانس‌های آلی هستند که در دمای ۱۰۰ درجه سانتی‌گراد تبخیر شده یا اکسید می‌شوند.

      ### دمای ایده‌آل دم‌آوری
      - برای گل‌ها و برگ‌های لطیف: آب ۸۵ الی ۹۰ درجه سانتی‌گراد و زمان دم کشیدن ۸ تا ۱۰ دقیقه.
      - برای ریشه‌ها و دانه‌های سخت (مانند زنجبیل، دارچین و رازیانه): آب ۹۵ درجه و زمان دم کشیدن ۱۲ الی ۱۵ دقیقه بر روی حرارت ملایم غیرمستقیم.
    `,
    reading_time: 4,
    category_name: 'آموزش و آیین دم‌آوری',
    author_name: 'مهندس بهزاد نوری (کارشناس گیاهان دارویی)',
    views_count: 750,
    created_at: '2026-09-25',
    image_color: '#DDA15E',
  },
];

export const mockDefaultAddresses: Address[] = [
  {
    id: 1,
    title: 'منزل شخصی',
    receiver_name: 'سارا احمدی',
    receiver_phone: '۰۹۳۵۱۲۳۴۵۶۷',
    province: 'تهران',
    city: 'تهران',
    address_line: 'خیابان ولیعصر، بالاتر از پارک ساعی، کوچه ساعی یکم، پلاک ۱۲، واحد ۴',
    postal_code: '۱۵۱۱۹۳۳۴۱۱',
    is_default: true,
  },
  {
    id: 2,
    title: 'محل کار',
    receiver_name: 'سارا احمدی',
    receiver_phone: '۰۲۱۸۸۷۷۶۶۵۵',
    province: 'تهران',
    city: 'تهران',
    address_line: 'میدان ونک، خیابان ملاصدرا، پلاک ۸۵، ساختمان سپهر، طبقه ۳',
    postal_code: '۱۹۹۱۸۴۴۲۲۱',
    is_default: false,
  },
];

export const mockSampleOrders: Order[] = [
  {
    id: 101,
    order_number: 'KN-94821',
    status: 'shipped',
    status_display: 'تحویل به پست',
    receiver_name: 'سارا احمدی',
    receiver_phone: '۰۹۳۵۱۲۳۴۵۶۷',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، کوچه ساعی یکم، پلاک ۱۲',
    postal_code: '۱۵۱۱۹۳۳۴۱۱',
    subtotal: 303000,
    shipping_cost: 0,
    discount_amount: 0,
    total_amount: 303000,
    created_at: '2026-09-27',
    items: [
      {
        id: 1,
        product_name: 'دمنوش آرامش گل گاوزبان و سنبل‌الطیب الموت',
        unit_price: 158000,
        quantity: 1,
        subtotal: 158000,
        product_slug: 'gol-gavzaban-sonboltieb',
      },
      {
        id: 2,
        product_name: 'دمنوش بابونه شیرازی، اسطوخودوس و به‌لیمو',
        unit_price: 145000,
        quantity: 1,
        subtotal: 145000,
        product_slug: 'chamomile-lavender-lemon-verbena',
      },
    ],
  },
  {
    id: 102,
    order_number: 'KN-88319',
    status: 'delivered',
    status_display: 'تحویل داده شده',
    receiver_name: 'سارا احمدی',
    receiver_phone: '۰۹۳۵۱۲۳۴۵۶۷',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، کوچه ساعی یکم، پلاک ۱۲',
    postal_code: '۱۵۱۱۹۳۳۴۱۱',
    subtotal: 189000,
    shipping_cost: 35000,
    discount_amount: 0,
    total_amount: 224000,
    created_at: '2026-09-10',
    items: [
      {
        id: 3,
        product_name: 'دمنوش میوه‌ای به، هل و دارچین روست شده',
        unit_price: 189000,
        quantity: 1,
        subtotal: 189000,
        product_slug: 'roasted-quince-cinnamon',
      },
    ],
  },
];
