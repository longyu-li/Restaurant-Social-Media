from django.db import models

# Create your models here.
from users.models import RestifyUser
from django.core.validators import RegexValidator

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")

class Restaurant(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)
    user = models.ForeignKey(to=RestifyUser, on_delete=models.CASCADE)


    name = models.CharField(max_length=150)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_restaurants")
    follows = models.ManyToManyField(RestifyUser, related_name="followed_restaurants")

    street = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    province = models.CharField(max_length=150) #longest province name (Newfoundland and Labrador)
    logo = models.ImageField(upload_to="logos/")
    phone_num = models.CharField(max_length=12, validators=[phone_num_validator])
    banner = models.ImageField(upload_to="banners")
    description = models.TextField(max_length=280)

class Blog(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)

    title = models.CharField(max_length=150)

    # the restaurant the blog post belongs to
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_blogs")
