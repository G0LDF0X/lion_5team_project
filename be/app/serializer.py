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
import base64

class ReplySerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='user_id.nickname')
    username = serializers.ReadOnlyField(source='user_id.username')
    class Meta:
        model = Reply
        fields = '__all__'

class BoardSerializer(serializers.ModelSerializer):
    reply_set = ReplySerializer(many=True, read_only=True)
    username = serializers.ReadOnlyField(source='user_id.username')
    user_image = serializers.ImageField(source='user_id.image_url')
    nickname = serializers.ReadOnlyField(source='user_id.nickname')

    class Meta:
        model = Board
        fields =  '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    writer = serializers.ReadOnlyField(source='user_id.username')
    item_name = serializers.ReadOnlyField(source='item_id.name')
    class Meta:
        model = Review
        fields = '__all__'
        
class SellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__' 

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipping_Address
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    item = serializers.ReadOnlyField(source='item_id.name')
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    shipping_price = serializers.ReadOnlyField(source='order_id.shipping_price')
    total_price = serializers.ReadOnlyField(source='order_id.total_price')
    payment_method = serializers.ReadOnlyField(source='order_id.payment_method')
    class Meta:
        model = OrderItem
        fields = '__all__'

class ItemAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item_Answer
        fields = '__all__'

class ItemQnASerializer(serializers.ModelSerializer):
    item_answer_set = ItemAnswerSerializer(many=True, read_only=True)
    username = serializers.ReadOnlyField(source='user_id.username')
    class Meta:
        model = Item_QnA
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    item_qna_set = ItemQnASerializer(many=True, read_only=True)
    image_url = serializers.ImageField(use_url=True)
    category = serializers.ReadOnlyField(source='category_id.name')
    class Meta:
        model = Item
        fields = '__all__'
    
class UserQnASerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_id.username')
    class Meta:
        model = User_QnA
        fields = '__all__'  
    
    def get_qna(self, obj):
        return obj.qna_set.all()
    

class UserAnswerSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user_id.username')
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
    username = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isadmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = auth_user
        fields = '__all__'
    
    def get_username(self, obj):
        return obj.username
    def get_id(self, obj):
        return obj.id
    def get_isadmin(self, obj):
        return obj.is_staff
    
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        # 여기 수정함 : auth_user -> User
        model = auth_user
        fields = '__all__'

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):   #사용자에 대한 토큰을 생성하고, 토큰에 사용자의 username과 email을 추가한 후 반환
    def validate(self, attrs):
        data = super().validate(attrs)

        # Get the user instance for the authenticated user
        auth_user = self.user

        # Get the associated User instance
        user = User.objects.get(user_id=auth_user)
        follower = Follow.objects.filter(follower_id_id=user.id)
        following = Follow.objects.filter(followed_id_id=user.id)

        if user.image_url and hasattr(user.image_url, 'url'):
            image_url = user.image_url.url
        else:
            image_url = None
        # Add user information to the response
        data.update({
            'username': user.username,
            'email': user.email,
            'nickname': user.nickname,
            'address': user.address,
            'phone': user.phone,
            'is_seller': user.is_seller,
            'image_url': image_url,
            'description': user.description,
            'date_joined': user.date_joined,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'last_login': user.last_login,
            'id': user.id,
            'follower': follower.count(),
            'following': following.count(),
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
    user = serializers.ReadOnlyField(source='user_id.username')
    email = serializers.ReadOnlyField(source='user_id.email')
    isAdmin = serializers.ReadOnlyField(source='user_id.is_staff')
    
    class Meta:
        model = Seller
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class BookmarkSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='item_id.name')
    price = serializers.ReadOnlyField(source='item_id.price')
    category = serializers.ReadOnlyField(source='item_id.category_id.name')
    description = serializers.ReadOnlyField(source='item_id.description')
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Bookmark
        fields = '__all__'

    def get_image_url(self, obj):
        return obj.item_id.image_url.url
        
class CartSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='item_id.name')
    price = serializers.ReadOnlyField(source='item_id.price')
    # image_url = serializers.ReadOnlyField(source='item_id.image_url')
    
    class Meta:
        model = Cart
        fields = '__all__'

class Board_Serializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source='user_id.name')
    class Meta:
        model = Board
        fields = ['title','content', 'image_url', 'created_at', 'show', 'like', 'name']

class RefundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refund
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):
    follower_username = serializers.ReadOnlyField(source='follower_id.username')
    followed_username = serializers.ReadOnlyField(source='followed_id.username')
    follower_nickname = serializers.ReadOnlyField(source='follower_id.nickname')
    followed_nickname = serializers.ReadOnlyField(source='followed_id.nickname')
    class Meta:
        model = Follow
        fields = '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'