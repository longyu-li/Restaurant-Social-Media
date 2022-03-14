from django.db import models

# Create your models here.
from users.models import RestifyUser
from shared.validators import phone_num_validator


class Restaurant(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)
    user = models.OneToOneField(to=RestifyUser, related_name='restaurant', on_delete=models.CASCADE)

    name = models.CharField(max_length=150)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_restaurants")
    follows = models.ManyToManyField(RestifyUser, related_name="followed_restaurants")

    street = models.CharField(max_length=150)
    city = models.CharField(max_length=150)
    province = models.CharField(max_length=150) #longest province name (Newfoundland and Labrador)
    postal_code = models.CharField(max_length=150)
    logo = models.ImageField(upload_to="logos/")
    phone_num = models.CharField(max_length=12, validators=[phone_num_validator])
    banner = models.ImageField(upload_to="banners/")
    description = models.TextField(max_length=280)

class Blog(models.Model):

    # todo: incomplete stub, add other fields + reasonable attributes (e.g. length)

    title = models.CharField(max_length=150)

    # the restaurant the blog post belongs to
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    content = models.TextField(max_length=280)

    likes = models.ManyToManyField(RestifyUser, related_name="liked_blogs")
    date = models.DateTimeField(null=True, blank=True)

class MenuItem(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    name = models.CharField(max_length=150)
    description = models.TextField(max_length=280)
    price = models.DecimalField(max_digits=6, decimal_places=2) #nothing overly expensive to prevent money laundering
    image = models.ImageField(upload_to="menu/")

class Image(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=models.CASCADE)

    image = models.ImageField(upload_to="images/")
    title = models.CharField(max_length=150)
    description = models.TextField(max_length=280)


