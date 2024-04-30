from django.urls import path
from app.views.orders_views import *

urlpatterns = [
    path('detail/<int:pk>/', order_item_detail, name='order_detail'),
]