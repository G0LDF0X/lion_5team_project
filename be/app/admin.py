from django.contrib import admin
from .models import Seller,Board,Tag,Category,User,User_QnA,User_Answer, Item, Review, Item_QnA, Item_Answer, Reply
admin.site.register(Board)
admin.site.register(Seller)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(User_QnA)
admin.site.register(User_Answer)
admin.site.register(Item)
admin.site.register(Review)
admin.site.register(Item_QnA)
admin.site.register(Item_Answer)
admin.site.register(Reply)
# Register your models here.
