from django.urls import path
from restaurants.views.create_image_view import CreateImageView
from restaurants.views.create_update_delete_restaurant_view import (
    CreateUpdateDeleteRestaurantView,
)
from restaurants.views.get_blog_post_view import GetBlogPostView
from restaurants.views.get_image_list_view import GetImageListView
from restaurants.views.get_menu_list_view import GetMenuListView
from restaurants.views.get_restaurant_view import GetRestaurantView
from restaurants.views.create_menu_item_view import CreateMenuItemView
from restaurants.views.get_tag_list_view import get_tags
from restaurants.views.update_delete_image_view import UpdateDeleteImageView
from restaurants.views.update_delete_menu_item_view import UpdateDeleteMenuItemView
from restaurants.views.create_blog_post import CreateBlogPostView
from restaurants.views.delete_blog_post import DeleteBlogPostView
from restaurants.views.get_blog_post_list_view import GetBlogPostListView
from restaurants.views.create_tag import CreateTagView
from restaurants.views.delete_tag import DeleteTagView
from restaurants.views.search_restaurants import SearchRestaurantsView
from restaurants.views.get_create_comment import GetCreateCommentsView

from restaurants.views.action_views import like_restaurant, follow_restaurant, like_blog

urlpatterns = [
    path("<int:restaurant_id>/like/", like_restaurant, name="restaurants_like"),
    path("<int:restaurant_id>/follow/", follow_restaurant, name="restaurants_follow"),
    path("blog/<int:blog_id>/like/", like_blog, name="blog_like"),
    path(
        "blog/",
        CreateBlogPostView.as_view(),
        name="create_blog_post",
    ),
    path("blog/<int:blog_id>/", DeleteBlogPostView.as_view(), name="delete_blog_post"),
    path("<int:restaurant_id>/tag/", CreateTagView.as_view(), name="create_tag"),
    path("<int:restaurant_id>/tags/", get_tags, name="list_tags"),
    path("tags/<int:tag_id>/", DeleteTagView.as_view(), name="delete_tag"),
    path("search/", SearchRestaurantsView.as_view(), name="search_restaurants"),
    path(
        "<int:restaurant_id>/comments/",
        GetCreateCommentsView.as_view(),
        name="get_create_comment",
    ),
    path("blogs/<int:blog_id>/", GetBlogPostView.as_view(), name="get_blog_post"),
    path(
        "<int:restaurant_id>/blogs/",
        GetBlogPostListView.as_view(),
        name="get_blog_post_list",
    ),
    path("", CreateUpdateDeleteRestaurantView.as_view(), name="edit_restaurant"),
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
