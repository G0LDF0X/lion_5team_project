from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Item(models.Model):
    seller_id = models.ForeignKey(User, on_delete=models.SET_NULL)
    category_id = models.ForeignKey(Category, on_delete=models.SET_NULL)
    # Assuming Tag model is defined elsewhere
    tag_id = models.ForeignKey(Tag, on_delete=models.SET_NULL, related_name='items', null=True)
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    description = models.TextField()
    image_url = models.URLField()  # Assuming image URLs are stored as strings
    created_at = models.DateTimeField(auto_now_add=True)

    rate = models.FloatField(null=True, blank=True)  # Assuming rate can be null

class Item_QnA(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, )
    item_id = models.ForeignKey(Item, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    content = models.TextField()
    image_url = models.ImageField(null=True, blank=True) # Assuming the image is optional
    created_at = models.DateTimeField(auto_now_add=True)

class Item_Answer(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL,)
    item_id = models.ForeignKey(Item, on_delete=models.SET_NULL,)
    item_qna = models.ForeignKey(Item_QnA, on_delete=models.SET_NULL, )
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)