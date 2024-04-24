from django.db import models
from photo.fields import ThumbnailImageField

class OrderItem(models.Model):
    item_id = models.ForeignKey(Item, on_delete=models.CASCADE)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    name = models.CharField(max_length =200)
    qty = models.IntegerField()
    price_multi_qty = models.IntegerField()
    image = models.ThumbnailImageField()

class Refund(models.Model):
    order_item_id = models.ForeignKey(OrderItem, on_delete = models.CASCADE)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    reason = models.TextField('refund reason')
    status = models.CharField(max_length = 100) # 배송 준비중, 배송 중, 배송 완료
    refund_amount = models.IntegerField()
    created_at = models.DateTimeField("CREATE DATE", auto_now_add = True)
    updated_at = models.DateTimeField("UPDATE DATE", auto_now = True)

class Category(models.Model):
    name = models.CharField(max_length=100)