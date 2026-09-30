from rest_framework import serializers
from .models import ProductReview

class ProductReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.full_name', default='کاربر مهمان', read_only=True)

    class Meta:
        model = ProductReview
        fields = ('id', 'user_name', 'rating', 'comment', 'created_at')
        read_only_fields = ('id', 'created_at')

class ProductReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ('rating', 'comment')
