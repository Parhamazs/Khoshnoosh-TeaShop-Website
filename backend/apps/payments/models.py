from django.db import models
from apps.orders.models import Order

class Payment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'در انتظار پرداخت'),
        ('successful', 'پرداخت موفق'),
        ('failed', 'ناموفق / لغو شده'),
    )

    GATEWAY_CHOICES = (
        ('zarinpal', 'زرین‌پال (ZarinPal)'),
        ('saman', 'سامان کیش (SEP)'),
        ('mellat', 'به‌پرداخت ملت (Mellat)'),
        ('sandbox', 'درگاه آزمایشی خوشنوش (Sandbox)'),
    )

    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name='payment', verbose_name='سفارش')
    amount = models.DecimalField('مبلغ تراکنش (تومان)', max_digits=12, decimal_places=0)
    gateway = models.CharField('درگاه پرداخت', max_length=20, choices=GATEWAY_CHOICES, default='sandbox')
    status = models.CharField('وضعیت تراکنش', max_length=20, choices=STATUS_CHOICES, default='pending')
    authority = models.CharField('کد یکتای درگاه (Authority/Token)', max_length=100, blank=True)
    tracking_code = models.CharField('شماره پیگیری پرداخت (RefID)', max_length=100, blank=True)
    card_pan = models.CharField('شماره کارت ماسک‌شده', max_length=20, blank=True)
    error_message = models.TextField('پیام خطا', blank=True)
    created_at = models.DateTimeField('تاریخ شروع تراکنش', auto_now_add=True)
    paid_at = models.DateTimeField('تاریخ تکمیل پرداخت', null=True, blank=True)

    class Meta:
        verbose_name = 'تراکنش پرداخت'
        verbose_name_plural = 'تراکنش‌های پرداخت'

    def __str__(self):
        return f"Payment #{self.id} for Order {self.order.order_number} - {self.status}"
