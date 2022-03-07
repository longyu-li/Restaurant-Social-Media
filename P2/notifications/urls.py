from django.urls import path
from .views import notifications

urlpatterns = [path("", notifications)]
