from django.urls import path
from app.views import RegisterView,MyTokenObtainPairView, getRoutes
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('register/done/', RegisterView.as_view(), name='auth_register_done'),
    path('', getRoutes, name='get_routes'),
]