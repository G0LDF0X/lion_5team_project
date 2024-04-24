from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Seller(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    description = models.TextField()
    number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Tag(models.Model):
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='tags')
    name = models.CharField(max_length=100)


class Review(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='reviews')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_made')
    title = models.CharField(max_length=100)
    content = models.TextField()
    rate = models.FloatField()
    image_url = models.ImageField()