from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.models import Order
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
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        order = serializer.save()
        order.paid_at = timezone.now()
        order.save()
        order_id = pk  # Get the primary key from the URL
        return Response({'order_id': order_id}, status=201)  # Return the order_id in the response
    return Response(serializer.errors, status=400)