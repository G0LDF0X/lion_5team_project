from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from app.models import Seller, User , User_QnA
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from app.serializer import SellerSerializer, MyUserQnASerializer

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
@permission_classes([IsAuthenticated])
def getMyUserQnA(request):

    my_user_qna_list = User_QnA.objects.filter(user_id_id=request.user.id)
    serializer = MyUserQnASerializer(my_user_qna_list, many=True)
    return Response(serializer.data)

    

