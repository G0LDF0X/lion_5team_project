from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from app.models import Seller, OrderItem, User, Item, User_Answer, Refund, Order
from app.serializer import SellerSerializer, OrderItemSerializer, ItemSerializer, RefundSerializer, ItemAnswerSerializer
from rest_framework import status
from django.utils import timezone
from calendar import monthrange
from django.db.models import F, Sum
from datetime import timedelta,datetime
from dateutil.relativedelta import relativedelta
import pytz
from django.core.cache import cache 

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
        user = User.objects.get(username=request.user)
        seller = Seller.objects.get(user_id_id=user.id)
        items = Item.objects.filter(seller_id=seller)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SellerRevenueView(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    items = Item.objects.filter(seller_id=seller)
    total_revenue = 0
    for item in items:
        order_items = OrderItem.objects.filter(item_id=item)
        for order_item in order_items:
            order_item.price_multi_qty = item.price * order_item.qty
            total_revenue += order_item.price_multi_qty
    return Response({'total_revenue': total_revenue})

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def SellerRevenueView(request):
#     cache_key = f'seller_revenue_{request.user}'
#     total_revenue = cache.get(cache_key)

#     if total_revenue is None:
#         user = User.objects.get(username=request.user)
#         seller = Seller.objects.get(user_id=user)
#         items = Item.objects.filter(seller_id=seller)
#         total_revenue = 0
#         for item in items:
#             order_items = OrderItem.objects.filter(item_id=item)
#             for order_item in order_items:
#                 order_item.price_multi_qty = item.price * order_item.qty
#                 total_revenue += order_item.price_multi_qty

#         cache.set(cache_key, total_revenue, 600)  # 캐시 유효 시간을 10분으로 설정

#     return Response({'total_revenue': total_revenue})

@api_view(['G'])
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def SellerSettingsView(request):
    user = User.objects.get(username=request.user)
    seller = Seller.objects.get(user_id=user)
    if request.method == 'GET':
        return Response({
            'name': user.name,
            'phone': user.phone,
            'address': user.address,
            'nickname': user.nickname,
            'email': user.email,
            'address': user.address,
            'description': user.description,
            'bs_number': seller.bs_number,
        })
    elif request.method == 'POST':
        # Seller information 수정요청시
        seller.bs_number = request.data.get('bs_number', seller.bs_number)
        seller.save()
        return Response({'message': 'Seller information updated successfully'})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_qna_view(request):
    user = User.objects.get(username=request.user)

    seller_answer_list = User_Answer.objects.filter(user_id_id=user.id)
    serializer = ItemAnswerSerializer(seller_answer_list, many=True)

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def seller_refund_view(request):
    user = User.objects.get(username=request.user)
    print(request.user)
    print(f'User: {user}')

    seller = Seller.objects.get(user_id=user)
    print(f'Seller: {seller}')

    order_items = OrderItem.objects.filter(item_id__seller_id=seller)
    print(f'Order items: {order_items}')

    order_item_ids = [item.id for item in order_items]
    print(order_item_ids)

    refund_items = Refund.objects.filter(order_item_id__in=order_item_ids)
    print(f'Refund items: {refund_items}')
    
    serializer = RefundSerializer(refund_items, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def Seller_Apply_Save(request):
    if request.method == 'POST':
        bs_number = request.data.get('bs_number')
        if bs_number is None:
            return Response({'error': 'bs_number is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(username=request.user)
        user.is_seller = True
        user.save()
        seller = Seller.objects.create(
            user_id=user,
            bs_number=request.data.get('bs_number')
            )
        serializer = SellerSerializer(seller)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'GET':
        user = User.objects.get(username=request.user)
        if user.is_seller:
            seller = Seller.objects.get(user_id=user)
            serializer = SellerSerializer(seller)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User is not a seller'}, status=status.HTTP_400_BAD_REQUEST)
        
from django.utils import timezone

@api_view(['GET'])
def MonthlySellerRevenueView(request, pk):
    try:
        seller = Seller.objects.get(user_id_id=pk)
    except Seller.DoesNotExist:
        return Response({'error': 'Seller not found'}, status=404)

    items = Item.objects.filter(seller_id=seller)
    now = timezone.now()
    current_year = now.year

    monthly_revenue = []
    for month in range(1, 13):
        first_day_of_month = timezone.datetime(current_year, month, 1)
        last_day_of_month = timezone.datetime(current_year, month, monthrange(current_year, month)[1])
        
        monthly_sum = 0
        for item in items:
            order_items = OrderItem.objects.filter(
                item_id=item,
                order_id__created_at__year=current_year,
                order_id__created_at__month=month
            )
            monthly_sum += order_items.aggregate(
                total=Sum(F('qty') * item.price)
            )['total'] or 0
        
        monthly_revenue.append({
            'month': month,
            'revenue': monthly_sum
        })

    return Response({'monthly_revenue': monthly_revenue})

from django.utils import timezone
from django.db.models import Sum

@api_view(['GET'])
def ItemSalesStatsView(request, pk):
    try:
        seller = Seller.objects.get(user_id_id=pk)
    except Seller.DoesNotExist:
        return Response({'error': 'Seller not found'}, status=status.HTTP_404_NOT_FOUND)
    
    filter_value = request.GET.get('filter')
    order_items = OrderItem.objects.filter(item_id__seller_id=seller.id)

    if filter_value == 'week':
        start_of_week = datetime.now() - timedelta(days=datetime.now().weekday())
        end_of_week = start_of_week + timedelta(days=6)
        order_items = order_items.filter(order_id__created_at__range=[start_of_week, end_of_week])
        date_range = {'start_date': start_of_week, 'end_date': end_of_week}
    elif filter_value == 'month':
        start_of_month = datetime.now().replace(day=1)
        end_of_month = start_of_month + relativedelta(months=1, days=-1)
        order_items = order_items.filter(order_id__created_at__range=[start_of_month, end_of_month])
        date_range = {'start_date': start_of_month, 'end_date': end_of_month}
    else:
        date_range = {}

    item_stats = order_items.values('item_id__name').annotate(
        total_sales=Sum('qty'),
        total_revenue=Sum('price_multi_qty')
    ).order_by('-total_sales')

    item_stats_list = []
    for stat in item_stats:
        item_stats_list.append({
            'item_name': stat['item_id__name'],
            'total_sales': stat['total_sales'],
            'total_revenue': stat['total_revenue']
        })

    return Response({'item_stats': item_stats_list, 'date_range': date_range}, status=status.HTTP_200_OK)