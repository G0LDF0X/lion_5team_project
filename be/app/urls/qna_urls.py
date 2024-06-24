from django.urls import path
from app.views.qna_views import qna_board, qna_detail, create_user_qna, update_user_qna, delete_user_qna, uploadImage, create_user_answer, update_user_answer, get_user_qna, get_user_answers,uploadAnswerImage

urlpatterns = [
    path('', qna_board, name='qna_board'),  # Q&A 전체보기
    path('detail/<int:pk>/', qna_detail, name='qna_detail'),  # Q&A 디테일
    path('create/', create_user_qna, name='create_user_qna'),  # Q&A 생성
    path('answer/create/<int:pk>/', create_user_answer, name='create_user_answer'),  # Q&A 답변 생성
    path('answer/update/<int:pk>/', update_user_answer, name='create_user_answer'),  # Q&A 답변 수정
    path('update/<str:pk>/', update_user_qna, name='update_user_qna'),  # Q&A 수정
    path('delete/<str:pk>/', delete_user_qna, name='delete_user_qna'),  # Q&A 삭제
    path('uploadImage/<int:pk>/', uploadImage, name='uploadImage'),  # 이미지 업로드
    path('uploadAnswerImage/<int:pk>/', uploadAnswerImage, name='uploadAnswerImage'),  # 이미지 업로드
    path('<int:pk>/qna/', get_user_qna, name='get_user_qna'),  # 특정 사용자의 모든 질문 가져오기
    path('<int:pk>/answers/', get_user_answers, name='get_user_answers'),  # 특정 사용자의 모든 답변 가져오기
]
