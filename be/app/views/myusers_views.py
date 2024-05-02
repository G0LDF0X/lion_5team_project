from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Seller, User , User_QnA, Order,OrderItem, Review, Board
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import *

@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_Seller_Apply(request):
    serializer = SellerSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.get(name=request.user)
        serializer.save(user_id=user)

        # User의 is_seller를 True로 변경
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
    
    # 시리얼라이즈된 주문 정보를 응답으로 반환합니다.
    return Response(serializer.data)


# def get_mypage_profile(request):
#     user = request.user
#     serializer = UserSerializer(user)
#     return JsonResponse(serializer.data)


from django.core.exceptions import ObjectDoesNotExist

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

#username, email, password, 수정가능 (auth_user 테이블서 바뀜)

from django.contrib.auth.forms import UserChangeForm, PasswordChangeForm
from django.contrib.auth.hashers import make_password

@api_view(['PUT'])  # POST -> PUT       
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
def get_userprofile(request, pk):
    user = User.objects.get(pk=pk)
    serializer = UserprofileSerializer(user)

    # 해당 사용자가 게시판에 작성한 글을 가져오기
    board_posts = Board.objects.filter(user_id=user)
    board_serializer = Board_Serializer(board_posts, many=True)

    # 해당 사용자가 Q&A에 작성한 글을 가져오기
    qna_posts = User_QnA.objects.filter(user_id=user)
    qna_serializer = MyUserQnASerializer(qna_posts, many=True)
    # 모든 정보를 하나의 데이터로 합치기

    # 작성한 리뷰
    review = Review.objects.filter(user_id=user)
    review_serializer = ReviewSerializer(review, many=True)

    data = {
        'user': serializer.data,
        'Board_posts': board_serializer.data,
        'QnA_posts': qna_serializer.data,
        'Review': review_serializer.data
    }

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
#마이페이지에 팔로우 가져오기
def getFollower(request, pk):
    user = User.objects.get(pk=pk)
    followers = user.followers.all()
    serializer = UserSerializer(followers, many=True)
    return Response(serializer.data)
def getFollowing(request, pk):
    user = User.objects.get(pk=pk)
    following = user.following.all()
    serializer = UserSerializer(following, many=True)
    return Response(serializer.data)