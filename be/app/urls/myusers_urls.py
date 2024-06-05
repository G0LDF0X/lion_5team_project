from django.urls import path
from app.views.myusers_views import *
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('apply/', get_Seller_Apply, name='seller_apply_index'),
    path('myshopping/',  my_shopping, name='my_shopping'),
    path('profile/', get_mypage_profile, name='mypage_profile'),
    path('sellers/', get_sellers, name='sellers'),
    path('users/', get_users, name='users'),
    path('update_profile/', update_User_Profile, name='user_update_profile'),
    path('update_auth_profile/', update_Auth_Profile, name='auth_update_profile'),
    path('update_user_profile/', update_User_Profile, name='user_update_profile'),
    path('myshopping/myqna/', getMyItemQnA, name = 'my_item_qna'),
    path('myreview/', getMyReview, name='my_review'),
    path('<int:pk>/', get_userprofile, name='user_profile'),
    path('updateImage/', update_User_Profile_Image, name='update_user_image'),
    path('<int:pk>/bookmark/', get_other_boomark, name='other_bookmark'),
    path('<int:pk>/myqna/', get_other_qna, name='other_item_qna'),
    path('<int:pk>/myanswer/', get_other_answer, name='other_item_answer'),
    path('<int:pk>/review/', get_other_review, name='other_review'),
    path('<int:pk>/board/', get_other_board, name='other_board'),
    path('detail/<int:pk>/', getUserById, name='user_detail'),
    path('bookmark/', my_bookmarks, name='my_bookmarks'),
    path('bookmark/add/<int:pk>/', add_bookmark, name='add_bookmark'),
    path('bookmark/delete/<int:pk>/', delete_bookmark, name='delete_bookmark'),
    path('follower/<int:pk>/',getFollower , name='user_follower'),
    path('following/<int:pk>/',getFollowing , name='user_following'),
    path('follow/<int:pk>/', follow_save, name='follow_user'),
    path('profile/myboard/', get_MyBoard, name='get_myboard'),
    path('profile/myuserqna/', getMyUserQnA, name='my_user_qna'),
    path('profile/myuseranswer/', getMyUserAnswer, name='my_user_answer'),
    # 비밀번호 재설정
    path('password-reset/', CustomPasswordResetView.as_view(), name='custom_password_reset'), # 이메일 입력
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'), # 이메일 발송 완료
    path('password-reset-confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'), #
    path('password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),

]