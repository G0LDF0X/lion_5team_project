from django.urls import path
from app.views.items_views import get_items, item_details, create_item, delete_item, update_item

urlpatterns = [
    path('', get_items, name="item_index"),
    path('detail/<int:pk>/', item_details, name="item_details"),
    path('create/', create_item, name="create_item"),
    path('delete/<int:pk>/', delete_item, name="delete_item"),
    path('update/<int:pk>/', update_item, name="update_item"),
]