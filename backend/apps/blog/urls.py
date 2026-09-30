from django.urls import path
from .views import BlogCategoryListView, BlogPostListView, BlogPostDetailView

urlpatterns = [
    path('categories/', BlogCategoryListView.as_view(), name='blog_category_list'),
    path('posts/', BlogPostListView.as_view(), name='blog_post_list'),
    path('posts/<slug:slug>/', BlogPostDetailView.as_view(), name='blog_post_detail'),
]
