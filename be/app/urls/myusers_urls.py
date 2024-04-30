from django.urls import path
from app.views.myusers_views import get_Seller_Apply, get_mypage_profile, getMyUserQnA, my_shopping, getMyReview, get_userprofile, my_bookmarks

urlpatterns = [
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('myshopping/myqna/', getMyUserQnA),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
    path('bookmark/', my_bookmarks, name='my_bookmarks'),
]