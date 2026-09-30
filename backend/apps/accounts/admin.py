from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Address

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('-created_at',)
    list_display = ('email', 'full_name', 'phone_number', 'is_staff', 'is_active', 'created_at')
    list_filter = ('is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('اطلاعات شخصی', {'fields': ('full_name', 'phone_number', 'avatar')}),
        ('دسترسی‌ها', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('تاریخ‌ها', {'fields': ('last_login', 'created_at')}),
    )
    readonly_fields = ('created_at',)
    search_fields = ('email', 'full_name', 'phone_number')

@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'receiver_name', 'city', 'receiver_phone', 'is_default')
    list_filter = ('city', 'province', 'is_default')
    search_fields = ('receiver_name', 'user__email', 'address_line', 'postal_code')
