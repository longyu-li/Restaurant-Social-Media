from django.db import models

from users.models import RestifyUser

from restaurants.models import Comment as ModelComment


class Notification(models.Model):
    owner = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_owner"
    )
    user = models.ForeignKey(
        RestifyUser, on_delete=models.CASCADE, related_name="%(class)s_user"
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Comment(Notification):
    comment = models.ForeignKey(to=ModelComment, on_delete=models.CASCADE)


class Like(Notification):
    class Kind(models.TextChoices):
        Restaurant = "restaurant"
        Post = "post"

    kind = models.CharField(choices=Kind.choices, max_length=10)


class Follow(Notification):
    pass
