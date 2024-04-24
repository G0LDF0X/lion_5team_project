from django.db import models

# Create your models here.

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