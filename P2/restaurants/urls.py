from django.urls import path
from restaurants.views.create_restaurant_view import CreateRestaurantView

from restaurants.views.action_views import like_restaurant, follow_restaurant, like_blog

urlpatterns = [
    path("<int:restaurant_id>/like/", like_restaurant, name="restaurants_like"),
    path("<int:restaurant_id>/follow/", follow_restaurant, name="restaurants_follow"),
    path("blog/<int:blog_id>/like/", like_blog, name="blog_like"),
    path("", CreateRestaurantView.as_view(), name="create_restaurant"),
]
