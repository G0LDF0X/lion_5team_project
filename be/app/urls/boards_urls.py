from django.urls import path
from app.views.boards_views import *
# from app.views.boards_views import create_Reply

urlpatterns = [
    path('', get_Boards, name='board_index'),  
    path('detail/<str:pk>/', board_detail_or_create_reply, name='board_detail'), 
    # path('detail/<str:pk>/add_show/', add_show, name='board_add_show'),
    # path('detail/<str:pk>/add_like/', add_like, name='board_add_like'),
    # path('detail/<str:pk>/delete_like/', delete_like, name='board_delete_like'),
    path ('like/<str:pk>/', handle_like, name='board_like'),
    path('top/', get_TopBoards, name='board_top'), 
    path('create/', create_Board, name='board_create'), 
    path('detail/<str:detail_pk>/board/update/<str:update_pk>/', update_Board, name='board_update'),
    path('delete/<str:pk>/', delete_Board, name='board_delete'),  
    path('predict/<str:pk>/', predict_image, name='predict_image'),
    # path('detail/<str:pk>/', create_Reply, name='reply_create'),
    path('reply/<str:pk>/delete/', delete_Reply, name='reply_delete'),
]