from django.urls import path
from app.views.qna_views import qna_board, qna_detail, create_user_qna, update_user_qna, delete_user_qna, create_user_answer, update_user_answer, delete_user_answer

urlpatterns = [
    path('', qna_board, name='qna_board'),  # Q&A 전체보기
    path('detail/<int:pk>/', qna_detail, name='qna_detail'),  # Q&A 디테일
    path('create/', create_user_qna, name='create_user_qna'),  # Q&A 생성
    path('update/<int:pk>/', update_user_qna, name='update_user_qna'),  # Q&A 수정
    path('delete/<int:pk>/', delete_user_qna, name='delete_user_qna'),  # Q&A 삭제
    path('answer/create/', create_user_answer, name='create_user_answer'),  # 답변 생성
    path('answer/update/<int:pk>/', update_user_answer, name='update_user_answer'),  # 답변 수정
    path('answer/delete/<int:pk>/', delete_user_answer, name='delete_user_answer'),  # 답변 삭제
]
