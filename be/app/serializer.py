from rest_framework import serializers
from .models import *


from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPair
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    id = serializers.IntegerField(read_only=True)

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    phone = serializers.CharField(max_length=11)
    address = serializers.CharField(max_length=100)

    nickname = serializers.CharField(max_length=20)
    desription = serializers.CharField(max_length=100, blank=True)

    image = serializers.ImageField(blank=True)


    class Meta:
        model = User
        fields = ('username', 'id', 'password', 'password2', 'email', 'phone', 'address', 'nickname', 'description', 'image')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "비밀번호가 일치하지 않습니다."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
                username=validated_data['username'],
                email=validated_data['email']
                )
        user.set_password(validated_data['password'])
        user.save()
        return user