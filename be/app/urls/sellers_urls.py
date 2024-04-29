from django.urls import path
from app.views.sellers_views import SellerItemManageView

urlpatterns = [
    path('manage/', SellerItemManageView.as_view(), name='seller-items'),
    # Add your other URL patterns here
]