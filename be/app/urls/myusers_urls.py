from django.urls import path
from app.views.myusers_views import MyTokenObtainPairView, get_Seller_Apply, my_shopping, get_mypage_profile, update_User_Profile, update_Auth_Profile, getMyUserQnA, getMyReview, get_userprofile, my_bookmarks, add_bookmark, delete_bookmark, getFollower, getFollowing, get_MyBoard, getMyUserQnA

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('update_profile/', update_User_Profile, name='user_update_profile'),
    path('update_auth_profile/', update_Auth_Profile, name='auth_update_profile'),
    path('update_user_profile/', update_User_Profile, name='user_update_profile'),
    path('myshopping/myqna/', getMyItemQnA),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
    path('bookmark/', my_bookmarks, name='my_bookmarks'),
    path('bookmark/add/<int:pk>/', add_bookmark, name='add_bookmark'),
    path('bookmark/delete/<int:pk>/', delete_bookmark, name='delete_bookmark'),
    path('follower/<int:pk>/',getFollower , name='user_follower'),
    path('following/<int:pk>/',getFollowing , name='user_following'),
    path('profile/myboard/', get_MyBoard, name='get_myboard'),
    path('profile/myuserqna/', getMyUserQnA, name='my_user_qna'),
]