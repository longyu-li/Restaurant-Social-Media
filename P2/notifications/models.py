from django.db import models

from users.models import RestifyUser

class Notification(models.Model):
    owner = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_owner")
    user = models.ForeignKey(RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_user")
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Comment(Notification):
    content = models.CharField(max_length=1000)


class Like(Notification):
    class Kind(models.TextChoices):
        Restaurant = "R", "Restaurant"
        Post = "P", "Post"

    kind = models.CharField(choices=Kind.choices, max_length=1)


class Follow(Notification):
    pass
