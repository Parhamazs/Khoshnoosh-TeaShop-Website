from django.urls import path
from .views import WishlistDetailView, WishlistItemToggleView, WishlistItemDeleteView

urlpatterns = [
    path('', WishlistDetailView.as_view(), name='wishlist_detail'),
    path('toggle/', WishlistItemToggleView.as_view(), name='wishlist_toggle'),
    path('items/<int:pk>/', WishlistItemDeleteView.as_view(), name='wishlist_delete_item'),
]
