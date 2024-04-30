from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Seller, User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import SellerSerializer, UserSerializer, User_Serializer, UserSerializerWithToken

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

