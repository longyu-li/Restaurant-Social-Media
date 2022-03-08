from django.contrib.auth.models import AbstractBaseUser, UserManager, User
from django.core.validators import RegexValidator
from django.db import models

phone_num_validator = RegexValidator("[0-9]{3}-[0-9]{3}-[0-9]{4}")


# we can't use AbstractUser bc we can't change its field props (e.g. email is not required)
class RestifyUser(AbstractBaseUser):

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)

    avatar = models.ImageField()
    phone_num = models.TextField(max_length=12, validators=[phone_num_validator])

    EMAIL_FIELD = "email"
    USERNAME_FIELD = EMAIL_FIELD

    # required for reusing UserManager
    is_staff = is_superuser = False  # we have no features that would require this functionality
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    # from AbstractUser
    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)
