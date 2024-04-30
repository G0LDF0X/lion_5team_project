from django.urls import path
from app.views.sellers_views import *

urlpatterns = [
    path('', index, name='index'),  # Seller 전체보기
    path('manage/', SellerItemManageView.as_view(), name='seller-items'),
    # path('myqna/', SellerQnaView.as_view(), name='seller-qna'),
]
