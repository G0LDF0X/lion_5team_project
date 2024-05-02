from rest_framework.decorators import api_view
from rest_framework.response import Response
from app.serializer import RegisterSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User as auth_user
from rest_framework.permissions import AllowAny

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = auth_user.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        auth_user_instance = serializer.save()


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

