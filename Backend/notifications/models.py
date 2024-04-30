from turtle import ondrag
from django.db import models

from users.models import RestifyUser

from restaurants.models import Comment as ModelComment, MenuItem as ModelMenu, Blog as ModelBlog, Restaurant


class Notification(models.Model):
    owner = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_owner"
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True

class UserNotification(Notification):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="%(class)s_restaurant")

    class Meta:
        abstract = True

class RestaurantNotification(Notification):
    user = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_user"
    )

    class Meta:
        abstract = True


class Comment(RestaurantNotification):
    comment = models.ForeignKey(to=ModelComment, on_delete=models.CASCADE)


class Like(RestaurantNotification):
    class Kind(models.TextChoices):
        Restaurant = "restaurant"
        Post = "post"

    kind = models.CharField(choices=Kind.choices, max_length=10)


class Follow(RestaurantNotification):
    pass

class Menu(UserNotification):
    change = models.CharField(choices=[("c", "create"), ("u", "update"), ("d", "delete")], max_length=6)
    menu = models.ForeignKey(ModelMenu, on_delete=models.CASCADE)

class Blog(UserNotification):
    blog = models.ForeignKey(ModelBlog, on_delete=models.CASCADE)
