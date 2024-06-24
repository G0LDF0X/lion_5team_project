from django.db import models
from django.contrib.auth.models import User as auth_user


class User(models.Model):
    user_id = models.ForeignKey(auth_user, on_delete=models.CASCADE)
    username = models.CharField('name', max_length=100)
    password = models.CharField('password', max_length=100)
    last_login = models.DateTimeField('last_login', auto_now=True)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField('first_name', max_length=100, blank=True)
    last_name = models.CharField('last_name', max_length=100, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField('date_joined', auto_now_add=True)
    phone = models.CharField('phone', max_length=20)
    address = models.TextField('address', blank=True) 
    nickname = models.CharField('nickname', max_length=50)
    email = models.EmailField('email', max_length=254, unique=True)
    image_url = models.ImageField('image_url', null=True, blank=True, max_length=1000)
    description = models.TextField('description', blank=True)
    is_seller = models.BooleanField(default=False)

    def __str__(self):
        return self.username
    
class Seller(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    bs_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_id.username

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
    image_url = models.ImageField(upload_to='images/', blank=True, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)
    stock = models.IntegerField(default=100)
    rate = models.FloatField()

    def __str__(self):
        return self.name

class Payment(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    payment_method = models.CharField(max_length=100)
    payment_amount = models.IntegerField()
    paymentId = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    user_id =models.ForeignKey(User, on_delete=models.DO_NOTHING)
    payment_method = models.CharField(max_length=100)
    shipping_price = models.IntegerField()
    total_price = models.IntegerField()
    paid_at = models.DateTimeField(auto_now_add=True)
    is_delivered = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    delivered_at = models.DateTimeField(auto_now_add=True)
    address = models.TextField(blank=True)

class OrderItem(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.DO_NOTHING)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length =200)
    qty = models.IntegerField()
    price_multi_qty = models.IntegerField()
    image = models.ImageField(upload_to='images/', blank=True, max_length=1000)
    payment_id = models.ForeignKey(Payment, on_delete=models.DO_NOTHING, default=1)
    is_refund = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Review(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='reviews')
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='reviews_made')
    orderitem_id = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name='orderitem_reviews', default=1)

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    rate = models.FloatField()
    image_url = models.ImageField(upload_to='images/', blank=True, max_length=1000)

    def __str__(self):
        return self.title

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
    image_url = models.ImageField('image_url', upload_to='user_qna_images', null=True, blank=True, max_length=1000)
    created_at = models.DateTimeField('created_at', auto_now_add=True)

    def __str__(self):
        return self.title

class User_Answer(models.Model):
    user_id=models.ForeignKey(User, on_delete=models.DO_NOTHING)
    user_qna_id=models.ForeignKey(User_QnA, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.ImageField('image_url', upload_to='user_qna_images', null=True, blank=True, max_length=1000)
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
    image_url = models.ImageField(upload_to='images/', blank=True, max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

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

    product_url = models.TextField(blank=True)
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    image_url = models.ImageField(upload_to='images/', max_length=1000)
    show = models.IntegerField(default=0)
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)    
    board_type = models.CharField(max_length=50, choices=[('cat', 'Cat'), ('dog', 'Dog'), ('other', 'Other')], blank=True, null=True) 

    def __str__(self):
        return self.title

class Image(models.Model):
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to='images/', max_length=1000)

class Image_Tag(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    x = models.IntegerField()
    y = models.IntegerField()
    tag = models.CharField(max_length=100)
    tagId = models.IntegerField(blank=True)

    def __str__(self):
        return f"Tag: {self.tag} on board {self.board.title} at ({self.x}, {self.y})"
class Reply(models.Model):
    # 외래키
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    
    content = models.TextField()
    replied_id = models.IntegerField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    isEdited = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return self.content

class Bookmark(models.Model):
    # 외래 키
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

class Cart(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    qty = models.IntegerField()
    image = models.ImageField(upload_to='images/', blank=True, max_length=1000)

    def __str__(self):
        return self.item_id.name
    
class Pet_Gender(models.Model):
    pet_gender = models.CharField(max_length=100)

# 강아지인지 고양이인지 분류하는 테이블
class Pet_Species(models.Model):
    pet_kind = models.CharField(max_length=100)

# 강아지, 고양이의 각 품종을 분류하는 테이블
class Pet_Breed(models.Model):
    pet_kind_id = models.ForeignKey(Pet_Species, on_delete=models.DO_NOTHING)
    pet_breed = models.CharField(max_length=100)


class Pet(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True)
    age = models.IntegerField(blank=True)
    gender = models.ForeignKey(Pet_Gender, on_delete=models.DO_NOTHING, blank=True)
    species = models.ForeignKey(Pet_Species, on_delete=models.DO_NOTHING, blank=True)
    breed = models.ForeignKey(Pet_Breed, on_delete=models.DO_NOTHING, blank=True)

    # ############################################################################

class Interaction(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.CharField(max_length=10, choices=[('board', 'Board'), ('item', 'Item')])
    content_id = models.IntegerField(null=True, blank=True)  
    interaction_type = models.CharField(max_length=50, choices=[('view', 'View'), ('like', 'Like'), ('search', 'Search'), ('review', 'Review'), ('purchase', 'Purchase'), ('bookmark', 'Bookmark'), ('comment', 'Comment')])
    timestamp = models.DateTimeField(auto_now_add=True)
    stay_time = models.DurationField(null=True, blank=True)
    search_query = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user_id} {self.interaction_type} {self.content_type} {self.content_id}"

class Recommendation(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    recommended_content_type = models.CharField(max_length=10, choices=[('board', 'Board'), ('item', 'Item')])
    recommended_content_id = models.IntegerField() 
    score = models.FloatField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_id} recommendation {self.recommended_content_type} {self.recommended_content_id} with score {self.score}"
