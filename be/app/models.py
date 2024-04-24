from django.db import models

# Create your models here.

class User_Answer(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    user_qna=models.ForeignKey(User_QnA, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    content = models.TextField()
    create_at= models.DateTimeField()

class Order(models.Model):
    user =models.ForeignKey(User, on_delete=models.DO_NOTHING)

    payment_method = models.CharField(max_length=100)
    shipping_price = models.IntegerField()
    total_price = models.IntegerField()
    paid_at = models.DateTimeField()
    is_delivered = models.BooleanField()
    create_at = models.DateTimeField()
    delivered_at = models.DateTimeField()

class Shipping_Address(models.Model):
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)

    address = models.TextField()
    city = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    shipping_price = models.IntegerField()