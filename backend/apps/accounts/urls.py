from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    RegisterView,
    ProfileView,
    CustomTokenObtainPairView,
    AddressListCreateView,
    AddressDetailView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='auth_login'),
    path('refresh/', TokenRefreshView.as_view(), name='auth_refresh'),
    path('profile/', ProfileView.as_view(), name='auth_profile'),
    path('addresses/', AddressListCreateView.as_view(), name='user_addresses'),
    path('addresses/<int:pk>/', AddressDetailView.as_view(), name='user_address_detail'),
]
