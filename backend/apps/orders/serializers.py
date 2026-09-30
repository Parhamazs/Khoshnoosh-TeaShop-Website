from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductListSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'unit_price', 'quantity', 'subtotal')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Order
        fields = (
            'id', 'order_number', 'status', 'status_display',
            'receiver_name', 'receiver_phone', 'province', 'city', 'address', 'postal_code',
            'shipping_note', 'subtotal', 'shipping_cost', 'discount_amount', 'total_amount',
            'items', 'created_at', 'updated_at'
        )
        read_only_fields = ('order_number', 'subtotal', 'total_amount', 'status', 'created_at', 'updated_at')

class OrderCreateSerializer(serializers.Serializer):
    receiver_name = serializers.CharField(max_length=100)
    receiver_phone = serializers.CharField(max_length=15)
    province = serializers.CharField(max_length=50)
    city = serializers.CharField(max_length=50)
    address = serializers.CharField()
    postal_code = serializers.CharField(max_length=10)
    shipping_note = serializers.CharField(required=False, allow_blank=True)
