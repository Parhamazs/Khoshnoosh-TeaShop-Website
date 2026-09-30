from django.db import models
from django.conf import settings
from apps.products.models import Product

class Wishlist(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='wishlist')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'لیست علاقه‌مندی'
        verbose_name_plural = 'لیست‌های علاقه‌مندی'

    def __str__(self):
        return f"Wishlist of {self.user.email}"

class WishlistItem(models.Model):
    wishlist = models.ForeignKey(Wishlist, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'آیتم علاقه‌مندی'
        verbose_name_plural = 'آیتم‌های علاقه‌مندی'
        unique_together = ('wishlist', 'product')

    def __str__(self):
        return f"{self.wishlist.user.email} - {self.product.name}"
