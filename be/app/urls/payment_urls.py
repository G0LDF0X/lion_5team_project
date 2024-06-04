from django.urls import path
from app.views.payment_views import save_payment, complete_payment

urlpatterns = [
    path('save/', save_payment, name='save_payment'),
    path('complete/', complete_payment, name='complete_payment'),
]