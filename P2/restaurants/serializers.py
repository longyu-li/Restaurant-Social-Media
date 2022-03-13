
from rest_framework import serializers

from restaurants.models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    follows = serializers.CharField(read_only=True)
    likes = serializers.CharField(read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'street', 'city', 'province', 'postal_code', 'logo', 'phone_num', 'banner', 'description', 'follows', 'likes']


