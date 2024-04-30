from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Order, User, OrderItem
from app.serializer import OrderSerializer
from django.utils import timezone

@api_view(['GET'])
def cart(request):
    user = request.user
    orders = Order.objects.filter(user_id=user.id)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_order(request, pk): # 결제페이지
    user = User.objects.get(name=request.user)
    # pk가 order_id
    get_items = OrderItem.objects.filter(order_id=pk)
    data = request.data.copy()
    data['user_id'] = user.id
    data['shipping_price'] = 5000
    data['is_delivered'] = False

    total_price = 0
    for order_item in get_items:
        total_price += order_item.item_id.price * order_item.qty
    data['total_price'] = total_price
    serializer = OrderSerializer(data=data)
    if serializer.is_valid():
        order = serializer.save()
        order.paid_at = timezone.now()
        order.save()
        order_id = pk  # Get the primary key from the URL
        return Response(serializer.data, status=201)  # Return the order_id in the response
    return Response(serializer.errors, status=400)