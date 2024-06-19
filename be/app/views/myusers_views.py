import datetime
from django.http import JsonResponse
from django.contrib.auth.models import User as auth_user
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password, make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ObjectDoesNotExist
from app.models import Seller, User, User_QnA, Order, OrderItem, Review, Bookmark, Item, Board, Follow, Item_QnA,User_Answer, Interaction
from app.serializer import SellerSerializer, User_Serializer, UserSerializerWithToken, UserprofileSerializer, ReviewSerializer, BookmarkSerializer, FollowSerializer, MyTokenObtainPairSerializer, OrderItemSerializer, BoardSerializer, UserQnASerializer, ItemQnASerializer, UserAnswerSerializer, ItemSerializer
from django.core.cache import cache


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
@permission_classes([IsAuthenticated])
def get_sellers(request):
    sellers = Seller.objects.all()
    serializer = SellerSerializer(sellers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = User.objects.all()
    serializer = User_Serializer(users, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = User.objects.get(username=request.user)
    serializer = User_Serializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
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
    user = User.objects.get(username= request.user)
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password = make_password(data['password'])
    if 'nickname' in data:
        user.nickname = data['nickname']
    
    user.save()
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_User_Profile_Image(request):
    data = request.data
    try:
        user = User.objects.get(username=request.user)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=404)

    if 'image_url' in data :
        user.image_url = data['image_url']
        user.save()

    serializer = User_Serializer(user, many=False)
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

from django.db.models import Q
@api_view(['GET'])
def check_user_review(request, pk):
    user = User.objects.get(id=pk)
    orders = Order.objects.filter(user_id=user)
    order_items = OrderItem.objects.filter(order_id__in=orders, is_refund=False)
    reviewed_orderitem_ids = Review.objects.filter(user_id=user).values_list('orderitem_id', flat=True)
    unreviewed_orderitems = order_items.exclude(id__in=reviewed_orderitem_ids)
    serializer = OrderItemSerializer(unreviewed_orderitems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def my_bookmarks(request):
    user= User.objects.get(username=request.user)
    bookmarks = Bookmark.objects.filter(user_id=user)

    serializer = BookmarkSerializer(bookmarks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def user_bookmarks(request, pk):
    try:
        user = User.objects.get(id=pk)
        bookmarks = Bookmark.objects.filter(user_id=user)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)

@api_view(['GET'])
def get_likes(request, pk):
    user = User.objects.get(id=pk)
    likes = Interaction.objects.filter(user_id_id=user, interaction_type='like')
    boards = []
    if likes.exists():
        for like in likes:
            boards.append(Board.objects.get(id=like.content_id))
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)    
    else:
        return Response("No likes")

    
    

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
    Interaction.objects.create(
        user_id_id = user.id,
        content_type = 'item'  ,
        content_id = item.id,
        interaction_type = 'bookmark',
        
    )
    # serializer = BookmarkSerializer(bookmark)
    return Response("Bookmark added", status=201)   


@api_view(['DELETE'])
def delete_bookmark(request, pk):
    print(request.user)
    user = User.objects.get(username=request.user)
    item = Item.objects.get(id=pk)
    bookmarks = Bookmark.objects.filter(user_id_id=user.id, item_id=item)
    bookmark_interactions = Interaction.objects.filter(user_id_id= user.id, content_id =pk, interaction_type = 'bookmark')
    for bookmark in bookmarks:  
        bookmark.delete()
    for bookmark_interaction in bookmark_interactions:
        bookmark_interaction.delete()
    return Response("Bookmark deleted", status=201)

@api_view(['GET'])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    # like = Interaction.objects.filter(user_id_id=user, interaction_type='like')
    serializer = User_Serializer(user, many=False)
    # return Response({**serializer.data, 'like': like})
    return Response(serializer.data)

@api_view(['GET'])
def get_user_like(request, pk):
    user = User.objects.get(id=pk)
    like = Interaction.objects.filter(user_id_id=user, interaction_type='like')
    serializer = User_Serializer(user, many=False)
    return Response({**serializer.data, 'like': like})

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

# @api_view(['GET'])
# def get_userprofile(request, pk):
#     cache_key = f'userprofile_{pk}'
#     data = cache.get(cache_key)

#     if not data:
#         try: 
#             user = User.objects.get(pk=pk)
#             serializer = UserprofileSerializer(user)
        
#         except User.DoesNotExist:
#             return Response("User does not exist")

#         board_posts = Board.objects.filter(user_id=user)
#         board_serializer = BoardSerializer(board_posts, many=True)

#         qna_posts = User_QnA.objects.filter(user_id=user)
#         qna_serializer = UserQnASerializer(qna_posts, many=True)

#         review = Review.objects.filter(user_id=user)
#         review_serializer = ReviewSerializer(review, many=True)
        
#         data = {
#             'User': serializer.data,
#             'Board_posts': board_serializer.data,
#             'QnA_posts': qna_serializer.data,
#             'Review': review_serializer.data
#         }

#         cache.set(cache_key, data, 600)  # 캐시 유효 시간을 10분으로 설정

#     return Response(data)

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


@api_view(['POST', 'DELETE','GET' ])
@permission_classes([IsAuthenticated])
def follow_save(request, pk):
    follower = User.objects.get(username=request.user)
    followed = User.objects.get(id=pk)

    # 팔로워 수
    followers_count = Follow.objects.filter(followed_id=followed).count()
    # # 팔로잉 수
    following_count = Follow.objects.filter(follower_id=followed).count()
    
    if request.method == 'POST':
        follow_relation = Follow.objects.filter(follower_id=follower, followed_id=followed)
        
        if follow_relation.exists():
            return Response({ 'message': '이미 팔로우 중입니다.'}, status =201)
        else:
            follow = Follow.objects.create(
                follower_id=follower,
                followed_id=followed
            )

        serializer = FollowSerializer(follow)
        return Response({**serializer.data, 'followers_count': followers_count}, status=201)
       

    elif request.method == 'DELETE':
        follow_relation = Follow.objects.filter(follower_id=follower, followed_id=followed)

        if follow_relation.exists():
            follow_relation.delete()


            return Response({'followers_count': followers_count, 'following_count': following_count}, status=201)
    

    else :
        follow_exists = Follow.objects.filter(follower_id=follower, followed_id=followed).exists()

        return Response({'follow_exists': follow_exists,  'followers_count': followers_count, 'following_count': following_count}, status=201)
    

from django.http import HttpResponseRedirect
from django.urls import reverse



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        user = User.objects.get(username=request.user)
        auth_user_instance = auth_user.objects.get(username=request.user)

        # 사용자와 관련된 데이터 삭제
        Follow.objects.filter(follower_id=user).delete()
        Follow.objects.filter(followed_id=user).delete()
        Review.objects.filter(user_id=user).delete()
        Bookmark.objects.filter(user_id=user).delete()
        Board.objects.filter(user_id=user).delete()
        Item_QnA.objects.filter(user_id=user).delete()
        User_Answer.objects.filter(user_id=user).delete()

        # 사용자와 관련된 모든 주문 삭제
        Order.objects.filter(user_id=user).delete()
        OrderItem.objects.filter(order_id__user_id=user).delete()
        
        user.delete()
        auth_user_instance.delete()

        return Response({"message": "Account deleted successfully"}, status=204)
    except User.DoesNotExist:

        return Response({"error": "User not found"}, status=404)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updatePassword(request):
    user = request.user
    data = request.data

    current_password = data.get('current_password')
    new_password = data.get('new_password')

    if not current_password or not new_password:
        return Response({"detail": "모든 필드를 입력해주세요."}, status=400)

    if len(new_password) < 8:
        return Response({"detail": "새 비밀번호는 8자 이상이어야 합니다."}, status=400)

    if not check_password(current_password, user.password):
        return Response({"detail": "현재 비밀번호가 일치하지 않습니다."}, status=400)

    user.password = make_password(new_password)
    user.save()

    return Response({"detail": "비밀번호가 성공적으로 변경되었습니다."}, status=200)



# class CustomPasswordResetView(PasswordResetView):
#     form_class = PasswordResetForm
#     def form_valid(self, form):
#         User = get_user_model()
#         try:
#             user = User.objects.get(email=form.cleaned_data['email'])
#         except User.DoesNotExist:
#             return HttpResponse("User does not exist")
        
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = default_token_generator.make_token(user)

#         # Construct the password reset link with token
#         reset_url = f"Here is your password reset link: http://127.0.0.1:8000/users/password_reset_confirm/{uid}/{token}/"
#         # Send the email with the custom password reset link
#         try:
#             sent_count = send_mail(
#                 'Password Reset',
#                 f'Here is your password reset link: {reset_url}',
#                 'from@example.com',
#                 [form.cleaned_data['email']],
#                 fail_silently=False,
#             )
#             print(f"Number of emails sent: {sent_count}")
#         except Exception as e:
#             # 오류 메시지를 출력하거나 로깅하고 적절한 응답을 반환합니다.
#             print(f"Error occurred: {e}")
#             return HttpResponse("Error occurred while sending the email")
#         return super().form_valid(form)
#         # Redirect to the success URL after sending the email
#         # return HttpResponseRedirect(self.get_success_url())

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.views import PasswordResetView
from django.http import HttpResponse
from django.urls import reverse_lazy
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
from django.contrib.auth.forms import PasswordResetForm
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt


class CustomPasswordResetView(PasswordResetView):

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    form_class = PasswordResetForm
    success_url = reverse_lazy('password_reset_done')  # 비밀번호 재설정 이메일이 성공적으로 보내진 후 리디렉션할 URL

    def form_valid(self, form):
        User = get_user_model()
        try:
            user = User.objects.get(email=form.cleaned_data['email'])
        except User.DoesNotExist:
            return HttpResponse("User does not exist")

        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        # 비밀번호 재설정 URL 생성
        reset_url = self.request.build_absolute_uri(reverse_lazy('password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))

        # 비밀번호 재설정 이메일 보내기
        try:
            send_mail(
                'Password Reset',
                f'Here is your password reset link: {reset_url}',
                'from@example.com',
                [form.cleaned_data['email']],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error occurred: {e}")
            return HttpResponse("Error occurred while sending the email")

        return super().form_valid(form)


