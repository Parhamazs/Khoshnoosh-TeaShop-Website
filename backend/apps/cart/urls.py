from django.urls import path
from .views import CartDetailView, CartItemCreateView, CartItemDetailView

urlpatterns = [
    path('', CartDetailView.as_view(), name='cart_detail'),
    path('items/', CartItemCreateView.as_view(), name='cart_add_item'),
    path('items/<int:pk>/', CartItemDetailView.as_view(), name='cart_item_action'),
]
