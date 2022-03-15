from django.contrib import admin
from .models import Comment, Like, Follow

admin.site.register((Comment, Like, Follow))
