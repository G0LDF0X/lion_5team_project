from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from app.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User as auth_user
from rest_framework.permissions import AllowAny, IsAuthenticated
from app.models import User


# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# @api_view(['post'])
class RegisterView(generics.CreateAPIView):
    queryset = auth_user.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        # if auth_user.objects.filter(email=serializer.validated_data['email']).exists():
        #     raise serializers.ValidationError({"email": "A user with this email already exists."})
        auth_user_instance = serializer.save()

        User.objects.create(
            user_id=auth_user_instance,
            name=auth_user_instance.username,
            email=auth_user_instance.email,
        )

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET'])
def getUser(request, pk):
    user = request.user(id=pk)
    serializer = RegisterSerializer(user, many=False)
    return Response(serializer.data)



