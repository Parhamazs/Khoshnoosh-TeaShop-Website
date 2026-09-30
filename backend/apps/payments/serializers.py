from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ('order', 'amount', 'status', 'tracking_code', 'authority', 'card_pan', 'paid_at')

class PaymentRequestSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    gateway = serializers.ChoiceField(choices=Payment.GATEWAY_CHOICES, default='sandbox')

class PaymentVerifySerializer(serializers.Serializer):
    authority = serializers.CharField()
    status = serializers.CharField()  # 'OK' or 'NOK'
