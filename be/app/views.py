from django.shortcuts import render

# Create your views here.
# from rest_framework.authtoken.models import Token
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.permissions import IsAuthenticated
# from rest_framework import status
# from app.serializer import UserSerializer


# from django.contrib.auth.views import LoginView
# from django.http import JsonResponse
# from django.contrib.auth import authenticate, login
from rest_framework import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializer import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny,IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

@api_view(['POST'])
def getRoutes(request):
    routes = [
        '/app/token/',
        '/app/register/'
        '/app/token/refresh/',
    ]
# class LoginView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(username=username, password=password)
#         if user:
#             token, _ = Token.objects.get_or_create(user=user)
#             return Response({'token': token.key})
#         else:
#             return Response({'error': 'Invalid credentials'}, status=400)

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         request.user.auth_token.delete()
#         return Response({'message': 'Logged out successfully'})

# class UserView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         return Response({
#             'username': user.username,
#             'email': user.email
#         })
    
# class RegisterView(APIView):
#     # 회원가입 API
#     def post(self, request):
#         """
#         POST 요청을 처리하여 새로운 사용자를 생성합니다.
#         """
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
