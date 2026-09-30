import uuid
from django.db import models
from django.conf import settings
from apps.products.models import Product

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار پرداخت'),
        ('paid', 'پرداخت شده / آماده‌سازی'),
        ('processing', 'در حال بسته‌بندی گیاهی'),
        ('shipped', 'تحویل به پست / پیک'),
        ('delivered', 'تحویل داده شده'),
        ('cancelled', 'لغو شده'),
    )

    order_number = models.CharField('شماره پیگیری سفارش', max_length=20, unique=True, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders', verbose_name='کاربر')
    status = models.CharField('وضعیت سفارش', max_length=20, choices=STATUS_CHOICES, default='pending')
    
    # Snapshot of delivery address
    receiver_name = models.CharField('نام گیرنده', max_length=100)
    receiver_phone = models.CharField('تلفن تماس', max_length=15)
    province = models.CharField('استان', max_length=50)
    city = models.CharField('شهر', max_length=50)
    address = models.TextField('آدرس پستی')
    postal_code = models.CharField('کد پستی', max_length=10)
    shipping_note = models.TextField('یادداشت ارسال یا بسته‌بندی هدیه', blank=True)
    
    subtotal = models.DecimalField('مجموع اقلام (تومان)', max_digits=12, decimal_places=0)
    shipping_cost = models.DecimalField('هزینه ارسال (تومان)', max_digits=10, decimal_places=0, default=35000)
    discount_amount = models.DecimalField('مبلغ تخفیف (تومان)', max_digits=10, decimal_places=0, default=0)
    total_amount = models.DecimalField('مبلغ نهایی پرداختی (تومان)', max_digits=12, decimal_places=0)

    created_at = models.DateTimeField('تاریخ ثبت سفارش', auto_now_add=True)
    updated_at = models.DateTimeField('آخرین وضعیت', auto_now=True)

    class Meta:
        verbose_name = 'سفارش'
        verbose_name_plural = 'سفارشات'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = f"KN-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"سفارش {self.order_number} - {self.user.email}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField('نام محصول', max_length=200)
    unit_price = models.DecimalField('قیمت واحد (تومان)', max_digits=12, decimal_places=0)
    quantity = models.PositiveIntegerField('تعداد', default=1)
    subtotal = models.DecimalField('مجموع (تومان)', max_digits=12, decimal_places=0)

    class Meta:
        verbose_name = 'آیتم سفارش'
        verbose_name_plural = 'آیتم‌های سفارش'

    def save(self, *args, **kwargs):
        self.subtotal = self.unit_price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_name} x {self.quantity}"
