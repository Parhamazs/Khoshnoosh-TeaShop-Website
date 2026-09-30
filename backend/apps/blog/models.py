from django.db import models
from django.conf import settings

class BlogCategory(models.Model):
    name = models.CharField('عنوان دسته‌بندی', max_length=100)
    slug = models.SlugField('نامک', unique=True, allow_unicode=True)

    class Meta:
        verbose_name = 'دسته‌بندی مقاله'
        verbose_name_plural = 'دسته‌بندی مقالات'

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, related_name='posts', verbose_name='دسته‌بندی')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, verbose_name='نویسنده')
    title = models.CharField('عنوان مقاله', max_length=250)
    slug = models.SlugField('نامک یکتا', unique=True, allow_unicode=True)
    summary = models.TextField('خلاصه مطلب')
    content = models.TextField('متن کامل مقاله')
    image = models.ImageField('تصویر شاخص', upload_to='blog/', blank=True, null=True)
    reading_time = models.PositiveIntegerField('زمان تقریبی مطالعه (دقیقه)', default=5)
    is_published = models.BooleanField('منتشر شده', default=True)
    views_count = models.PositiveIntegerField('تعداد بازدید', default=0)
    created_at = models.DateTimeField('تاریخ انتشار', auto_now_add=True)
    updated_at = models.DateTimeField('تاریخ بروزرسانی', auto_now=True)

    class Meta:
        verbose_name = 'مقاله وبلاگ'
        verbose_name_plural = 'مقالات وبلاگ'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
