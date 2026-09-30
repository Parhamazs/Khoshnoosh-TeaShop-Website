from rest_framework import views, status, permissions
from rest_framework.response import Response
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from apps.products.models import Product

def get_or_create_cart(request):
    if request.user.is_authenticated:
        cart, _ = Cart.objects.get_or_create(user=request.user)
    else:
        if not request.session.session_key:
            request.session.create()
        cart, _ = Cart.objects.get_or_create(session_key=request.session.session_key)
    return cart

class CartDetailView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        cart = get_or_create_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class CartItemCreateView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        cart = get_or_create_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        if not product_id:
            return Response({"error": "شناسه محصول الزامی است."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            return Response({"error": "محصول مورد نظر یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        if product.stock < quantity:
            return Response({"error": "موجودی این دمنوش کافی نیست."}, status=status.HTTP_400_BAD_REQUEST)

        item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity
        item.save()

        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class CartItemDetailView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def patch(self, request, pk):
        cart = get_or_create_cart(request)
        try:
            item = CartItem.objects.get(id=pk, cart=cart)
        except CartItem.DoesNotExist:
            return Response({"error": "آیتم در سبد خرید یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        quantity = int(request.data.get('quantity', 1))
        if quantity <= 0:
            item.delete()
        else:
            if item.product.stock < quantity:
                return Response({"error": "موجودی انبار کافی نیست."}, status=status.HTTP_400_BAD_REQUEST)
            item.quantity = quantity
            item.save()

        return Response(CartSerializer(cart).data)

    def delete(self, request, pk):
        cart = get_or_create_cart(request)
        try:
            item = CartItem.objects.get(id=pk, cart=cart)
            item.delete()
        except CartItem.DoesNotExist:
            pass
        return Response(CartSerializer(cart).data)
