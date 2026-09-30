from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.serializers import ProductListSerializer
from apps.products.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductListSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.filter(is_active=True),
        source='product',
        write_only=True
    )
    unit_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    subtotal = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)

    class Meta:
        model = CartItem
        fields = ('id', 'product', 'product_id', 'quantity', 'unit_price', 'subtotal')

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    total_items = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'items', 'total_items', 'total_price', 'updated_at')
