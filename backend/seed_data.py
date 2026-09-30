"""
Seed data script for Khoshnoosh Persian Herbal Tea E-Commerce Platform.
Run with: python manage.py shell < seed_data.py
Or: python seed_data.py
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'khoshnoosh.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.products.models import Category, Tag, Product, ProductImage
from apps.blog.models import BlogCategory, BlogPost

User = get_user_model()

def seed():
    print("🌱 Starting Khoshnoosh Seed Process...")

    # 1. Superuser & Demo User
    admin_user, created = User.objects.get_or_create(
        email='admin@khoshnoosh.ir',
        defaults={
            'full_name': 'مدیر فروشگاه خوشنوش',
            'phone_number': '09121112233',
            'is_staff': True,
            'is_superuser': True,
        }
    )
    if created:
        admin_user.set_password('Admin@123456')
        admin_user.save()
        print("✅ Superuser created: admin@khoshnoosh.ir (Pass: Admin@123456)")

    demo_user, created = User.objects.get_or_create(
        email='sara@example.com',
        defaults={
            'full_name': 'سارا احمدی',
            'phone_number': '09351234567',
        }
    )
    if created:
        demo_user.set_password('User@123456')
        demo_user.save()
        print("✅ Demo Customer created: sara@example.com")

    # 2. Categories
    categories_data = [
        {"name": "دمنوش‌های آرام‌بخش و خواب", "slug": "relaxation-sleep", "icon": "moon", "order": 1, "description": "ترکیبات اصیل برای کاهش اضطراب، تسکین تنش‌های عصبی و داشتن خوابی عمیق و آرام"},
        {"name": "دمنوش‌های گوارشی و لاغری", "slug": "digestive-slimming", "icon": "leaf", "order": 2, "description": "ترکیبات هضم آسان، رفع نفخ معده و کمک به سوخت‌وساز طبیعی بدن"},
        {"name": "دمنوش‌های انرژی‌بخش و نشاط‌آور", "slug": "energy-vitality", "icon": "sun", "order": 3, "description": "تقویت سیستم ایمنی، رفع خستگی مفرط روزانه و ایجاد شادابی و انگیزه"},
        {"name": "چای‌های اصیل و برگ خالص", "slug": "pure-leaves", "icon": "coffee", "order": 4, "description": "برگ‌های دست‌چین بهاره کوهستان لاهیجان و چای‌های ترش اعلا"},
        {"name": "بسته‌های هدیه و اکسسوری دم‌آوری", "slug": "gifts-accessories", "icon": "gift", "order": 5, "description": "جعبه‌های چوبی چای و دمنوش، قوری‌های شیشه‌ای بروسیلیکات و تی بگ‌های پنبه‌ای ارگانیک"},
    ]

    cat_map = {}
    for c in categories_data:
        cat_obj, _ = Category.objects.get_or_create(
            slug=c['slug'],
            defaults={'name': c['name'], 'description': c['description'], 'icon': c['icon'], 'order': c['order']}
        )
        cat_map[c['slug']] = cat_obj
    print(f"✅ {len(cat_map)} Categories created/verified.")

    # 3. Tags
    tags_data = ["ارگانیک ۱۰۰٪", "بدون کافئین", "دست‌چین سنتی", "کاهش استرس", "تقویت ایمنی", "طبع گرم", "طبع سرد", "بهاره ۱۴۰۳"]
    tag_map = {}
    for t_name in tags_data:
        t_slug = t_name.replace(" ", "-").replace("٪", "")
        t_obj, _ = Tag.objects.get_or_create(name=t_name, defaults={'slug': t_slug})
        tag_map[t_name] = t_obj
    print(f"✅ {len(tag_map)} Tags created.")

    # 4. Products
    products_data = [
        {
            "name": "دمنوش آرامش گل گاوزبان و سنبل‌الطیب اعلا",
            "english_name": "Premium Persian Borage & Valerian Infusion",
            "slug": "gol-gavzaban-sonboltieb",
            "category": cat_map["relaxation-sleep"],
            "short_description": "معجون اصیل سنتی ایران برای آرامش اعصاب، کاهش تپش قلب و رفع فشارهای روانی روزمره",
            "description": "گل گاوزبان وحشی کوهستان الموت به همراه سنبل‌الطیب طبیعی و پره‌های لیمو عمانی دست‌چین. این دمنوش به رنگ ارغوانی مایل به سرخ، عطری سرمست‌کننده و تاثیری شگفت‌انگیز در تمدد اعصاب دارد.",
            "ingredients": "گل گاوزبان وحشی الموت، ریشه سنبل‌الطیب، پره لیمو عمانی، غنچه گل محمدی کاشان",
            "benefits": "آرام‌بخش قوی، کاهش دهنده اضطراب، تنظیم کننده فشار خون و بهبود کیفیت خواب عمیق",
            "usage_method": "یک قاشق غذاخوری از ترکیب را در قوری آب جوش (۹۰ درجه) ریخته و به مدت ۱۰ الی ۱۵ دقیقه به آرامی دم کنید.",
            "warnings": "به دلیل اثرات آرام‌بخشی، برای خانم‌های باردار و در هنگام رانندگی طولانی توصیه نمی‌شود.",
            "temperament": "warm_wet",
            "caffeine_free": True,
            "weight": 120,
            "price": 185000,
            "discount_price": 158000,
            "stock": 45,
            "is_featured": True,
            "sales_count": 142,
            "rating_average": 4.9,
            "review_count": 28,
            "tags": ["ارگانیک ۱۰۰٪", "بدون کافئین", "کاهش استرس", "دست‌چین سنتی"]
        },
        {
            "name": "دمنوش بابونه، اسطوخودوس و به‌لیمو",
            "english_name": "Organic Chamomile, Lavender & Lemon Verbena",
            "slug": "chamomile-lavender-lemon-verbena",
            "category": cat_map["relaxation-sleep"],
            "short_description": "عطر رویایی شکوفه‌های بابونه آلمانی و اسطوخودوس کوهی فرانسه با طعمی ملایم و دلنشین",
            "description": "ترکیبی هماهنگ و متعادل از غنچه‌های زردرنگ بابونه، برگ‌های معطر به‌لیمو و دانه‌های معطر اسطوخودوس. گزینه‌ای بی‌نظیر برای پایان یک روز پرمشغله و آماده‌سازی بدن برای خواب شبانه.",
            "ingredients": "بابونه شیرازی، اسطوخودوس پروانسی، به‌لیمو ایرانی، بادرنجبویه",
            "benefits": "تسکین سردردهای میگرنی، ضداسپاسم عضلانی، بهبود گوارش و کاهش خستگی ذهنی",
            "usage_method": "یک قاشق مرباخوری را در یک لیوان آب جوش به مدت ۸ دقیقه دم کنید و با عسل طبیعی میل نمایید.",
            "warnings": "افراد با سابقه حساسیت به گیاهان خانواده کاسنی با احتیاط مصرف کنند.",
            "temperament": "moderate",
            "caffeine_free": True,
            "weight": 100,
            "price": 165000,
            "discount_price": 145000,
            "stock": 60,
            "is_featured": True,
            "sales_count": 98,
            "rating_average": 4.8,
            "review_count": 19,
            "tags": ["ارگانیک ۱۰۰٪", "بدون کافئین", "کاهش استرس"]
        },
        {
            "name": "دمنوش انرژی‌بخش زعفران، زنجبیل و هل هندی",
            "english_name": "Royal Saffron, Ginger & Green Cardamom Infusion",
            "slug": "saffron-ginger-cardamom",
            "category": cat_map["energy-vitality"],
            "short_description": "اکسیر نشاط‌آور درباری با رشته‌های سرخ زعفران قائنات و گرمای نیروبخش زنجبیل تازه",
            "description": "تجربه‌ای اشرافی از عطر و طعم گرمای اصیل مشرق‌زمین. سرشار از آنتی‌اکسیدان، شادی‌آور طبیعی و برطرف‌کننده رخوت و سستی مفرط بدن در فصل سرما یا ساعات پرکار.",
            "ingredients": "رشته‌های کامل زعفران نگین قائنات، ریشه زنجبیل خشک، هل سبز هندی، دارچین سیلان",
            "benefits": "افزایش سطح انرژی روزانه، تقویت سیستم ایمنی، بهبود گردش خون و نشاط روحی",
            "usage_method": "یک قاشق مرباخوری را به همراه آب جوش درون فرنچ پرس یا قوری ریخته و ۱۲ دقیقه دم کنید.",
            "warnings": "برای افراد مبتلا به زخم معده شدید به دلیل تندی ملایم زنجبیل در حد اعتدال مصرف شود.",
            "temperament": "warm",
            "caffeine_free": True,
            "weight": 90,
            "price": 280000,
            "discount_price": 245000,
            "stock": 35,
            "is_featured": True,
            "sales_count": 180,
            "rating_average": 5.0,
            "review_count": 42,
            "tags": ["طبع گرم", "تقویت ایمنی", "دست‌چین سنتی"]
        },
        {
            "name": "دمنوش گوارشی نعناع فلفلی، رازیانه و زنیان",
            "english_name": "Digestive Blend: Peppermint, Fennel & Ajwain",
            "slug": "peppermint-fennel-digestive",
            "category": cat_map["digestive-slimming"],
            "short_description": "تسکین‌دهنده فوق‌العاده سوزش و نفخ معده با حس خنکی نعناع فلفلی تازه",
            "description": "فرمولاسیون تخصصی گیاهی برای بهبود عملکرد دستگاه گوارش بعد از وعده‌های غذایی سنگین. احساس سبکی، خنکی و راحتی در سراسر مجاری تنفسی و هاضمه.",
            "ingredients": "نعناع فلفلی اعلا، دانه رازیانه شیرین، زنیان، زیره سبز کوهی، انیسون",
            "benefits": "رفع سریع نفخ و دل‌پیچه، هضم سریع غذا، خنک‌کننده دهان و بهبود بوی مطبوع تنفس",
            "usage_method": "نیم ساعت پس از وعده غذایی، یک قاشق مرباخوری را به مدت ۷ دقیقه دم کرده و گرم بنوشید.",
            "warnings": "در موارد رفلاکس شدید معده به مری، پیش از مصرف مکرر با پزشک مشورت شود.",
            "temperament": "moderate",
            "caffeine_free": True,
            "weight": 110,
            "price": 140000,
            "discount_price": 125000,
            "stock": 50,
            "is_featured": False,
            "sales_count": 87,
            "rating_average": 4.7,
            "review_count": 15,
            "tags": ["ارگانیک ۱۰۰٪", "بدون کافئین"]
        },
        {
            "name": "چای ترش سودانی و زرشک کوهی اعلا",
            "english_name": "Ruby Hibiscus & Mountain Barberry Tea",
            "slug": "sour-hibiscus-barberry",
            "category": cat_map["pure-leaves"],
            "short_description": "نوشیدنی یاقوتی‌رنگ خنک‌کننده کبد، تنظیم‌کننده فشار و چربی خون با طعم ملس دلچسب",
            "description": "کاسبرگ‌های درشت و خشک‌شده چای ترش خالص همراه با دنده‌های زرشک کوهی ارگانیک. این نوشیدنی هم به صورت گرم در زمستان و هم به شکل آیس‌تی خنک با یخ و برگ نعناع در تابستان فوق‌العاده است.",
            "ingredients": "کاسبرگ گل چای ترش خالص، زرشک کوهی سیاه، لیمو خشک طبیعی",
            "benefits": "تنظیم و کاهش فشار خون، تصفیه کبد چرب، غنی از ویتامین C و شفاف‌کننده پوست",
            "usage_method": "یک قاشق غذاخوری را در ۵۰۰ میلی‌لیتر آب جوش ریخته و پس از ۱۰ دقیقه صاف کرده و میل نمایید.",
            "warnings": "افرادی که به طور طبیعی فشار خون پایینی دارند به همراه نبات یا عسل مصرف نمایند.",
            "temperament": "cold_wet",
            "caffeine_free": True,
            "weight": 150,
            "price": 170000,
            "discount_price": None,
            "stock": 70,
            "is_featured": True,
            "sales_count": 115,
            "rating_average": 4.9,
            "review_count": 23,
            "tags": ["طبع سرد", "ارگانیک ۱۰۰٪", "بدون کافئین"]
        },
        {
            "name": "دمنوش میوه‌ای به، هل و دارچین روست شده",
            "english_name": "Roasted Quince, Cinnamon & Cardamom Tea",
            "slug": "roasted-quince-cinnamon",
            "category": cat_map["energy-vitality"],
            "short_description": "برش‌های برشته میوه به اصفهان با عطر کاراملی و ادویه‌های معطر گرمابخش",
            "description": "میوه به تازه پس از خلال شدن در حرارت ملایم روست و برشته شده تا رنگ شرابی تیره و طعمی غنی شبیه به میوه‌های خشک شده پیدا کند. همراه با چوب دارچین سیلان و هل سبز دانه‌درشت.",
            "ingredients": "خلال به روست شده طلایی، چوب دارچین سیلان، هل سبز، سیب خشک معطر",
            "benefits": "تقویت قلب و عروق، گرمابخش معده، تقویت قوای جسمانی و نشاط‌آور عصرانه",
            "usage_method": "دو قاشق غذاخوری را در قوری ریخته و ۲۰ دقیقه روی حرارت غیرمستقیم (وارمر یا کتری) دم کنید تا رنگ عمیق سرخ آن آزاد شود.",
            "warnings": "فاقد هرگونه مواد شیمیایی و کاملاً ایمن برای تمام گروه‌های سنی.",
            "temperament": "warm",
            "caffeine_free": True,
            "weight": 200,
            "price": 210000,
            "discount_price": 189000,
            "stock": 40,
            "is_featured": True,
            "sales_count": 164,
            "rating_average": 5.0,
            "review_count": 34,
            "tags": ["طبع گرم", "ارگانیک ۱۰۰٪", "بدون کافئین"]
        },
    ]

    for p in products_data:
        tags_list = p.pop("tags")
        product, _ = Product.objects.update_or_create(
            slug=p["slug"],
            defaults=p
        )
        for t_name in tags_list:
            if t_name in tag_map:
                product.tags.add(tag_map[t_name])
    print(f"✅ {len(products_data)} Herbal Products created with full botanical details.")

    # 5. Blog Categories & Posts
    b_cat, _ = BlogCategory.objects.get_or_create(name="دانشنامه دمنوش و طب سنتی", slug="herbal-encyclopedia")
    b_cat2, _ = BlogCategory.objects.get_or_create(name="سبک زندگی و سلامت روان", slug="wellness-lifestyle")

    posts_data = [
        {
            "category": b_cat,
            "title": "راهنمای جامع شناخت طبع گیاهان و انتخاب دمنوش مناسب مزاج شما",
            "slug": "temperament-herbal-tea-guide",
            "reading_time": 6,
            "summary": "چگونه با شناخت طبع گرم و سرد بدن خود، دمنوش مناسبی انتخاب کنیم که تعادل ارگان‌های حیاتی را حفظ کند؟",
            "content": """
            طب سنتی ایرانی بر پایه مفهوم اخلاط چهارگانه و تعادل مزاج‌ها استوار است. هر فرد دارای مزاج پایه منحصر‌به‌فردی است که ممکن است به واسطه تغذیه، اقلیم یا استرس‌های روزمره از تعادل خارج شود.
            
            دمنوش‌های با طبع گرم (مانند زنجبیل، زعفران، دارچین و به):
            این گیاهان جریان خون را تسریع کرده، سستی و رخوت را برطرف نموده و سیستم ایمنی را تقویت می‌کنند. مناسب برای افراد با طبع سرد یا ایام خنک پاییز و زمستان.

            دمنوش‌های با طبع سرد و معتدل (مانند چای ترش، بابونه، کاسنی و عناب):
            تسکین‌دهنده حرارت درونی، کاهنده التهاب کبد، و تنظیم‌کننده فشار خون هستند.
            """
        },
        {
            "category": b_cat2,
            "title": "آیین چای عصرگاهی: چگونه یک فنجان دمنوش سطح کورتیزول را کاهش می‌دهد؟",
            "slug": "evening-tea-ritual-cortisol-relief",
            "reading_time": 4,
            "summary": "علم اعصاب تایید می‌کند که مکث آگاهانه برای نوشیدن دمنوش اسطوخودوس و بابونه، امواج مغزی آلفا را فعال می‌کند.",
            "content": """
            در دنیای پرشتاب امروزی که استرس مداوم باعث ترشح پیوسته هورمون کورتیزول می‌شود، داشتن یک سنت آرامش‌بخش روزانه حیاتی است.
            ترکیباتی همچون آپیژنین موجود در بابونه و لینالول موجود در اسطوخودوس مستقیماً به گیرنده‌های گابا (GABA) در مغز متصل شده و اثر آرام‌بخشی مشابه داروهای کاهنده اضطراب اما بدون عوارض جانبی ایجاد می‌کنند.
            """
        }
    ]

    for post in posts_data:
        BlogPost.objects.update_or_create(
            slug=post['slug'],
            defaults={**post, 'author': admin_user, 'is_published': True}
        )
    print("✅ Blog posts populated.")
    print("🎉 Khoshnoosh Seed Completed Successfully!")

if __name__ == '__main__':
    seed()
