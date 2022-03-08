from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")


# Create your models here.
class RestifyUser(AbstractUser):

    avatar = models.ImageField()
    phone_num = models.TextField(validators=[phone_num_validator])  # textfield bc regex already checks length

    USERNAME_FIELD = AbstractUser.EMAIL_FIELD

    REQUIRED_FIELDS = ["avatar", "phone_num"]  # safely drop AbstractUser.REQUIRED_FIELDS since email is USERNAME_FIELD
