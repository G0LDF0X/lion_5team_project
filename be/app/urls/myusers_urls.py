from django.urls import path
from app.views.myusers_views import get_Seller_Apply
from app.views.myusers_views import my_shopping


urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),

]
