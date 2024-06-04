from django.urls import path
from app.views.users_views import MyTokenObtainPairView, RegisterView, getRoutes, logoutUser
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('register/done/', RegisterView.as_view(), name='auth_register_done'),
    path('logout/', logoutUser, name='logout'),
    path('', getRoutes)
]