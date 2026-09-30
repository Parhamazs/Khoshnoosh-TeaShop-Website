from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.utils import timezone
from .models import Payment
from .serializers import PaymentSerializer, PaymentRequestSerializer, PaymentVerifySerializer
from .gateways import SandboxGateway
from apps.orders.models import Order

class RequestPaymentView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = PaymentRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order_id = serializer.validated_data['order_id']
        gateway_type = serializer.validated_data['gateway']

        try:
            order = Order.objects.get(id=order_id, user=request.user)
        except Order.DoesNotExist:
            return Response({"error": "سفارش مورد نظر یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        if order.status != 'pending':
            return Response({"error": "این سفارش قبلاً تعیین وضعیت شده است."}, status=status.HTTP_400_BAD_REQUEST)

        # Call payment gateway
        gateway = SandboxGateway()
        res = gateway.request_payment(
            amount=order.total_amount,
            description=f"پرداخت سفارش {order.order_number} در فروشگاه خوشنوش",
            callback_url=f"/api/payments/verify/"
        )

        payment, _ = Payment.objects.get_or_create(
            order=order,
            defaults={'amount': order.total_amount, 'gateway': gateway_type}
        )
        payment.authority = res['authority']
        payment.status = 'pending'
        payment.save()

        return Response({
            "success": True,
            "authority": res['authority'],
            "payment_url": res['payment_url'],
            "order_number": order.order_number,
            "amount": order.total_amount
        })

class VerifyPaymentView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = PaymentVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        authority = serializer.validated_data['authority']
        payment_status = serializer.validated_data['status']

        try:
            payment = Payment.objects.get(authority=authority)
        except Payment.DoesNotExist:
            return Response({"error": "تراکنش پرداخت یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        if payment_status == 'OK':
            gateway = SandboxGateway()
            verification = gateway.verify_payment(authority=authority, amount=payment.amount)
            
            payment.status = 'successful'
            payment.tracking_code = verification['ref_id']
            payment.card_pan = verification['card_pan']
            payment.paid_at = timezone.now()
            payment.save()

            # Update Order status
            order = payment.order
            order.status = 'paid'
            order.save()

            return Response({
                "success": True,
                "message": "پرداخت با موفقیت انجام و تایید شد.",
                "ref_id": payment.tracking_code,
                "order_number": order.order_number,
                "amount": payment.amount
            })
        else:
            payment.status = 'failed'
            payment.error_message = 'پرداخت توسط کاربر لغو شد یا درگاه با خطا مواجه شد.'
            payment.save()
            return Response({
                "success": False,
                "error": "پرداخت انجام نشد."
            }, status=status.HTTP_400_BAD_REQUEST)
