from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('order', 'amount', 'gateway', 'status', 'tracking_code', 'paid_at')
    list_filter = ('status', 'gateway', 'created_at')
    search_fields = ('order__order_number', 'tracking_code', 'authority')
