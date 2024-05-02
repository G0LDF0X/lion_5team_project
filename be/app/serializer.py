from rest_framework import serializers
from app.models import *
from django.contrib.auth.models import User as auth_user
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.validators import UniqueValidator
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers, status
from app.models import Seller, OrderItem

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):
    reply_set = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields =  '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
        
class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__' 

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class ItemAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_Answer
        fields = '__all__'

class ItemQnASerializer(serializers.ModelSerializer):
    item_answer_set = ItemAnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Item_QnA
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    item_qna_set = ItemQnASerializer(many=True, read_only=True)
    image_url = serializers.ImageField(use_url=True)
    class Meta:
        model = Item
        fields = '__all__'
    
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
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        # 여기 수정함 : auth_user -> User
        model = User
        fields = '__all__'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):   #사용자에 대한 토큰을 생성하고, 토큰에 사용자의 username과 email을 추가한 후 반환
    def validate(self, attrs):
        data = super().validate(attrs)

        # Get the user instance for the authenticated user
        auth_user = self.user

        # Get the associated User instance
        user = User.objects.get(user_id=auth_user)

        # Add user information to the response
        data.update({
            'username': user.username,
            'email': user.email,
            'nickname': user.nickname,
            'address': user.address,
            'phone': user.phone,
            'is_seller': user.is_seller,
            'image_url': user.image_url,
            'description': user.description,
            'date_joined': user.date_joined,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'last_login': user.last_login,
        })

        return data

class RegisterSerializer(serializers.ModelSerializer):  #사용자 등록처리
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    nickname = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    # password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'nickname', 'address', 'phone')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        # if attrs['password'] != attrs['password2']:
        #     raise serializers.ValidationError(
        #         {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        auth_user_model = get_user_model()
        auth_user = auth_user_model.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        user = User.objects.create(
            user_id=auth_user,
            username=auth_user.username,
            email=auth_user.email,
            nickname=validated_data['nickname'],
            address=validated_data['address'],
            phone=validated_data['phone'],
            is_seller=False,
            date_joined=auth_user.date_joined,
            first_name=auth_user.first_name,
            last_name=auth_user.last_name,
            is_active=auth_user.is_active,
            is_staff=auth_user.is_staff,
            is_superuser=auth_user.is_superuser,
            last_login=auth_user.last_login,
            password=auth_user.password,
        )
        return user

class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'phone', 'address', 'nickname', 'email', 'description', 'image_url']

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = '__all__'
        
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Address
        fields = '__all__'

class Board_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['title','content', 'image_url', 'created_at', 'show', 'like']

class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = '__all__'
