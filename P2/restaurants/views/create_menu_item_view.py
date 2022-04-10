from rest_framework.generics import CreateAPIView
from restaurants.serializers import MenuItemSerializer
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from notifications.models import Menu as NMenu

# Create your views here.


class CreateMenuItemView(CreateAPIView):
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        restaurant = self.request.user.restaurant

        menu_item = serializer.save(restaurant=restaurant)

        followers = Restaurant.follows.all()
        for f in followers:
            NMenu(owner=f, restaurant=restaurant, menu=menu_item, change="c")