from django.db import models

# Create your models here.
from users.models import RestifyUser


class Restaurant(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)

    name = models.CharField(max_length=150)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_restaurants")
    follows = models.ManyToManyField(RestifyUser, related_name="followed_restaurants")


class Blog(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)

    title = models.CharField(max_length=150)

    # the restaurant the blog post belongs to
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_blogs")
