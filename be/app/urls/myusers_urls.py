from django.urls import path
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, update_Auth_Profile, getMyUserQnA, my_shopping, getMyReview, get_userprofile, update_User_Profile

urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('update_auth_profile/', update_Auth_Profile, name='auth_update_profile'),
    path('update_user_profile/', update_User_Profile, name='user_update_profile'),
    
    path('myshopping/myqna/', getMyUserQnA),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
]