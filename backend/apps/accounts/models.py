from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email field is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    email = models.EmailField('آدرس ایمیل', unique=True)
    phone_number = models.CharField('شماره موبایل', max_length=15, blank=True, null=True, unique=True)
    full_name = models.CharField('نام و نام خانوادگی', max_length=150, blank=True)
    avatar = models.ImageField('تصویر پروفایل', upload_to='avatars/', blank=True, null=True)
    created_at = models.DateTimeField('تاریخ ثبت‌نام', auto_now_add=True)
    updated_at = models.DateTimeField('آخرین ویرایش', auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        verbose_name = 'کاربر'
        verbose_name_plural = 'کاربران'

    def __str__(self):
        return self.full_name or self.email

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses', verbose_name='کاربر')
    title = models.CharField('عنوان آدرس (منزل، محل کار)', max_length=50, default='منزل')
    receiver_name = models.CharField('نام تحویل‌گیرنده', max_length=100)
    receiver_phone = models.CharField('شماره تماس تحویل‌گیرنده', max_length=15)
    province = models.CharField('استان', max_length=50)
    city = models.CharField('شهر', max_length=50)
    address_line = models.TextField('نشانی پستی دقیق')
    postal_code = models.CharField('کد پستی ۱۰ رقمی', max_length=10)
    is_default = models.BooleanField('آدرس پیش‌فرض', default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'آدرس'
        verbose_name_plural = 'آدرس‌ها'

    def save(self, *args, **kwargs):
        if self.is_default:
            Address.objects.filter(user=self.user, is_default=True).update(is_default=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.city}, {self.receiver_name}"
