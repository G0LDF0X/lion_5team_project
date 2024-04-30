from django.urls import path
from app.views.boards_views import get_Boards, get_Board, get_TopBoards, create_Board, update_Board, delete_Board, upload_Board, updateBoardImage


urlpatterns = [
    path('', get_Boards, name='board_index'),   #index
    path('detail/<str:pk>/', get_Board, name='board_detail'),  #detail
    path('top/', get_TopBoards, name='board_top'),  #게시물 조회수와 좋아요 고려, 상위 5개 게시물 조회


    path('create/', create_Board, name='board_create'), #create
    # path('upload/', upload_Board, name='board_upload'), #

    # path('update/image/<str:pk>/', updateBoarddImage, name='board_update_image'), #
    path('detail/<str:detail_pk>/board/update/<str:update_pk>/', update_Board, name='board_update'),    #update 모든수정
    path('delete/<str:pk>/', delete_Board, name='board_delete'),   #delete
    
    
]