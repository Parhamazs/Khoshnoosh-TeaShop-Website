from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.db import transaction
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer
from apps.cart.models import Cart
from .tasks import send_order_confirmation_notification

class OrderListCreateView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items').order_by('-created_at')

    def create(self, request, *args, **kwargs):
        input_serializer = OrderCreateSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        data = input_serializer.validated_data

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "سبد خرید شما خالی است."}, status=status.HTTP_400_BAD_REQUEST)

        cart_items = cart.items.all().select_related('product')
        if not cart_items.exists():
            return Response({"error": "سبد خرید شما خالی است."}, status=status.HTTP_400_BAD_REQUEST)

        # Check stock
        for item in cart_items:
            if item.product.stock < item.quantity:
                return Response({
                    "error": f"موجودی دمنوش {item.product.name} کمتر از تعداد درخواستی است."
                }, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            subtotal = sum(item.subtotal for item in cart_items)
            shipping_cost = 0 if subtotal >= 300000 else 35000  # Free shipping over 300,000 Tomans
            total_amount = subtotal + shipping_cost

            order = Order.objects.create(
                user=request.user,
                receiver_name=data['receiver_name'],
                receiver_phone=data['receiver_phone'],
                province=data['province'],
                city=data['city'],
                address=data['address'],
                postal_code=data['postal_code'],
                shipping_note=data.get('shipping_note', ''),
                subtotal=subtotal,
                shipping_cost=shipping_cost,
                total_amount=total_amount,
                status='pending'
            )

            for item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    product_name=item.product.name,
                    unit_price=item.product.final_price,
                    quantity=item.quantity,
                    subtotal=item.subtotal
                )
                # Deduct stock & increment sales count
                item.product.stock -= item.quantity
                item.product.sales_count += item.quantity
                item.product.save()

            # Clear cart
            cart.items.all().delete()

        # Trigger Celery notification
        try:
            send_order_confirmation_notification.delay(order.id)
        except Exception:
            pass

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)

class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).prefetch_related('items')
