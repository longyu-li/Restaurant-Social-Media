from rest_framework import serializers

from restaurants.models import Blog, Comment, Image, MenuItem, Restaurant, Tag


class RestaurantSerializer(serializers.ModelSerializer):
    follows = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Restaurant
        fields = [
            "id",
            "name",
            "street",
            "city",
            "province",
            "postal_code",
            "logo",
            "phone_num",
            "banner",
            "description",
            "follows",
            "likes",
        ]

    def get_follows(self, obj):
        return obj.follows.count()

    def get_likes(self, obj):
        return obj.likes.count()


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ["id", "name", "description", "price", "image"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["id", "image", "title", "description"]


class BlogSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Blog
        fields = ["id", "title", "restaurant", "content", "likes", "date"]
        read_only_fields = ["restaurant", "likes", "date"]

    def get_likes(self, obj):
        return obj.likes.count()


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "tag"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["owner", "content", "date"]
        read_only_fields = ["owner", "date"]
