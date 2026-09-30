from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField('نام دسته‌بندی', max_length=100)
    slug = models.SlugField('نامک (Slug)', unique=True, allow_unicode=True)
    description = models.TextField('توضیحات', blank=True)
    icon = models.CharField('نام آیکون', max_length=50, blank=True, help_text='نام آیکون مثلا leaf, flame, moon, sun')
    image = models.ImageField('تصویر دسته‌بندی', upload_to='categories/', blank=True, null=True)
    order = models.PositiveIntegerField('ترتیب نمایش', default=0)

    class Meta:
        verbose_name = 'دسته‌بندی'
        verbose_name_plural = 'دسته‌بندی‌ها'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField('عنوان برچسب', max_length=50)
    slug = models.SlugField('نامک', unique=True, allow_unicode=True)

    class Meta:
        verbose_name = 'برچسب'
        verbose_name_plural = 'برچسب‌ها'

    def __str__(self):
        return self.name

class Product(models.Model):
    TEMPERAMENT_CHOICES = (
        ('warm', 'گرم و خشک'),
        ('warm_wet', 'گرم و تر'),
        ('cold', 'سرد و خشک'),
        ('cold_wet', 'سرد و تر'),
        ('moderate', 'معتدل'),
    )

    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', verbose_name='دسته‌بندی')
    tags = models.ManyToManyField(Tag, blank=True, related_name='products', verbose_name='برچسب‌ها')
    name = models.CharField('نام محصول', max_length=200)
    english_name = models.CharField('نام لاتین / علمی', max_length=200, blank=True)
    slug = models.SlugField('نامک یکتا', unique=True, allow_unicode=True)
    short_description = models.CharField('توضیح کوتاه', max_length=300)
    description = models.TextField('معرفی کامل محصول')
    
    # Herbal tea specific attributes
    ingredients = models.TextField('ترکیبات و اجزا', help_text='مثال: گل گاوزبان اعلا، سنبل‌الطیب، لیمو عمانی')
    benefits = models.TextField('خواص درمانی و فواید', help_text='آرام‌بخش، بهبود خواب، تقویت قلب')
    usage_method = models.TextField('طریقه و دستور دم‌آوری', help_text='یک قاشق مرباخوری در آب جوش به مدت ۱۰ دقیقه دم بکشد')
    warnings = models.TextField('موارد منع مصرف و هشدارها', blank=True, help_text='در دوران بارداری با احتیاط مصرف شود')
    temperament = models.CharField('طبع گیاهی', max_length=20, choices=TEMPERAMENT_CHOICES, default='moderate')
    caffeine_free = models.BooleanField('بدون کافئین', default=True)
    weight = models.PositiveIntegerField('وزن خالص (گرم)', default=100)
    
    price = models.DecimalField('قیمت پایه (تومان)', max_digits=12, decimal_places=0)
    discount_price = models.DecimalField('قیمت پس از تخفیف (تومان)', max_digits=12, decimal_places=0, blank=True, null=True)
    stock = models.PositiveIntegerField('موجودی انبار', default=50)
    
    is_active = models.BooleanField('فعال و قابل فروش', default=True)
    is_featured = models.BooleanField('محصول ویژه', default=False)
    sales_count = models.PositiveIntegerField('تعداد فروش', default=0)
    rating_average = models.DecimalField('میانگین امتیاز', max_digits=3, decimal_places=1, default=5.0)
    review_count = models.PositiveIntegerField('تعداد دیدگاه‌ها', default=0)
    
    created_at = models.DateTimeField('تاریخ ثبت', auto_now_add=True)
    updated_at = models.DateTimeField('آخرین بروزرسانی', auto_now=True)

    class Meta:
        verbose_name = 'محصول دمنوش'
        verbose_name_plural = 'محصولات دمنوش'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.weight} گرم)"

    @property
    def final_price(self):
        return self.discount_price if (self.discount_price and self.discount_price < self.price) else self.price

    @property
    def discount_percent(self):
        if self.discount_price and self.discount_price < self.price:
            return int(((self.price - self.discount_price) / self.price) * 100)
        return 0

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', verbose_name='محصول')
    image = models.ImageField('تصویر', upload_to='products/')
    alt_text = models.CharField('متن جایگزین (Alt)', max_length=150, blank=True)
    is_primary = models.BooleanField('تصویر اصلی', default=False)
    order = models.PositiveIntegerField('ترتیب', default=0)

    class Meta:
        verbose_name = 'تصویر محصول'
        verbose_name_plural = 'تصاویر محصولات'
        ordering = ['order', 'id']

    def save(self, *args, **kwargs):
        if self.is_primary:
            ProductImage.objects.filter(product=self.product, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)
