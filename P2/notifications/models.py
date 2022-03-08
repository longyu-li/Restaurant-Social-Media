from django.db import models

from users.models import RestifyUser


class Notification(models.Model):
    owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE)
    timestamp = models.DateTimeField()

    class Meta:
        abstract = True


class Comment(Notification):
    user = models.CharField(max_length=25)
    content = models.CharField(max_length=500)


class Like(Notification):
    user = models.CharField(max_length=25)
    likes = models.PositiveIntegerField()


class Post(Notification):
    restaurant = models.CharField(max_length=25)
    content = models.CharField(max_length=1000)
