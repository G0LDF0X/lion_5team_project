from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import OrderItem
from app.serializer import OrderItemSerializer



@api_view(['GET'])
def order_item_detail(request, pk):
    try:
        order_item = OrderItem.objects.get(id=pk)
        serializer = OrderItemSerializer(order_item)
        return Response(serializer.data)
    except OrderItem.DoesNotExist:
        raise Response("Order item does not exist")
