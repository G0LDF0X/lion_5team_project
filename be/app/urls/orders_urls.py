from django.urls import path
from app.views.orders_views import cart, create_order

urlpatterns = [
    path('cart/', cart, name='cart'),
    path('<int:pk>/', create_order, name='create_order'),
]
