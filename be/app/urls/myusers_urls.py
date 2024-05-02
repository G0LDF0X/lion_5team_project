from django.urls import path
from app.views.myusers_views import *
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, update_User_Profile, getMyUserQnA, my_shopping, getMyReview, get_userprofile, getFollower,getFollowing

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('update_profile/', update_User_Profile, name='user_update_profile'),
    # path('change_password/', change_password, name='user_change_password'),
    path('myshopping/myqna/', getMyUserQnA),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
    path('bookmark/', my_bookmarks, name='my_bookmarks'),
    path('bookmark/add/<int:pk>/', add_bookmark, name='add_bookmark'),
    path('bookmark/delete/<int:pk>/', delete_bookmark, name='delete_bookmark'),
]   
    #마이페이지에서 팔로우 가져오는 링크
    path('follower/<int:pk>/',getFollower , name='user_follower'),
    path('following/<int:pk>/',getFollowing , name='user_following'),
]