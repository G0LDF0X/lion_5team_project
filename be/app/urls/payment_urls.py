from django.urls import path
from app.views.payment_views import save_payment, complete_payment, payment_detail

urlpatterns = [
    path('save/', save_payment, name='save_payment'),
    path('complete/', complete_payment, name='complete_payment'),
    path('detail/<int:pk>', payment_detail, name='payment_detail'),
    # path('refund/<int:pk>/', payment_refund, name='payment_refund')
]