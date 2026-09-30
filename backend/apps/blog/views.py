from rest_framework import generics, permissions
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer

class BlogCategoryListView(generics.ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    permission_classes = (permissions.AllowAny,)
    pagination_class = None

class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        qs = BlogPost.objects.filter(is_published=True).select_related('category', 'author')
        category_slug = self.request.query_params.get('category')
        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        return qs

class BlogPostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(is_published=True).select_related('category', 'author')
    serializer_class = BlogPostDetailSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return generics.Response(serializer.data)
