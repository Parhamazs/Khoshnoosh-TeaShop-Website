from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db.models import Avg
from .models import ProductReview
from .serializers import ProductReviewSerializer, ProductReviewCreateSerializer
from apps.products.models import Product

class ProductReviewListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProductReviewCreateSerializer
        return ProductReviewSerializer

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        return ProductReview.objects.filter(product_id=product_id, is_approved=True)

    def perform_create(self, serializer):
        product_id = self.kwargs.get('product_id')
        product = Product.objects.get(id=product_id)
        review = serializer.save(user=self.request.user, product=product)

        # Recalculate average rating & review count
        stats = ProductReview.objects.filter(product=product, is_approved=True).aggregate(
            avg_rating=Avg('rating'),
        )
        product.review_count = ProductReview.objects.filter(product=product, is_approved=True).count()
        if stats['avg_rating']:
            product.rating_average = round(stats['avg_rating'], 1)
        product.save(update_fields=['rating_average', 'review_count'])
