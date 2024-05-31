from django.urls import path
from app.views.pet_views import *

urlpatterns = [
    path('gender/', get_pet_gender, name='get_pet_gender'),
    path('species/', get_pet_species, name='get_pet_species'),
    path('breed/', get_pet_breed, name='get_pet_breed'),
    path('breed/<int:pk>/', get_kind_breed, name='get_kind_breed'),
    path('user/<int:pk>/', get_user_pet, name='get_user_pet'),
]