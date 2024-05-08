import datetime
from django.http import JsonResponse
from django.contrib.auth.models import User as auth_user
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist
from app.models import Seller, User, User_QnA, Order, OrderItem, Review, Bookmark, Item, Board, Follow, Item_QnA,User_Answer
from app.serializer import SellerSerializer, User_Serializer, UserSerializerWithToken, UserprofileSerializer, ReviewSerializer, BookmarkSerializer, FollowSerializer, MyTokenObtainPairSerializer, OrderItemSerializer, BoardSerializer, UserQnASerializer, ItemQnASerializer, UserAnswerSerializer



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def get_Seller_Apply(request):
    serializer = SellerSerializer(data=request.data)

    if serializer.is_valid():
        user = User.objects.get(username=request.user)
        serializer.save(user_id=user)

        user = request.user
        user.is_seller = True
        user.save()

        return Response(serializer.data, status=201)
    else:
        return Response(serializer.errors, status=400)
    

@api_view(['GET'])
def my_shopping(request):
    user = User.objects.get(username=request.user)
    orders = Order.objects.filter(user_id=user)
    orders_ids = orders.values_list('id', flat=True)
    order_items = OrderItem.objects.filter(order_id__in=orders_ids)

    serializer = OrderItemSerializer(order_items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_mypage_profile(request):
    user = User.objects.get(username=request.user)
    user_data = User_Serializer(user).data
    try:
        seller = Seller.objects.get(user_id=user)
        seller_data = SellerSerializer(seller).data
    except ObjectDoesNotExist:
        seller_data = None
    return JsonResponse({'user': user_data, 'seller': seller_data})


#username, email, password 수정가능 (auth_user 테이블서 바뀜)
@api_view(['PUT'])    
@permission_classes([IsAuthenticated])
def update_Auth_Profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    
    if hasattr(user, 'username'):
        user.username = data.get('username', user.username)
    if hasattr(user, 'email'):
        user.email = data.get('email', user.email)
    
    if data.get('password'):
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)



# model 중 User 테이블의 정보 수정
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_User_Profile(request):
    data = request.data
    print(request.user)
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=404)

    update_fields = []
    for field in ['name', 'phone', 'address', 'nickname', 'email', 'image_url', 'description']:
        if field in data and hasattr(user, field):
            setattr(user, field, data[field])
            update_fields.append(field)

    if update_fields:
        user.save(update_fields=update_fields)

    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyItemQnA(request):
    user = User.objects.get(username=request.user)
    my_user_qna_list = Item_QnA.objects.filter(user_id=user)
    serializer = ItemQnASerializer(my_user_qna_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyReview(request):
    user = User.objects.get(username=request.user)
    reviews = Review.objects.filter(user_id=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def my_bookmarks(request):
    user= User.objects.get(username=request.user)
    bookmarks = Bookmark.objects.filter(user_id=user)

    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
def add_bookmark(request, pk):
    print(request.user)
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=pk)
    bookmark = Bookmark.objects.create(
          user_id_id=user.id,
          item_id=item,
          created_at=datetime.datetime.now()
          )
    # serializer = BookmarkSerializer(bookmark)
    return Response("Bookmark added", status=201)   


@api_view(['DELETE'])
def delete_bookmark(request, pk):
    print(request.user)
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=pk)
    bookmarks = Bookmark.objects.filter(user_id_id=user.id, item_id=item)
    for bookmark in bookmarks:  
        bookmark.delete()
    return Response("Bookmark deleted", status=201)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = User_Serializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_userprofile(request, pk):
    try: 
        user = User.objects.get(pk=pk)
        serializer = UserprofileSerializer(user)
    
    except User.DoesNotExist:
        return Response("User does not exist")

    board_posts = Board.objects.filter(user_id=user)
    board_serializer = BoardSerializer(board_posts, many=True)

    qna_posts = User_QnA.objects.filter(user_id=user)
    qna_serializer = UserQnASerializer(qna_posts, many=True)

    review = Review.objects.filter(user_id=user)
    review_serializer = ReviewSerializer(review, many=True)

    data = {
        'User': serializer.data,
        'Board_posts': board_serializer.data,
        'QnA_posts': qna_serializer.data,
        'Review': review_serializer.data
    }

    return Response(data)


@api_view(['GET'])
def getFollower(request, pk):
    follows = Follow.objects.filter(followed_id=pk)
    serializer = FollowSerializer(follows, many=True)
    return Response(serializer.data)
  
@api_view(['GET'])
def getFollowing(request, pk):
    follows = Follow.objects.filter(follower_id=pk)
    serializer = FollowSerializer(follows, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_MyBoard(request):
    user = User.objects.get(username=request.user)
    boards = Board.objects.filter(user_id=user)
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyUserQnA(request):
    user = User.objects.get(username=request.user)
    my_user_qna_list = User_QnA.objects.filter(user_id=user)
    serializer = UserQnASerializer(my_user_qna_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyUserAnswer(request):
    user = User.objects.get(username=request.user)
    my_user_answer_list = User_Answer.objects.filter(user_id=user)
    serializer = UserAnswerSerializer(my_user_answer_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_other_boomark(request, pk):
    user = User.objects.get(id=pk)
    bookmarks = Bookmark.objects.filter(user_id=user)
    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_other_review(request, pk):
    user = User.objects.get(id=pk)
    reviews = Review.objects.filter(user_id=user)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_other_board(request, pk):
    user = User.objects.get(id=pk)
    boards = Board.objects.filter(user_id=user)
    serializer = BoardSerializer(boards, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_other_qna(request, pk):
    user = User.objects.get(id=pk)
    qnas = User_QnA.objects.filter(user_id=user)
    serializer = UserQnASerializer(qnas, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_other_answer(request, pk):
    user = User.objects.get(id=pk)
    answers = User_Answer.objects.filter(user_id=user)
    serializer = UserAnswerSerializer(answers, many=True)
    return Response(serializer.data)