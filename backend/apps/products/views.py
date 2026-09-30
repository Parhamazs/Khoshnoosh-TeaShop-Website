from rest_framework import generics, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Tag, Product
from .serializers import (
    CategorySerializer,
    TagSerializer,
    ProductListSerializer,
    ProductDetailSerializer,
)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('order', 'name')
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = None

class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = None

class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name', 'english_name', 'short_description', 'description', 'ingredients', 'benefits')
    ordering_fields = ('price', 'sales_count', 'created_at', 'rating_average')
    ordering = ('-created_at',)

    def get_queryset(self):
        qs = Product.objects.filter(is_active=True).prefetch_related('images', 'tags').select_related('category')
        
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
            
        tag_slug = self.request.query_params.get('tag')
        if tag_slug:
            qs = qs.filter(tags__slug=tag_slug)

        min_price = self.request.query_params.get('min_price')
        if min_price:
            qs = qs.filter(price__gte=min_price)

        max_price = self.request.query_params.get('max_price')
        if max_price:
            qs = qs.filter(price__lte=max_price)

        temperament = self.request.query_params.get('temperament')
        if temperament:
            qs = qs.filter(temperament=temperament)

        caffeine_free = self.request.query_params.get('caffeine_free')
        if caffeine_free is not None:
            is_caffeine_free = caffeine_free.lower() in ['true', '1']
            qs = qs.filter(caffeine_free=is_caffeine_free)

        featured = self.request.query_params.get('featured')
        if featured is not None and featured.lower() in ['true', '1']:
            qs = qs.filter(is_featured=True)

        return qs

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).prefetch_related('images', 'tags').select_related('category')
    serializer_class = ProductDetailSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'
