from rest_framework.generics import CreateAPIView
from restaurants.serializers import MenuItemSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class CreateMenuItemView(CreateAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(restaurant=self.request.user.restaurant)
