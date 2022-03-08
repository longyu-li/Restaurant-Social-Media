from django.urls import path

from users.views.signup_view import SignupView

urlpatterns = [
    path("signup", SignupView.as_view(), name="users_signup")
]
