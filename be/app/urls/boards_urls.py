from django.urls import path
from app.views.boards_views import get_Boards, get_Board, get_TopBoards, create_Board, update_Board, delete_Board, updateBoardImage


urlpatterns = [
    path('', get_Boards, name='board_index'),   #완
    path('detail/<str:pk>/', get_Board, name='board_detail'),  #완
    path('top/', get_TopBoards, name='board_top'),  #완


    path('create/', create_Board, name='board_create'), #완
    # path('upload/', upload_Board, name='board_upload'), #

    path('update/image/<str:pk>/', updateBoardImage, name='board_update_image'), #완
    path('detail/<str:detail_pk>/board/update/<str:update_pk>/', update_Board, name='board_update'),    #완
    path('delete/<str:pk>/', delete_Board, name='board_delete'),   # 완
    
    
]