from django.http import HttpRequest, HttpResponse

from rest_framework.response import Response

from .models import Comment, Like, Follow, Menu, Blog, RestaurantNotification

from restaurants.models import Blog as MBlog, Restaurant as MRestaurant, MenuItem as MMenuItem
from users.models import RestifyUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def notifications(req: HttpRequest) -> HttpResponse:
    user = req.user

    comments = iter(Comment.objects.filter(owner=user))
    likes = iter(Like.objects.filter(owner=user))
    follows = iter(Follow.objects.filter(owner=user))
    menu = iter(Menu.objects.filter(owner=user))
    blog = iter(Blog.objects.filter(owner=user))

    # Sort by datetime descending
    all_ = sorted(
        (*comments, *likes, *follows, *menu, *blog), key=lambda obj: obj.timestamp, reverse=True
    )

    if "page_size" in req.GET:
        page_size = int(req.GET["page_size"])
    else:
        page_size = 10

    if "cursor" in req.GET:
        cursor = int(req.GET["cursor"])
    else:
        cursor = 0

    all_ = all_[cursor : cursor + page_size]

    response = []

    # Serialize
    for obj in all_:
        if isinstance(obj, Comment):
            data = {
                "type": "comment",
                "comment": {
                    "id": obj.comment.id,
                    "content": obj.comment.content,
                    "date": obj.comment.date,
                },
            }
        elif isinstance(obj, Like):
            data = {"type": "like", "kind": obj.kind}
        elif isinstance(obj, Follow):
            data = {
                "type": "follow",
            }
        elif isinstance(obj, Blog):
            blog: MBlog = obj.blog
            rst: MRestaurant = blog.restaurant
            data = {
                "type": "blog",
                "restaurant": {
                    "id": rst.id,
                    "name": rst.name,
                    "logo": rst.logo.url
                },
                "blog": {
                    "title": blog.title,
                    "content": blog.content,
                    "date": blog.date,
                    "likes": blog.likes.count()
                }
            }
        elif isinstance(obj, Menu):
            menu: MMenuItem = obj.menu
            rst: MRestaurant = menu.restaurant
            data = {
                "type": "menu",
                "restaurant": {
                    "id": rst.id,
                    "name": rst.name,
                    "logo": rst.logo.url
                },
                "change": obj.change,
                "item": {
                    "id": menu.id,
                    "image": menu.image.url,
                    "name": menu.name,
                    "description": menu.description,
                    "price": menu.price
                }
            }
        data["timestamp"] = obj.timestamp
        data["id"] = f"{data['type']}#{obj.id}"
        if isinstance(obj, RestaurantNotification):
            user: RestifyUser = obj.user
            data["user"] = {
                "id": user.id,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "avatar": user.avatar.url
            }
        response.append(data)

    return Response(response)
