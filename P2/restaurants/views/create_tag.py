from rest_framework.generics import CreateAPIView
from restaurants.serializers import TagSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.permissions import IsOwnerOrReadOnly


class CreateTagView(CreateAPIView):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(restaurant=self.request.user.restaurant)
