from django.db import models
from django.contrib.auth.models import User as auth_user

# Create your models here.
class User(models.Model):
    user_id = models.ForeignKey(auth_user, on_delete=models.CASCADE)
    name = models.CharField('name', max_length=100)
    phone = models.CharField('phone', max_length=20)
    address = models.TextField('address', blank=True) 
    nickname = models.CharField('nickname', max_length=50)
    email = models.EmailField('email', max_length=254, unique=True)
    image_url = models.URLField('image_url', blank=True, null=True)
    description = models.TextField('description', blank=True)
    is_seller = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Seller(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    bs_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id.name

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tag(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tags')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Item(models.Model):
    # 외래키
    seller_id = models.ForeignKey(Seller, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    tag_id = models.ForeignKey(Tag, on_delete=models.DO_NOTHING)

    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField(blank=True)
    image_url = models.ImageField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    rate = models.FloatField()

    def __str__(self):
        return self.name

class Review(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='reviews')
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='reviews_made')

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    rate = models.FloatField()
    image_url = models.ImageField(blank=True)

class Order(models.Model):
    user_id =models.ForeignKey(User, on_delete=models.DO_NOTHING)

    payment_method = models.CharField(max_length=100)
    shipping_price = models.IntegerField()
    total_price = models.IntegerField()
    paid_at = models.DateTimeField()
    is_delivered = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField()

class OrderItem(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.DO_NOTHING)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length =200)
    qty = models.IntegerField()
    price_multi_qty = models.IntegerField()
    image = models.ImageField()

class Refund(models.Model):
    order_item_id = models.ForeignKey(OrderItem, on_delete = models.DO_NOTHING)
    user_id = models.ForeignKey(User, on_delete = models.DO_NOTHING)
    reason = models.TextField('refund reason', blank=True)
    status = models.CharField(max_length = 100) # 배송 준비중, 배송 중, 배송 완료
    refund_amount = models.IntegerField()
    created_at = models.DateTimeField("CREATE DATE", auto_now_add = True)
    updated_at = models.DateTimeField("UPDATE DATE", auto_now = True)

class User_QnA(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=False, blank=True)
    title = models.CharField('title', max_length=100)
    content = models.TextField('content', blank=True) 
    image_url = models.ImageField('image_url', upload_to='user_qna_images', null=True, blank=True)
    created_at = models.DateTimeField('created_at', auto_now_add=True)

    def __str__(self):
        return self.title

class User_Answer(models.Model):
    user_id=models.ForeignKey(User, on_delete=models.DO_NOTHING)
    user_qna_id=models.ForeignKey(User_QnA, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Shipping_Address(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.DO_NOTHING)

    address = models.TextField()
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    shipping_price = models.IntegerField()

class Follow(models.Model):
    follower_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id1', null=False, blank=True)
    followed_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_id2', null=False, blank=True)
    created_at = models.DateTimeField('created_at', auto_now_add=True)

class Item_QnA(models.Model):
    # 외래키
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    image_url = models.ImageField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Item_Answer(models.Model):
    # 외래키
    seller_id = models.ForeignKey(Seller, on_delete=models.DO_NOTHING)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    item_qna_id = models.ForeignKey(Item_QnA, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Board(models.Model):
    # 외래키
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    product_url = models.CharField(max_length=200)
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    image_url = models.ImageField()
    show = models.IntegerField(default=0)
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Reply(models.Model):
    # 외래키
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    
    content = models.TextField()
    replied_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

class Bookmark(models.Model):
    # 외래 키
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)