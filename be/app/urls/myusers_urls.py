from django.urls import path
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, update_User_Profile


urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('update_profile/', update_User_Profile, name='user_update_profile'),
    # path('change_password/', change_password, name='user_change_password'),
]