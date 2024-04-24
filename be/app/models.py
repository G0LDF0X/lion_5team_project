from django.db import models

# Create your models here.

#  Item, Item_QnA, Item_Answer 

class Item(models.Model):
    # 외래키
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    tag = models.ForeignKey(Tag, on_delete=models.DO_NOTHING)

    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField(blank=True)
    image_url = models.ImageField(blank=True, default="/")
    created_at = models.DateTimeField(auto_now_add=True)
    rate = models.FloatField()

class Item_QnA(models.Model):
    # 외래키
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    item = models.ForeignKey(Item, on_delete=models.DO_NOTHING)

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    image_url = models.ImageField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Item_Answer(models.Model):
    # 외래키
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    item = models.ForeignKey(Item, on_delete=models.DO_NOTHING)
    item_qna = models.ForeignKey(Item_QnA, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Board(models.Model):
    # 외래키
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    product_url = models.CharField(max_length=200)
    tile = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.ImageField()
    show = models.IntegerField(default="0")
    like = models.IntegerField(default="0")
    created_at = models.DateTimeField(auto_now_add=True)

class Reply(models.Model):
    # 외래키
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    content = models.TextField()
    replied_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

class Bookmark(models.Model):
    # 외래 키
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
