from django.urls import path
from restaurants.views.create_image_view import CreateImageView
from restaurants.views.create_update_restaurant_view import CreateUpdateRestaurantView
from restaurants.views.get_image_list_view import GetImageListView
from restaurants.views.get_menu_list_view import GetMenuListView
from restaurants.views.get_restaurant_view import GetRestaurantView
from restaurants.views.create_menu_item_view import CreateMenuItemView
from restaurants.views.update_delete_image_view import UpdateDeleteImageView
from restaurants.views.update_delete_menu_item_view import UpdateDeleteMenuItemView

from restaurants.views.action_views import like_restaurant, follow_restaurant, like_blog

urlpatterns = [
    path("<int:restaurant_id>/like/", like_restaurant, name="restaurants_like"),
    path("<int:restaurant_id>/follow/", follow_restaurant, name="restaurants_follow"),
    path("blog/<int:blog_id>/like/", like_blog, name="blog_like"),
    path("", CreateUpdateRestaurantView.as_view(), name="edit_restaurant"),
    path("<int:restaurant_id>/", GetRestaurantView.as_view(), name="get_restaurant"),
    path("menu/", CreateMenuItemView.as_view(), name="add_menu_item"),
    path(
        "menu/<int:menu_item_id>/",
        UpdateDeleteMenuItemView.as_view(),
        name="edit_menu_item",
    ),
    path("<int:restaurant_id>/menu/", GetMenuListView.as_view(), name="get_menu_list"),
    path("images/", CreateImageView.as_view(), name="add_image"),
    path(
        "<int:restaurant_id>/images/", GetImageListView.as_view(), name="get_image_list"
    ),
    path("images/<int:image_id>/", UpdateDeleteImageView.as_view(), name="edit_image"),
]
