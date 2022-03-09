from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users.views.signup_view import SignupView

urlpatterns = [
    path("signup", SignupView.as_view(), name="users_signup"),
    path("signin", TokenObtainPairView.as_view(), name="users_signin"),
    path("token", TokenRefreshView.as_view(), name="users_token"),
]
