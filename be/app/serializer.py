from rest_framework import serializers
from .models import *

class BoardSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    product_url = serializers.SerializerMethodField(read_only=True)
    image_url = serializers.SerializerMethodField(read_only=True)
    show = serializers.SerializerMethodField(read_only=True)
    like = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Board
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

    def get_reviews(self, obj):
        return obj.review_set.all()
    
    def get_qna(self, obj):
        return obj.qna_set.all()
    


class UserQnASerializer(serializers.ModelSerializer):
    class Meta:
        model = User_QnA
        fields = '__all__'  
    
    def get_qna(self, obj):
        return obj.qna_set.all()
    

class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Answer
        fields = '__all__'

    def get_user_qna(self, obj):
        return obj.user_qna_set.all()
    
    def get_user_answer(self, obj):
        return obj.user_answer_set.all()
    
    def get_user(self, obj):
        return obj.user.username
    
from django.contrib.auth.models import User as auth_user
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email

        return data

class UserSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isadmin = serializers.SerializerMethodField(read_only=True)
    isseller = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = auth_user
        fields = '__all__'
    
    def get_username(self, obj):
        return obj.username
    def get_id(self, obj):
        return obj.id
    def get_isadmin(self, obj):
        return obj.is_staff
    def get_isseller(self, obj):
        return obj.is_seller
    
    # class Meta:
    #     model = User
    #     fields = ('id', 'username', 'email', 'password', 'password2')

    # def validate(self, attrs):
    #     if attrs['password'] != attrs['password2']:
    #         raise serializers.ValidationError(
    #             {"password": "Password fields didn't match."})

    #     return attrs

    # def create(self, validated_data):
    #     user = User.objects.create(
    #         username=validated_data['username'],
    #         email=validated_data['email']
    #     )

    #     user.set_password(validated_data['password'])
    #     user.save()

    #     return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):   #사용자에 대한 토큰을 생성하고, 토큰에 사용자의 username과 email을 추가한 후 반환
    def get_token(cls, user):
        token = super().get_token(user)
        # Frontend에서 더 필요한 정보가 있다면 여기에 추가적으로 작성하면 됩니다. token["is_superuser"] = user.is_superuser 이런식으로요.
        token['username'] = user.username
        token['email'] = user.email
        return token


class RegisterSerializer(serializers.ModelSerializer):  #사용자 등록처리
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = auth_user
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = auth_user.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])
        user.save()
        return user