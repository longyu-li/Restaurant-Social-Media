from django.urls import path
from restaurants.views import CreateRestaurantView


urlpatterns = [
    path("", CreateRestaurantView.as_view(), name="create_restaurant"),
]
