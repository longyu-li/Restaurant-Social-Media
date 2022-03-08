from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")


class RestifyUser(AbstractUser):

    avatar = models.ImageField()
    phone_num = models.CharField(max_length=12, validators=[phone_num_validator])

    USERNAME_FIELD = AbstractUser.EMAIL_FIELD
