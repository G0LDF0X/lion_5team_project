from django.urls import path
from app.views.orders_views import *

urlpatterns = [
    path('detail/<int:pk>/', order_item_detail, name='order_detail'),
    path('cart/', cart_detail, name='cart_detail'),
    path('cart/<int:pk>/', add_to_cart, name='add_cart'),
    path('payment/', create_order, name='create_order'),
    path('refund/<int:order_id>/<int:order_item_id>/', refund_item, name='refund_item'),
]