from rest_framework import serializers
from .models import BlogCategory, BlogPost

class BlogCategorySerializer(serializers.ModelSerializer):
    posts_count = serializers.IntegerField(source='posts.count', read_only=True)

    class Meta:
        model = BlogCategory
        fields = ('id', 'name', 'slug', 'posts_count')

class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.full_name', default='تیم سلامت خوشنوش', read_only=True)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'slug', 'summary', 'image', 'reading_time', 'category', 'author_name', 'views_count', 'created_at')

class BlogPostDetailSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.CharField(source='author.full_name', default='تیم سلامت خوشنوش', read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
