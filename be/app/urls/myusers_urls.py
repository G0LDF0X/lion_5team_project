from django.urls import path
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, getMyUserQnA, my_shopping, getMyReview, get_userprofile, my_bookmarks, update_User_Profile, 

urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('update_profile/', update_User_Profile, name='user_update_profile'),
    # path('change_password/', change_password, name='user_change_password'),
    path('myshopping/myqna/', getMyUserQnA),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
    path('bookmark/', my_bookmarks, name='my_bookmarks'),
]