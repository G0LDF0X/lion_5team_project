"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

# from app.views.users_views import LoginView, LogoutView, UserView, RegisterView
# from django.contrib.auth import views as auth_views

"""사용자가 로그인하기 위해 아이디와 비밀번호에 입력한 데이터를
해당 url에 POST메서드로 body에 전달해서 보내면
아이디와 비밀번호에 맞는 유저가 존재하면 access토큰과 refresh토큰을 응답메시지에 넣어 보내줍니다."""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('app/', include('app.urls.users_urls'))

]
