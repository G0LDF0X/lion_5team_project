from django.urls import path
from app.views.items_views import get_items, item_details

urlpatterns = [
    path('', get_items, name="item_index"),
    path('<int:pk>/', item_details, name="item_details"),
]