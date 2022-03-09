from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")


class RestifyUser(AbstractUser):

    # override (and make required, unique, etc)
    email = models.EmailField(unique=True)
    first_name = models.TextField(max_length=150)
    last_name = models.TextField(max_length=150)

    avatar = models.ImageField(upload_to="avatars/")
    phone_num = models.CharField(max_length=12, validators=[phone_num_validator])

    USERNAME_FIELD = AbstractUser.EMAIL_FIELD

    REQUIRED_FIELDS = []