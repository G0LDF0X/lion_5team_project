from django.urls import path
from app.views.myusers_views import get_Seller_Apply, getMyShopping


urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),


]