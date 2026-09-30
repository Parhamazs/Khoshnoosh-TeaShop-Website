from rest_framework import views, status, permissions
from rest_framework.response import Response
from .models import Wishlist, WishlistItem
from .serializers import WishlistSerializer
from apps.products.models import Product

class WishlistDetailView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        return Response(WishlistSerializer(wishlist).data)

class WishlistItemToggleView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        product_id = request.data.get('product_id')
        if not product_id:
            return Response({"error": "شناسه محصول الزامی است."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            return Response({"error": "محصول یافت نشد."}, status=status.HTTP_404_NOT_FOUND)

        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        item = WishlistItem.objects.filter(wishlist=wishlist, product=product).first()

        if item:
            item.delete()
            is_in_wishlist = False
            msg = "از لیست علاقه‌مندی‌ها حذف شد."
        else:
            WishlistItem.objects.create(wishlist=wishlist, product=product)
            is_in_wishlist = True
            msg = "به لیست علاقه‌مندی‌ها اضافه شد."

        return Response({
            "message": msg,
            "is_in_wishlist": is_in_wishlist,
            "wishlist": WishlistSerializer(wishlist).data
        })

class WishlistItemDeleteView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, pk):
        wishlist, _ = Wishlist.objects.get_or_create(user=request.user)
        WishlistItem.objects.filter(id=pk, wishlist=wishlist).delete()
        return Response(WishlistSerializer(wishlist).data)
