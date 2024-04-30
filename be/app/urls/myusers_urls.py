from django.urls import path
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, getMyUserQnA

urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/myqna/', getMyUserQnA),
    path('profile/', get_mypage_profile, name='mypage_profile'),

]