from django.urls import path
from app.views.boards_views import get_Boards, get_Board, get_TopBoards, create_Board, update_Board, delete_Board
from app.views.boards_views import create_Reply

urlpatterns = [
    path('', get_Boards, name='board_index'),  
    path('detail/<str:pk>/', get_Board, name='board_detail'), 
    path('top/', get_TopBoards, name='board_top'), 
    path('create/', create_Board, name='board_create'), 
    path('detail/<str:detail_pk>/board/update/<str:update_pk>/', update_Board, name='board_update'),
    path('delete/<str:pk>/', delete_Board, name='board_delete'),  
    path('detail/<str:pk>/reply/', create_Reply, name='reply_create'),
]