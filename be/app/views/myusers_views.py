from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Seller, User , User_QnA, Order,OrderItem, Review, Bookmark
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist
from app.serializer import *
from django.contrib.auth.models import User as auth_user
import datetime


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_Seller_Apply(request):
    serializer = SellerSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.get(name=request.user)
        serializer.save(user_id=user)

        user = request.user
        user.is_seller = True
        user.save()

        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)
    

@api_view(['GET'])
def my_shopping(request):
    user = User.objects.get(name=request.user)
    orders = Order.objects.filter(user_id=user)
    orders_ids = orders.values_list('id', flat=True)
    order_items = OrderItem.objects.filter(order_id__in=orders_ids)

    serializer = OrderItemSerializer(order_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_mypage_profile(request):
    user = User.objects.get(name=request.user)
    user_data = User_Serializer(user).data
    try:
        seller = Seller.objects.get(user_id=user)
        seller_data = SellerSerializer(seller).data
    except ObjectDoesNotExist:
        seller_data = None
    return JsonResponse({'user': user_data, 'seller': seller_data})


@api_view(['PUT'])       
@permission_classes([IsAuthenticated])
def update_User_Profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    print(data)
    
    if hasattr(user, 'username'):
        user.username = data.get('username', user.username)
    if hasattr(user, 'email'):
        user.email = data.get('email', user.email)
    
    if data.get('password'):
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyUserQnA(request):
    user = User.objects.get(name=request.user)
    my_user_qna_list = User_QnA.objects.filter(user_id=user)
    serializer = MyUserQnASerializer(my_user_qna_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyReview(request):
    user = User.objects.get(name=request.user)
    reviews = Review.objects.filter(user_id=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def my_bookmarks(request):
    user= User.objects.get(name=request.user)
    bookmarks = Bookmark.objects.filter(user_id=user)

    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def add_bookmark(request, pk):
    print(request.user)
    user = User.objects.get(username=request.user.username)
    item = Item.objects.get(pk=pk)
    bookmark = Bookmark.objects.create(
          user_id=user.id,
          item_id=item,
          created_at=datetime.datetime.now()
          )
    serializer = BookmarkSerializer(bookmark)
    return Response(serializer.data)   


@api_view(['DELETE'])
def delete_bookmark(request, pk):
    user = auth_user.objects.get(name=request.user)
    item = Item.objects.get(pk=pk)
    bookmark = Bookmark.objects.get(user_id=user, item_id=item)
    bookmark.delete()
    return Response('Bookmark deleted')


@api_view(['GET'])
def get_userprofile(request, pk):
    try: 
        user = User.objects.get(pk=pk)
        serializer = UserprofileSerializer(user)
    
    except User.DoesNotExist:
        return Response("User does not exist")

    board_posts = Board.objects.filter(user_id=user)
    board_serializer = Board_Serializer(board_posts, many=True)

    qna_posts = User_QnA.objects.filter(user_id=user)
    qna_serializer = MyUserQnASerializer(qna_posts, many=True)

    review = Review.objects.filter(user_id=user)
    review_serializer = ReviewSerializer(review, many=True)

    data = {
        'User': serializer.data,
        'Board_posts': board_serializer.data,
        'QnA_posts': qna_serializer.data,
        'Review': review_serializer.data
    }

    return Response(data)
