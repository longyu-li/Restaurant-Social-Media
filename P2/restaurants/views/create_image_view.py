
from rest_framework.generics import CreateAPIView
from restaurants.serializers import ImageSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class CreateImageView(CreateAPIView):
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(restaurant=self.request.user.restaurant)