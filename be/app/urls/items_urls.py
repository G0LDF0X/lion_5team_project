from django.urls import path
from app.views.items_views import *

urlpatterns = [
    path('', get_items, name="item_index"),
    path('category/', get_category, name="get_category"),
    path('detail/<int:pk>/', item_details, name="item_details"),
    path('create/', create_item, name="create_item"),
    path('delete/<int:pk>/', delete_item, name="delete_item"),
    path('update/<int:pk>/', update_item, name="update_item"),
    path('review/create/<int:item_id>/', create_review, name="create_review"),
    path('review/update/<int:pk>/', update_review, name="update_review"),
    path('review/delete/<int:pk>/', delete_review, name="delete_review"),
    path('qna/create/<int:item_id>/', create_qna, name="create_qna"),
    path('qna/update/<int:pk>/', update_qna, name="update_qna"),
    path('qna/delete/<int:pk>/', delete_qna, name="delete_qna"),
]