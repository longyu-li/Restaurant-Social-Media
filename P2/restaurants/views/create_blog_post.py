from rest_framework.generics import CreateAPIView
from restaurants.serializers import BlogSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly


class CreateBlogPostView(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(restaurant=self.request.user.restaurant)
