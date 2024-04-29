from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Seller, OrderItem
from app.serializer import SellerSerializer, OrderItemSerializer
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