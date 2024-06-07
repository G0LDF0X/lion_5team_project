from django.urls import path

from app.views.interaction_views import track_interaction, view_item, view_board, like_board, search_item

urlpatterns = [
    path('track/', track_interaction, name='track_interaction'),
    path('view/item/<int:item_id>/', view_item, name='view_item'),
    path('view/board/<int:board_id>/', view_board, name='view_board'),
    path('like/board/<int:board_id>/', like_board, name='like_board'),
    path('search/item/', search_item, name='search_item'),
]