from django.urls import path
from .views import (
    CategoryListView,
    TagListView,
    ProductListView,
    ProductDetailView,
)

urlpatterns = [
    path('', ProductListView.as_view(), name='product_list'),
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('tags/', TagListView.as_view(), name='tag_list'),
    path('<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),
]
