
from rest_framework import serializers

from restaurants.models import Restaurant


class RestaurantSerializer(serializers.ModelSerializer):
    follows = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'street', 'city', 'province', 'postal_code', 'logo', 'phone_num', 'banner', 'description', 'follows', 'likes']

    def get_follows(self, obj):
        return obj.follows.count()

    def get_likes(self, obj):
        return obj.likes.count()
    

    