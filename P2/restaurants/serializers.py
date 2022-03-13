from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth import password_validation
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.request import Request
from restaurants.models import Restaurant

from users.models import RestifyUser

class RestaurantSerializer(serializers.ModelSerializer):
    follows = serializers.CharField(read_only=True)
    likes = serializers.CharField(read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'street', 'city', 'province', 'postal_code', 'logo', 'phone_num', 'banner', 'description', 'follows', 'likes']


