from django.urls import path
from app.views.sellers_views import index, SellerItemManageView, SellerRevenueView, SellerSettingsView, seller_qna_view, seller_refund_view, Seller_Apply_Save

urlpatterns = [
    path('', index, name='index'),  # Seller 전체보기
    path('manage/', SellerItemManageView.as_view(), name='seller-items'),
    path('revenue/', SellerRevenueView, name='seller-revenue'),
    path('settings/', SellerSettingsView, name='seller-settings'),
    path('myqna/', seller_qna_view, name='seller-qna'),
    path('refund/', seller_refund_view, name='seller-qna'),
    path('apply/', Seller_Apply_Save, name='seller-apply-save'),
]
