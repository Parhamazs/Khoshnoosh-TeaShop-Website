from django.db import models
from django.conf import settings
from apps.products.models import Product

class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews', verbose_name='محصول')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews', verbose_name='کاربر')
    rating = models.PositiveSmallIntegerField('امتیاز (۱ تا ۵)', default=5)
    comment = models.TextField('متن نظر و تجربه استفاده')
    is_approved = models.BooleanField('تایید شده برای نمایش', default=True)
    created_at = models.DateTimeField('تاریخ ثبت', auto_now_add=True)

    class Meta:
        verbose_name = 'دیدگاه محصول'
        verbose_name_plural = 'دیدگاه‌های محصولات'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.email} - {self.product.name} ({self.rating} ستاره)"
