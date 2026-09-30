from rest_framework import serializers
from .models import Category, Tag, Product, ProductImage

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'slug')

class CategorySerializer(serializers.ModelSerializer):
    products_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'icon', 'image', 'order', 'products_count')

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image', 'alt_text', 'is_primary')

class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()
    final_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'name', 'english_name', 'slug', 'short_description',
            'price', 'discount_price', 'final_price', 'discount_percent',
            'stock', 'category', 'tags', 'weight', 'temperament',
            'caffeine_free', 'rating_average', 'review_count',
            'primary_image', 'is_featured'
        )

    def get_primary_image(self, obj):
        img = obj.images.filter(is_primary=True).first() or obj.images.first()
        return img.image.url if img and img.image else None

class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    final_price = serializers.DecimalField(max_digits=12, decimal_places=0, read_only=True)
    discount_percent = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
