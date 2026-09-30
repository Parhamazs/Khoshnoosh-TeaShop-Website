from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ('product_name', 'unit_price', 'quantity', 'subtotal')
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'user', 'receiver_name', 'total_amount', 'status', 'created_at')
    list_filter = ('status', 'created_at', 'province')
    search_fields = ('order_number', 'receiver_name', 'receiver_phone', 'user__email')
    readonly_fields = ('order_number', 'subtotal', 'shipping_cost', 'total_amount', 'created_at', 'updated_at')
    inlines = [OrderItemInline]
