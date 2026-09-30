from django.urls import path
from .views import RequestPaymentView, VerifyPaymentView

urlpatterns = [
    path('request/', RequestPaymentView.as_view(), name='payment_request'),
    path('verify/', VerifyPaymentView.as_view(), name='payment_verify'),
]
