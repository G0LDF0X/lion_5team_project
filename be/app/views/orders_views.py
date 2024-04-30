from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Order, User, OrderItem
from app.serializer import OrderSerializer, ShippingAddressSerializer
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
    # Order 테이블에 데이터 생성
    if serializer.is_valid():
        order = serializer.save()
        order.paid_at = timezone.now()
        order.save()

        # shipping address 테이블에 데이터 넣기
        shipping_data = request.data.get('shipping_address')
        shipping_data['order_id'] = order.id
        shipping_serializer = ShippingAddressSerializer(data=shipping_data)
        if shipping_serializer.is_valid():
            shipping_serializer.save()
        else:
            return Response(shipping_serializer.errors, status=400)


        return Response(serializer.data, status=201)  # Return the order_id in the response
    return Response(serializer.errors, status=400)