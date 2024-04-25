from rest_framework import serializers
from .models import *


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework.response import Response
from .models import User
from rest_framework.views import APIView
from .models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['id'] = user.id
        token['email'] = user.email

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(max_length=20)
    
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    name = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    id = serializers.IntegerField(read_only=True)

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    phone = serializers.CharField(max_length=11)

    address = serializers.CharField(max_length=100)

    description = serializers.CharField(max_length=100, required=False)

    image = serializers.ImageField()


    class Meta:
        model = User
        fields = ('name', 'nickname','id', 'password', 'password2', 'email', 'phone', 'address', 'description', 'image')

    # 비밀번호 확인
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
                name=validated_data['name'],
                email=validated_data['email']
                )
        user.set_password(validated_data['password'])
        user.save()
        return user
    



