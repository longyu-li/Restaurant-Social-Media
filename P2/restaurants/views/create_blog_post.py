from rest_framework.generics import CreateAPIView
from restaurants.serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly
from restaurants.models import Restaurant
from users.models import RestifyUser
from notifications.models import Blog as NBlog


class CreateBlogPostView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurant

        blog = serializer.save(restaurant=restaurant)
        
        followers = restaurant.follows.all()
        for f in followers:
            NBlog(owner=f, restaurant=restaurant, blog=blog).save()
