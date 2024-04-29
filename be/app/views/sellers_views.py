from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Seller, OrderItem, User, Item
from app.serializer import SellerSerializer, OrderItemSerializer, ItemSerializer
@api_view(['GET'])
def index(request):
    sellers = Seller.objects.all()
    order_items = OrderItem.objects.all()

    seller_serializer = SellerSerializer(sellers, many=True)
    order_item_serializer = OrderItemSerializer(order_items, many=True)

    data = {
        'sellers': seller_serializer.data,
        'order_items': order_item_serializer.data
    }

    return Response(data)

class SellerItemManageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Assuming the seller is linked to the user model
        user = User.objects.get(name=request.user)
        seller = Seller.objects.get(user_id_id=user.id)
        items = Item.objects.filter(seller_id=seller)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
